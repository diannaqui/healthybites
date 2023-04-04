import { InspirationalQuote } from "./quote.js";
import { testimonial } from "./testimonial.js";
import RecipeListingSide from "./RecipeListingSide.mjs"
import ExternalServices from "./ExternalServices.mjs";
import heroImg from "../images/heroImage1.webp"
import mealtypeSection from "./mealtypeSection.js";
import { newsletter } from "./newsletter.js"
import { displaySearchBar } from "./searchBar.js"

function mainContent() {

    // main div in mainPage
    const mainDivContainer = document.createElement('div');
    mainDivContainer.classList.add('mainCantainer');

    // New container for hero image and search bar
    const heroContainer = document.createElement("div");
    heroContainer.classList.add("heroContainer");
    heroContainer.innerHTML = `<img src=${heroImg} alt="someone is holding a bowl of salad">`
    
    // Search bar
    heroContainer.appendChild(displaySearchBar());

    // second child mainPage - Content
    const containerRecipes = document.createElement('div');
    containerRecipes.classList.add('recipeRightSide');

    // children of recipeRightSide

    // first child recipeRightSide - Testimonials / Quote / Four Links Recipes / Mission
    const divContainer = document.createElement('div');
    divContainer.id = 'testimonialsMainContainer'

    // Quote on main 
    async function renderQuote(divContainer) {
        const quote = new InspirationalQuote();
        divContainer.appendChild(await quote.getQuote())
    }
    renderQuote(divContainer);

    // testimonial on main
    divContainer.appendChild(testimonial());

    // Newsletter on main page
    divContainer.appendChild(newsletter());

    containerRecipes.appendChild(divContainer);

    // second child recipeRightSide - Four recipes on the right side on main
    async function renderRecipeSide(containerRecipes) {
        const dataSource = new ExternalServices();
        const listing = new RecipeListingSide(dataSource,2); // 2 is the amount of random images that we want to render
        containerRecipes.appendChild(await listing.init());    

    }
    renderRecipeSide(containerRecipes);

    mainDivContainer.appendChild(heroContainer);
    mainDivContainer.appendChild(mealtypeSection())
    mainDivContainer.appendChild(containerRecipes);

    return mainDivContainer;
}

export default mainContent;