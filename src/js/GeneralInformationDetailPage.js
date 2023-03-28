
export default class GeneralInformationDetailPage {
    constructor() {

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

    // Nutrients per serving LINK - child of divRecipeDetails 
    nutrientsPerServing(idSelected) {
        const nutrientsPerServingDiv = document.createElement('div');
        nutrientsPerServingDiv.classList.add('nutrientsPerServingDiv');

            const linkNutrients = document.createElement('a');
            linkNutrients.href = `#/src/js/recipeNutrientsDetailsEntrance?idSelected=${idSelected}`;

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
    print(idSelected) {
        const printRecipe = document.createElement('div');
        printRecipe.classList.add('nutrientsPerServingDiv');

            const printRecipeLink = document.createElement('a');
            printRecipeLink.href = `#/src/js/recipePrint?idSelected=${idSelected}`;

                const titlePrint = document.createElement('h3');
                titlePrint.textContent = 'Print';
                printRecipeLink.appendChild(titlePrint);

                const titlePrint2 = document.createElement('h3');
                titlePrint2.textContent = 'your Recipe';
                printRecipeLink.appendChild(titlePrint2);

                printRecipe.appendChild(printRecipeLink);

        return printRecipe;
    }
    
}