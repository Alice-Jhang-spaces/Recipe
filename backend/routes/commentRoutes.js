const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Comment = require('../models/Comment'); // ✅ not './Comment'
const authMiddleware = require('../middleware/authMiddleware');


const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (_, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// POST a comment
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { recipeId, text } = req.body;
    const imageUrl = req.file ? '/uploads/' + req.file.filename : '';

    const comment = new Comment({
      recipeId,
      userId: req.user.id,
      username: req.user.username,
      text,
      imageUrl
    });

    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error posting comment' });
  }
});

// GET comments for a recipe
router.get('/:recipeId', async (req, res) => {
  try {
    const comments = await Comment.find({ recipeId: req.params.recipeId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching comments' });
  }
});


  

module.exports = router;