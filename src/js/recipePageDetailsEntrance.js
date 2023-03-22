import RecipeDetails from "./recipePageDetails.js";
import ExternalServices from "./ExternalServices.mjs";

function RecipePageDetailsEntrance(id) {

    const detailsPage = document.createElement('div');
    detailsPage.classList.add('renderRecipeDetails');


    async function content(detailsPage) {
        const dataSource = new ExternalServices();
        const goRecipeDetails = new RecipeDetails(dataSource, id);

        detailsPage.appendChild(await goRecipeDetails.init());
    }

    content(detailsPage);

return detailsPage;

}

export default RecipePageDetailsEntrance;