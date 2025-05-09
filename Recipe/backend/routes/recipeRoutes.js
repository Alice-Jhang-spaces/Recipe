const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Recipe = require('../models/Recipe');
const authMiddleware = require('../middleware/authMiddleware');

// Multer config for image upload
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (_, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// POST /api/recipes — Create recipe (requires auth)
router.post('/recipes', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { name, ingredients, steps } = req.body;
    const imageUrl = req.file ? '/uploads/' + req.file.filename : '';

    const recipe = new Recipe({
      name,
      ingredients: JSON.parse(ingredients),
      steps: JSON.parse(steps).map(desc => ({ description: desc })),
      imageUrl,
      createdBy: req.user.id,
    });

    await recipe.save();
    res.status(201).json({ message: 'Recipe created', recipe });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/recipes — List all recipes (public)
router.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('createdBy', 'username');
    res.json(recipes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET recipes created by a specific user
router.get('/recipes/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const recipes = await Recipe.find({ createdBy: userId });
    res.status(200).json(recipes);
  } catch (err) {
    console.error('Error fetching user recipes:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/recipes/:id — Delete recipe
router.delete('/recipes/:id', authMiddleware, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Not found' });
    if (recipe.createdBy.toString() !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized' });

    await recipe.deleteOne();
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error deleting recipe' });
  }
});

// PUT /api/recipes/:id — Update recipe
router.put('/recipes/:id', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });

    if (recipe.createdBy.toString() !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized' });

    recipe.name = req.body.name;
    recipe.ingredients = JSON.parse(req.body.ingredients);
    recipe.steps = JSON.parse(req.body.steps).map(desc => ({ description: desc }));
    if (req.file) {
      recipe.imageUrl = '/uploads/' + req.file.filename;
    }

    await recipe.save();
    res.json({ message: 'Recipe updated', recipe });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error updating recipe' });
  }
});

router.post('/recipes/:id/heart', authMiddleware, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });

    const userId = req.user.id;
    const isFav = recipe.favorites.includes(userId);

    if (isFav) {
      recipe.favorites.pull(userId);
    } else {
      recipe.favorites.push(userId);
    }

    await recipe.save();
    res.json({ hearted: !isFav });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/favorites/:userId', async (req, res) => {
  try {
    const recipes = await Recipe.find({ favorites: req.params.userId });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
});
module.exports = router;