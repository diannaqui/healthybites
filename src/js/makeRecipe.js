import { getIngredients, getIngredientImage, getIngredientNutrition } from './spooncular';

export async function createRecipeForm() {
  const recipeFormContainer = document.createElement('div');
  recipeFormContainer.classList.add("makeYourRecipeContainer")
  const title = document.createElement('h2');
  title.textContent = 'Make your recipe';
  const form = document.createElement('form');

  const nameLabel = document.createElement('label');
  nameLabel.textContent = 'Recipe Name: ';
  const nameInput = document.createElement('input');
  nameInput.setAttribute('name', 'recipeName');
  nameInput.setAttribute('required', true);
  form.appendChild(nameLabel);
  form.appendChild(nameInput);

  const ingredientsLabel = document.createElement('label');
  ingredientsLabel.textContent = 'Ingredients: ';
  const ingredientsTextarea = document.createElement('textarea');
  ingredientsTextarea.setAttribute('name', 'recipeIngredients');
  ingredientsTextarea.setAttribute('required', true);

  form.appendChild(ingredientsLabel);
  form.appendChild(ingredientsTextarea);

  // create a div to display the ingredient image and nutrition information
  const ingredientInfoDiv = document.createElement('div');
  ingredientInfoDiv.classList.add('ingredientInfo');

  // get the first ingredient from the response
  const selectedIngredient = 'avocado';
  const ingredients = await getIngredients(selectedIngredient);
  console.log('ingredients:', ingredients);
  const ingredient = ingredients[0];
  console.log('ingredient:', ingredient);

  const ingredientId = ingredient.id;
  const idElement = document.createElement('div');
  idElement.textContent = `ID: ${ingredientId}`;
  ingredientInfoDiv.appendChild(idElement);

  const ingredientImage = `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`;
  const ingredientImageElement = document.createElement('img');
  ingredientImageElement.setAttribute('src', ingredientImage);
  ingredientInfoDiv.appendChild(ingredientImageElement);

  const nutritionResponse = await fetch(`https://api.spoonacular.com/food/ingredients/${ingredientId}/information?amount=100&apiKey=96d8289ad2224dbdb0a5dbb77d49ea0f`);
  const nutritionData = await nutritionResponse.json();
  const ingredientNutrition = nutritionData.nutrition;
  const ingredientNutritionElement = document.createElement('p');
  ingredientNutritionElement.textContent = `Nutrition: ${ingredientNutrition}`;
  ingredientInfoDiv.appendChild(ingredientNutritionElement);

  form.appendChild(ingredientInfoDiv);

  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save';

  // Define variables outside of the event listener
  let recipeNameDisplay, ingredientsDisplay, instructionsDisplay;

  saveButton.addEventListener('click', (event) => {
    event.preventDefault();
    const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const recipeName = nameInput.value;
    const recipeIngredients = ingredientsTextarea.value;
    const recipeInstructions = instructionsTextarea.value;
    const newRecipe = {
      name: recipeName,
      ingredients: recipeIngredients,
      instructions: recipeInstructions
    }
      // Add the new recipe to the list of stored recipes
  storedRecipes.push(newRecipe);
  localStorage.setItem('recipes', JSON.stringify(storedRecipes));

  // Reset the form
  nameInput.value = '';
  ingredientsTextarea.value = '';
  instructionsTextarea.value = '';

  // Update the recipe display
  recipeNameDisplay.textContent = recipeName;
  ingredientsDisplay.textContent = recipeIngredients;
  instructionsDisplay.textContent = recipeInstructions;
});
form.appendChild(saveButton);

const recipeDisplayContainer = document.createElement('div');
recipeDisplayContainer.classList.add('recipeDisplayContainer');

recipeNameDisplay = document.createElement('h3');
recipeNameDisplay.classList.add('recipeNameDisplay');
recipeDisplayContainer.appendChild(recipeNameDisplay);

ingredientsDisplay = document.createElement('p');
ingredientsDisplay.classList.add('ingredientsDisplay');
recipeDisplayContainer.appendChild(ingredientsDisplay);

const instructionsLabel = document.createElement('label');
instructionsLabel.textContent = 'Instructions: ';
const instructionsTextarea = document.createElement('textarea');
instructionsTextarea.setAttribute('name', 'recipeInstructions');
instructionsTextarea.setAttribute('required', true);
recipeDisplayContainer.appendChild(instructionsLabel);
recipeDisplayContainer.appendChild(instructionsTextarea);

instructionsDisplay = document.createElement('p');
instructionsDisplay.classList.add('instructionsDisplay');
recipeDisplayContainer.appendChild(instructionsDisplay);

recipeFormContainer.appendChild(title);
recipeFormContainer.appendChild(form);
recipeFormContainer.appendChild(recipeDisplayContainer);

return recipeFormContainer;
}