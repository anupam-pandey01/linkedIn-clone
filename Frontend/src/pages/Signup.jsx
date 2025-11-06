import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router';

export default function Signup(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/signup', { name, email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify({ id: res.data.user.id, name: res.data.user.name }));
      nav('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <form className="card auth" onSubmit={submit}>
      <h2>Signup</h2>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" />
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" />
      <button className="btn">Create Account</button>
    </form>
  );
}
