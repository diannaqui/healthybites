import ExternalServices from './ExternalServices.mjs';

export default class DisplaySubstitutes {
    constructor(name) {
        this.name = name;
    }

    async displayModal(open) {

        const dataSource = new ExternalServices();
        const item = await dataSource.getSubstituteIngredients(this.name);

        const divSubstitutes = document.createElement('div');
        divSubstitutes.classList.add('divSubstitutes');

            const close = document.createElement('button');
            close.classList.add('deleteShoppingList');
            close.textContent = '❌';
            close.addEventListener ('click', function() {divSubstitutes.style.display = 'none';});
            divSubstitutes.appendChild(close);

        if (item.status == 'success') {
            item.substitutes.forEach(product => {
                    const ingrediente =  document.createElement('p');
                    ingrediente.classList.add('ingredienteSubstitute');
                    ingrediente.textContent = product;
                divSubstitutes.appendChild(ingrediente);
            })
        }
        else {
                const text = document.createElement('p');
                text.classList.add('textSubstitute');
                text.textContent = item.message;
            divSubstitutes.appendChild(text);
        }
        return divSubstitutes;
    }
}