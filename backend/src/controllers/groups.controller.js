import crypto from "crypto";
import pool from "../db/index.js";

export const crearGrupo = async (req, res, next) => {
  try {
    const { name } = req.body;
    const groupsResult = await pool.query(
      "SELECT * FROM groups WHERE name = $1",
      [name],
    );

    if (groupsResult.rows.length > 0) {
      res.status(400).json({ message: "Grupo ya existe" });
    } else {
      const token = crypto.randomUUID();
      const resultGroupID = await pool.query(
        "INSERT INTO groups (name, token) VALUES ($1, $2) RETURNING id",
        [name, token],
      );

      const groupId = resultGroupID.rows[0].id;

      await pool.query(
        "INSERT INTO members (user_id , group_id) VALUES ($1 , $2)",
        [req.user.id, groupId],
      );
      res.status(200).json({ message: "Grupo Creado" });
    }
  } catch (err) {
    next(err);
  }
};

export const agregarMiembro = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const { id } = req.body;

    if (id === undefined || id === "") {
      res.status(400).json({ message: "ID de usuario es requerido" });
    } else {
      const userResult = await pool.query(
        "SELECT id FROM users WHERE id = $1",
        [id],
      );

      const groupResult = await pool.query(
        "SELECT id FROM groups WHERE id = $1",
        [groupId],
      );

      if (userResult.rows.length > 0 && groupResult.rows.length > 0) {
        const userIsnotMember = await pool.query(
          "SELECT id FROM members WHERE user_id = $1 AND group_id = $2",
          [id, groupId],
        );
        if (userIsnotMember.rows.length > 0) {
          res.status(400).json({ message: "Usuario ya existe en el grupo" });
        } else {
          await pool.query(
            "INSERT INTO members (user_id , group_id) VALUES ($1,$2)",
            [id, groupId],
          );
          res.status(200).json({ message: "Miembro agregado" });
        }
      } else if (userResult.rows.length <= 0) {
        res.status(400).json({ message: "Usuario no existe" });
      } else if (groupResult.rows.length <= 0) {
        res.status(400).json({ message: "Grupo no existe" });
      }
    }
  } catch (err) {
    next(err);
  }
};

export const registrarGasto = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const { id } = req.user;
    const groupResult = await pool.query(
      "SELECT id FROM groups WHERE id = $1",
      [groupId],
    );

    if (groupResult.rows.length <= 0) {
      res.status(400).json({ message: "Grupo no existe" });
    } else if (
      req.body.amount === 0 ||
      req.body.amount === "" ||
      req.body.amount === undefined
    ) {
      res.status(400).json({ message: "Ingresa un monto valido" });
    } else {
      await pool.query(
        "INSERT INTO expenses ( description, amount, user_id,group_id ) VALUES ($1,$2,$3,$4)",
        [req.body.description, req.body.amount, id, groupId],
      );
      const groupMembers = await pool.query(
        "SELECT COUNT(*) FROM members WHERE group_id = $1",
        [groupId],
      );

      const expenses = await pool.query(
        `SELECT members.user_id, users.name, COALESCE(SUM(amount),0) as sum FROM members LEFT JOIN expenses ON members.user_id = expenses.user_id AND expenses.group_id = $1 LEFT JOIN users ON members.user_id = users.id WHERE members.group_id = $1 GROUP BY members.user_id, users.name`,
        [groupId],
      );

      const totalGastos = expenses.rows.reduce(
        (acc, expense) => acc + parseFloat(expense.sum),
        0,
      );

      const balance = expenses.rows.map((expense) => {
        return {
          user_id: expense.user_id,
          name: expense.name,
          balance:
            parseFloat(expense.sum) -
            totalGastos / parseFloat(groupMembers.rows[0].count),
        };
      });
      const deudas = calcularDeudaMinima(balance);

      await pool.query("DELETE FROM settlements WHERE group_id = $1", [
        groupId,
      ]);

      for (const deuda of deudas) {
        const settlementID = await pool.query(
          "INSERT INTO settlements (user_creditor_id , user_debtor_id , amount , group_id , paid) VALUES ($1,$2,$3,$4,$5) RETURNING ID",
          [deuda.to_id, deuda.from_id, deuda.amount, groupId, false],
        );
        deuda.id = settlementID.rows[0].id;
      }

      res.status(200).json({ message: "Gasto agregado" });
    }
  } catch (err) {
    next(err);
  }
};

export const verGasto = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const groupResult = await pool.query(
      "SELECT id FROM groups WHERE id = $1",
      [groupId],
    );
    if (groupResult.rows.length <= 0) {
      res.status(400).json({ message: "Grupo no existe" });
    } else {
      const expensesResult = await pool.query(
        "SELECT expenses.id ,expenses.description, expenses.amount, users.name , users.id as user_id FROM expenses JOIN users ON expenses.user_id = users.id WHERE expenses.group_id = $1",
        [groupId],
      );

      res.status(200).json({ gastos: expensesResult.rows });
    }
  } catch (err) {
    next(err);
  }
};

