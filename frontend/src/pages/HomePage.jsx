import { useNavigate } from 'react-router-dom';
import Expense from '../components/home/Expense';

function HomePage() {
  const navigate = useNavigate();
  return (
    <main className="w-full relative">
      <div className="aurora-glow "></div>

      <section className=" text-white flex flex-row justify-around items-center min-h-screen">
        <div className="p-8 w-1/2">
          <div className="rounded-full border bg-white/5 inline-flex border-white/10 px-8 py-1  flex-row items-center gap-2">
            <div className="relative w-2 h-2 ">
              <div className="absolute animate-ping w-2 h-2 rounded-full   bg-green-400"></div>
              <div className="absolute w-2 h-2 rounded-full   bg-green-400"></div>
            </div>
            <p className="text-xs">NUEVA ERA FINANCIERA</p>
          </div>
          <p className="text-6xl font-bold mt-4">Cuentas claras,</p>
          <p className="text-6xl font-bold text-[#00D1FF]">Amistades fluidas</p>
          <p className="text-xl mt-4">
            La forma mas moderna y sencilla de dividir gastos con tu grupo
          </p>
          <div className="flex items-center gap-4 mt-5">
            <button
              className="bg-[#00FFC2] text-gray-700 py-2.5 px-10   rounded-xl font-bold hover: cursor-pointer"
              onClick={() => navigate('/register')}
            >
              Crea cuenta gratis
            </button>
            <button
              className="bg-white/5 text-white py-2.5 px-8 border-gray-600 border  rounded-xl font-bold hover: cursor-pointer"
              onClick={() => navigate('/login')}
            >
              Iniciar sesion
            </button>
          </div>
        </div>
        <div className="flex justify-around items-center w-full  md:w-1/2 max-w-md mr-8 ">
          <div className=" flex justify-around items-center h-auto md:h-96 flex-col border border-white/5 w-full  rounded-2xl bg-[#1A1C20] shadow-lg shadow-cyan-500/10">
            <div className="h-1/3 items-left flex flex-row justify-between w-full p-5">
              <div>
                <p className="font-bold text-2xl"> Balance del grupo</p>
                <p>Viaje a Mallorca</p>
              </div>
              <p className="rounded-full border h-7 px-4 bg-emerald-500/30  border-white/10">
                Activo
              </p>
            </div>
            <div className="w-full flex flex-col gap-2 px-4">
              <Expense
                description="Cena en el Puerto"
                name="Elena"
                amount="12"
              />
              <Expense description="Compra de viaje" name="Diego" amount="26" />
            </div>
            <div className="h-1/3 w-full flex items-end justify-center gap-1 mb-2 overflow-hidden">
              <div className="w-15 h-6 bg-slate-600 rounded-t-sm"></div>
              <div className="w-15 h-12 bg-cyan-500/40 rounded-t-sm"></div>
              <div className="w-15 h-10 bg-slate-600 rounded-t-sm"></div>
              <div className="w-15 h-17 bg-cyan-500/70 rounded-t-sm"></div>
              <div className="w-15 h-8 bg-slate-600 rounded-t-sm"></div>
              <div className="w-15 h-11 bg-cyan-500/40 rounded-t-sm"></div>
            </div>
          </div>
        </div>
      </section>
      <section className="border text-white flex flex-col justify-around items-center h-1/4">
        <p className="text-5xl font bold text-white">
          Disenado para la vida moderna
        </p>
      </section>
      <section className="border text-white flex flex-row justify-around items-center h-1/4"></section>
    </main>
  );
}

export default HomePage;
