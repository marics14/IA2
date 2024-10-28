const cors = require('cors');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Cria uma instância do aplicativo Express
const app = express();
app.use(express.json())
const port = 3000;

// Configura o middleware
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

app.post("/api/conversations", async (req, res) => {
  const { userId, message, sender } = req.body;

  console.log(req.body)


  try {
    const newConversation = new Conversation({ userId, message, sender });
    await newConversation.save();
    res.status(201).json(newConversation);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao salvar a conversa', error });
  }
})

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
