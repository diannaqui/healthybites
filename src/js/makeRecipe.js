import { apiKeyNumber } from "./ExternalServices.mjs";

export function createRecipeForm() {
  const container = document.createElement('div');
  container.classList.add('makeYourRecipeContainer');

  const title = document.createElement('h2');
  title.textContent = 'Make your recipe';
  container.appendChild(title);

  const form = document.createElement('form');

  const addInput = (name, label) => {
    const inputContainer = document.createElement('div');
    const inputLabel = document.createElement('label');
    inputLabel.textContent = `${label}: `;
    const input = document.createElement('textarea');
    input.setAttribute('name', name);
    input.setAttribute('required', true);

    inputContainer.appendChild(inputLabel);
    inputContainer.appendChild(input);
    form.appendChild(inputContainer);
  };

  addInput('recipeName', 'Recipe Name');
  addInput('recipeIngredients', 'Ingredients');
  addInput('recipeInstructions', 'Instructions');

  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save';
  const deleteAllButton = document.createElement('button');
  deleteAllButton.textContent = 'Delete All';

  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('buttonsContainer');
  buttonsContainer.appendChild(saveButton);
  buttonsContainer.appendChild(deleteAllButton);
  form.appendChild(buttonsContainer);
  // form.style.backgroundColor = 'black';

  let recipeNameDisplay, ingredientsDisplay, instructionsDisplay, imageDisplay;
  const addRecipeDisplay = (recipe) => {
    recipeNameDisplay = document.createElement('p');
    recipeNameDisplay.textContent = `Recipe Name: ${recipe.name}`;
    ingredientsDisplay = document.createElement('p');
    ingredientsDisplay.textContent = `Ingredients: ${recipe.ingredients}`;
    instructionsDisplay = document.createElement('p');
    instructionsDisplay.textContent = `Instructions: ${recipe.instructions}`;
    imageDisplay = document.createElement('img');
    imageDisplay.setAttribute('src', recipe.image);
    const index = localStorage.getItem('recipes') ? JSON.parse(localStorage.getItem('recipes')).length : 0;
    recipeNameDisplay.setAttribute('data-index', index);
    ingredientsDisplay.setAttribute('data-index', index);
    instructionsDisplay.setAttribute('data-index', index);
    form.appendChild(recipeNameDisplay);
    form.appendChild(ingredientsDisplay);
    form.appendChild(instructionsDisplay);
    form.appendChild(imageDisplay);
  };

  saveButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const recipe = {
      name: form.recipeName.value,
      ingredients: form.recipeIngredients.value,
      instructions: form.recipeInstructions.value,
      image: '',
    };
    storedRecipes.push(recipe);
    localStorage.setItem('recipes', JSON.stringify(storedRecipes));
    form.reset();

    // Make API request for image URL
    const API_KEY = apiKeyNumber;
    const ingredients = encodeURIComponent(recipe.ingredients.replace(/\n/g, ','));
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${API_KEY}&number=1`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.length > 0) {
      recipe.image = data[0].image;
      addRecipeDisplay(recipe);
    }
  });

  deleteAllButton.addEventListener('click', (event) => {
    event.preventDefault();
    localStorage.removeItem('recipes');
    form.querySelectorAll('[data-index]').forEach(element => element.remove());
  });

  container.appendChild(form);
  return container;
}