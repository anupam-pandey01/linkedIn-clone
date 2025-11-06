const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload').single('image');
const Post = require('../models/Post');
const User = require('../models/User');
const fs = require('fs');

// Create post (with optional image)
router.post('/', auth, (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err.message });
    try {
      const { text } = req.body;
      if (!text) return res.status(400).json({ message: 'Text is required' });

      const post = new Post({
        author: req.user._id,
        text,
        image: req.file ? `/uploads/${req.file.filename}` : undefined
      });
      await post.save();
      await post.populate('author', 'name email');
      res.json(post);
    } catch (e) { console.error(e); res.status(500).send('Server error'); }
  });
});

// Get all posts (latest first)
router.get('/', async (req, res) => {
  const posts = await Post.find().populate('author', 'name avatarUrl').sort({ createdAt: -1 });
  res.json(posts);
});

// Edit post
router.put('/:id', auth, async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);
    if(!post) return res.status(404).json({ message: 'Post not found' });
    if(post.author.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not allowed' });
    post.text = text || post.text;
    await post.save();
    res.json(post);
  } catch(e){ console.error(e); res.status(500).send('Server error'); }
});

// Delete post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(!post) return res.status(404).json({ message: 'Post not found' });
    if(post.author.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not allowed' });

    if (post.image) {
      const filePath = post.image.replace(/^\//, '');
      fs.unlink(filePath, (err) => {});
    }
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post removed' });
  } catch(e){ console.error(e); res.status(500).send('Server error'); }
});

// Like/unlike
router.post('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(!post) return res.status(404).json({ message: 'Post not found' });
    const idx = post.likes.findIndex(id => id.toString() === req.user._id.toString());
    if (idx === -1) post.likes.push(req.user._id);
    else post.likes.splice(idx, 1);
    await post.save();
    res.json({ likes: post.likes.length });
  } catch(e){ console.error(e); res.status(500).send('Server error'); }
});

// Get posts by user
router.get('/user/:userId', async (req, res) => {
  const posts = await Post.find({ author: req.params.userId }).populate('author', 'name avatarUrl').sort({ createdAt: -1 });
  res.json(posts);
});

module.exports = router;
