import {searchIngredients} from './spooncular';

export async function createRecipeForm() {
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
  const ingredientsTextarea = document.createElement('textarea');
  ingredientsTextarea.setAttribute('name', 'recipeIngredients');
  ingredientsTextarea.setAttribute('required', true);
  form.appendChild(ingredientsLabel);
  form.appendChild(ingredientsTextarea);

  const instructionsLabel = document.createElement('label');
  instructionsLabel.textContent = 'Instructions: ';
  const instructionsTextarea = document.createElement('textarea');
  instructionsTextarea.setAttribute('name', 'recipeInstructions');
  instructionsTextarea.setAttribute('required', true);
  form.appendChild(instructionsLabel);
  form.appendChild(instructionsTextarea);

  const searchLabel = document.createElement('label');
  searchLabel.textContent = 'Search for an ingredient: ';
  const searchInput = document.createElement('input');
  searchInput.setAttribute('type', 'search');
  searchInput.setAttribute('placeholder', 'e.g. chicken');
  const searchResults = document.createElement('div');
  searchResults.classList.add('searchResults');
  searchInput.addEventListener('input', async (event) => {
    const query = event.target.value;
    const results = await searchIngredients(query); // Use searchIngredients function here
    searchResults.innerHTML = '';
    results.forEach(result => {
      const resultElement = document.createElement('div');
      resultElement.classList.add('searchResult');
      resultElement.innerHTML = `
        <img src="${result.image}" alt="${result.name}">
        <span>${result.name}</span>
      `;
      resultElement.addEventListener('click', () => {
        const ingredientElement = document.createElement('div');
        ingredientElement.classList.add('ingredient');
        ingredientElement.innerHTML = `
          <img src="${result.image}" alt="${result.name}">
          <span>${result.name}</span>
          <input type="hidden" name="recipeIngredients" value="${result.id}">
          <span>Calories: ${result.nutrition.calories.toFixed(2)}</span>
          <span>Protein: ${result.nutrition.protein.toFixed(2)}g</span>
          <span>Fat: ${result.nutrition.fat.toFixed(2)}g</span>
          <span>Carbohydrates: ${result.nutrition.carbs.toFixed(2)}g</span>
        `;
        ingredientsTextarea.appendChild(ingredientElement);
        searchInput.value = '';
        searchResults.innerHTML = '';
      });
      searchResults.appendChild(resultElement);
    });
  });
  searchLabel.appendChild(searchInput);
  form.appendChild(searchLabel);
  form.appendChild(searchResults);

  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save';

  // Define variables outside of the event listener
  let recipeNameDisplay, ingredientsDisplay, instructionsDisplay;

  saveButton.addEventListener('click', (event) => {
    event.preventDefault();
    const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const recipe = {
      name: recipeNameDisplay.textContent,
      ingredients: ingredientsDisplay.innerHTML,
      instructions: instructionsDisplay.innerHTML
      };
      storedRecipes.push(recipe);
      localStorage.setItem('recipes', JSON.stringify(storedRecipes));
      recipeFormContainer.innerHTML = '<h2>Recipe saved successfully!</h2>';
      });
      
      form.appendChild(saveButton);
      
      recipeFormContainer.appendChild(title);
      recipeFormContainer.appendChild(form);
      
      // Create preview section
      const previewSection = document.createElement('div');
      previewSection.classList.add('previewSection');
      
      // Create recipe name preview
      const recipeNamePreview = document.createElement('h3');
      recipeNamePreview.textContent = 'Preview';
      previewSection.appendChild(recipeNamePreview);
      
      recipeNameDisplay = document.createElement('h4');
      previewSection.appendChild(recipeNameDisplay);
      
      // Create recipe ingredients preview
      const recipeIngredientsPreview = document.createElement('h4');
      recipeIngredientsPreview.textContent = 'Ingredients';
      previewSection.appendChild(recipeIngredientsPreview);
      
      ingredientsDisplay = document.createElement('div');
      previewSection.appendChild(ingredientsDisplay);
      
      // Create recipe instructions preview
      const recipeInstructionsPreview = document.createElement('h4');
      recipeInstructionsPreview.textContent = 'Instructions';
      previewSection.appendChild(recipeInstructionsPreview);
      
      instructionsDisplay = document.createElement('div');
      previewSection.appendChild(instructionsDisplay);
      
      recipeFormContainer.appendChild(previewSection);
      
      return recipeFormContainer;
      }
