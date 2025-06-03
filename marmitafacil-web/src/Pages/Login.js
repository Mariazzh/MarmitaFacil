import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        email,
        senha
      });
      localStorage.setItem('token', response.data.token);
      alert('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      alert('Erro ao fazer login. Verifique os dados.');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4 text-center">Login</h2>

      <div className="mb-3">
        <label className="form-label">E-mail</label>
        <input
          type="email"
          className="form-control"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Senha</label>
        <input
          type="password"
          className="form-control"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
      </div>

      <button className="btn btn-primary w-100" onClick={handleLogin}>
        Entrar
      </button>
    </div>
  );
}
