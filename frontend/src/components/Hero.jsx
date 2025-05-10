// src/components/Hero.jsx
import React, { useEffect, useState } from 'react';
import '../css/style.css';

function Hero() {
  const [bgImage, setBgImage] = useState('');

  useEffect(() => {
    const accessKey = 'yQcg2Hrg1b00EmNK0VpwD0TonFecwC5CHzCkT_OvAlc';
    fetch(`https://api.unsplash.com/photos/random?query=food&client_id=${accessKey}`)
      .then((res) => res.json())
      .then((data) => setBgImage(data.urls.full))
      .catch((err) => console.error('Unsplash error', err));
  }, []);

  return (
    <div
      className="hero w-100 d-flex justify-content-center align-items-center text-center text-white"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="hero-content">
        <h1>Welcome to Recipe</h1>
        <p>Discover and share delicious recipes from around the world!</p>
        <a href="/recipes" className="explore-link">
          Explore Recipes
        </a>
      </div>
    </div>
  );
}

export default Hero;
