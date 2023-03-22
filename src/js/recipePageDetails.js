import nutrients from "../images/sp2.webp"


export default class RecipeDetails {
    constructor(dataSource, idSelected) {
        this.dataSource = dataSource;
        this.idSelected = idSelected;
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
                divRecipeDetails.appendChild(titleRecipe);  

                // Image - child of divRecipeDetails
                const imageRecipe = document.createElement('img');
                imageRecipe.classList.add('imageRecipe');
                imageRecipe.src = listRecipeDetails.image;
                divRecipeDetails.appendChild(imageRecipe); 

                // General Info - child of divRecipeDetails 
                const generalInfoRecipeDiv = document.createElement('div');
                generalInfoRecipeDiv.classList.add('generalInfoRecipe');

                        // Ready in - child of generalInfoRecipeDiv
                        const readyIn = document.createElement('h3');
                        readyIn.classList.add('generalInfo');
                        readyIn.innerHTML = `Ready In: ${listRecipeDetails.readyInMinutes}min`;
                        generalInfoRecipeDiv.appendChild(readyIn); 

                        // Servings - child of generalInfoRecipeDiv
                        const servings = document.createElement('h3');
                        servings.classList.add('generalInfo');
                        servings.innerHTML = `Servings: ${listRecipeDetails.servings}`;
                        generalInfoRecipeDiv.appendChild(servings);  

                divRecipeDetails.appendChild(generalInfoRecipeDiv);  

                
                // Cuisines - Diet - child of divRecipeDetails 
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
                                const cuisinesDiv = document.createElement('div');
                                cuisinesDiv.classList.add('dietsDiv');
                                    const cuisinesDivText1 = document.createElement('h3');
                                    cuisinesDivText1.innerHTML = `No cuisines`;
                                    const cuisinesDivText2 = document.createElement('h3');
                                    cuisinesDivText2.innerHTML = `at the moment`;
                                    cuisinesDiv.appendChild(cuisinesDivText1);
                                    cuisinesDiv.appendChild(cuisinesDivText2);
                                cuisinesDiet.appendChild(cuisinesDiv);  
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
                                const dietsDiv = document.createElement('div');
                                dietsDiv.classList.add('dietsDiv');
                                    const dietsDivText1 = document.createElement('h3');
                                    dietsDivText1.innerHTML = `No diets`;
                                    const dietsDivText2 = document.createElement('h3');
                                    dietsDivText2.innerHTML = `at the moment`;
                                    dietsDiv.appendChild(dietsDivText1);
                                    dietsDiv.appendChild(dietsDivText2);
                                cuisinesDiet.appendChild(dietsDiv);   
                            }

                divRecipeDetails.appendChild(cuisinesDiet);


                // Nutrients per serving LINK - child of divRecipeDetails 
                const nutrientsPerServingDiv = document.createElement('div');
                nutrientsPerServingDiv.classList.add('nutrientsPerServingDiv');

                    const titleNutrients = document.createElement('h3');
                    titleNutrients.textContent = 'Click to see a complete';
                    nutrientsPerServingDiv.appendChild(titleNutrients);

                    const titleNutrients2 = document.createElement('h3');
                    titleNutrients2.textContent = 'List of Nutrients';
                    nutrientsPerServingDiv.appendChild(titleNutrients2);

                    const linkNutrients = document.createElement('a');
                    linkNutrients.href = `#/src/js/recipeNutrientsDetailsEntrance?idSelected=${this.idSelected}`;

                        const imgNutrients = document.createElement('img');
                        imgNutrients.src = nutrients;
                        imgNutrients.alt = 'Image for the nutrients page';
                        linkNutrients.appendChild(imgNutrients);
                        
                nutrientsPerServingDiv.appendChild(linkNutrients);
                divRecipeDetails.appendChild(nutrientsPerServingDiv);  
                    

                // Instructions - child of divRecipeDetails     
                const recipeInstructions = document.createElement('div');
                recipeInstructions.classList.add('recipeInstructions');       

                    // Instructions Title - child of recipeInstructions
                    const instructionsRecipeTitle = document.createElement('h2');
                    instructionsRecipeTitle.classList.add('instructionsRecipeTitle');
                    instructionsRecipeTitle.textContent = 'Instructions';
                    recipeInstructions.appendChild(instructionsRecipeTitle);

                    // Add content
                    const contentIngredients = this.renderTemplateInstructions(listRecipeDetails.analyzedInstructions, 'analyzedInstructions');
                    recipeInstructions.appendChild(contentIngredients);

                divRecipeDetails.appendChild(recipeInstructions);
                

        return divRecipeDetails;
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


    // Read the analyzedInstructions folder
    renderTemplateInstructions(list, className) {

        const divcontainer = document.createElement('div');
        divcontainer.classList.add('containerInstructions');

        let face = 1;
        
       
        list.forEach(item => {
                const divInstructions = document.createElement('div');
                divInstructions.classList.add(className);

               
                const divcontainerTitle = document.createElement('h2');
                divcontainerTitle.classList.add('containerInstructionsTitle');
                divcontainerTitle.innerHTML = `Face ${face++}  ( ${item.name} )`;
                divInstructions.appendChild(divcontainerTitle);
                

                    console.log(item)
                    item.steps.forEach(element => {
                        const divElement = document.createElement('div');
                        divElement.classList.add(`${className}Element`);

                        const step = document.createElement('h3');
                        step.classList.add('instructionsStep');
                        step.innerHTML = `Step ${element.number}: ${element.step}`;
                        divElement.appendChild(step);

                        const listIngredients = this.renderTemplateListElement(element.ingredients, 'ingredients', 'ingredientsListClass');
                        divElement.appendChild(listIngredients);
                        
                        const listEquipment = this.renderTemplateListElement(element.equipment, 'equipment', 'ingredientsListClass');
                        divElement.appendChild(listEquipment);

                        divInstructions.appendChild(divElement);
                    })
                
                    divcontainer.appendChild(divInstructions);    
              
        })

        return divcontainer;
    }


    renderTemplateListElement(list, name, className) {

        const divElement = document.createElement('div');
        divElement.classList.add(`div${name}`);

        list.forEach(item => {

            const divElement2 = document.createElement('div');
            divElement2.classList.add(`div2${name}`);

            // const titleElement = document.createElement('h3');
            // titleElement.classList.add(className);
            // titleElement.textContent = name;
            // divElement2.appendChild(titleElement);

            const imgElement = document.createElement('img');
            console.log(item)
            imgElement.src = `https://spoonacular.com/cdn/${name}_100x100/${item.image}`;
            imgElement.alt = `Image of ${item.localizedName}`;
            divElement2.appendChild(imgElement);

            const nameElement = document.createElement('h4');
            nameElement.classList.add(`${className}Name`);
            nameElement.textContent = item.name;
            divElement2.appendChild(nameElement);

            divElement.appendChild(divElement2);
        })
        //console.log(divElement)
        return divElement;
    }
}