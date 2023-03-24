export function makeRecipeView(recipe, storedRecipes) {
    const recipeContainer = document.createElement('div');
    
    const recipeNameDisplay = document.createElement('p');
    recipeNameDisplay.textContent = `Recipe Name: ${recipe.name}`;
    recipeNameDisplay.setAttribute('data-index', storedRecipes.length - 1);
    recipeContainer.appendChild(recipeNameDisplay);
    
    const ingredientsDisplay = document.createElement('p');
    ingredientsDisplay.textContent = `Ingredients: ${recipe.ingredients}`;
    ingredientsDisplay.setAttribute('data-index', storedRecipes.length - 1);
    recipeContainer.appendChild(ingredientsDisplay);
    
    const instructionsDisplay = document.createElement('p');
    instructionsDisplay.textContent = `Instructions: ${recipe.instructions}`;
    instructionsDisplay.setAttribute('data-index', storedRecipes.length - 1);
    recipeContainer.appendChild(instructionsDisplay);
    
    return recipeContainer;
  }
  