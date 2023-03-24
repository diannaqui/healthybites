import ExternalServices from "./ExternalServices.mjs";

async function dataPrint(dataSource, id) {

    

    const listRecipeDetails = await dataSource.printRecipe(id);

    const image = document.createElement('img');
    image.classList.add('imageCard');
    image.src = listRecipeDetails;
    image.alt = 'Recipe Card';

    return image;
}

function Print(idSelected) {

    
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipeCard');

    async function content(recipeCard) {
        const dataSource = new ExternalServices();
        recipeCard.appendChild(await dataPrint(dataSource, idSelected));
    }

    content(recipeCard);
    return recipeCard;
}

export default Print;