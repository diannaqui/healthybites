import { InspirationalQuote } from "./quote";
import { loadHeaderFooter } from "./utils";
import { testimonial } from "./testimonial";
import RecipeListingSide from "./RecipeListingSide.mjs"
import ExternalServices from "./ExternalServices.mjs";


loadHeaderFooter();
// Four recipes on the right side on main
const dataSource = new ExternalServices();
const element = document.querySelector(".recipeContainer");
const listing = new RecipeListingSide(dataSource, element);

listing.init();


testimonial();


// Quote on main 
const quote = new InspirationalQuote();
quote.getQuote();


// not yet - correct
// const selectRecipe = document.querySelectorAll(".sideButton");
// if (selectRecipe) {
//     selectRecipe.forEach( function (item) {
//         document.getElementById(`${item.id}`).addEventListener("click", function () {
//             console.log(item.id)
//             renderTemplateDetails(item.id);
//           });
//     })
// }

