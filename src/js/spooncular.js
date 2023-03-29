const baseUrl = 'https://api.spoonacular.com';
const ingredientEndpoint = '/food/ingredients/search';
import {apiKeyNumber} from "./ExternalServices.mjs";

export async function getIngredients(query) {
  const response = await fetch(`${baseUrl}${ingredientEndpoint}?apiKey=${apiKeyNumber}&query=${query}`);
  const data = await response.json();
  return data;
}
