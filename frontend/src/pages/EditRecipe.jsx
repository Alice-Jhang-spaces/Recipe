import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/CreateRecipe.css'; // ✅ Reuse the same styles

const API_BASE_URL = 'https://recipe-api-env.eba-vbe3vcqe.us-east-1.elasticbeanstalk.com';

function EditRecipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/recipes`)
      .then(res => {
        const found = res.data.find(r => r._id === id);
        if (found) {
          setRecipe({
            ...found,
            newImage: null, // for optional image replacement
          });
        }
      })
      .catch(err => {
        console.error('Error loading recipe:', err);
        alert('Failed to load recipe');
      });
  }, [id]);

  const handleIngredientChange = (index, field, value) => {
    const updated = [...recipe.ingredients];
    updated[index][field] = value;
    setRecipe({ ...recipe, ingredients: updated });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, { name: '', amount: 0, unit: '' }] });
  };

  const addStep = () => {
    setRecipe({ ...recipe, steps: [...recipe.steps, { description: '' }] });
  };

  const handleStepChange = (i, val) => {
    const updated = [...recipe.steps];
    updated[i].description = val;
    setRecipe({ ...recipe, steps: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', recipe.name);
    formData.append('ingredients', JSON.stringify(recipe.ingredients));
    formData.append('steps', JSON.stringify(recipe.steps.map(s => s.description)));
    if (recipe.newImage) formData.append('image', recipe.newImage);

    const token = localStorage.getItem('token');

    try {
      await axios.put(`${API_BASE_URL}/api/recipes/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Recipe updated!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Error updating recipe:', err);
      alert('Error updating recipe');
    }
  };

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="create-recipe-container">
      <h2>Edit Recipe</h2>
      <form onSubmit={handleSubmit} className="create-recipe-form">
        <input
          type="text"
          placeholder="Recipe Name"
          value={recipe.name}
          onChange={e => setRecipe({ ...recipe, name: e.target.value })}
        />

        <label>Ingredients</label>
        {recipe.ingredients.map((item, i) => (
          <div key={i} className="ingredient-group">
            <input
              type="text"
              placeholder="Ingredient (e.g., Cheese)"
              value={item.name}
              onChange={e => handleIngredientChange(i, 'name', e.target.value)}
            />
            <div className="amount-control">
              <button type="button" onClick={() => handleIngredientChange(i, 'amount', Math.max(0, Number(item.amount) - 1))}>−</button>
              <input
                type="number"
                min="0"
                value={item.amount}
                onChange={e => handleIngredientChange(i, 'amount', e.target.value)}
              />
              <button type="button" onClick={() => handleIngredientChange(i, 'amount', Number(item.amount) + 1)}>+</button>
            </div>
            <input
              type="text"
              placeholder="Unit (e.g., cup)"
              value={item.unit}
              onChange={e => handleIngredientChange(i, 'unit', e.target.value)}
            />
          </div>
        ))}
        <button type="button" onClick={addIngredient} className="btn-add">+ Add Ingredient</button>

        <label>Steps</label>
        {recipe.steps.map((step, i) => (
          <textarea
            key={i}
            value={step.description}
            placeholder={`Step ${i + 1}`}
            onChange={e => handleStepChange(i, e.target.value)}
          />
        ))}
        <button type="button" onClick={addStep} className="btn-add">+ Add Step</button>

        <label>Recipe Image</label>
        <input type="file" accept="image/*" onChange={e => setRecipe({ ...recipe, newImage: e.target.files[0] })} />

        <button type="submit" className="btn-submit">Update Recipe</button>
      </form>
    </div>
  );
}

export default EditRecipe;
