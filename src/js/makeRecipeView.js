export function createRecipeView(recipe, index) {
  const recipeView = document.createElement('div');
  recipeView.setAttribute('data-index', index);

  const title = document.createElement('h3');
  title.textContent = recipe.name;
  recipeView.appendChild(title);

  const ingredientsList = document.createElement('ul');
  recipe.ingredients.split('\n').forEach(ingredient => {
    const listItem = document.createElement('li');
    listItem.textContent = ingredient.trim();
    ingredientsList.appendChild(listItem);
  });
  recipeView.appendChild(ingredientsList);

  const instructions = document.createElement('p');
  instructions.textContent = recipe.instructions;
  recipeView.appendChild(instructions);

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
