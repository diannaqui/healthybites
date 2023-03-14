import { renderListWithTemplate } from "./utils.js";

export function recipeCardTemplate(list) {
    return `<div class="container">
                <a href="/recipePageDetails/index.html">
                    <h2>${list[0].title}</h2>
                    <img src="${list[0].image}" alt=Recipe Image for ${list[0].title}>
                    <div class="divInfo">
                        <h4>${list[0].readyInMinutes} min</h4>
                        <h4>Servings: ${list[0].servings}</h4>
                    </div>
                </a>
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

        for (let i=0; i<4; i++) {
            const list = await this.dataSource.getRandom(getType());
            this.renderList(list)
        }
    }

    renderList(list) {
        renderListWithTemplate(recipeCardTemplate(list), this.listElement, list);
      }
}