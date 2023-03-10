const recipeContainer = document.getElementById('recipe-container');

const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get('id');

fetch(`https://my-api.com/recipes/${recipeId}`)
  .then(response => response.json())
  .then(data => {
    const recipe = data.recipe;

    const recipeHtml = `
      <div class="recipe">
        <h2>${recipe.name}</h2>
        <p>${recipe.description}</p>
        <ul>
          ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
        <ol>
          ${recipe.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
        </ol>
      </div>
    `;

    recipeContainer.innerHTML = recipeHtml;
  });