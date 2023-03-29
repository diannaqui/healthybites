
export function createRecipeForm() {
  const recipeFormContainer = document.createElement('div');
  recipeFormContainer.classList.add("makeYourRecipeContainer")
  const title = document.createElement('h2');
  title.textContent = 'Make your recipe';
  const form = document.createElement('form');

  const nameLabel = document.createElement('label');
  nameLabel.textContent = 'Recipe Name: ';
  const nameInput = document.createElement('input');
  nameInput.setAttribute('name', 'recipeName');
  nameInput.setAttribute('required', true);
  form.appendChild(nameLabel);
  form.appendChild(nameInput);

  const ingredientsLabel = document.createElement('label');
  ingredientsLabel.textContent = 'Ingredients: ';
  const ingredientsInput = document.createElement('input');
  ingredientsInput.setAttribute('name', 'recipeIngredients');
  ingredientsInput.setAttribute('required', true);
  const ingredientsDatalist = document.createElement('datalist');
  ingredientsDatalist.setAttribute('id', 'ingredientList');

  ingredientsInput.addEventListener('input', async () => {
    const query = ingredientsInput.value;
    const data = await getIngredients(query);
    const ingredientOptions = data.results.map(result => `<option value="${result.name}" data-id="${result.id}"></option>`).join('');
    ingredientsDatalist.innerHTML = ingredientOptions;
  });

  ingredientsLabel.appendChild(ingredientsInput);
  ingredientsLabel.appendChild(ingredientsDatalist);
  form.appendChild(ingredientsLabel);


  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save';

  // Define variables outside of the event listener
  let recipeNameDisplay, ingredientsDisplay, instructionsDisplay;

  saveButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const recipeName = nameInput.value;
    const recipeIngredients = [...ingredientsInput.value.split(',')];
    const recipeInstructions = instructionsTextarea.value;
    const newRecipe = {
      name: recipeName,
      ingredients: recipeIngredients,
      instructions: recipeInstructions,
    };
    storedRecipes.push(newRecipe);
    localStorage.setItem('recipes', JSON.stringify(storedRecipes));
    nameInput.value = '';
    ingredientsInput.value = '';
    instructionsTextarea.value = '';
  
    recipeNameDisplay = document.createElement('p');
    recipeNameDisplay.textContent = `Recipe Name: ${newRecipe.name}`;
    form.appendChild(recipeNameDisplay);
  
    for (const ingredient of newRecipe.ingredients) {
      const ingredientId = document.querySelector(`#ingredientList [value="${ingredient}"]`).getAttribute('data-id');
      const nutritionData = await getIngredientNutrition(ingredientId);
  
      const ingredientDisplay = document.createElement('p');
      ingredientDisplay.textContent = `${ingredient} - ${nutritionData.calories} calories`;
      form.appendChild(ingredientDisplay);
    }
  
    instructionsDisplay = document.createElement('p');
    instructionsDisplay.textContent = `Instructions: ${newRecipe.instructions}`;
  
    // Add data-index attribute to each display element
    const index = storedRecipes.length - 1;
    recipeNameDisplay.setAttribute('data-index', storedRecipes.length - 1);
    instructionsDisplay.setAttribute('data-index', storedRecipes.length - 1);
  
    form.appendChild(instructionsDisplay);
  });
  
  
  const deleteAllButton = document.createElement('button');
  deleteAllButton.textContent = 'Delete All';
  deleteAllButton.addEventListener('click', (event) => {
    event.preventDefault();
    localStorage.removeItem('recipes');
    form.querySelectorAll('[data-index]').forEach(element => {
      element.remove();
    });
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
   recipeFormContainer.appendChild(form);
   
  
  return recipeFormContainer;
}