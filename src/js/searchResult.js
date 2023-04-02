import ExternalServices from "./ExternalServices.mjs"

export async function searchResult() {
    const h1 = document.createElement("h2");
    h1.textContent = "Search Result";

    const food = new ExternalServices();
    // food.searchAllFood();
    // return h1
    try {
        const data = await food.searchAllFood();
        console.log(data)
        data.searchResults[0].results.forEach(results => {
          console.log(results)
        });
      } catch (error) {
        console.log(error)
      }

    








}