import ShoppingList from './shoppingList.js';

// Modal container that appear in the Detail Page section
export default class ModalCard {
    constructor() {
        this.shopping = new ShoppingList();

    }

    cardDisplay (id, show) {
        document.getElementById(`modalCard${id}`).style.display = show;
    }


    modalCard (item, name, id) {
        const modal = document.createElement('div');
        modal.classList.add('modalCard');
        modal.id = `modalCard${id}`;

            const titleModal = document.createElement('h2');
            titleModal.classList.add('titleModal');
            titleModal.textContent = item.name;
        modal.appendChild(titleModal);

            const imgElement = document.createElement('img');
            imgElement.src = `https://spoonacular.com/cdn/${name}_500x500/${item.image}`;
            imgElement.alt = `Image of ${item.localizedName}`;
        modal.appendChild(imgElement);

        modal.style.display = 'none';

            const buttonList = document.createElement('button');
            buttonList.classList.add(`buttonListModal`);
            buttonList.textContent = 'Add to Shopping List';
            
            buttonList.addEventListener('click', this.shopping.shoppingList.bind(null, item.name));
            buttonList.addEventListener('click', this.cardDisplay.bind(null, id, 'none'));
            
        modal.appendChild(buttonList);

            const button = document.createElement('button');
            button.classList.add(`buttonModal`);
            button.textContent = 'Close';
            button.addEventListener('click', this.cardDisplay.bind(null, id, 'none'));
        modal.appendChild(button);

        return modal;
    }


    renderTemplateListElement(list, name, className, step) {

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

            divElement2.appendChild(this.modalCard(item, name, id));

        divElement.appendChild(divElement2);
        })
        return divElement;
    }
}


