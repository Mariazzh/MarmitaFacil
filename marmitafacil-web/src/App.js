import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Pedidos from './Pages/Pedidos';
import ListarPedidos from './Pages/ListarPedidos';
import Estoque from './Pages/Estoque';


function App() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/pedidos" element={token ? <Pedidos /> : <Navigate to="/" />} />
        <Route path="/listar-pedidos" element={token ? <ListarPedidos /> : <Navigate to="/" />} />
        <Route path="/estoque" element={token ? <Estoque /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
