import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/favorites/${userId}`);
        setFavorites(res.data);
      } catch (err) {
        console.error('Error loading favorites:', err);
      }
    };
    fetchFavorites();
  }, [userId]);

  if (favorites.length === 0) {
    return <p style={{ padding: '20px' }}>You have not added any recipes to favorites yet.</p>;
  }

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px' }}>My Favorite Recipes</h2>
      {favorites.map((recipe) => (
        <Link to={`/recipes/${recipe._id}`} key={recipe._id} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{
            background: '#fff',
            borderRadius: '10px',
            marginBottom: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}>
            <img src={`http://localhost:3001${recipe.imageUrl}`} alt={recipe.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <div style={{ padding: '15px' }}>
              <h3>{recipe.name}</h3>
              <p>{recipe.ingredients.map(ing => `${ing.amount} ${ing.unit} ${ing.name}`).join(', ')}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Favorites;