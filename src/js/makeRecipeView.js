export function makeRecipeView(callback = () => {}) {
  const recipeViewContainer = document.createElement('div');
  const title = document.createElement('h2');
  title.textContent = 'Your Recipes';

  const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
  if (storedRecipes.length === 0) {
    const message = document.createElement('h3');
    message.classList.add('notRecipeYet')
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

      // Retrieve recipe information from Spoonacular API
      const API_KEY = 'ee213066538049feac473b5f43e9868a';
      const ingredients = encodeURIComponent(recipe.ingredients);
      const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${API_KEY}&number=1`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const recipeImage = document.createElement('img');
          recipeImage.src = data[0].image;
          recipeItem.appendChild(recipeImage);
        })
        .catch((error) => console.error(error));

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

      // Call the callback function and pass in the recipe name,
      // ingredients display, and instructions display as arguments
      callback(recipe.name, ingredientsDisplay, instructionsDisplay);
    }
    recipeViewContainer.appendChild(recipeList);
  }
  return recipeViewContainer;
}