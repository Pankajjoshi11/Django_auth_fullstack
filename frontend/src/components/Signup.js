import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/accounts/signup/', {
      username,
      email,
      password,
      phone_number: phone,
      address,
    })
    .then(response => {
      console.log(response.data);
      navigate('/login');
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <textarea placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;
