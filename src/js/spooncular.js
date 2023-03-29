const apiKeyNumber = "96d8289ad2224dbdb0a5dbb77d49ea0f"; // Replace with your API key
const baseUrl = 'https://api.spoonacular.com';
const ingredientEndpoint = '/food/ingredients/search';
const imageEndpoint = '/food/ingredients/{id}/information';
const nutritionEndpoint = '/food/ingredients/{id}/nutritionWidget.json';

export async function getIngredients(query) {
  const response = await fetch(`https://api.spoonacular.com/food/ingredients/autocomplete?query=${query}&number=10&apiKey=96d8289ad2224dbdb0a5dbb77d49ea0f`);
  const data = await response.json();
  return data;
}


export async function getIngredientImage(ingredientId) {
  const response = await fetch(`${baseUrl}${imageEndpoint.replace('{id}', ingredientId)}?apiKey=${apiKeyNumber}`);
  const data = await response.json();
  return data.image;
}

export async function getIngredientNutrition(ingredientId) {
  const response = await fetch(`${baseUrl}${nutritionEndpoint.replace('{id}', ingredientId)}?apiKey=${apiKeyNumber}`);
  const data = await response.json();
  return data;
}
