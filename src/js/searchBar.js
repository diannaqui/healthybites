export function searchBar() {
    const searchContainer = document.createElement("div");
    searchContainer.classList.add("searchContainer");

    const searchInput = document.createElement("input");
    searchInput.setAttribute("type", "search");
    searchInput.classList.add("searchInput");
    searchInput.placeholder = "🔍 Search Recipes"
    
    const submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.classList.add("searchButton");
    submitButton.textContent = "Search";

    submitButton.addEventListener("click", function() {
        const searchTerm = searchInput.value;
        console.log("Your search for:", searchTerm);
    })

    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(submitButton);

    const section = searchContainer;
    return section;
} 