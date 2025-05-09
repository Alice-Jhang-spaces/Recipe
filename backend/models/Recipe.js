const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: [
    {
      name: { type: String, required: true },
      amount: { type: Number, required: true },
      unit: { type: String},
      shopLink: { type: String }, // optional
    }
  ],
  
  steps: [
    {
      description: { type: String, required: true },
    },
  ],
  imageUrl: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      text: String,
      image: String, // store image path
      createdAt: { type: Date, default: Date.now }
    }
  ],
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  
  
});


module.exports = mongoose.model('Recipe', recipeSchema);