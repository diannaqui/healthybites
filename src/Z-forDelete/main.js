import { InspirationalQuote } from "./quote";
import { loadHeaderFooter } from "./utils";
import { testimonial } from "./testimonial";
import RecipeListingSide from "./RecipeListingSide.mjs"
import ExternalServices from "./ExternalServices.mjs";
import { newsletterTemplate } from "./newsletter";

// Display header and footer on the main page
loadHeaderFooter();

// Four recipes on the right side on main
const dataSource = new ExternalServices();
const element = document.querySelector(".recipeContainer");
const listing = new RecipeListingSide(dataSource, element);

listing.init();

// Display testimonial on the main page
testimonial();

// Display newsletter on the main page
newsletterTemplate();

// Quote on main 
const quote = new InspirationalQuote();
quote.getQuote();