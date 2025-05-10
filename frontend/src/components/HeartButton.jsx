import React, { useState } from 'react';
import axios from 'axios';

function HeartButton({ recipeId, initialHearted }) {
  const [hearted, setHearted] = useState(initialHearted);

  const toggleHeart = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post(`/api/recipes/${recipeId}/heart`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHearted(res.data.hearted);
    } catch (err) {
      console.error('Error toggling heart:', err);
    }
  };

  return (
    <button onClick={toggleHeart} style={{ fontSize: '20px', cursor: 'pointer', background: 'none', border: 'none' }}>
      {hearted ? '❤️' : '🤍'}
    </button>
  );
}

export default HeartButton;
