const API_BASE_URL = 'https://recipe-api-env.eba-vbe3vcqe.us-east-1.elasticbeanstalk.com/api';

export const fetchRecipes = async () => {
  const res = await fetch(`${API_BASE_URL}/recipes`);
  if (!res.ok) throw new Error('Failed to fetch recipes');
  return res.json();
};

export const postRecipe = async (formData) => {
  const res = await fetch(`${API_BASE_URL}/recipes`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) throw new Error('Failed to post recipe');
  return res.json();
};

