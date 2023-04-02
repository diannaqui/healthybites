export function displaySearchBar() {
    const searchContainer = document.createElement("div");
    searchContainer.classList.add("searchContainer");

    const searchInput = document.createElement("input");
    searchInput.setAttribute("type", "search");
    searchInput.classList.add("searchInput");
    searchInput.placeholder = "🔍 Search Recipes"

    const a = document.createElement("a");
    a.href = "#/src/js/searchResult";
    a.classList.add("searchButton");
    a.textContent = "Search";

    const searchTerm = searchInput.value;

    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(a);

    const section = searchContainer;
    return section;
} 