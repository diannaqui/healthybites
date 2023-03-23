import RecipeNutrients from "./recipeNutrientsDetails.js";
import ExternalServices from "./ExternalServices.mjs";

function Nutrition(id) {

    const nutritionPage = document.createElement('div');
    nutritionPage.classList.add('renderRecipeNutrients');


    async function content(nutritionPage) {
        const dataSource = new ExternalServices();
        const goNutrientsDetails = new RecipeNutrients(dataSource, id);

        nutritionPage.appendChild(await goNutrientsDetails.init());
    }

    content(nutritionPage);

return nutritionPage;
}

export default Nutrition;