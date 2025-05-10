import React, { useState } from 'react';
import axios from 'axios';
import '../css/CreateRecipe.css';

const API_BASE_URL = 'https://recipe-api-env.eba-vbe3vcqe.us-east-1.elasticbeanstalk.com';

function CreateRecipe() {
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', amount: 0, unit: '' }]);
  const [steps, setSteps] = useState(['']);
  const [image, setImage] = useState(null);

  const handleIngredientChange = (index, field, value) => {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: 0, unit: '' }]);
  };

  const addStep = () => setSteps([...steps, '']);

  const handleStepChange = (i, val) => {
    const updated = [...steps];
    updated[i] = val;
    setSteps(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', recipeName);
    formData.append('ingredients', JSON.stringify(ingredients));
    formData.append('steps', JSON.stringify(steps));
    if (image) formData.append('image', image);

    const token = localStorage.getItem('token');

    try {
      const res = await axios.post(`${API_BASE_URL}/api/recipes`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Recipe created!');
      // Optionally reset form
      setRecipeName('');
      setIngredients([{ name: '', amount: 0, unit: '' }]);
      setSteps(['']);
      setImage(null);
    } catch (err) {
      console.error(err);
      alert('Error submitting recipe.');
    }
  };

  return (
    <div className="create-recipe-container">
      <h2>Create New Recipe</h2>
      <form onSubmit={handleSubmit} className="create-recipe-form">
        <input
          type="text"
          placeholder="Recipe Name"
          value={recipeName}
          onChange={e => setRecipeName(e.target.value)}
        />

        <label>Ingredients</label>
        {ingredients.map((item, i) => (
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
              placeholder="Unit (e.g., cup, tsp)"
              value={item.unit}
              onChange={e => handleIngredientChange(i, 'unit', e.target.value)}
            />
          </div>
        ))}

        <button type="button" onClick={addIngredient} className="btn-add">+ Add Ingredient</button>

        <label>Steps</label>
        {steps.map((step, i) => (
          <textarea
            key={i}
            value={step}
            placeholder={`Step ${i + 1}`}
            onChange={e => handleStepChange(i, e.target.value)}
          />
        ))}
        <button type="button" onClick={addStep} className="btn-add">+ Add Step</button>

        <label>Recipe Image</label>
        <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} />

        <button type="submit" className="btn-submit">Submit Recipe</button>
      </form>
    </div>
  );
}

export default CreateRecipe;
