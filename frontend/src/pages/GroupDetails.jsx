import { useParams } from 'react-router-dom';
import {
  verGrupoService,
  verGastosGrupoService,
  calcularBalance,
  obtenerTokenGrupo,
  saldarDeudaService,
  agregarGastoService,
} from '../services/group.services';
import { useEffect, useState } from 'react';

function GroupDetail() {
  const { groupId } = useParams();
  const [members, setMembers] = useState([]);
  const [gastos, setGastos] = useState([]);
  const [balance, setBalance] = useState([]);
  const [linkButton, setLinkButton] = useState(false);
  const [refresh, setRefresh] = useState(0);

  const [newExpense, setNewExpense] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const [deudaSaldada, setDeudaSaldada] = useState(false);
  const [gastoAgregado, setGastoAgregado] = useState(false);

  const [expenseEmpty, setExpenseEmpty] = useState(false);

  useEffect(() => {
    if (!deudaSaldada) return;
    const t = setTimeout(() => setDeudaSaldada(false), 2000);

    return () => {
      clearTimeout(t);
    };
  }, [deudaSaldada]);

  useEffect(() => {
    if (!gastoAgregado) return;
    const t2 = setTimeout(() => setGastoAgregado(false), 2000);
    return () => clearTimeout(t2);
  }, [gastoAgregado]);

  useEffect(() => {
    verGastosGrupoService(groupId)
      .then((res) => {
        setGastos(res.gastos);
      })
      .catch((err) => console.log(err));
    verGrupoService(groupId)
      .then((res) => setMembers(res.miembros))
      .catch((err) => console.log(err));
    calcularBalance(groupId)
      .then((res) => setBalance(res.deudas))
      .catch((err) => console.log(err));
  }, [groupId, refresh]);

  const handleCopyLink = async (groupId) => {
    const token = await obtenerTokenGrupo(groupId);
    console.log(token);
    await navigator.clipboard.writeText(
      new URL(`/join/${token.token}`, location.origin).href
    );
    setLinkButton(true);
    setTimeout(() => {
      setLinkButton(false);
    }, 2000);
  };

  const handleSettleDebt = async (settlementId) => {
    await saldarDeudaService(groupId, settlementId);
    setRefresh((prev) => prev + 1);
  };

  const handleAddExpense = async (groupId, amount, description) => {
    if (amount === '' || description === '') {
      setExpenseEmpty(true);
      setTimeout(() => {
        setExpenseEmpty(false);
      }, 2000);
      return;
    }
    await agregarGastoService(groupId, amount, description);
    setRefresh((prev) => prev + 1);
    setNewExpense('');
    setNewDescription('');
    setGastoAgregado(true);
  };

  return (
    <div>
      <h1>Detalles del Grupo</h1>
      <p>ID del grupo: {groupId}</p>
      <ul>
        {members.length === 0 ? (
          <h2>No members found</h2>
        ) : (
          members.map((member) => {
            const gastosDelMiembro = gastos.filter(
              (gasto) => gasto.user_id === member.user_id
            );
            return (
              <li key={member.user_id}>
                {member.user_id} - {member.name}
                {gastosDelMiembro.map((gasto) => (
                  <div key={gasto.id}>
                    {gasto.amount} - {gasto.description}
                  </div>
                ))}
              </li>
            );
          })
        )}
      </ul>

      <div className="agg-gastos">
        <input
          type="text"
          placeholder="Monto"
          value={newExpense}
          onChange={(e) => setNewExpense(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descripcion"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <button
          onClick={() => handleAddExpense(groupId, newExpense, newDescription)}
        >
          Agregar Gasto
        </button>
        {expenseEmpty && <p>Por favor, complete ambos campos!</p>}
        {gastoAgregado && <p>Gasto agregado correctamente!</p>}
      </div>

      <h3>Deudas</h3>
      <ul>
        {balance.length === 0 ? (
          <h2>No debts found</h2>
        ) : (
          balance.map((deuda) => (
            <li key={deuda.id}>
              <p>De: {deuda.from} </p>
              <p>Para: {deuda.to}</p>
              <p>Monto: {Number(deuda.amount).toFixed(2)}</p>
              <button
                onClick={() => {
                  handleSettleDebt(deuda.id);
                  setDeudaSaldada(true);
                }}
              >
                Saldar Deuda
              </button>
            </li>
          ))
        )}
      </ul>
      {deudaSaldada && <p>Deuda saldada correctamente!</p>}
      <button
        onClick={() => {
          handleCopyLink(groupId);
        }}
      >
        {linkButton ? 'Link Copiado!' : 'Copiar Link de Invitacion'}
      </button>
    </div>
  );
}

export default GroupDetail;
