// src/pages/Home.jsx
import React, { useEffect } from 'react';
import '../css/style.css';

const Home = () => {
  useEffect(() => {
    const accessKey = 'yQcg2Hrg1b00EmNK0VpwD0TonFecwC5CHzCkT_OvAlc';
    const recipeImages = {
      'Spaghetti Carbonara': 'pasta',
      'Chicken Tikka Masala': 'chicken',
      'Avocado Toast': 'avocado',
    };

    // Update hero image
    fetch(`https://api.unsplash.com/photos/random?query=food&client_id=${accessKey}`)
      .then(res => res.json())
      .then(data => {
        const hero = document.getElementById('hero');
        if (hero) hero.style.backgroundImage = `url(${data.urls.full})`;
      });

    // Update recipe card images
    Object.keys(recipeImages).forEach((recipe, index) => {
      fetch(`https://api.unsplash.com/photos/random?query=${recipeImages[recipe]},food&client_id=${accessKey}`)
        .then(res => res.json())
        .then(data => {
          const images = document.querySelectorAll('.recipe-image');
          if (images[index]) images[index].src = data.urls.small;
        });
    });
  }, []);

  return (
    <>
      <nav className="navbar">
        <a href="/" className="logo">Recipe</a>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/recipes">Recipes</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/register" className="signup-btn">Sign Up</a></li>
        </ul>
      </nav>

      <div id="hero" className="hero">
        <h1>Welcome to Recipe</h1>
      </div>

      <div className="container">
        <h1 className="title">All Recipes</h1>
        <div id="recipe-list" className="recipe-container">
          {[
            {
              title: 'Spaghetti Carbonara',
              desc: 'Classic Italian pasta with eggs, cheese, pancetta, and pepper.',
              alt: 'Spaghetti Carbonara',
            },
            {
              title: 'Chicken Tikka Masala',
              desc: 'A delicious Indian dish with grilled chicken in a creamy tomato sauce.',
              alt: 'Chicken Tikka Masala',
            },
            {
              title: 'Avocado Toast',
              desc: 'A healthy breakfast with mashed avocado on toasted bread.',
              alt: 'Avocado Toast',
            },
          ].map((recipe, idx) => (
            <div className="recipe-card" key={idx}>
              <img src="" alt={recipe.alt} className="recipe-image" />
              <div className="recipe-details">
                <h2 className="recipe-title">{recipe.title}</h2>
                <p className="recipe-description">{recipe.desc}</p>
                <a href={`/recipes/${idx + 1}`} className="recipe-button">View Recipe</a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="footer">
        <p>&copy; Recipe Camp 2025 | All Rights Reserved</p>
      </footer>
    </>
  );
};

export default Home;
