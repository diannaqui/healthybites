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

    // add an event listener to the input field to trigger the autocomplete
    const ingredients = await getIngredients(selectedIngredient);
    const ingredient = ingredients[0];

    const ingredientId = ingredient.id;
    const idElement = document.createElement('div');
    idElement.textContent = `ID: ${ingredientId}`;
    ingredientInfoDiv.appendChild(idElement);

    // create a div to display the ingredient image and nutrition information
    const ingredientInfoDiv = document.createElement('div');
    ingredientInfoDiv.classList.add('ingredientInfo');

    const ingredientImage = `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`;
    const nutritionResponse = await fetch(`https://api.spoonacular.com/food/ingredients/${ingredientId}/information?amount=100&apiKey=96d8289ad2224dbdb0a5dbb77d49ea0f`);
    const nutritionData = await nutritionResponse.json();
    const ingredientNutrition = nutritionData.nutrition;

  

  form.appendChild(ingredientsLabel);
  form.appendChild(ingredientsTextarea);

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
      instructions: recipeInstructions,
    };
    storedRecipes.push(newRecipe);
    localStorage.setItem('recipes', JSON.stringify(storedRecipes));
    nameInput.value = '';
    ingredientsTextarea.value = '';
    instructionsTextarea.value = '';
  
    recipeNameDisplay = document.createElement('p');
    recipeNameDisplay.textContent = `Recipe Name: ${newRecipe.name}`;
    form.appendChild(recipeNameDisplay);
  
    ingredientsDisplay = document.createElement('p');
    ingredientsDisplay.textContent = `Ingredients: ${newRecipe.ingredients}`;
    form.appendChild(ingredientsDisplay);
  
    instructionsDisplay = document.createElement('p');
    instructionsDisplay.textContent = `Instructions: ${newRecipe.instructions}`;
    
    // Add data-index attribute to each display element
    const index = storedRecipes.length - 1;
    recipeNameDisplay.setAttribute('data-index', storedRecipes.length - 1);
    ingredientsDisplay.setAttribute('data-index', storedRecipes.length - 1);
    instructionsDisplay.setAttribute('data-index', storedRecipes.length - 1);

    form.appendChild(instructionsDisplay);
  });
  
  const deleteAllButton = document.createElement('button');
  deleteAllButton.textContent = 'Delete All';
  deleteAllButton.addEventListener('click', (event) => {
    event.preventDefault();
    localStorage.removeItem('recipes');
    form.querySelectorAll('[data-index]').forEach(element => {
      element.remove();
    });
  });
   //define a container for the buttons
   const buttonsContainer = document.createElement('div');
   buttonsContainer.classList.add('buttonsContainer');
   //add buttons to container
   buttonsContainer.appendChild(saveButton);
   buttonsContainer.appendChild(deleteAllButton);
   //add container to form
   form.appendChild(buttonsContainer);
   
   recipeFormContainer.appendChild(title);
   recipeFormContainer.appendChild(form);

  
  return recipeFormContainer;
}