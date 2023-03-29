import { searchIngredients, getIngredientNutrition } from "./spoonacular.js";

export function createRecipeForm() {
  const recipeFormContainer = document.createElement("div");
  recipeFormContainer.classList.add("makeYourRecipeContainer");

  const title = document.createElement("h2");
  title.textContent = "Make your recipe";

  const form = document.createElement("form");

  const nameLabel = document.createElement("label");
  nameLabel.textContent = "Recipe Name: ";
  const nameInput = document.createElement("input");
  nameInput.setAttribute("name", "recipeName");
  nameInput.setAttribute("required", true);
  form.appendChild(nameLabel);
  form.appendChild(nameInput);

  const ingredientsLabel = document.createElement("label");
  ingredientsLabel.textContent = "Ingredients: ";
  const ingredientsContainer = document.createElement("div");
  const ingredientsSelect = document.createElement("select");
  ingredientsSelect.setAttribute("name", "recipeIngredients");
  ingredientsSelect.setAttribute("required", true);
  const defaultOption = document.createElement("option");
  defaultOption.disabled = true;
  defaultOption.selected = true;
  defaultOption.textContent = "Select an ingredient...";
  ingredientsSelect.appendChild(defaultOption);
  const searchInput = document.createElement("input");
  searchInput.setAttribute("type", "text");
  searchInput.setAttribute("placeholder", "Search for an ingredient...");
  searchInput.addEventListener("input", async () => {
    const query = searchInput.value.trim();
    if (query.length >= 3) {
      const results = await searchIngredients(query);
      const options = results.map((result) => {
        const option = document.createElement("option");
        option.value = result.id;
        option.textContent = result.name;
        return option;
      });
      ingredientsSelect.innerHTML = "";
      ingredientsSelect.appendChild(defaultOption);
      options.forEach((option) => {
        ingredientsSelect.appendChild(option);
      });
    } else {
      ingredientsSelect.innerHTML = "";
      ingredientsSelect.appendChild(defaultOption);
    }
  });
  ingredientsContainer.appendChild(searchInput);
  ingredientsContainer.appendChild(ingredientsSelect);
  form.appendChild(ingredientsLabel);
  form.appendChild(ingredientsContainer);

  const nutrientsContainer = document.createElement("div");
  nutrientsContainer.classList.add("nutrientsContainer");
  form.appendChild(nutrientsContainer);

  const instructionsLabel = document.createElement("label");
  instructionsLabel.textContent = "Instructions: ";
  const instructionsTextarea = document.createElement("textarea");
  instructionsTextarea.setAttribute("name", "recipeInstructions");
  instructionsTextarea.setAttribute("required", true);
  form.appendChild(instructionsLabel);
  form.appendChild(instructionsTextarea);

  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";

  // Define variables outside of the event listener
  let recipeNameDisplay, ingredientsDisplay, instructionsDisplay;

  // Function to get nutrient data for selected ingredient
  async function getIngredient(ingredientId) {
    const ingredient = await searchIngredients(ingredientId);
    const nutrition = await getIngredientNutrition(ingredient.id);
    return {
      id: ingredient.id,
      name: ingredient.name,
      nutrition: nutrition,
    };
  }

  saveButton.addEventListener("click", async (event) => {
    event.preventDefault();
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const recipeName = nameInput.value;
    const ingredientId = ingredientsSelect.value;
    const recipeInstructions = instructionsTextarea.value;

    const selectedIngredient = await getIngredient(ingredientId);

    const newRecipe = {
      name: recipeName,
      ingredient: selectedIngredient,
      instructions: recipeInstructions,
    };

    storedRecipes.push(newRecipe);
    localStorage.setItem("recipes", JSON.stringify(storedRecipes));
    
    // Display saved recipe on the page
    recipeNameDisplay.textContent = recipeName;
    ingredientsDisplay.innerHTML = `<p><strong>${selectedIngredient.name}</strong></p><ul><li>Calories: ${selectedIngredient.nutrition.calories}</li><li>Protein: ${selectedIngredient.nutrition.protein}</li><li>Fat: ${selectedIngredient.nutrition.fat}</li><li>Carbs: ${selectedIngredient.nutrition.carbs}</li></ul>`;
    instructionsDisplay.textContent = recipeInstructions;
    
    // Reset form
    nameInput.value = "";
    searchInput.value = "";
    ingredientsSelect.innerHTML = "";
    ingredientsSelect.appendChild(defaultOption);
    instructionsTextarea.value = "";
  });

  form.appendChild(saveButton);
  
  recipeFormContainer.appendChild(title);
  recipeFormContainer.appendChild(form);
  
  // Display saved recipe
  const recipeDisplayContainer = document.createElement("div");
  recipeDisplayContainer.classList.add("recipeDisplayContainer");
  
  const savedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
  savedRecipes.forEach((recipe) => {
  const recipeName = document.createElement("h3");
  recipeName.textContent = recipe.name;
  recipeDisplayContainer.appendChild(recipeName);
  const ingredients = document.createElement("div");
  ingredients.innerHTML = `<p><strong>${recipe.ingredient.name}</strong></p><ul><li>Calories: ${recipe.ingredient.nutrition.calories}</li><li>Protein: ${recipe.ingredient.nutrition.protein}</li><li>Fat: ${recipe.ingredient.nutrition.fat}</li><li>Carbs: ${recipe.ingredient.nutrition.carbs}</li></ul>`;
  recipeDisplayContainer.appendChild(ingredients);
  
  const instructions = document.createElement("p");
  instructions.textContent = recipe.instructions;
  recipeDisplayContainer.appendChild(instructions);
  
  // Store variables for later use in event listener
  recipeNameDisplay = recipeName;
  ingredientsDisplay = ingredients;
  instructionsDisplay = instructions;
});

recipeFormContainer.appendChild(recipeDisplayContainer);

return recipeFormContainer;
}  
