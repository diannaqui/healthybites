export function makeRecipeView() {
  const recipeViewContainer = document.createElement('div');
  const title = document.createElement('h2');
  title.textContent = 'Your Recipes';
  
  const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
  if (storedRecipes.length === 0) {
    const message = document.createElement('p');
    message.textContent = 'You have no saved recipes yet.';
    recipeViewContainer.appendChild(message);
  } else {
    const recipeList = document.createElement('ul');
    for (let i = 0; i < storedRecipes.length; i++) {
      const recipe = storedRecipes[i];
      const recipeItem = document.createElement('li');
      const recipeName = document.createElement('h3');
      recipeName.textContent = recipe.name;
      recipeItem.appendChild(recipeName);
      
      const ingredientsDisplay = document.createElement('p');
      ingredientsDisplay.textContent = `Ingredients: ${recipe.ingredients}`;
      recipeItem.appendChild(ingredientsDisplay);
  
      const instructionsDisplay = document.createElement('p');
      instructionsDisplay.textContent = `Instructions: ${recipe.instructions}`;
      recipeItem.appendChild(instructionsDisplay);
      
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.setAttribute('data-index', i);
      deleteButton.addEventListener('click', (event) => {
        event.preventDefault();
        const index = event.target.getAttribute('data-index');
        storedRecipes.splice(index, 1);
        localStorage.setItem('recipes', JSON.stringify(storedRecipes));
        recipeItem.remove();
      });
      recipeItem.appendChild(deleteButton);
      
      recipeList.appendChild(recipeItem);
    }
    recipeViewContainer.appendChild(recipeList);
  }
  
  
}