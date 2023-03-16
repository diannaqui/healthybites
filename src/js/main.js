import { InspirationalQuote } from "./quote";
import { loadHeaderFooter } from "./utils";
import { testimonial } from "./testimonial";
import RecipeListingSide from "./RecipeListingSide.mjs"
import ExternalServices from "./ExternalServices.mjs";



// Four recipes on the right side on main
let title =  window.location.pathname 
console.log(title.length)
if (title == "index.html" || title.length < 2){
const dataSource = new ExternalServices();
const element = document.querySelector(".recipeContainer");
const listing = new RecipeListingSide(dataSource, element);

listing.init();


testimonial();


// Quote on main 
const quote = new InspirationalQuote();
quote.getQuote();
}

loadHeaderFooter();



