const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Asegúrate de que la ruta y el nombre del archivo sean correctos
const auth = require('../middleware/auth'); // Asegúrate de que la ruta es correcta
const router = express.Router();

// Registro de un nuevo usuario
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  console.log('Datos recibidos:', { username, email, password }); // Log para verificar los datos recibidos
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Contraseña hasheada:', hashedPassword); // Log para verificar que la contraseña fue hasheada
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    console.log('Usuario registrado:', user); // Log para verificar que el usuario fue guardado en la base de datos
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error al registrar usuario:', error); // Log del error específico
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Inicio de sesión de un usuario existente
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in user' });
  }
});

// Ruta para seguir a un usuario
router.post('/follow/:id', auth, async (req, res) => {
  try {
      const userToFollow = await User.findById(req.params.id);
      const currentUser = await User.findById(req.user);

      if (!userToFollow) {
          return res.status(404).json({ message: 'User not found' });
      }

      if (currentUser.following.includes(userToFollow._id)) {
          return res.status(400).json({ message: 'You are already following this user' });
      }

      currentUser.following.push(userToFollow._id);
      userToFollow.followers.push(currentUser._id);

      await currentUser.save();
      await userToFollow.save();

      res.json({ message: 'User followed successfully' });
  } catch (error) {
      res.status(500).json({ error: 'Server Error' });
  }
});
module.exports = router;
