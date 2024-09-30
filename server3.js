const cors = require('cors');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Cria uma instância do aplicativo Express
const app = express();
const port = process.env.PORT || 3000;

// Configura o middleware
app.use(bodyParser.json());
app.use(cors());
// Conectar ao MongoDB
const mongoURI = 'mongodb+srv://marianadecastrosilva234:K4esJlEOdB5LTGT@cluster0.ywqev.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.log(err));

// Define o esquema para armazenar logins e histórico de conversas
const loginSchema = new mongoose.Schema({
  userId: String,
  loginTime: { type: Date, default: Date.now }
});

const conversationSchema = new mongoose.Schema({
  userId: String,
  message: String,
  sender: String, // 'user' ou 'bot'
  timestamp: { type: Date, default: Date.now }
});

const Login = mongoose.model('Login', loginSchema);
const Conversation = mongoose.model('Conversation', conversationSchema);

// Endpoint para registrar login
app.post('/api/login', async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'userId é obrigatório' });
  }

  try {
    const newLogin = new Login({ userId });
    await newLogin.save();
    res.status(201).json(newLogin);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao salvar login', error });
  }
});

// Endpoint para registrar uma mensagem no histórico de conversas
app.post('/api/conversations', async (req, res) => {
  const { userId, message, sender } = req.body;

  if (!userId || !message || !sender) {
    return res.status(400).json({ message: 'userId, message e sender são obrigatórios' });
  }

  try {
    const newMessage = new Conversation({ userId, message, sender });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao salvar mensagem', error });
  }
});

// Serve arquivos estáticos (como seu frontend)
app.use(express.static('public'));

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
