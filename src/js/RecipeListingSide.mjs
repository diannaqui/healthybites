import spoon from "../images/sp2.webp";

// Show this HTML on the main page when no API is use / API expire / API problem and etc.
export function recipeCardTemplateNoList(num) {
    return `<div class="container">
                <h2>Coming SOON</h2>
                <img src=${spoon} alt="Spoons Image">
                <h4>more Recipes</h4>
            `;
}

// Generate HTML on the main page
export function recipeCardTemplate(list) {
    return `
                    <h2>${list[0].title}</h2>
                    <img src="${list[0].image}" alt=Recipe Image for ${list[0].title}>
                    <div class="divInfo">
                        <h4>${list[0].readyInMinutes} min</h4>
                        <h4>Servings: ${list[0].servings}</h4>
                    </div>
                    
            
    `;
}

// Randomly choose 1 of the 4 food types from the main page
function getType() {
    const type = ["dessert", "drink", "main course", "breakfast"];
    const selectType = Math.floor(Math.random() * 4);
   
    return type[selectType];
}

// Display 4 recipes on the right side of the main page
export default class RecipeListingSide { 
    constructor(dataSource) {
        this.dataSource = dataSource;
    }

    async init() {
        const listElement = document.createElement("div");
        listElement.classList.add("recipeContainer");

        for (let i=0; i<2; i++) {

            const listContainer = document.createElement("div");
            listContainer.classList.add("container");

            const list = await this.dataSource.getRandom(getType());
            if (list) { 
                listContainer.innerHTML = recipeCardTemplate(list);
                listElement.appendChild(listContainer);

                const a = document.createElement('a');
                a.href = `#/src/js/recipePageDetailsEntrance?idSelected=${list[0].id}`;    //hash segment
                a.textContent = 'Recipe';
                listContainer.appendChild(a);

            } else {
                listContainer.innerHTML = recipeCardTemplateNoList();        
                listElement.appendChild(listContainer);      
            }
            
        }
        return listElement;
    }
}