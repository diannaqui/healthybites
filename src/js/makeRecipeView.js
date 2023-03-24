export function makeRecipeView(recipe, recipeNameDisplay, ingredientsDisplay, instructionsDisplay) {
    const recipeContainer = document.createElement('div');
  
    recipeNameDisplay.textContent = `Recipe Name: ${recipe.name}`;
    recipeContainer.appendChild(recipeNameDisplay);
  
    ingredientsDisplay.textContent = `Ingredients: ${recipe.ingredients}`;
    recipeContainer.appendChild(ingredientsDisplay);
  
    instructionsDisplay.textContent = `Instructions: ${recipe.instructions}`;
    recipeContainer.appendChild(instructionsDisplay);
  
    return recipeContainer;
  }
  