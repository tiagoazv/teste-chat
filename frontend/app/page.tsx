'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@services/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) router.push('/chat');
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErro('');

    try {
      const res = await api.post('/auth/login', { email, password });
      const { token, user: { id, name } } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('userId', id);
      localStorage.setItem('userName', name);
      
      router.push('/chat');
    } catch {
      setErro('Email ou senha inválidos');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '100px auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <button type="submit" style={{ width: '100%', padding: 8 }}>
          Entrar
        </button>
      </form>
      {erro && <p style={{ color: 'red', marginTop: 10 }}>{erro}</p>}
    </div>
  );
}
