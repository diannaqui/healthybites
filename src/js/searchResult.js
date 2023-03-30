import ExternalServices from "./ExternalServices.mjs"

export function searchResult() {
    const h1 = document.createElement("h2");
    h1.textContent = "Search Result";

    const food = new ExternalServices();
    food.searchAllFood();
    
    return h1
}