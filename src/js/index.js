import App from "./app.js";
import { createRecipeForm } from "./makeRecipe";

const base = document.querySelector("#root");
base.appendChild(App());


const recipeViewsContainer = document.createElement('div'); // create container element for recipe views

// Append the recipe form to the recipe views container
createRecipeForm(recipeViewsContainer);

// Append the recipe views container to the document body
document.body.appendChild(recipeViewsContainer);
