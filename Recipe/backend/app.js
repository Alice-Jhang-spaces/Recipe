const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const recipeRoutes = require('./routes/recipeRoutes');
const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api', recipeRoutes);       // e.g., /api/recipes
app.use('/api/users', userRoutes);   // e.g., /api/users/register
app.use('/api/comments', commentRoutes); // e.g., /api/comments/:recipeId

// Root route (for debugging)
app.get('/', (req, res) => {
  res.send('API is running');
});

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/recipeApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
  });
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
