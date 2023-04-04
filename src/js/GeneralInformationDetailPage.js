import printerImage from '../images/printerCircle.png';
import nutrientsImag from '../images/nutrientsCircle.png';
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
                const nutrients = document.createElement('img');
                nutrients.src = nutrientsImag;
                linkNutrients.appendChild(nutrients);
        nutrientsPerServingDiv.appendChild(linkNutrients);

        return nutrientsPerServingDiv;
    }

    // Print Recipe LINK - child of divRecipeDetails 
    print(idSelected) {
        const printRecipe = document.createElement('div');
        printRecipe.classList.add('nutrientsPerServingDiv');

            const printRecipeLink = document.createElement('a');
            printRecipeLink.href = `#/src/js/recipePrint?idSelected=${idSelected}`;
                const printer = document.createElement('img');
                printer.src = printerImage;
                printRecipeLink.appendChild(printer);
                printRecipe.appendChild(printRecipeLink);

        return printRecipe;
    }
    
}