// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();
// Importa o framework Express para criar a API
const express = require('express');
// Importa o middleware CORS para permitir requisições de diferentes origens
const cors = require('cors');
// Importa a biblioteca bcryptjs para hash de senhas
const bcrypt = require('bcryptjs');
// Importa a biblioteca jsonwebtoken para criar e verificar tokens JWT
const jwt = require('jsonwebtoken');
// Importa o ODM Mongoose para interagir com o MongoDB
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB conectado no AuthService'))
.catch((err) => console.error('Erro ao conectar MongoDB:', err));

// Definir schema e modelo para Usuário
const usuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

// Rotas

app.post('/auth/register', async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ message: 'Nome, email e senha são obrigatórios' });
  }

  try {
    const existe = await Usuario.findOne({ email });
    if (existe) return res.status(409).json({ message: 'Usuário já existe' });

    const senhaHash = bcrypt.hashSync(senha, 8);

    const novoUsuario = new Usuario({ nome, email, senha: senhaHash });
    await novoUsuario.save();

    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error });
  }
});

app.post('/auth/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario || !bcrypt.compareSync(senha, usuario.senha)) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ email: usuario.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`AuthService rodando na porta ${PORT}`);
});
