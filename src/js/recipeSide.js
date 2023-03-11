import quoteImg from "../images/sp2.webp";

export function renderTemplateRecipes() {
    
    for (let i=0; i<4; i++) {
        const side = document.createElement("div");
        side.classList.add("container");

        // Title recipe
        const sideTitle = document.createElement("h2");
        sideTitle.textContent = `Title ${i}`;

        // Image recipe
        const sideImg = document.createElement("img");
        sideImg.src = quoteImg;
        sideImg.alt = `Recipe Image for ${sideTitle.textContent}`;

        // Type of food, breakfast, main course, dessert or drink
        const sideType = document.createElement("h3");
        sideType.textContent = `Type ${i}`;

        // Time recipe
        const sideTime = document.createElement("h4");
        sideTime.textContent = `Time ${i}`;
        
        side.appendChild(sideImg);
        side.appendChild(sideType);
        side.appendChild(sideTitle);
        side.appendChild(sideTime);

        const containerList = document.querySelector(".recipeContainer");
        containerList.appendChild(side);
    }
}