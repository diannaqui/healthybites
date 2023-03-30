export async function createRecipeForm() {
  const recipeFormContainer = document.createElement('div');
  recipeFormContainer.classList.add("makeYourRecipeContainer")
  const title = document.createElement('h2');
  title.textContent = 'Get recipe information';
  const form = document.createElement('form');

  const idLabel = document.createElement('label');
  idLabel.textContent = 'Recipe ID: ';
  const idInput = document.createElement('input');
  idInput.setAttribute('name', 'recipeId');
  idInput.setAttribute('required', true);
  form.appendChild(idLabel);
  form.appendChild(idInput);

  const saveButton = document.createElement('button');
  saveButton.textContent = 'Get recipe information';

  // Define variables outside of the event listener
  let recipeDisplay;

  saveButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const recipeId = idInput.value;
    const recipeData = await getRecipeInformation(recipeId);
    if (recipeData) {
      const recipeName = recipeData.title;
      const recipeIngredients = recipeData.extendedIngredients.map(ingredient => ingredient.original).join('\n');
      const recipeInstructions = recipeData.instructions;
      const recipeNutrients = recipeData.nutrition ? recipeData.nutrition.nutrients : null;
      const recipeImage = recipeData.image;
  
      const newRecipe = {
        name: recipeName,
        ingredients: recipeIngredients,
        instructions: recipeInstructions,
        nutrients: recipeNutrients,
        image: recipeImage, // add image URL to recipe object
      };
  
      // add the new recipe to the stored recipes
      let storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
      storedRecipes.push(newRecipe);
      localStorage.setItem('recipes', JSON.stringify(storedRecipes));

      recipeDisplay = document.createElement('div');
  
      // create and add image element to recipe display
      const recipeImageDisplay = document.createElement('img');
      recipeImageDisplay.src = newRecipe.image;
      recipeDisplay.appendChild(recipeImageDisplay);
  
      const recipeNameDisplay = document.createElement('p');
      recipeNameDisplay.textContent = `Recipe Name: ${newRecipe.name}`;
      recipeDisplay.appendChild(recipeNameDisplay);
    
      const ingredientsDisplay = document.createElement('p');
      ingredientsDisplay.textContent = `Ingredients: ${newRecipe.ingredients}`;
      recipeDisplay.appendChild(ingredientsDisplay);
    
      const instructionsDisplay = document.createElement('p');
      instructionsDisplay.innerHTML = `Instructions: ${newRecipe.instructions.replace(/<li><li>/g, '<br>')}`;
      recipeDisplay.appendChild(instructionsDisplay);
      
      if (recipeNutrients) {
        const nutrientsDisplay = document.createElement('p');
        nutrientsDisplay.textContent = `Nutrients: ${JSON.stringify(newRecipe.nutrients)}`;
        recipeDisplay.appendChild(nutrientsDisplay);
      }
  
      recipeFormContainer.appendChild(recipeDisplay);
    } else {
      // handle error or display message that recipe is not found
    }
  });
  
  

  const deleteAllButton = document.createElement('button');
  deleteAllButton.textContent = 'Delete Recipe';
  deleteAllButton.addEventListener('click', (event) => {
    event.preventDefault();
    recipeDisplay.remove();
  });

   //define a container for the buttons
   const buttonsContainer = document.createElement('div');
   buttonsContainer.classList.add('buttonsContainer');
   //add buttons to container
   buttonsContainer.appendChild(saveButton);
   buttonsContainer.appendChild(deleteAllButton);
   //add container to form
   form.appendChild(buttonsContainer);
   
   recipeFormContainer.appendChild(title);
   form.appendChild(buttonsContainer);
   recipeFormContainer.appendChild(form);

  
  return recipeFormContainer;

  async function getRecipeInformation(id) {
    const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=ee213066538049feac473b5f43e9868a`);
    const data = await response.json();
    return data;
  }
}
function getStoredRecipes() {
  return JSON.parse(localStorage.getItem('recipes')) || [];
}

function getRecipeData() {
  const storedRecipes = getStoredRecipes();
  return storedRecipes.map(recipe => {
    return {
      name: recipe.name,
      ingredients: recipe.ingredients,
      nutrients: recipe.nutrients,
      image: recipe.image,
    };
  });
}

export function makeRecipeView(callback = () => {}) {
  const recipeViewContainer = document.createElement('div');
  const title = document.createElement('h2');
  title.textContent = 'Your Recipes';

  const recipeData = getRecipeData();

  if (recipeData.length === 0) {
    const message = document.createElement('p');
    message.textContent = 'You have no saved recipes yet.';
    recipeViewContainer.appendChild(message);
  } else {
    const recipeList = document.createElement('ul');
    for (let i = 0; i < recipeData.length; i++) {
      const recipe = recipeData[i];
      const recipeItem = document.createElement('li');
      const recipeImage = document.createElement('img');
      recipeImage.src = recipe.image;
      recipeImage.alt = recipe.name;
      recipeImage.classList.add('recipe-image');
      recipeItem.appendChild(recipeImage);
      const recipeName = document.createElement('h3');
      recipeName.textContent = recipe.name;
      recipeItem.appendChild(recipeName);
      const ingredients = document.createElement('p');
      ingredients.textContent = recipe.ingredients;
      recipeItem.appendChild(ingredients);
      const nutrients = document.createElement('p');
      nutrients.textContent = JSON.stringify(recipe.nutrients);
      recipeItem.appendChild(nutrients);
      recipeList.appendChild(recipeItem);
    }
    recipeViewContainer.appendChild(recipeList);
  }

  callback(recipeViewContainer);
}