import RecipeDetails from "./recipePageDetails";

export default class ShoppingList {
    constructor() {

    }

    displayShoppingList(divShoppingOut) {

            const divShoppingList = document.createElement('div');
            divShoppingList.classList.add('shoppingList');
            divShoppingList.id = 'shoppingListID';

                    const titleShoppingList = document.createElement('h2');
                    titleShoppingList.classList.add('titleShoppingList');
                    titleShoppingList.textContent = 'Shopping List';
            divShoppingList.appendChild(titleShoppingList);

        const shoppingList = JSON.parse(localStorage.getItem('list'));

        if (shoppingList) {
            shoppingList.forEach( item => {
                const div = document.createElement('div');
                div.classList.add('divSL');
                    
                    const divInfo = document.createElement('div');
                    divInfo.classList.add('divInfoList');

                            const buttonDelete = document.createElement('button');
                            buttonDelete.classList.add('deleteShoppingList');
                            buttonDelete.innerHTML = '❌';  
                            buttonDelete.addEventListener('click', this.shoppingDelete.bind(null, item.nameFood));
                            buttonDelete.addEventListener('click', function() {
                                const go = new RecipeDetails();
                                go.reloadDiv(divShoppingOut)})
                        divInfo.appendChild(buttonDelete);
                        
                            const nameItem = document.createElement('h2');
                            nameItem.classList.add('nameShoppingList');
                            nameItem.innerHTML = item.nameFood;
                        divInfo.appendChild(nameItem);
                                    
                    const divButtons = document.createElement('div');
                    divButtons.classList.add('divButtons');

                            const buttonMore = document.createElement('button');
                            buttonMore.classList.add('quantityShoppingList');
                            buttonMore.innerHTML = '➕';  
                            buttonMore.addEventListener('click', this.shoppingChange.bind(null, 1, item.nameFood));
                            buttonMore.addEventListener('click', function() {
                                const go = new RecipeDetails();
                                go.reloadDiv(divShoppingOut)})
                        
                        divButtons.appendChild(buttonMore);

                            const quantityItem = document.createElement('h3');
                            quantityItem.classList.add('quantityShoppingList');
                            quantityItem.innerHTML = item.quantity;  
                        divButtons.appendChild(quantityItem);

                            const buttonLess = document.createElement('button');
                            buttonLess.classList.add('quantityShoppingList');
                            buttonLess.innerHTML = '➖';  
                            buttonLess.addEventListener('click', this.shoppingChange.bind(null, 2, item.nameFood));
                            buttonLess.addEventListener('click', function() {
                                const go = new RecipeDetails();
                                go.reloadDiv(divShoppingOut)})

                        divButtons.appendChild(buttonLess);

                div.appendChild(divInfo);
                div.appendChild(divButtons);

                divShoppingList.appendChild(div);
            })

                    const divLast = document.createElement('div');
                    divLast.classList.add('divLast');

                            const buttonP = document.createElement('a');
                            buttonP.classList.add('buttonListPrint');
                            buttonP.href = `#/src/js/recipePrint?idSelected=shoppingList`;
                                const printList = document.createElement('h2');
                                printList.textContent = 'Print';
                                buttonP.appendChild(printList);
                        divLast.appendChild(buttonP);

                        divShoppingList.appendChild(divLast);
        }
        return divShoppingList;
    }


    shoppingDelete(name) {
        console.log('qwe')
        let shoppingList = JSON.parse(localStorage.getItem('list'));
        shoppingList = shoppingList.filter((item) => item.nameFood != name);
        localStorage.setItem('list', JSON.stringify(shoppingList));
    }

    shoppingList(name) {
        
        const info = {
            nameFood: name,
            quantity: 1,
        };

        let valid = 0;
        const item = JSON.parse(localStorage.getItem('list'));
        if (item) {
            item.forEach (product => {
                if (product.nameFood == name) {
                    product.quantity++;
                    valid = 1;
                }
            })
        }
        if (valid == 0) {item.push(info);}
        localStorage.setItem('list', JSON.stringify(item));
    }


    shoppingChange(option, name) {

        const shoppingList = JSON.parse(localStorage.getItem('list'));
    
        shoppingList.forEach(item => {
            if (item.nameFood == name) {
                if (option == 1) {
                    item.quantity++;
                }
                else {
                    if (item.quantity > 0) item.quantity--;
                }
            }
        })   
        localStorage.setItem('list', JSON.stringify(shoppingList));
    }
}