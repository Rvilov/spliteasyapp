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
  const [groupName, setGroupName] = useState('');
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
      .then((res) => {
        setMembers(res.miembros);
        setGroupName(res.miembros[0].group_name);
      })
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
    <div
      className="text-white w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(76,214,255,0.08)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(157,80,187,0.08)_0%,transparent_50%)]
      flex
      flex-col
      items-left
      justify-start
      gap-4"
    >
      <div className="w-full flex flex-row items-center justify-between gap-2 px-25">
        <div id="group-info" className=" flex flex-col items-start gap-1">
          <h1 className="text-2xl font-bold  text-[#00D1FF]">{groupName}</h1>
          <p className="text-xs text-gray-300">ID DEL GRUPO {groupId}</p>
          <button
            className=" hover:cursor-pointer hover:text-[#00D1FF] transition-colors"
            onClick={() => {
              handleCopyLink(groupId);
            }}
          >
            {linkButton ? (
              'Link Copiado!'
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="icon icon-tabler icons-tabler-filled icon-tabler-link"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M15.707 8.293a1 1 0 0 1 0 1.414l-6 6a1 1 0 1 1 -1.414 -1.414l6 -6a1 1 0 0 1 1.414 0" />
                <path d="M19.242 4.757c2.343 2.344 2.342 6.143 -.052 8.534l-.534 .464a1 1 0 1 1 -1.312 -1.51l.483 -.416a4 4 0 0 0 0 -5.657c-1.562 -1.563 -4.095 -1.563 -5.607 -.054l-.463 .536a1 1 0 1 1 -1.514 -1.308l.513 -.59a6 6 0 0 1 8.486 .001" />
                <path d="M6.75 10.338a1 1 0 0 1 -.088 1.411l-.483 .425a3.97 3.97 0 0 0 0 5.649a4.064 4.064 0 0 0 5.678 .038l.34 -.458a1 1 0 1 1 1.606 1.194l-.397 .534l-.1 .114a6.07 6.07 0 0 1 -8.533 0a5.97 5.97 0 0 1 -1.773 -4.247c0 -1.595 .638 -3.124 1.814 -4.284l.524 -.463a1 1 0 0 1 1.411 .087" />
              </svg>
            )}
          </button>
        </div>

        <div
          id="add-expense"
          className=" border rounded-2xl border-gray-700 w-full h-full text-white flex flex-row gap-1 px-4 py-2 items-center justify-around max-w-xl  "
        >
          <input
            type="text"
            placeholder="Monto"
            value={newExpense}
            onChange={(e) => setNewExpense(e.target.value)}
            className="w-24 bg-[#2A2C30] rounded text-white placeholder:text-gray-500 px-2 h-10 focus:outline-none focus:ring-1 focus:ring-[#00D1FF]"
          />
          <input
            type="text"
            placeholder="Descripcion"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="w-full bg-[#2A2C30] rounded text-white placeholder:text-gray-500 px-2 h-10 focus:outline-none focus:ring-1 focus:ring-[#00D1FF]"
          />
          <button
            onClick={() =>
              handleAddExpense(groupId, newExpense, newDescription)
            }
            className="bg-[#00D1FF] text-[#1A1C20] rounded font-bold cursor-pointer hover:bg-[#00D1FF]/90 transition-colors "
          >
            Agregar Gasto
          </button>
          {expenseEmpty && (
            <p className="text-red-500">Por favor, complete ambos campos!</p>
          )}
          {gastoAgregado && (
            <p className="text-green-500">Gasto agregado correctamente!</p>
          )}
        </div>
      </div>

      <div className="w-full  flex flex-col  gap-4 px-25 py-4 flex-wrap max-h-4xl">
        <h3 className="text-xl font-bold text-white w-full border-b border-gray-700 pb-2">
          Miembros y Gastos
        </h3>

        <ul className="flex flex-row flex-wrap gap-4">
          {members.length === 0 ? (
            <h2>No members found</h2>
          ) : (
            members.map((member) => {
              const gastosDelMiembro = gastos.filter(
                (gasto) => gasto.user_id === member.user_id
              );
              return (
                <li
                  className="text-white flex flex-col gap-2 w-1/2"
                  key={member.user_id}
                >
                  <div className="flex flex-row items-start gap-2">
                    <p className="text-gray-300 size-7 border rounded-full justify-center items-center flex w-7 h-7 bg-[#2A2C30]">
                      {member.user_id}
                    </p>
                    <p>{member.name}</p>
                  </div>

                  {gastosDelMiembro.map((gasto) => (
                    <div
                      className="border border-gray-700 rounded-2xl w-full px-4 py-2 bg-[#2A2C30] flex flex-row items-center justify-between hover:bg-[#2A2C30]/90 transition-colors"
                      key={gasto.id}
                    >
                      <p className="text-sm text-gray-300 w-full">
                        {gasto.description}
                      </p>
                      <p className="text-lg font-bold text-[#00D1FF]">
                        ${Number(gasto.amount).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </li>
              );
            })
          )}
        </ul>
      </div>
      <div className="w-full  flex flex-col  gap-4 px-25 py-4 flex-wrap max-h-4xl">
        <h3 className="text-xl font-bold text-white w-full border-b border-gray-700 pb-2">
          Deudas
        </h3>

        <div className="w-full flex flex-row gap-2  ">
          <ul>
            {balance.length === 0 ? (
              <h2>No debts found</h2>
            ) : (
              balance.map((deuda) => (
                <li
                  className="border rounded-2xl border-gray-700 w-full h-full text-white flex flex-row gap-4 px-4 py-3 items-center justify-around max-w-xl "
                  key={deuda.id}
                >
                  <div id="deudaInfo">
                    <p className="text-sm text-gray-300">De: {deuda.from}</p>
                    <p className="text-sm text-gray-300">Para: {deuda.to}</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-lg font-bold text-[#f25a94]">
                      {Number(deuda.amount).toFixed(2)}
                    </p>
                    <button
                      className="bg-[#00FFC2] text-[#1A1C20] rounded font-bold cursor-pointer hover:bg-[#00D1FF]/90 transition-colors w-15 h-7 flex items-center justify-center"
                      onClick={() => {
                        handleSettleDebt(deuda.id);
                        setDeudaSaldada(true);
                      }}
                    >
                      Pagar
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
        {deudaSaldada && (
          <p className="text-green-500">Deuda saldada correctamente!</p>
        )}
      </div>
    </div>
  );
}

export default GroupDetail;
