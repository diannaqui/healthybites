export function makeRecipeView(recipeName, recipeIngredients, recipeInstructions) {
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
  
    const recipeItem = document.createElement("div");
  
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("data-index", i);
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      const index = event.target.getAttribute("data-index");
      storedRecipes.splice(index, 1);
      localStorage.setItem("recipes", JSON.stringify(storedRecipes));
      recipeItem.remove();
    });
  
    recipeItem.appendChild(deleteButton);
    recipeContainer.appendChild(recipeItem);
  
    return recipeContainer;
  }
  