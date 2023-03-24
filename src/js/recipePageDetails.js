
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

            // Image - child of divRecipeDetails
            const containerInfo = document.createElement('div');
            containerInfo.classList.add('containerInfo');
                const containerImg = document.createElement('div');
                containerImg.classList.add('containerImg');
                    const imageRecipe = document.createElement('img');
                    imageRecipe.classList.add('imageRecipe');
                    imageRecipe.src = listRecipeDetails.image;
                    containerImg.appendChild(imageRecipe);                           // IMAGE
                    containerImg.appendChild(this.generalInfo(listRecipeDetails));   // READY IN - SERVINGS
            containerInfo.appendChild(containerImg);                                 // IMAGE  /  READY IN - SERVINGS
            containerInfo.appendChild(this.recipeCuisineDiet(listRecipeDetails));    // CUISINES - DIETS

            const links = document.createElement('div');
            links.classList.add('links');
                links.appendChild(this.nutrientsPerServing());                   // NUTRIENTS
                links.appendChild(this.print());                                 // PRINT CARD

        divRecipeDetails.appendChild(titleRecipe);                                  // TITLE
        divRecipeDetails.appendChild(containerInfo);
        divRecipeDetails.appendChild(links);
        divRecipeDetails.appendChild(this.instructionsRecipe(listRecipeDetails));   // INSTRUCTIONS
                
        return divRecipeDetails;
    }

    // General Info - child of divRecipeDetails 
    generalInfo(listRecipeDetails) {
                        
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

        return generalInfoRecipeDiv        
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

    // Nutrients per serving LINK - child of divRecipeDetails 
    nutrientsPerServing() {
        const nutrientsPerServingDiv = document.createElement('div');
        nutrientsPerServingDiv.classList.add('nutrientsPerServingDiv');

            const linkNutrients = document.createElement('a');
            linkNutrients.href = `#/src/js/recipeNutrientsDetailsEntrance?idSelected=${this.idSelected}`;

                const titleNutrients = document.createElement('h3');
                titleNutrients.textContent = 'Complete list';
                linkNutrients.appendChild(titleNutrients);

                const titleNutrients2 = document.createElement('h3');
                titleNutrients2.textContent = 'of Nutrients';
                linkNutrients.appendChild(titleNutrients2);

        nutrientsPerServingDiv.appendChild(linkNutrients);

        return nutrientsPerServingDiv;
    }


    // Print Recipe LINK - child of divRecipeDetails 
    print() {
        const printRecipe = document.createElement('div');
        printRecipe.classList.add('nutrientsPerServingDiv');

            const printRecipeLink = document.createElement('a');
            printRecipeLink.href = `#/src/js/recipePrint?idSelected=${this.idSelected}`;

                const titlePrint = document.createElement('h3');
                titlePrint.textContent = 'Print';
                printRecipeLink.appendChild(titlePrint);

                const titlePrint2 = document.createElement('h3');
                titlePrint2.textContent = 'your Recipe';
                printRecipeLink.appendChild(titlePrint2);

                printRecipe.appendChild(printRecipeLink);

        return printRecipe;
    }


    // Instructions - how to create de recipe - child of divRecipeDetails     
    instructionsRecipe(listRecipeDetails) {
        const recipeInstructions = document.createElement('div');
        recipeInstructions.classList.add('recipeInstructions');       

        // Instructions Title - child of recipeInstructions
        const instructionsRecipeTitle = document.createElement('h2');
        instructionsRecipeTitle.classList.add('instructionsRecipeTitle');
        instructionsRecipeTitle.textContent = 'Instructions';
        recipeInstructions.appendChild(instructionsRecipeTitle);

        // Instructions - child of recipeInstructions
        const contentIngredients = this.renderTemplateInstructions(listRecipeDetails.analyzedInstructions, 'analyzedInstructions');
        recipeInstructions.appendChild(contentIngredients);

        return recipeInstructions;
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

    // Steps with pictures
    steps(element, className) {
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

        return divElement;
    }

    // Instructions - how to create de recipe
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
                
                item.steps.forEach(element => divInstructions.appendChild(this.steps(element, className)))
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

            const imgElement = document.createElement('img');
            imgElement.src = `https://spoonacular.com/cdn/${name}_100x100/${item.image}`;
            imgElement.alt = `Image of ${item.localizedName}`;
            divElement2.appendChild(imgElement);

            const nameElement = document.createElement('h4');
            nameElement.classList.add(`${className}Name`);
            nameElement.textContent = item.name;
            divElement2.appendChild(nameElement);

            divElement.appendChild(divElement2);
        })
        return divElement;
    }
}