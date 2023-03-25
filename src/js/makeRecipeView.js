export function makeRecipeView(recipeName, recipeIngredients, recipeInstructions, index) {
    const recipeContainer = document.createElement("div");
  
    const recipeNameDisplay = document.createElement("p");
    recipeNameDisplay.textContent = `Recipe Name: ${recipeName}`;
    recipeContainer.appendChild(recipeNameDisplay);
  
    const ingredientsDisplay = document.createElement("p");
    ingredientsDisplay.textContent = `Ingredients: ${recipeIngredients}`;
    recipeContainer.appendChild(ingredientsDisplay);
  
    const instructionsDisplay = document.createElement("p");
    instructionsDisplay.textContent = `Instructions: ${recipeInstructions}`;
    recipeContainer.appendChild(instructionsDisplay);
  
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("data-index", index);
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
      const index = event.target.getAttribute("data-index");
      storedRecipes.splice(index, 1);
      localStorage.setItem("recipes", JSON.stringify(storedRecipes));
      recipeContainer.remove();
    });
  
    recipeContainer.appendChild(deleteButton);
  
    return recipeContainer;
  }
  