export const calcularBalance = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const groupResult = await pool.query(
      "SELECT id FROM groups WHERE id = $1",
      [groupId],
    );

    if (groupResult.rows.length <= 0) {
      res.status(400).json({ message: "Grupo no existe" });
    } else {
      const expenses = await pool.query(
        "SELECT settlements.user_debtor_id, settlements.user_creditor_id, settlements.amount, settlements.id, debtor.name as from , creditor.name as to FROM settlements JOIN users AS debtor ON settlements.user_debtor_id = debtor.id JOIN users AS creditor ON settlements.user_creditor_id = creditor.id WHERE group_id = $1 AND paid = false",
        [groupId],
      );
      res.status(200).json({ deudas: expenses.rows });
    }
  } catch (err) {
    next(err);
  }
};

export const saldarDeuda = async (req, res, next) => {
  try {
    const { groupId, settlementId } = req.params;

    const settlementResult = await pool.query(
      "SELECT * FROM settlements WHERE id = $1 AND group_id = $2 AND paid = false",
      [settlementId, groupId],
    );

    if (settlementResult.rows.length <= 0) {
      res.status(400).json({ message: "Deuda no existe" });
    } else {
      await pool.query("UPDATE settlements SET paid = true WHERE id = $1", [
        settlementId,
      ]);

      res.status(200).json({ message: "Deuda saldada" });
    }
  } catch (err) {
    next(err);
  }
};

export const obtenerTokenGrupo = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const token = await pool.query("SELECT token FROM groups WHERE id = $1", [
      groupId,
    ]);

    if (token.rows.length <= 0) {
      res.status(400).json({ message: "Grupo no existe" });
    } else {
      res.status(200).json({ token: token.rows[0].token });
    }
  } catch (err) {
    next(err);
  }
};

export const unirseGrupo = async (req, res, next) => {
  try {
    const groupid = await pool.query("SELECT id FROM groups WHERE token = $1", [
      req.params.inviteToken,
    ]);

    if (groupid.rows.length <= 0) {
      res.status(400).json({ message: "Token de grupo no valido" });
    } else {
      const userIsnotMembter = await pool.query(
        "SELECT id FROM members WHERE user_id = $1 AND group_id = $2",
        [req.user.id, groupid.rows[0].id],
      );

      if (userIsnotMembter.rows.length > 0) {
        res.status(400).json({ message: "Usuario ya existe en el grupo" });
        return;
      } else {
        await pool.query(
          "INSERT INTO members (user_id , group_id) VALUES ($1,$2)",
          [req.user.id, groupid.rows[0].id],
        );
        res.status(200).json({ message: "Te uniste al grupo" });
      }
    }
  } catch (err) {
    next(err);
  }
};

export const verGrupos = async (req, res, next) => {
  try {
    const groupsResults = await pool.query(
      "SELECT name, groups.id FROM groups JOIN members ON groups.id = members.group_id WHERE members.user_id = $1 ",
      [req.user.id],
    );

    if (groupsResults.rows.length <= 0) {
      res.status(400).json({ message: "No perteneces a ningun grupo" });
    } else {
      res.status(200).json({ grupos: groupsResults.rows });
    }
  } catch (err) {
    next(err);
  }
};

export const verMiembrosGrupo = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const verMiembrosGrupoResult = await pool.query(
      "SELECT members.user_id , users.name , groups.name as group_name FROM members JOIN users ON members.user_id = users.id JOIN groups ON members.group_id = groups.id WHERE group_id = $1",
      [groupId],
    );

    if (verMiembrosGrupoResult.rows.length <= 0) {
      res.status(400).json({ message: "Este grupo no tiene miembros" });
    } else {
      res.status(200).json({ miembros: verMiembrosGrupoResult.rows });
    }
  } catch (err) {
    next(err);
  }
};

function calcularDeudaMinima(balance, groupId) {
  const deudores = balance.filter((user) => user.balance < 0);
  const acreedores = balance.filter((user) => user.balance > 0);

  deudores.sort((a, b) => a.balance - b.balance);
  acreedores.sort((a, b) => b.balance - a.balance);

  // console.log(deudores, acreedores);
  const deuda = [];
  while (deudores.length > 0 && acreedores.length > 0) {
    const monto = Math.min(
      acreedores[0].balance,
      Math.abs(deudores[0].balance),
    );
    deuda.push({
      from: deudores[0].name,
      from_id: deudores[0].user_id,
      to: acreedores[0].name,
      to_id: acreedores[0].user_id,
      amount: monto,
    });

    acreedores[0].balance = acreedores[0].balance - monto;
    deudores[0].balance = deudores[0].balance + monto;

    if (acreedores[0].balance <= 0) {
      acreedores.splice(0, 1);
    } else if (deudores[0].balance <= 0) {
      deudores.splice(0, 1);
    }
  }

  return deuda;
}
