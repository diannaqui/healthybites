import { InspirationalQuote } from "./quote.js";
import { testimonial } from "./testimonial.js";
import RecipeListingSide from "./RecipeListingSide.mjs"
import ExternalServices from "./ExternalServices.mjs";
import heroImg from "../images/hero-image.webp"
import mealtypeSection from "./mealtypeSection.js";
import { newsletter } from "./newsletter.js"

function mainContent() {

    // main div in mainPage
    const mainDivContainer = document.createElement('div');
    mainDivContainer.classList.add('mainCantainer');

    // children of mainPage

    // first child mainPage - Hero Image
    const heroImage = document.createElement('div');
    heroImage.classList.add('hero');
    heroImage.innerHTML = `
        <img src=${heroImg} alt="Spoons Image">
        <h1 class="titleHero">Love Life</h1>
        `

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
        
        const listing = new RecipeListingSide(dataSource,1); // 2 is the amount of random images that we want to render
        containerRecipes.appendChild(await listing.init());    

    }
    renderRecipeSide(containerRecipes);

    mainDivContainer.appendChild(heroImage);
    mainDivContainer.appendChild(mealtypeSection())
    mainDivContainer.appendChild(containerRecipes);

    return mainDivContainer;
    }

export default mainContent;