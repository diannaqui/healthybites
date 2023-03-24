import { makeRecipeView } from "./makeRecipeView";

export function createRecipeForm() {
  const recipeFormContainer = document.createElement('div');
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

  const instructionsLabel = document.createElement('label');
  instructionsLabel.textContent = 'Instructions: ';
  const instructionsTextarea = document.createElement('textarea');
  instructionsTextarea.setAttribute('name', 'recipeInstructions');
  instructionsTextarea.setAttribute('required', true);
  form.appendChild(instructionsLabel);
  form.appendChild(instructionsTextarea);

  const storedRecipe = JSON.parse(localStorage.getItem('recipes')) || []; 

  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save';

  const savedRecipesContainer = document.createElement('div');

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

    const recipeView = makeRecipeView(newRecipe, storedRecipe);
    savedRecipesContainer.appendChild(recipeView);
  });

  const deleteAllButton = document.createElement('button');
  deleteAllButton.textContent = 'Delete All';
  deleteAllButton.addEventListener('click', (event) => {
    event.preventDefault();
    localStorage.removeItem('recipes');
    savedRecipesContainer.querySelectorAll('[data-index]').forEach(element => {
      element.remove();
    });
  });

  form.appendChild(saveButton);
  form.appendChild(deleteAllButton);
  recipeFormContainer.appendChild(title);
  recipeFormContainer.appendChild(form);
  recipeFormContainer.appendChild(savedRecipesContainer);

  return recipeFormContainer;
}
