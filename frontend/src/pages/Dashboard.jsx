import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Dashboard.css';

function Dashboard() {
  const [userRecipes, setUserRecipes] = useState([]);
  const userId = localStorage.getItem('userId'); // set at login
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        const res = await axios.get(`/api/recipes/user/${userId}`);
        setUserRecipes(res.data);
      } catch (err) {
        console.error('Failed to fetch recipes:', err);
      }
    };

    if (userId) fetchUserRecipes();
  }, [userId]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this recipe?');
    if (!confirmDelete) return;
  
    try {
      const token = localStorage.getItem('token'); // ⬅ double check this
      await axios.delete(`http://localhost:3001/api/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserRecipes(prev => prev.filter(r => r._id !== id));
    } catch (err) {
      console.error('Delete failed:', err.response?.data || err.message);
      alert('Error deleting recipe');
    }
  };
  

  return (
    <div className="container mt-5">
      <h2>Welcome to Your Dashboard</h2>
      <p>Here you will manage your personal recipes and profile.</p>
      <Link to="/recipes/create" className="dashboard-create-btn">+ Create New Recipe</Link>

      <div className="recipe-grid mt-4">
        {userRecipes.map((recipe) => (
          <div className="recipe-card" key={recipe._id}>
            <img
              src={`http://localhost:3001${recipe.imageUrl}`}
              alt={recipe.name}
              className="recipe-image"
            />
            <div className="text-content">
              <h5>{recipe.name}</h5>
              <p className="recipe-ingredients">
                {recipe.ingredients.map(ing => `${ing.amount} ${ing.unit} ${ing.name}`).join(', ')}
              </p>
              <div className="recipe-actions">
                <Link to={`/recipes/${recipe._id}`} className="view-btn btn">View</Link>
                <Link to={`/recipes/edit/${recipe._id}`} className="edit-btn btn">Edit</Link>
                <button
                  onClick={() => handleDelete(recipe._id)}
                  className="delete-btn btn"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
