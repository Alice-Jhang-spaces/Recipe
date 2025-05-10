import React, { useEffect, useState } from 'react';
import { fetchRecipes } from '../api';
import { Link } from 'react-router-dom';
import HeartButton from '../components/HeartButton';
import '../css/RecipeList.css';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchRecipes();
        setRecipes(data);
        setAllRecipes(data);
      } catch (err) {
        console.error('Error fetching recipes:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const term = searchTerm.toLowerCase();
    const filtered = allRecipes.filter(recipe =>
      recipe.name.toLowerCase().includes(term) ||
      recipe.ingredients?.some(ing =>
        ing.name && ing.name.toLowerCase().includes(term)
      )
    );
    setRecipes(filtered);
  };

  const handleSort = (e) => {
    const type = e.target.value;
    const sorted = [...recipes].sort((a, b) =>
      type === "name"
        ? a.name.localeCompare(b.name)
        : a.ingredients.length - b.ingredients.length
    );
    setRecipes(sorted);
  };

  if (loading) return <p className="loading-text">Loading recipes...</p>;

  return (
    <div className="recipe-list-container">
      <div className="search-sort-container">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">Search</button>
        </form>

        <select onChange={handleSort} className="sort-select">
          <option value="name">Sort by Name</option>
          <option value="ingredients">Sort by Ingredient Count</option>
        </select>
      </div>

      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="recipe-card">
            <Link to={`/recipes/${recipe._id}`} className="recipe-card-link">
              <img
                src={recipe.imageUrl ? `http://localhost:3001${recipe.imageUrl}` : '/default-recipe.jpg'}
                alt={recipe.name}
                className="recipe-image"
              />
              <div className="recipe-details">
                <h2 className="recipe-title">{recipe.name}</h2>
                <p className="recipe-ingredients">
                  {recipe.ingredients.map(ing => `${ing.amount} ${ing.unit} ${ing.name}`).join(', ')}
                </p>
                <p className="recipe-author">
                  <em>By {recipe.createdBy?.username || 'Unknown'}</em>
                </p>
              </div>
            </Link>
            <div className="favorite-row">
              <HeartButton
                recipeId={recipe._id}
                initialHearted={recipe.favorites?.includes(userId)}
              />
              <span className="favorite-label">Add to My Favorite</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeList;
