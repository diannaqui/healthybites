import ModalCard from './modalCardDetailPage.js';

export default class IntructionsDetails {
    constructor() {
        this.modal = new ModalCard();
    }

    // Instructions - how to create de recipe - child of divRecipeDetails     
    instructionsRecipe(listRecipeDetails) {
        const recipeInstructions = document.createElement('div');
        recipeInstructions.classList.add('recipeInstructions');       

        // Instructions - child of recipeInstructions
        const contentIngredients = this.renderTemplateInstructions(listRecipeDetails.analyzedInstructions, 'analyzedInstructions');
        recipeInstructions.appendChild(contentIngredients);

        return recipeInstructions;
    }

    // Steps with pictures
    steps(element, className) {
        const divElement = document.createElement('div');
        divElement.classList.add(`${className}Element`);

        const step = document.createElement('h2');
        step.classList.add('instructionsStep');
        step.innerHTML = `Step ${element.number}: ${element.step}`;
        divElement.appendChild(step);

        const listIngredients = this.modal.renderTemplateListElement(element.ingredients, 'ingredients', 'ingredientsListClass', element.number);
        divElement.appendChild(listIngredients);
        
        const listEquipment = this.modal.renderTemplateListElement(element.equipment, 'equipment', 'ingredientsListClass', element.number);
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
                divcontainerTitle.innerHTML = `Part ${face++} . . .  ${item.name}`;
                divInstructions.appendChild(divcontainerTitle);
                
                item.steps.forEach(element => divInstructions.appendChild(this.steps(element, className)))
                divcontainer.appendChild(divInstructions);    
        })
        return divcontainer;
    }

}