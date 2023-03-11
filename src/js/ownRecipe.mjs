const form = document.getElementById('recipe-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const recipeName = document.getElementById('recipe-name').value;
  const ingredients = document.getElementById('ingredients').value;
  const instructions = document.getElementById('instructions').value;

  const recipeData = {
    name: recipeName,
    ingredients: ingredients.split('\n'),
    instructions: instructions.split('\n')
  };

  console.log(recipeData);
});