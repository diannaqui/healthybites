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
      const imageUrl = await getIngredientImage(ingredientId);
      ingredientsDisplay = document.createElement('div');
      ingredientsDisplay.classList.add('ingredients-display');

      const ingredientName = document.createElement('p');
      ingredientName.textContent = `Ingredient: ${ingredient}`;
      ingredientsDisplay.appendChild(ingredientName);

      const ingredientImage = document.createElement('img');
      ingredientImage.setAttribute('src', imageUrl);
      ingredientsDisplay.appendChild(ingredientImage);

      const calories = document.createElement('p');
      calories.textContent = `Calories: ${nutritionData.calories}`;
      ingredientsDisplay.appendChild(calories);

      const protein = document.createElement('p');
      protein.textContent = `Protein: ${nutritionData.protein} g`;
      ingredientsDisplay.appendChild(protein);

      const carbs = document.createElement('p');
      carbs.textContent = `Carbohydrates: ${nutritionData.carbs} g`;
      ingredientsDisplay.appendChild(carbs);

      const fat = document.createElement('p');
      fat.textContent = `Fat: ${nutritionData.fat} g`;
      ingredientsDisplay.appendChild(fat);

      form.appendChild(ingredientsDisplay);
    }

    instructionsDisplay = document.createElement('p');
    instructionsDisplay.textContent = `Instructions: ${newRecipe.instructions}`;
    form.appendChild(instructionsDisplay);
  });

  form.appendChild(saveButton);
  recipeFormContainer.appendChild(title);
  recipeFormContainer.appendChild(form);

  return recipeFormContainer;
}

