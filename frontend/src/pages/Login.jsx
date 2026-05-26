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
    <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="button"
        value="Iniciar Sesion"
        onClick={() => handleLogin(email, password)}
      />
    </div>
  );
}

export default Login;
