


// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://marianadecastrosilva234:K4esJlEOdB5LTGT@cluster0.ywqev.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Cria uma instância do aplicativo Express
const app = express();
const port = process.env.PORT || 3000;

// Configura o middleware
app.use(bodyParser.json());

// Conectar ao MongoDB
const mongoURI = 'mongodb+srv://marianadecastrosilva234:K4esJlEOdB5LTGT@cluster0.ywqev.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define o esquema do MongoDB
const actionSchema = new mongoose.Schema({
  userId: String,
  action: String,
  timestamp: { type: Date, default: Date.now }
});

const Action = mongoose.model('Action', actionSchema);

// Endpoint para registrar uma ação
app.post('/api/actions', async (req, res) => {
  const { userId, action } = req.body;

  if (!userId || !action) {
    return res.status(400).json({ message: 'userId and action are required' });
  }

  try {
    const newAction = new Action({ userId, action });
    await newAction.save();
    res.status(201).json(newAction);
  } catch (error) {
    res.status(500).json({ message: 'Failed to save action', error });
  }
});

// Serve arquivos estáticos
app.use(express.static('public'));

// Inicia o servidor
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});