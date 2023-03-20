import { InspirationalQuote } from "./quote";
import { loadHeaderFooter } from "./utils";
import { testimonial } from "./testimonial";
import RecipeListingSide from "./RecipeListingSide.mjs"
import ExternalServices from "./ExternalServices.mjs";
import initRouter from "./router.js"


// Four recipes on the right side on main
let title =  window.location.pathname 
function loadAfterRouter() {
    // this function makes sure that this code will be runned after the router makes his job
    if (title == "index.html" || title.length < 2){
      const dataSource = new ExternalServices();
      const element = document.querySelector(".recipeContainer");
      const listing = new RecipeListingSide(dataSource, element);
      listing.init();
      testimonial();
      const quote = new InspirationalQuote();
      quote.getQuote();
      
    }
  }

window.addEventListener("load", loadAfterRouter);
  






// Quote on main 


loadHeaderFooter();




initRouter();