import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    axios.post('http://127.0.0.1:8000/api/accounts/login/', { username, password })
      .then(response => {
        localStorage.setItem('access', response.data.access);
        localStorage.setItem('refresh', response.data.refresh);
        navigate(`/home/${username}`);
      })
      .catch(error => {
        console.error("Invalid credentials", error);
        alert("Invalid credentials. Please try again.");
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
