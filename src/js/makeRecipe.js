import { getIngredients, getIngredientImage, getIngredientNutrition } from "./spooncular";

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
      const ingredientOption = document.querySelector(`#ingredientList [value="${ingredient}"]`);
      const ingredientId = ingredientOption.getAttribute('data-id');
      const nutritionData = await getIngredientNutrition(ingredientId);
      const ingredientImage = await getIngredientImage(ingredient);
      ingredientsDisplay = document.createElement('div');
      const ingredientImageElement = document.createElement('img');
      ingredientImageElement.setAttribute('src', ingredientImage);
      ingredientsDisplay.appendChild(ingredientImageElement);
      const ingredientNameElement = document.createElement('h3');
      ingredientNameElement.textContent = ingredient;
      ingredientsDisplay.appendChild(ingredientNameElement);
      const nutritionListElement = document.createElement('ul');
      for (const nutrient in nutritionData) {
      const nutrientElement = document.createElement('li');
      nutrientElement.textContent = `${nutrient}: ${nutritionData[nutrient]}`;
      nutritionListElement.appendChild(nutrientElement);
      }
      ingredientsDisplay.appendChild(nutritionListElement);
      form.appendChild(ingredientsDisplay);
      }
      instructionsDisplay = document.createElement('p');
      instructionsDisplay.textContent = `Instructions: ${newRecipe.instructions}`;
      form.appendChild(instructionsDisplay);
    });

    recipeFormContainer.appendChild(title);
    recipeFormContainer.appendChild(form);
    recipeFormContainer.appendChild(saveButton);
    
    return recipeFormContainer;
    }