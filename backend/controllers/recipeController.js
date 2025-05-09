const Recipe = require('../models/Recipe');

exports.getAllRecipes = async (req, res) => {
  const recipes = await Recipe.find().populate('createdBy', 'username');
  res.json(recipes);
};

exports.createRecipe = async (req, res) => {
  const { name, ingredients, instructions } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
  const recipe = await Recipe.create({
    name,
    ingredients,
    instructions,
    imageUrl,
    createdBy: req.user.id,
  });
  res.status(201).json(recipe);
};

exports.updateRecipe = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
  if (recipe.createdBy.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

  const imageUrl = req.file ? `/uploads/${req.file.filename}` : recipe.imageUrl;
  recipe.name = req.body.name;
  recipe.ingredients = req.body.ingredients;
  recipe.instructions = req.body.instructions;
  recipe.imageUrl = imageUrl;

  await recipe.save();
  res.json(recipe);
};

exports.deleteRecipe = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
  if (recipe.createdBy.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

  await recipe.remove();
  res.json({ message: 'Recipe deleted' });
};
exports.getRecipeById = async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id).populate('createdBy', 'username');
      if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
      res.json(recipe);
    } catch (err) {
      res.status(400).json({ message: 'Invalid ID' });
    }
  };
  
