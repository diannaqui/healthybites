import ExternalServices from "./ExternalServices.mjs";

export  function recipeCardTemplate(list) {
    return `
        <p>${list.title}</p>
        <img src="${list.image}" alt=Recipe Image for ${list.title}>
    `;
}

export function mealtypeListingPage(id) {
    const dataSource = new ExternalServices();
    const mealTypeData = dataSource.getByMealtype(id);
    const listElement = document.createElement("div");
    listElement.classList.add("recipeContainer");
    mealTypeData.then(data => {
    data.results.map(item => {
    
    const listContainer = document.createElement("div");
    listContainer.classList.add("container");

    listContainer.innerHTML = recipeCardTemplate(item);                
    listElement.appendChild(listContainer);

    const a = document.createElement('a');
    a.href = `#/src/js/recipePageDetailsEntrance?idSelected=${item.id}`;    //hash segment
    a.textContent = 'Recipe';
    listContainer.appendChild(a)
    }
);
});
return listElement
}
