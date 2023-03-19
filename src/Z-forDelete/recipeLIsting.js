const apiKey = "079ad1367c2e40e79eb0363dd32b6c51";
const apiUrl = `https://api.spoonacular.com/recipes/random?number=10&apiKey=${apiKey}`;

const recipeList = document.getElementById("recipe-list");
const sortByNameButton = document.getElementById("sort-name");

let currentSort = "";

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    let recipes = data.recipes;
    displayRecipes(recipes);

    sortByNameButton.addEventListener("click", () => {
      if (currentSort === "name-asc") {
        recipes.reverse();
        currentSort = "name-desc";
      } else {
        recipes.sort((a, b) => a.title.localeCompare(b.title));
        currentSort = "name-asc";
      }
      displayRecipes(recipes);
    });
  })
  .catch((error) => {
    console.error(error);
  });

function displayRecipes(recipes) {
  recipeList.innerHTML = "";
  recipes.forEach((recipe) => {
    const li = document.createElement("li");
    const img = document.createElement("img");
    const title = document.createElement("h2");
    const summary = document.createElement("p");
    const link = document.createElement("a");

    img.src = recipe.image;
    img.alt = recipe.title;

    title.textContent = recipe.title;

    // remove HTML tags from the summary
    const summaryText = recipe.summary.replace(/<\/?[^>]+(>|$)/g, "");
    summary.textContent = summaryText;

    link.href = recipe.sourceUrl;
    link.textContent = "Get Recipe";

    li.appendChild(img);
    li.appendChild(title);
    li.appendChild(summary);
    li.appendChild(link);

    recipeList.appendChild(li);
  });
}