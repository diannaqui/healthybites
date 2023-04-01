import App from "./app.js";
import { makeRecipeView } from "./makeRecipeView";

const base = document.querySelector("#root");
base.appendChild(App());


const recipeViewsContainer = document.createElement('div'); // create container element for recipe views

// Append the recipe form to the recipe views container
makeRecipeView(recipeViewsContainer);

// Append the recipe views container to the document body
document.body.appendChild(recipeViewsContainer);