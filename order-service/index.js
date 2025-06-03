const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com o MongoDB
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/marmitafacil';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB conectado com sucesso no order-service'))
.catch(err => console.error('Erro ao conectar ao MongoDB no order-service:', err));

// Modelo de pedido simples para exemplo
const pedidoSchema = new mongoose.Schema({
  produto: String,
  quantidade: Number,
  preco: Number,
});

const Pedido = mongoose.model('Pedido', pedidoSchema);

// Rotas

// Criar um pedido
app.post('/pedidos', async (req, res) => {
  try {
    const novoPedido = new Pedido(req.body);
    await novoPedido.save();
    res.status(201).json(novoPedido);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar todos os pedidos
app.get('/pedidos', async (req, res) => {
  try {
    const pedidos = await Pedido.find();
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Order-service rodando na porta ${PORT}`);
});
