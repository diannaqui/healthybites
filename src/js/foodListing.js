//  JS TO RENDER THE RECEPIES BY CATEGORY   {DINNER - BREAKFAST - DRINKS - MAIN COURSE}


import ProductListing from "./RecipeListingSide.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { loadHeaderFooter, getParam } from "./utils.js";
import { logProductCard } from "./QuickLook.mjs";
// import { getCategoryFromUrl, getCategoryName } from "./breadcrumb.js";

// getCategoryFromUrl();
// getCategoryName();
loadHeaderFooter();

const category = getParam("mealtype");

const dataSource = new ExternalServices();
const element = document.querySelector(".recipe-listing");
const listing = new ProductListing( dataSource, element, category);

logProductCard();

listing.listing();


// CONTINUE DOING 1) GET THE URL: SOLVE PROBLEM, 2) RENDER THE CONTENT, 3) ADD IMAGES TO THE SCECTION: CONSIDER DOING DINAMICALLY, 4) ASSIGN OTHER TASK YOURSELF.
