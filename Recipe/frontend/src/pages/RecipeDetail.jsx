import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchRecipes } from '../api';
import axios from 'axios';
import '../css/RecipeDetail.css';
import HeartButton from '../components/HeartButton';
import CommentSection from '../components/CommentSection';

function RecipeDetail() {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchRecipes();
        const selected = data.find(r => r._id === id);
        setRecipe(selected);
      } catch (err) {
        console.error('Failed to load recipe:', err);
      }
    };
    load();
  }, [id]);

  const handleBuyClick = (ingredientName) => {
    const confirmBuy = window.confirm(`Do you want to buy "${ingredientName}" on Amazon?`);
    if (confirmBuy) {
      const searchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(ingredientName)}`;
      window.open(searchUrl, '_blank');
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this recipe?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3001/api/recipes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Recipe deleted.');
      navigate('/dashboard');
    } catch (err) {
      console.error('Error deleting recipe:', err);
      alert('Failed to delete recipe.');
    }
  };

  if (!recipe) return <p>Loading...</p>;

  const isOwner = recipe.createdBy?._id === userId;

  return (
    <div className="recipe-detail-page">
      <div className="recipe-block">
        <div className="recipe-header">
          <h1>{recipe.name}</h1>
          <div className="favorite-box">
            <HeartButton recipeId={recipe._id} initialHearted={recipe.favorites?.includes(userId)} />
            <span className="favorite-text">Add to my favorites</span>
          </div>
        </div>

        {recipe.imageUrl && (
          <img
            src={`http://localhost:3001${recipe.imageUrl}`}
            alt={recipe.name}
            className="recipe-image"
          />
        )}

        <h3>Ingredients</h3>
        <ul>
          {recipe.ingredients.map((ing, i) => (
            <li key={i} onClick={() => handleBuyClick(ing.name)} style={{ cursor: 'pointer' }}>
              {ing.amount} {ing.unit} {ing.name}
            </li>
          ))}
        </ul>

        <h3>Steps</h3>
        <ol>
          {recipe.steps.map((step, i) => (
            <li key={i}>{step.description}</li>
          ))}
        </ol>

        {isOwner && (
          <div className="recipe-actions">
            <Link to={`/recipes/edit/${recipe._id}`} className="btn edit-btn">Edit</Link>
            <button onClick={handleDelete} className="btn delete-btn">Delete</button>
          </div>
        )}
      </div>

      <div className="comment-block">
        <CommentSection recipeId={recipe._id} />
      </div>
    </div>
  );
}

export default RecipeDetail;
