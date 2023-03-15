
export default class RecipeDetails {
    constructor(dataSource, element, idSelected) {
        this.dataSource = dataSource;
        this.element = element;
        this.idSelected = idSelected;
    }

    async init() {
        
         const listRecipeDetails = await this.dataSource.getRecipeById(this.idSelected);
         if (listRecipeDetails) {
            console.log(listRecipeDetails);
            document.querySelector(".renderRecipeDetails").textContent = `Calorias: ${listRecipeDetails.calories}`;
         }

    }
}