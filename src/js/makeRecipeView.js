export function createRecipeView() {
  const recipeView = document.createElement('div');
  const title = document.createElement('h2');
  title.textContent = 'View your Recipe';
  
  recipeView.appendChild(title); 
  return recipeView;
}