import ShoppingList from './shoppingList.js';
import RecipeDetails from "./recipePageDetails";
import DisplaySubstitutes from './DisplaySubstitutes.js';


// Modal container that appear in the Detail Page section
export default class ModalCard {
    constructor() {
        this.shopping = new ShoppingList();
    }

    cardDisplay (id, show) {
        document.getElementById(`modalCard${id}`).style.display = show;
    }

    modalCard (item, name, id, divShoppingOut) {
        const modal = document.createElement('div');
        modal.classList.add('modalCard');
        modal.id = `modalCard${id}`;

            const titleModal = document.createElement('h2');
            titleModal.classList.add('titleModal');
            titleModal.textContent = item.name;
        modal.appendChild(titleModal);

            const divSubImg = document.createElement('div');
            divSubImg.classList.add('divSubImg');
                const imgElement = document.createElement('img');
                imgElement.src = `https://spoonacular.com/cdn/${name}_250x250/${item.image}`;
                imgElement.alt = `Image of ${item.localizedName}`;
            divSubImg.appendChild(imgElement);

                const divinfoSub = document.createElement('div');
                divinfoSub.classList.add('divinfoSub');
            divSubImg.appendChild(divinfoSub);
        modal.appendChild(divSubImg);

        modal.style.display = 'none';

            const buttonList = document.createElement('button');
            buttonList.classList.add(`buttonModal`);
            buttonList.textContent = 'Add to Shopping List';
            
            buttonList.addEventListener('click', this.shopping.shoppingList.bind(null, item.name));
            buttonList.addEventListener('click', this.cardDisplay.bind(null, id, 'none')); 
            buttonList.addEventListener('click', function() {
                const go = new RecipeDetails();
                go.reloadDiv(divShoppingOut)})
            
        modal.appendChild(buttonList);
            const modalSubstitutes = document.createElement('div');
            modalSubstitutes.classList.add('modalSubstitutes');
                const buttonSubstitutes = document.createElement('button');
                buttonSubstitutes.classList.add(`buttonModal`);
                buttonSubstitutes.textContent = 'Substitutes';
                
                buttonSubstitutes.addEventListener('click', async function() {
                    const info = new DisplaySubstitutes(item.name);
                    divinfoSub.appendChild(await info.displayModal());
                });
            
        modal.appendChild(buttonSubstitutes);

            const button = document.createElement('button');
            button.classList.add(`buttonModal`);
            button.textContent = 'Close';
            button.addEventListener('click', this.cardDisplay.bind(null, id, 'none'));
        modal.appendChild(button);

        return modal;
    }


    renderTemplateListElement(list, name, className, step, divShoppingOut) {

        const divElement = document.createElement('div');
        divElement.classList.add(`div${name}`);

        list.forEach(item => {

            const divElement2 = document.createElement('div');
            divElement2.classList.add(`div2${name}`);

                const imgElement = document.createElement('img');
                imgElement.src = `https://spoonacular.com/cdn/${name}_100x100/${item.image}`;
                imgElement.alt = `Image of ${item.localizedName}`;
            divElement2.appendChild(imgElement);

                const nameElement = document.createElement('button');
                nameElement.classList.add(`${className}Name`);
                nameElement.textContent = item.name;

                const id = `${item.id}${step}`;
                nameElement.id = id;
        
                nameElement.addEventListener('click', this.cardDisplay.bind(null, id, 'block'));
            divElement2.appendChild(nameElement);

            divElement2.appendChild(this.modalCard(item, name, id, divShoppingOut));

        divElement.appendChild(divElement2);
        })
        return divElement;
    }
}


