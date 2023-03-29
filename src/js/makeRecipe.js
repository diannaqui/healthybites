import { getIngredients, getIngredientImage, getIngredientNutrition } from "./spooncular";

export function createRecipeForm() {
  const recipeFormContainer = document.createElement('div');
  recipeFormContainer.classList.add("makeYourRecipeContainer")
  const title = document.createElement('h2');
  title.textContent = 'Make your recipe';

  // Create form inputs for recipe title, ingredients, and instructions
  const recipeTitleInput = document.createElement('input');
  recipeTitleInput.type = 'text';
  recipeTitleInput.placeholder = 'Recipe title';

  const ingredientsInput = document.createElement('input');
  ingredientsInput.type = 'text';
  ingredientsInput.placeholder = 'Ingredients';

  const instructionsInput = document.createElement('textarea');
  instructionsInput.placeholder = 'Instructions';

  // Create a button to add an ingredient to the ingredient list
  const addIngredientButton = document.createElement('button');
  addIngredientButton.textContent = 'Add ingredient';
  addIngredientButton.addEventListener('click', () => {
    const ingredientInput = document.createElement('input');
    ingredientInput.type = 'text';
    ingredientInput.classList.add('ingredientInput');

    const quantityInput = document.createElement('input');
    quantityInput.type = 'text';
    quantityInput.classList.add('quantityInput');

    const unitInput = document.createElement('input');
    unitInput.type = 'text';
    unitInput.classList.add('unitInput');

    const ingredientContainer = document.createElement('div');
    ingredientContainer.classList.add('ingredientContainer');
    ingredientContainer.appendChild(ingredientInput);
    ingredientContainer.appendChild(quantityInput);
    ingredientContainer.appendChild(unitInput);

    recipeFormContainer.insertBefore(ingredientContainer, addIngredientButton);
  });

  // Create a button to submit the recipe form
  const submitButton = document.createElement('button');
  submitButton.textContent = 'Submit';
  submitButton.addEventListener('click', async () => {
    const ingredients = [];
    const ingredientInputs = document.querySelectorAll('.ingredientInput');
    const quantityInputs = document.querySelectorAll('.quantityInput');
    const unitInputs = document.querySelectorAll('.unitInput');

    // Loop through the ingredient inputs and create an array of ingredient objects
    for (let i = 0; i < ingredientInputs.length; i++) {
      const ingredient = ingredientInputs[i].value;
      const quantity = quantityInputs[i].value;
      const unit = unitInputs[i].value;

      const ingredientData = await getIngredients(ingredient);

      if (ingredientData.results.length === 0) {
        // If the ingredient is not found, skip it
        continue;
      }

      const ingredientId = ingredientData.results[0].id;
      const ingredientImage = await getIngredientImage(ingredientId);
      const ingredientNutrition = await getIngredientNutrition(ingredientId);

      ingredients.push({
        name: ingredient,
        quantity,
        unit,
        image: ingredientImage,
        nutrition: ingredientNutrition
      });
    }

    // Create a recipe object from the form data
    const recipe = {
      title: recipeTitleInput.value,
      ingredients,
      instructions: instructionsInput.value
    };

    console.log(recipe);
  });

  // Append all form elements to the container
  recipeFormContainer.appendChild(title);
  recipeFormContainer.appendChild(recipeTitleInput);
  recipeFormContainer.appendChild(ingredientsInput);
  recipeFormContainer.appendChild(addIngredientButton);
  recipeFormContainer.appendChild(instructionsInput);
  recipeFormContainer.appendChild(submitButton);

    
  return recipeFormContainer;
}
// Create a select input for ingredients
const ingredientsInput = document.createElement('select');
ingredientsInput.addEventListener('input', async () => {
  const query = ingredientsInput.value;
  const ingredientData = await getIngredients(query);
  const options = ingredientData.results.map((result) => {
    return `<option value="${result.id}">${result.name}</option>`;
  });
  ingredientsInput.innerHTML = options.join('');
});

const defaultOption = document.createElement('option');
defaultOption.textContent = 'Select an ingredient...';
defaultOption.value = '';
defaultOption.disabled = true;
defaultOption.selected = true;
ingredientsInput.appendChild(defaultOption);
