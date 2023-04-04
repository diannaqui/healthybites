import ExternalServices from "./ExternalServices.mjs"

export async function searchResult(searchTerm) {
  const searchResultContainer = document.createElement("div");
  searchResultContainer.classList.add("searchResultContainer");

  const h2 = document.createElement("h2");
  h2.textContent = "Here's your search result";
  h2.classList.add("searchResultTitle")

  const ul = document.createElement("ul");
  ul.classList.add("ulForSearchResult")

  const food = new ExternalServices();
  try {
      const data = await food.searchAPI(searchTerm);
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

        const a = document.createElement('a'); // Create a link to click
        a.href = `#/src/js/recipePageDetailsEntrance?idSelected=${results.id}`;
        a.textContent = "See Recipe";
        a.classList.add("linkToRecipe")
        li.appendChild(a)

        ul.appendChild(li);
        // console.log(li)
      });
    } catch (error) {
      console.log(error)
    }

    searchResultContainer.appendChild(h2);
    searchResultContainer.appendChild(ul);

    return searchResultContainer;
}