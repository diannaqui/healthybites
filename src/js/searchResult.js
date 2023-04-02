import ExternalServices from "./ExternalServices.mjs"

export async function searchResult(searchTerm) {

  const searchResultsContainer = document.createElement("div");

  const h2 = document.createElement("h2");
  h2.textContent = "Search Result";

  const ul = document.createElement("ul");

  const food = new ExternalServices();
  try {
      const data = await food.searchAllFood(searchTerm);
      // console.log(data)
      data.searchResults[0].results.forEach(results => {
        console.log(results)
        const li = document.createElement("li");
        const productName = document.createElement("h3");
        productName.textContent = results.name;
        li.appendChild(productName);

        const productImage = document.createElement("img");
        productImage.src = results.image;
        productImage.alt = results.name;
        li.appendChild(productImage);

        const productDescription = document.createElement("p");
        productDescription.textContent = results.content;
        li.appendChild(productDescription);
        ul.appendChild(li);
        console.log(li)
      });
    } catch (error) {
      console.log(error)
    }

    searchResultsContainer.appendChild(h2);
    searchResultsContainer.appendChild(ul);

    return searchResultsContainer;
}