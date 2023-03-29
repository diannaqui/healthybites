const baseUrl = 'https://api.spoonacular.com';
const searchEndpoint = '/food/ingredients/search';
import {apiKeyNumber} from "./ExternalServices.mjs";

export async function searchIngredients(query) {
  const response = await fetch(`${baseUrl}${searchEndpoint}?apiKey=${apiKeyNumber}&query=${query}`);
  const data = await response.json();
  return data.results;
}
