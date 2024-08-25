// routes/users.js

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');

// ================================
// 1. Buscar usuarios
// ================================
router.get('/search', auth, async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const users = await User.find({
      username: { $regex: query, $options: 'i' }
    }).select('username profileImage bio');

    res.status(200).json(users);
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// ================================
// 2. Obtener detalles de un usuario
// ================================
router.get('/:id', auth, async (req, res) => {
  const userId = req.params.id;
  const currentUserId = req.user; // ID del usuario autenticado

  try {
    const user = await User.findById(userId)
      .select('username profileImage bio followers following')
      .populate('followers', 'username profileImage')
      .populate('following', 'username profileImage');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isFollowing = user.followers.some(
      (follower) => follower._id.toString() === currentUserId
    );

    res.status(200).json({
      user,
      isFollowing
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// ================================
// 3. Seguir a un usuario
// ================================
router.post('/follow/:id', auth, async (req, res) => {
  const userToFollowId = req.params.id;
  const currentUserId = req.user;

  if (userToFollowId === currentUserId) {
    return res.status(400).json({ error: 'You cannot follow yourself' });
  }

  try {
    const userToFollow = await User.findById(userToFollowId);
    const currentUser = await User.findById(currentUserId);

    if (!userToFollow || !currentUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verificar si ya está siguiendo al usuario
    if (currentUser.following.includes(userToFollowId)) {
      return res.status(400).json({ error: 'Already following this user' });
    }

    currentUser.following.push(userToFollowId);
    userToFollow.followers.push(currentUserId);

    await currentUser.save();
    await userToFollow.save();

    res.status(200).json({ message: 'Successfully followed the user' });
  } catch (error) {
    console.error('Error following user:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// ================================
// 4. Dejar de seguir a un usuario
// ================================
router.post('/unfollow/:id', auth, async (req, res) => {
  const userToUnfollowId = req.params.id;
  const currentUserId = req.user;

  if (userToUnfollowId === currentUserId) {
    return res.status(400).json({ error: 'You cannot unfollow yourself' });
  }

  try {
    const userToUnfollow = await User.findById(userToUnfollowId);
    const currentUser = await User.findById(currentUserId);

    if (!userToUnfollow || !currentUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verificar si realmente sigue al usuario
    if (!currentUser.following.includes(userToUnfollowId)) {
      return res.status(400).json({ error: 'You are not following this user' });
    }

    currentUser.following = currentUser.following.filter(
      (id) => id.toString() !== userToUnfollowId
    );
    userToUnfollow.followers = userToUnfollow.followers.filter(
      (id) => id.toString() !== currentUserId
    );

    await currentUser.save();
    await userToUnfollow.save();

    res.status(200).json({ message: 'Successfully unfollowed the user' });
  } catch (error) {
    console.error('Error unfollowing user:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
