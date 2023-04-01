
export default class CuisineDiets {
    constructor() {

    }


     // No cuisines of diets
     elseCuisineDiet(className, type) {
        const cuisinesDiv = document.createElement('div');
        cuisinesDiv.classList.add(className);
            const text1 = document.createElement('h3');
            text1.innerHTML = `No ${type}`;
            const text2 = document.createElement('h3');
            text2.innerHTML = `at the moment`;
            cuisinesDiv.appendChild(text1);
            cuisinesDiv.appendChild(text2);

            return cuisinesDiv;
    }

    // Cuisines - Diet - child of divRecipeDetails 
    recipeCuisineDiet(listRecipeDetails) {
        const cuisinesDiet = document.createElement('div');
        cuisinesDiet.classList.add('cuisinesDiet');

            // Cuisines container - child of cuisinesDiet 
            if (listRecipeDetails.cuisines.length != 0) {     // Show only if there are cuisines 
                const cuisinesDiv = document.createElement('div');
                cuisinesDiv.classList.add('cuisinesDiv');

                        // Cuisines Title - child of cuisinesDiv
                        const cuisinesRecipeTitle = document.createElement('h2');
                        cuisinesRecipeTitle.classList.add('generalInfo');
                        cuisinesRecipeTitle.textContent = 'Cuisines';
                        cuisinesDiv.appendChild(cuisinesRecipeTitle);   

                        // Cuisines List - child of cuisinesDiv
                        const cuisinesRecipeList = this.renderTemplateList(listRecipeDetails.cuisines, 'cuisinesRecipeList');
                        cuisinesDiv.appendChild(cuisinesRecipeList);    

                cuisinesDiet.appendChild(cuisinesDiv);  
            }
            else {
                cuisinesDiet.appendChild(this.elseCuisineDiet('dietsDiv', 'cuisines'));  
            }

            // Diets container - child of cuisinesDiet 
            if (listRecipeDetails.diets.length != 0) { 
                const dietsDiv = document.createElement('div');
                dietsDiv.classList.add('dietsDiv');

                    // Diets Title - child of dietsDiv
                    const dietsRecipeTitle = document.createElement('h2');
                    dietsRecipeTitle.classList.add('generalInfo');
                    dietsRecipeTitle.textContent = 'Diets';
                    dietsDiv.appendChild(dietsRecipeTitle);   

                    // Diets List - child of dietsDiv
                    const dietsRecipeList = this.renderTemplateList(listRecipeDetails.diets, 'dietsRecipeList');
                    dietsDiv.appendChild(dietsRecipeList);   

                cuisinesDiet.appendChild(dietsDiv);  
            }
            else {
                cuisinesDiet.appendChild(this.elseCuisineDiet('dietsDiv', 'diets'));  
            }
        return cuisinesDiet;
    }

    renderTemplateList(list, className) {
        const ul = document.createElement('ul');
        ul.classList.add(className)

        list.forEach(item => {
            const li = document.createElement('li');
            const element = document.createElement('p');
            element.textContent = `${item}`;
            li.appendChild(element);
            ul.appendChild(li);
        })
        return ul;
    }

}