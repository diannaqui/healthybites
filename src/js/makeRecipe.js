import { getIngredients, getIngredientImage, getIngredientNutrition } from './spooncular';

export function createRecipeForm() {
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
  ingredientsTextarea.addEventListener('change', async (event) => {
    const selectedIngredient = event.target.value.trim();
    const ingredients = await getIngredients(selectedIngredient);
    const ingredient = ingredients.results[0];
  
    // create a div to display the ingredient image and nutrition information
    const ingredientInfoDiv = document.createElement('div');
    ingredientInfoDiv.classList.add('ingredientInfo');
  
    // display the ingredient image
    const ingredientImage = await getIngredientImage(ingredient.id);
    const imageElement = document.createElement('img');
    imageElement.src = `https://spoonacular.com/cdn/ingredients_100x100/${ingredientImage}`;
    ingredientInfoDiv.appendChild(imageElement);
  
    // display the ingredient nutrition information
    const ingredientNutrition = await getIngredientNutrition(ingredient.id);
    const nutritionElement = document.createElement('div');
    nutritionElement.innerHTML = ingredientNutrition;
    ingredientInfoDiv.appendChild(nutritionElement);
  
    form.insertBefore(ingredientInfoDiv, saveButton);
  });

  form.appendChild(ingredientsLabel);
  form.appendChild(ingredientsTextarea);

  const instructionsLabel = document.createElement('label');
  instructionsLabel.textContent = 'Instructions: ';
  const instructionsTextarea = document.createElement('textarea');
  instructionsTextarea.setAttribute('name', 'recipeInstructions');
  instructionsTextarea.setAttribute('required', true);
  form.appendChild(instructionsLabel);
  form.appendChild(instructionsTextarea);

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
       // Display the list of ingredients
       const ingredientList = recipeIngredients.split('\n');
       ingredientsDisplay = document.createElement('p');
       ingredientsDisplay.textContent = `Ingredients: ${ingredientList.join(', ')}`;
       form.appendChild(ingredientsDisplay);
   
       instructionsDisplay = document.createElement('p');
       instructionsDisplay.textContent = `Instructions: ${recipeInstructions}`;
       form.appendChild(instructionsDisplay);
     });
   
     form.appendChild(saveButton);
     recipeFormContainer.appendChild(title);
     recipeFormContainer.appendChild(form);
   
     return recipeFormContainer;
   }
   
