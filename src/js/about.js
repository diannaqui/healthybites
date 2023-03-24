import ExternalServices from "./ExternalServices.mjs";
import RecipeListingSide from "./RecipeListingSide.mjs"
import heroAboutImg from "../images/about.jpeg"
const aboutSection = `
    <div class="container">
    <img src="${heroAboutImg}" alt="Our team image">

    <h2>About Healthy Bites</h2>
    <p>Healthy Bites is a recipe company that provides delicious and nutritious meal options for people who want to eat healthy without sacrificing taste. Our recipes are carefully crafted by our team of expert chefs and nutritionists to ensure that they are not only delicious, but also packed with the nutrients your body needs to thrive.</p>
    <p>At Healthy Bites, we believe that eating healthy doesn't have to be boring or tasteless. That's why we're committed to creating recipes that are both healthy and delicious, so you can enjoy your meals without feeling guilty.</p>
    <div/>
    `;


export default function aboutPage() {
     // main div in mainPage
    const mainDivContainer = document.createElement('div');
    mainDivContainer.classList.add('aboutCantainer');

    const containerRecipes = document.createElement('div');
    containerRecipes.classList.add('floatingImages');

    const about = document.createElement('div');
    about.classList.add('about');

    about.innerHTML = aboutSection
      // second child recipeRightSide - Four recipes on the right side on main
      async function renderRecipeSide(containerRecipes) {
        const dataSource = new ExternalServices();
        
        const listing = new RecipeListingSide(dataSource,8);
        containerRecipes.appendChild(about)
  
        containerRecipes.appendChild(await listing.init());  
    
    }

    renderRecipeSide(containerRecipes);  
    mainDivContainer.appendChild(containerRecipes);

    return mainDivContainer;

}
