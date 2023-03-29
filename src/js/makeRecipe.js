import { searchIngredients } from "./spooncular";

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

  const ingredientsDropdownLabel = document.createElement('label');
  ingredientsDropdownLabel.textContent = 'Select an ingredient:';
  const ingredientsDropdown = document.createElement('select');
  ingredientsDropdown.setAttribute('name', 'ingredient');
  ingredientsDropdown.setAttribute('required', true);

  // use Spoonacular API to retrieve list of ingredients
  const ingredients = await searchIngredients('');
  
  // create option elements for each ingredient and append to dropdown
  ingredients.forEach(ingredient => {
    const option = document.createElement('option');
    option.setAttribute('value', ingredient.id);
    option.textContent = ingredient.name;
    ingredientsDropdown.appendChild(option);
  });

  // add label and dropdown to form
  form.appendChild(ingredientsDropdownLabel);
  form.appendChild(ingredientsDropdown);

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