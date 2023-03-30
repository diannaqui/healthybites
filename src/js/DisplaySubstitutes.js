import ExternalServices from './ExternalServices.mjs';

export default class DisplaySubstitutes {
    constructor(name) {
        this.name = name;
    }


    async displayModal() {

        const dataSource = new ExternalServices();
        const item = await dataSource.getSubstituteIngredients(this.name);

        const divSubstitutes = document.createElement('div');
        divSubstitutes.classList.add('divSubstitutes');
        //     const title = document.createElement('h2');
        //     title.classList.add('titleSubstitute');
        //     title.textContent = this.name;
        // divSubstitutes.appendChild(title);

            

        

        if (item.status == 'success') {
            // const divIngrediente = document.createElement('div');
            // divIngrediente.classList.add('divSubstitutes');

            item.substitutes.forEach(product => {
                    const ingrediente =  document.createElement('p');
                    ingrediente.classList.add('ingredienteSubstitute');
                    ingrediente.textContent = product;
                divSubstitutes.appendChild(ingrediente);
            })
            // divSubstitutes.appendChild(divIngrediente);
        }
        else {
                const text = document.createElement('p');
                text.classList.add('textSubstitute');
                text.textContent = item.message;
            divSubstitutes.appendChild(text);
        }
        
        console.log(divSubstitutes);

        return divSubstitutes;
    }
}