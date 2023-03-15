import { renderListWithTemplate, activePage } from "./utils";
import RecipeDetails from "./recipePageDetails";
import ExternalServices from "./ExternalServices.mjs";
import spoon from "../images/sp2.webp"




export function recipeCardTemplateNoList(num) {
    return `<div class="container">
                <h2>Coming SOON</h2>
                <img src="${spoon}" alt=Spoons Image>
                <h4>more Recipes</h4>
            </div>`;
}

export function recipeCardTemplate(list) {
    return `<div class="container">
                    <h2>${list[0].title}</h2>
                    <img src="${list[0].image}" alt=Recipe Image for ${list[0].title}>
                    <div class="divInfo">
                        <h4>${list[0].readyInMinutes} min</h4>
                        <h4>Servings: ${list[0].servings}</h4>
                    </div>
                    <button class="buttonSide" id=${list[0].id}>Recipe</button>
            </div>
    `;
}
  
function getType() {
    const type = ["dessert", "drink", "main course", "breakfast"];
    const selectType = Math.floor(Math.random() * 4);
   
    return type[selectType];
}

export default class RecipeListingSide { 
    constructor(dataSource, listElement) {
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        let num = 0;
        for (let i=0; i<4; i++) {
            const list = await this.dataSource.getRandom(getType());
            if (list) { this.renderList(list) }
            else {
                num++;
                renderListWithTemplate(recipeCardTemplateNoList(num), this.listElement, list);
            }
            
        }

        let recipeDetail = document.querySelectorAll(".buttonSide");

        recipeDetail.forEach( button => {
            button.addEventListener("click", activePage.bind(null,".mainPage", ".recipeDetails"));
            button.addEventListener("click", function(event) {
                const dataSource = new ExternalServices();
                const element = document.querySelector(".renderRecipeDetails");
                const goToDetails = new RecipeDetails(dataSource,element, event.target.id);
                console.log(event.target.id);
                goToDetails.init(); 
            }) 
        })
    }

    renderList(list) {
        renderListWithTemplate(recipeCardTemplate(list), this.listElement, list);
      }
}