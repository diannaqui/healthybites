import spoon from "../images/sp2.webp";
import ExternalServices from "./ExternalServices.mjs";

export  function recipeCardTemplate(list) {
    return `
        <p>${list.title}</h2>
        <img src="${list.image}" alt=Recipe Image for ${list.title}>
    `;
}



export function mealtypeListingPage(id) {
    const dataSource = new ExternalServices();
    const mealTypeData = dataSource.getByMealtype(id);
    const listElement = document.createElement("div");
    listElement.classList.add("recipeContainer");
    mealTypeData.then(data => {
    data.results.map(item => {console.log(item)
    
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

// CONTINUE DOING THE FUNCTION TO DISPLAY EACH MEALTYPE 

// export default class mealtypeListingPage { 
//     constructor(id) {
//         this.dataSource = new ExternalServices();
//         this.id = id
//     }


//     async init() {
//         const listElement = document.createElement("div");
//         listElement.classList.add("recipeContainer");

//             const listContainer = document.createElement("div");
//             listContainer.classList.add("container");

//             const list = await this.dataSource.getByMealtype(this.id);
//             if (list) { 
//                 listContainer.innerHTML = recipeCardTemplate(list);
//                 listElement.appendChild(listContainer);

//                 const a = document.createElement('a');
//                 a.href = `#/src/js/recipePageDetailsEntrance?idSelected=${list[0].id}`;    //hash segment
//                 a.textContent = 'Recipe';
//                 listContainer.appendChild(a);

//             } else {
//                 listContainer.innerHTML = recipeCardTemplateNoList();        
//                 listElement.appendChild(listContainer);      
//             }
            
//         
//         return listElement;
//     }
// }