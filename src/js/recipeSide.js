// import { getRandom } from "./ExternalServices.mjs";
// import spoons from "../images/sp2.webp";

// function getType() {
//     const type = ["dessert", "drink", "main course", "breakfast"];
//     const selectType = Math.floor(Math.random() * 4);
   
//     return type[selectType];
// }

// export async function renderTemplateRecipes() {

//     for (let i=0; i<4; i++) { 
//         //const get = await getRandom(getType());

//         const side = document.createElement("div");
//         side.classList.add("container");
//         // console.log(get);
//         // if (get != "no") {
            
//             // Title recipe
//             const sideTitle = document.createElement("h2");
//             sideTitle.textContent = "TITLE";

//             // Image recipe
//             const sideImg = document.createElement("img");
//             sideImg.src = spoons;
//             sideImg.alt = `Recipe Image ${i}`;

//             // div 
//             const divB = document.createElement("div");
//             divB.classList.add("divInfo");

//                 // Time recipe
//                 const sideTime = document.createElement("h4");
//                 sideTime.textContent = `${i} min`;

//                 // Servings recipe
//                 const sideServings = document.createElement("h4");
//                 sideServings.textContent = `Servings: ${i}`;

//             divB.appendChild(sideServings);
//             divB.appendChild(sideTime);
            
//             // Button
//             const sideButton = document.createElement("button");
//             sideButton.classList.add("sideButton");
//             sideButton.setAttribute("id", `qwert${i}`);
//             sideButton.textContent = "Recipe";

//             side.appendChild(sideImg);
//             side.appendChild(sideTitle);
//             side.appendChild(divB);
//             side.appendChild(sideButton);

//             const containerList = document.querySelector(".recipeContainer");
//             containerList.appendChild(side);
//     }
// }




// // ////////////////////////
// ///////////////////////////
// ///////////////////////////
// export async function renderTemplateRecipesYES() {

//     for (let i=0; i<4; i++) { 
//         const get = await getRandom(getType());
//         console.log("nonono")
//         const side = document.createElement("div");
//         side.classList.add("container");
//         console.log(get);
//         if (get != "no") {
            
//             // Title recipe
//             const sideTitle = document.createElement("h2");
//             sideTitle.textContent = get.recipes[0].title;

//             // Image recipe
//             const sideImg = document.createElement("img");
//             sideImg.src = get.recipes[0].image;
//             sideImg.alt = `Recipe Image for ${sideTitle.textContent}`;

//             // div 
//             const divB = document.createElement("div");
//             divB.classList.add("divInfo");

//                 // Time recipe
//                 const sideTime = document.createElement("h4");
//                 sideTime.textContent = `${get.recipes[0].readyInMinutes} min`;

//                 // Servings recipe
//                 const sideServings = document.createElement("h4");
//                 sideServings.textContent = `Servings: ${get.recipes[0].servings}`;

//             divB.appendChild(sideServings);
//             divB.appendChild(sideTime);
            
//             // Button
//             const sideButton = document.createElement("button");
//             sideButton.classList.add("sideButton");
//             sideButton.setAttribute("data-id", get.recipes[0].id);
//             sideButton.textContent = "Recipe";

//             side.appendChild(sideImg);
//             side.appendChild(sideTitle);
//             side.appendChild(divB);
//             side.appendChild(sideButton);

//             const containerList = document.querySelector(".recipeContainer");
//             containerList.appendChild(side);
//          }

//          else {
//             // if there are problems with the spoonacular API, this message will appear

//             // Image recipe
//             const sideImg = document.createElement("img");
//             sideImg.src = spoons;
//             sideImg.alt = `New Recipe SOON image`;

//             // Message
//             const sideNew = document.createElement("h2");
//             sideNew.classList.add("sideNew");
//             sideNew.textContent = "New Recipes SOON";

//             // Image recipe
//             const sideImg2 = document.createElement("img");
//             sideImg2.src = spoons;
//             sideImg2.alt = `New Recipe SOON image`;

//             side.appendChild(sideImg);
//             side.appendChild(sideNew);
//             side.appendChild(sideImg2);

//             const containerList = document.querySelector(".recipeContainer");
//             containerList.appendChild(side);

//             break;
//          }
//     }
// }