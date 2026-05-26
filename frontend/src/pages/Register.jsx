import { useState } from 'react';
import { registerUser } from '../services/auth.services';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleRegister = (email, name, password) => {
    registerUser(email, name, password).then((res) => {
      if (res.message === 'Usuario ya existe') {
        navigate('/login');
        console.log('Usuario ya existe , inicie sesion');
      } else if (res.message === 'Usuario registrado') {
        navigate('/login');
        console.log('Usuario Registrado con exito');
      } else {
        console.log('Error al registrar usuario');
      }
    });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="button"
        value="Registrarse"
        onClick={() => handleRegister(email, name, password)}
      />
    </div>
  );
}

export default Register;
