import spoon from "../images/sp2.webp";

// Show this HTML on the main page when no API is use / API expire / API problem and etc.
export function recipeCardTemplateNoList() {
    return `
            <h3>Recipes Coming SOON</h3>
            <img src=${spoon} alt="Spoons Image">
            `;
}

// Generate HTML on the main page
export function recipeCardTemplate(list) {
    return `
        <h3>${list[0].title}</h3>
        <div class='recipeCardImgContainer'>
            <img src="${list[0].image}" alt=Recipe Image for ${list[0].title}>
        </div>
        <div class="divInfo">
            <p>Estimated time: ${list[0].readyInMinutes} min</p>
            <p>Servings: ${list[0].servings}</p>
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
    constructor(dataSource, amountOfImages) {
        this.dataSource = dataSource;
        this.amountOfImages = amountOfImages
    }

    async init() {
        const listElement = document.createElement("div");
        listElement.classList.add("recipeContainerSide");

        for (let i=0; i<this.amountOfImages; i++) {

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