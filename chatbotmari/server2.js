const mongoose = require('mongoose');

// Substitua a string de conexão com a sua
const mongoURI = "mongodb+srv://marianadecastrosilva234:K4esJlEOdB5LTGT@cluster0.ywqev.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));
