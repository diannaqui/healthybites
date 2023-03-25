export function makeRecipeView(recipeName, recipeIngredients, recipeInstructions, index) {
    const recipeView = document.createElement('div');
    recipeView.classList.add('recipe-view');
    
    const title = document.createElement('h2');
    title.textContent = recipeName;
    recipeView.appendChild(title);
    
    const ingredientsList = document.createElement('ul');
    const ingredientsArray = recipeIngredients.split('\n');
    for (const ingredient of ingredientsArray) {
      const li = document.createElement('li');
      li.textContent = ingredient;
      ingredientsList.appendChild(li);
    }
    recipeView.appendChild(ingredientsList);
    
    const instructionsList = document.createElement('ol');
    const instructionsArray = recipeInstructions.split('\n');
    for (const instruction of instructionsArray) {
      const li = document.createElement('li');
      li.textContent = instruction;
      instructionsList.appendChild(li);
    }
    recipeView.appendChild(instructionsList);
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', (event) => {
      event.preventDefault();
      const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
      storedRecipes.splice(index, 1);
      localStorage.setItem('recipes', JSON.stringify(storedRecipes));
      recipeView.remove();
    });
    recipeView.appendChild(deleteButton);
    
    return recipeView;
  }
  