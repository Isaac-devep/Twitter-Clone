const express = require('express');
const auth = require('../middleware/auth');
const Tweet = require('../models/Tweet');
const User = require('../models/user');
const router = express.Router();

// Ruta para publicar un tweet
router.post('/', auth, async (req, res) => {
  const { content, image } = req.body;

  if (!content || content.length > 280) {
    return res.status(400).json({ message: 'Tweet must be between 1 and 280 characters' });
  }

  try {
    const tweet = new Tweet({
      content,
      author: req.user,
      image,
    });

    await tweet.save();
    res.status(201).json(tweet);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Obtener el feed de tweets
router.get('/feed', auth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user).populate('following');
    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const tweets = await Tweet.find({
      author: { $in: currentUser.following },
    }).sort({ createdAt: -1 });

    res.json(tweets);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Ruta para dar like a un tweet
router.post('/:id/like', auth, async (req, res) => {
  try {
      const tweet = await Tweet.findById(req.params.id);

      if (!tweet) {
          return res.status(404).json({ message: 'Tweet not found' });
      }

      if (tweet.likes.includes(req.user)) {
          return res.status(400).json({ message: 'You already liked this tweet' });
      }

      tweet.likes.push(req.user);
      await tweet.save();

      res.json({ message: 'Tweet liked' });
  } catch (error) {
      res.status(500).json({ error: 'Server Error' });
  }
});

// Ruta para quitar like de un tweet
router.post('/:id/unlike', auth, async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    // Verificar si el tweet tiene un "like" del usuario actual
    const likeIndex = tweet.likes.indexOf(req.user);
    if (likeIndex === -1) {
      return res.status(400).json({ message: 'You have not liked this tweet' });
    }

    // Eliminar el "like"
    tweet.likes.splice(likeIndex, 1);
    await tweet.save();

    // Enviar un mensaje de éxito en lugar del objeto completo
    res.json({ message: 'Tweet unliked successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Ruta para retweetear un tweet
router.post('/:id/retweet', auth, async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    // Verificar si el tweet ya ha sido retweeteado por el usuario
    if (tweet.retweets.includes(req.user)) {
      return res.status(400).json({ message: 'You have already retweeted this tweet' });
    }

    // Añadir el retweet
    tweet.retweets.push(req.user);
    await tweet.save();

    // Devolver solo un mensaje de éxito
    res.json({ message: 'Tweet retweeted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Ruta para responder a un tweet
router.post('/:id/reply', auth, async (req, res) => {
  const { content } = req.body;

  if (!content || content.length > 280) {
    return res.status(400).json({ message: 'Reply must be between 1 and 280 characters' });
  }

  try {
    let tweet = await Tweet.findById(req.params.id);

    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    const reply = new Tweet({
      content,
      author: req.user,
      replyTo: tweet._id,
    });

    await reply.save();
    res.status(201).json(reply);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Obtener tweets de un usuario específico
router.get('/user/:userId', auth, async (req, res) => {
  try {
    const tweets = await Tweet.find({ author: req.params.userId }).sort({ createdAt: -1 });
    res.json(tweets);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});
module.exports = router;
