require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth'); // Rutas de autenticación
const tweetRoutes = require('./routes/tweets'); // Rutas de tweets
const userRoutes = require('./routes/users'); // Importa las rutas de usuarios

const app = express();

app.use(cors());
app.use(express.json());

// Conectar a la base de datos
mongoose.connect('mongodb://localhost/twitter-clone', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Connection error', err);
});

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Welcome to the Twitter Clone API');
});

// Rutas de la API
app.use('/api/auth', authRoutes); // Rutas de autenticación
app.use('/api/tweets', tweetRoutes); // Rutas de tweets
app.use('/api/users', userRoutes); // Usa las rutas de usuarios

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
