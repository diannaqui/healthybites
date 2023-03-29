import { getIngredientImage, getIngredientNutrition, getIngredients } from './spooncular';

export function createRecipe() {
  const recipeContainer = document.createElement('div');

  // Create form elements
  const form = document.createElement('form');
  const titleInput = document.createElement('input');
  const ingredientInput = document.createElement('input');
  const instructionInput = document.createElement('textarea');
  const submitButton = document.createElement('button');

  // Set form attributes
  form.setAttribute('id', 'recipe-form');
  titleInput.setAttribute('type', 'text');
  titleInput.setAttribute('name', 'title');
  titleInput.setAttribute('placeholder', 'Recipe Title');
  ingredientInput.setAttribute('type', 'text');
  ingredientInput.setAttribute('name', 'ingredients');
  ingredientInput.setAttribute('placeholder', 'Ingredients (separated by commas)');
  instructionInput.setAttribute('name', 'instructions');
  instructionInput.setAttribute('placeholder', 'Instructions');
  submitButton.setAttribute('type', 'submit');
  submitButton.textContent = 'Create Recipe';

  // Add form elements to form
  form.appendChild(titleInput);
  form.appendChild(ingredientInput);
  form.appendChild(instructionInput);
  form.appendChild(submitButton);

  // Add form to recipe container
  recipeContainer.appendChild(form);

  // Add recipe title to recipe container
  const title = document.createElement('h2');
  title.textContent = 'Make your recipe';
  recipeContainer.appendChild(title);

  // Add ingredients and images to recipe container
  ingredientInput.addEventListener('blur', async () => {
    const ingredients = await getIngredients(ingredientInput.value);

    const ingredientsList = document.createElement('ul');

    for (const ingredient of ingredients.results) {
      const image = await getIngredientImage(ingredient.id);
      const nutrition = await getIngredientNutrition(ingredient.id);
    
      const ingredientDiv = document.createElement('div');
      ingredientDiv.classList.add('ingredient');
      ingredientDiv.dataset.id = ingredient.id;
      ingredientDiv.dataset.name = ingredient.name;
      ingredientDiv.dataset.image = image;
      ingredientDiv.dataset.nutrition = JSON.stringify(nutrition);
    
      const img = document.createElement('img');
      img.setAttribute('src', image);
      img.setAttribute('alt', ingredient.name);
      ingredientDiv.appendChild(img);
    
      const name = document.createElement('p');
      name.textContent = ingredient.name;
      ingredientDiv.appendChild(name);
    
      // Add the ingredientDiv to the recipe container
      recipeContainer.appendChild(ingredientDiv);
    }
    submitButton.addEventListener('click', (event) => {
      event.preventDefault();
    
      const title = titleInput.value;
      const ingredients = Array.from(document.querySelectorAll('.ingredient')).map((ingredientDiv) => ({
        id: ingredientDiv.dataset.id,
        name: ingredientDiv.dataset.name,
        image: ingredientDiv.dataset.image,
        nutrition: JSON.parse(ingredientDiv.dataset.nutrition),
      }));
      const instructions = instructionInput.value;
    
      const recipe = {
        title,
        ingredients,
        instructions,
      };
    
      const recipeHtml = generateRecipe(recipe);
      // Add the recipeHtml to the DOM
    });
    function generateRecipe(recipe) {
      const recipeContainer = document.createElement('div');
      recipeContainer.classList.add('recipe');
    
      // Create and add the recipe title
      const title = document.createElement('h1');
      title.textContent = recipe.title;
      recipeContainer.appendChild(title);
    
      // Create and add the ingredient list
      const ingredientsTitle = document.createElement('h2');
      ingredientsTitle.textContent = 'Ingredients';
      recipeContainer.appendChild(ingredientsTitle);
    
      const ingredientsList = document.createElement('ul');
      recipe.ingredients.forEach(ingredient => {
        const ingredientItem = document.createElement('li');
        ingredientItem.classList.add('ingredient');
        ingredientItem.dataset.id = ingredient.id;
        ingredientItem.dataset.name = ingredient.name;
        ingredientItem.dataset.image = ingredient.image;
        ingredientItem.dataset.nutrition = JSON.stringify(ingredient.nutrition);
    
        const img = document.createElement('img');
        img.setAttribute('src', ingredient.image);
        img.setAttribute('alt', ingredient.name);
        ingredientItem.appendChild(img);
    
        const name = document.createElement('span');
        name.textContent = ingredient.name;
        ingredientItem.appendChild(name);
    
        const nutritionButton = document.createElement('button');
        nutritionButton.textContent = 'Nutrition';
        nutritionButton.classList.add('nutrition-button');
        ingredientItem.appendChild(nutritionButton);
    
        ingredientsList.appendChild(ingredientItem);
      });
      recipeContainer.appendChild(ingredientsList);
    
      // Create and add the instructions
      const instructionsTitle = document.createElement('h2');
      instructionsTitle.textContent = 'Instructions';
      recipeContainer.appendChild(instructionsTitle);
    
      const instructions = document.createElement('p');
      instructions.textContent = recipe.instructions;
      recipeContainer.appendChild(instructions);
    
      // Add event listener for nutrition buttons
      recipeContainer.addEventListener('click', async (event) => {
        if (event.target.classList.contains('nutrition-button')) {
          const ingredient = event.target.parentElement;
          const nutrition = JSON.parse(ingredient.dataset.nutrition);
          const nutritionHtml = generateNutrition(nutrition);
          ingredient.appendChild(nutritionHtml);
        }
      });
    
      return recipeContainer;
    }
    
    function generateNutrition(nutrition) {
      const nutritionContainer = document.createElement('div');
      nutritionContainer.classList.add('nutrition');
    
      const nutritionTitle = document.createElement('h3');
      nutritionTitle.textContent = 'Nutrition Facts';
      nutritionContainer.appendChild(nutritionTitle);
    }
  });
}    