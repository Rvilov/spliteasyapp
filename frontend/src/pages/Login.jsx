import { useState } from 'react';
import { loginUser } from '../services/auth.services';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const handleLogin = (email, password) => {
    loginUser(email, password).then((res) => {
      if (res.token) {
        localStorage.setItem('token', res.token);
        navigate('/groups');
      } else {
        console.log('Error al iniciar sesion');
      }
    });
  };

  return (
    <main className="w-full relative">
      <div className="aurora-glow "></div>
      <div className="w-full flex justify-center items-center min-h-screen ">
        <div className=" rounded-3xl w-100 h-150 flex flex-col justify-center items-center gap-6 bg-linear-to-br from-white/20 via-white/5 to-white/0 bg-origin-border shadow-[0_8px_32px_0] shadow-black/37">
          <h1 className="text-5xl font-extrabold text-white mb-10">
            SplitEasy
          </h1>
          <div className="flex flex-col gap-4">
            <label className="text-white" htmlFor="email">
              Correo Electrónico
            </label>
            <input
              className="focus:outline-1 focus:outline-gray-700  rounded-lg p-2 w-80 bg-[#1A1C20] placeholder-gray-500 text-white"
              type="email"
              placeholder="Email@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
            />
            <label className="text-white" htmlFor="password">
              Contraseña
            </label>
            <input
              className="focus:outline-1 focus:outline-gray-700 rounded-lg p-2 w-80 bg-[#1A1C20] placeholder-gray-500 text-white"
              type="password"
              placeholder="**************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
            />
          </div>
          <input
            className="bg-[#00D1FF] w-70 rounded-lg h-20 text-2xl hover:scale-105 transition-all duration-300 active:scale-95 active:bg-[#00D1FF]/80 cursor-pointer"
            type="button"
            value="Iniciar Sesion"
            onClick={() => handleLogin(email, password)}
          />
        </div>
      </div>
    </main>
  );
}

export default Login;
