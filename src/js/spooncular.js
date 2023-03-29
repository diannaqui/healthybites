const apiKey = '96d8289ad2224dbdb0a5dbb77d49ea0f';
const baseUrl = 'https://api.spoonacular.com';
const searchEndpoint = '/food/ingredients/search';

async function searchIngredients(query) {
  const response = await fetch(`${baseUrl}${searchEndpoint}?apiKey=${apiKey}&query=${query}`);
  const data = await response.json();
  return data.results;
}
