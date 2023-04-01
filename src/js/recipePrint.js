import ExternalServices from "./ExternalServices.mjs";

async function dataPrint(dataSource, id) {

    

    const listRecipeDetails = await dataSource.printRecipe(id);

    const image = document.createElement('img');
    image.classList.add('imageCard');
    image.src = listRecipeDetails;
    image.alt = 'Recipe Card';

    return image;
}

function printer(div) {
    let content = div.innerHTML;
    let printWindow = window.open('', '', 'height=500,width=800,top=100,left=100');
    printWindow.document.write('<html><head><title>.</title>');
    printWindow.document.write('</head><body>');
    printWindow.document.write('<h1 class="titlePrint">🍎 Shopping List 🍎</h1>');
    printWindow.document.write(content);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
}

function listPrint() {
    const shoppingList = JSON.parse(localStorage.getItem('list'));

    const divList = document.createElement('div');
    divList.classList.add('divListPrint');

        const titleList = document.createElement('h2');
        titleList.classList.add('titleListPrint');
        titleList.innerHTML = 'Shopping List';
    divList.appendChild(titleList);
        const div2 = document.createElement('div');
        div2.classList.add('divPrintOutside');

    shoppingList.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('divPrint');

            const nameItem = document.createElement('h2');
            nameItem.classList.add('nameListPrint');
            nameItem.innerHTML = `⬜ ${item.nameFood}`;
        div.appendChild(nameItem);

            const quantityItem = document.createElement('h2');
            quantityItem.classList.add('nameListPrint');
            quantityItem.innerHTML = item.quantity;
        div.appendChild(quantityItem);
        div2.appendChild(div);
       
    })
    divList.appendChild(div2);
        const button = document.createElement('button');
        button.classList.add('buttonList');
        button.textContent = 'Send to Printer';
        button.addEventListener('click', printer.bind(null, div2));
    divList.appendChild(button);
    return divList;
}


function Print(idSelected) {
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipeCard');

    if (idSelected == 'shoppingList') {
        recipeCard.appendChild(listPrint());
    }
    else {
        async function content(recipeCard) {
            const dataSource = new ExternalServices();
            recipeCard.appendChild(await dataPrint(dataSource, idSelected));
        }

        content(recipeCard);
    }

    return recipeCard;
    
}

export default Print;