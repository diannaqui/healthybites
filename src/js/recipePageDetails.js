import ShoppingList from './shoppingList.js';
import CuisineDiets from './CuisineDietsSection.js';
import IntructionsDetails from './InstructionsDetails.js';
import GeneralInformationDetailPage from './GeneralInformationDetailPage.js';

export default class RecipeDetails {
    constructor(dataSource, idSelected) {
        this.dataSource = dataSource;
        this.idSelected = idSelected;
        this.listRecipeDetails = '';
        this.shopping = new ShoppingList();
        this.infoCuisineDiets = new CuisineDiets();
        this.instructions = new IntructionsDetails();
        this.general = new GeneralInformationDetailPage();
    }

    async init() {
        
        // div father call divRecipeDetails
        const divRecipeDetails = document.createElement('div');
        divRecipeDetails.classList.add('pageDetails');

        const listRecipeDetails = await this.dataSource.getRecipeByIdInformation(this.idSelected);
        
            // Title - child of divRecipeDetails
            const titleRecipe = document.createElement('h1');
            titleRecipe.classList.add('titleRecipe');
            titleRecipe.textContent = listRecipeDetails.title;

            // Image - child of divRecipeDetails
            const containerInfo = document.createElement('div');
            containerInfo.classList.add('containerInfo');
                const containerImg = document.createElement('div');
                containerImg.classList.add('containerImg');
                    const imageRecipe = document.createElement('img');
                    imageRecipe.classList.add('imageRecipe');
                    imageRecipe.src = listRecipeDetails.image;
                    containerImg.appendChild(imageRecipe);                                              // IMAGE
                    containerImg.appendChild(this.general.generalInfo(listRecipeDetails));              // READY IN - SERVINGS
            containerInfo.appendChild(containerImg);                                                    // IMAGE  /  READY IN - SERVINGS
            containerInfo.appendChild(this.infoCuisineDiets.recipeCuisineDiet(listRecipeDetails));      // CUISINES - DIETS

            const links = document.createElement('div');
            links.classList.add('links');
                links.appendChild(this.general.nutrientsPerServing(this.idSelected));                   // NUTRIENTS
                links.appendChild(this.general.print(this.idSelected));                                 // PRINT CARD

        divRecipeDetails.appendChild(titleRecipe);                                                      // TITLE
        divRecipeDetails.appendChild(containerInfo);
        divRecipeDetails.appendChild(links);

            const containerIngredients = document.createElement('div');
            containerIngredients.classList.add('containerList');

                const divShoppingOut = document.createElement('div');
                divShoppingOut.classList.add('shoppingListOut');
                divShoppingOut.appendChild(this.shopping.displayShoppingList(divShoppingOut));
                containerIngredients.appendChild(this.instructions.instructionsRecipe(listRecipeDetails, divShoppingOut)); // INSTRUCTIONS
                containerIngredients.appendChild(divShoppingOut);                                       // SHOPPING LIST
        
        divRecipeDetails.appendChild(containerIngredients);
        return divRecipeDetails;
    }

    reloadDiv(divShoppingOut) {
        divShoppingOut.innerHTML = '';
        divShoppingOut.appendChild(this.shopping.displayShoppingList(divShoppingOut));
     }
}