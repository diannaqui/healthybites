import { upperCase } from "./utils.js";

export default class CuisineDiets {
    constructor() {
    }

     // No cuisines of diets
     elseCuisineDiet(className, type) {
        const cuisinesDiv = document.createElement('div');
        cuisinesDiv.classList.add(className);
            const text1 = document.createElement('p');
            text1.innerHTML = `No ${type}`;
            cuisinesDiv.appendChild(text1);
        return cuisinesDiv;
    }

    // Cuisines - Diet - child of divRecipeDetails 
    recipeCuisineDiet(listRecipeDetails) {
        const cuisinesDiet = document.createElement('div');
        cuisinesDiet.classList.add('cuisinesDiet');

            const cuisinesDiv = document.createElement('div');
            cuisinesDiv.classList.add('cuisinesDiv');

                // Cuisines Title - child of cuisinesDiv
                const cuisinesRecipeTitle = document.createElement('h2');
                cuisinesRecipeTitle.classList.add('generalInfo');
                cuisinesRecipeTitle.textContent = 'Cuisines';
                cuisinesDiv.appendChild(cuisinesRecipeTitle)

            // Cuisines container - child of cuisinesDiet 
            if (listRecipeDetails.cuisines.length != 0) {     // Show only if there are cuisines 
                        // Cuisines List - child of cuisinesDiv
                        const cuisinesRecipeList = this.renderTemplateList(listRecipeDetails.cuisines, 'cuisinesRecipeList');
                        cuisinesDiv.appendChild(cuisinesRecipeList);    
            }
            else {
                cuisinesDiv.appendChild(this.elseCuisineDiet('dietsRecipeList', 'cuisines'));  
            }
            cuisinesDiet.appendChild(cuisinesDiv);  

            const dietsDiv = document.createElement('div');
            dietsDiv.classList.add('dietsDiv');
                // Diets Title - child of dietsDiv
                const dietsRecipeTitle = document.createElement('h2');
                dietsRecipeTitle.classList.add('generalInfo');
                dietsRecipeTitle.textContent = 'Diets';
                dietsDiv.appendChild(dietsRecipeTitle); 

            // Diets container - child of cuisinesDiet 
            if (listRecipeDetails.diets.length != 0) { 
                    // Diets List - child of dietsDiv
                    const dietsRecipeList = this.renderTemplateList(listRecipeDetails.diets, 'dietsRecipeList');
                    dietsDiv.appendChild(dietsRecipeList);   
            }
            else {
                dietsDiv.appendChild(this.elseCuisineDiet('dietsRecipeList', 'diets'));  
            }
            cuisinesDiet.appendChild(dietsDiv);  

        return cuisinesDiet;
    }

    renderTemplateList(list, className) {
        const ul = document.createElement('ul');
        ul.classList.add(className)

        list.forEach(item => {
            const li = document.createElement('li');
            const element = document.createElement('p');
            const nameIngredient = upperCase(item);
            element.textContent = `${nameIngredient}`;
            li.appendChild(element);
            ul.appendChild(li);
        })
        return ul;
    }
}