import { getIngredients } from "./spooncular";
import { getIngredientNutrition } from "./spooncular";
import { getIngredientImage } from "./spooncular";

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

   const ingredientLabel = document.createElement('label');
   ingredientLabel.textContent = 'Ingredients: ';
   const ingredientInput = document.createElement('input');
   ingredientInput.setAttribute('name', 'recipeIngredients');
   ingredientInput.setAttribute('required', true);
   form.appendChild(ingredientLabel);
   form.appendChild(ingredientInput);
   
   const nutrientDisplay = document.createElement('p');
   form.appendChild(nutrientDisplay);
   
   ingredientInput.addEventListener('blur', async (event) => {
    const query = event.target.value;
    const data = await getIngredients(query);
    if (data.results.length > 0) {
      const ingredient = data.results[0];
      const nutrientData = await getIngredientNutrition(ingredient.id);
      const nutrients = nutrientData.nutrition.nutrients;
      let nutrientString = '';
      nutrients.forEach(nutrient => {
        nutrientString += `${nutrient.title}: ${nutrient.amount} ${nutrient.unit}\n`;
      });
      nutrientDisplay.textContent = nutrientString;
  
      const ingredientImage = await getIngredientImage(ingredient.id);
      const img = document.createElement('img');
      img.setAttribute('src', `https://spoonacular.com/cdn/ingredients_100x100/${ingredientImage}`);
      form.insertBefore(img, nutrientDisplay);
    } else {
      nutrientDisplay.textContent = 'No ingredients found.';
    }
  });
  
   
  
  return recipeFormContainer;
}