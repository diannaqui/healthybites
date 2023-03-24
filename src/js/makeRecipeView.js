export function renderRecipe(recipe) {
    const recipeContainer = document.createElement('div');
  
    const name = document.createElement('h2');
    name.textContent = recipe.name;
    recipeContainer.appendChild(name);
  
    const ingredients = document.createElement('p');
    ingredients.textContent = recipe.ingredients;
    recipeContainer.appendChild(ingredients);
  
    const instructions = document.createElement('p');
    instructions.textContent = recipe.instructions;
    recipeContainer.appendChild(instructions);
  
    // Add a class or ID to the recipe container for styling
    recipeContainer.classList.add('recipe');
  
    // Append the recipe container to the page
    document.querySelector('#recipe-list').appendChild(recipeContainer);
  }
  function renderAllRecipes() {
    const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
  
    // Clear the recipe list before rendering the recipes
    document.querySelector('#recipe-list').innerHTML = '';
  
    storedRecipes.forEach(recipe => {
      renderRecipe(recipe);
    });
  }
  window.addEventListener('load', () => {
    renderAllRecipes();
  });
  