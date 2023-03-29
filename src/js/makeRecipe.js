import { getIngredients } from "./spooncular";

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
  const ingredientsInput = document.createElement('input');
  ingredientsInput.setAttribute('name', 'recipeIngredients');
  ingredientsInput.setAttribute('required', true);
  const ingredientsDatalist = document.createElement('datalist');
  ingredientsDatalist.setAttribute('id', 'ingredientList');

  ingredientsInput.addEventListener('input', async () => {
    const query = ingredientsInput.value;
    const data = await getIngredients(query);
    const ingredientOptions = data.results.map(result => `<option value="${result.name}" data-id="${result.id}"></option>`).join('');
    ingredientsDatalist.innerHTML = ingredientOptions;
  });

  ingredientsLabel.appendChild(ingredientsInput);
  ingredientsLabel.appendChild(ingredientsDatalist);
  form.appendChild(ingredientsLabel);

  const instructionsLabel = document.createElement('label');
  instructionsLabel.textContent = 'Instructions: ';
  const instructionsTextarea = document.createElement('textarea');
  instructionsTextarea.setAttribute('name', 'recipeInstructions');
  instructionsTextarea.setAttribute('required', true);
  instructionsTextarea.setAttribute('id', 'instructionsTextarea');
  instructionsLabel.appendChild(instructionsTextarea);
  form.appendChild(instructionsLabel);

  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save';

  // Define variables outside of the event listener
  let recipeNameDisplay, ingredientsDisplay, instructionsDisplay;

  saveButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const recipeName = nameInput.value;
    const recipeIngredients = [...ingredientsInput.value.split(',')];
    const recipeInstructions = document.getElementById('instructionsTextarea').value;
    const newRecipe = {
      name: recipeName,
      ingredients: recipeIngredients,
      instructions: recipeInstructions,
    };
    storedRecipes.push(newRecipe);
    localStorage.setItem('recipes', JSON.stringify(storedRecipes));
    nameInput.value = '';
    ingredientsInput.value = '';
    instructionsTextarea.value = '';

    recipeNameDisplay = document.createElement('p');
    recipeNameDisplay.textContent = `Recipe Name: ${newRecipe.name}`;
    form.appendChild(recipeNameDisplay);

    for (const ingredient of newRecipe.ingredients) {
      const ingredientId = document.querySelector(`#ingredientList [value="${ingredient}"]`).getAttribute('data-id');
      const nutritionData = await getIngredientNutrition(ingredientId);

      const ingredientDisplay = document.createElement('p');
      ingredientDisplay.textContent = `${ingredient} - ${nutritionData.calories} calories`;
      form.appendChild(ingredientDisplay);
    }

    instructionsDisplay = document.createElement('p');
    instructionsDisplay.textContent = `Instructions: ${newRecipe.instructions}`;

    // Add data-index attribute to the recipe name display and ingredients display elements for later use in editing the recipe
    recipeNameDisplay.setAttribute('data-index', storedRecipes.length - 1);
    form.appendChild(instructionsDisplay);
    instructionsDisplay.setAttribute('data-index', storedRecipes.length - 1);

    ingredientsDisplay = document.createElement('p');
    const ingredientsList = document.createElement('ul');
    for (const ingredient of newRecipe.ingredients) {
      const ingredientItem = document.createElement('li');
      ingredientItem.textContent = ingredient;
      ingredientsList.appendChild(ingredientItem);
    }
    ingredientsDisplay.appendChild(ingredientsList);
    form.appendChild(ingredientsDisplay);
    ingredientsDisplay.setAttribute('data-index', storedRecipes.length - 1);
  });

  form.appendChild(saveButton);
  recipeFormContainer.appendChild(title);
  recipeFormContainer.appendChild(form);
  
  return recipeFormContainer;
  }