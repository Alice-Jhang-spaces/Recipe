const BASE_URL = 'http://localhost:3001/api';

export const fetchRecipes = async () => {
  const res = await fetch(`${BASE_URL}/recipes`);
  if (!res.ok) throw new Error('Failed to fetch recipes');
  return res.json();
};

export const postRecipe = async (formData) => {
  const res = await fetch(`${BASE_URL}/recipes`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) throw new Error('Failed to post recipe');
  return res.json();
};