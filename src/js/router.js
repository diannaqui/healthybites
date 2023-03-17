
function renderPage() {
    const path = window.location.pathname;

    let pageUrl = '';
    console.log(path)
    switch (path) {
        case '/about':
            pageUrl =  require("../about.html");
            break;
        case '/recipe':
            pageUrl = require("../recipe.html");
            break;

        case '/recipebycountry':
            pageUrl = require("../recipeByCountry.html");
            break;
       default:
       pageUrl = require("../home.html");
       break;

    }

console.log("WEEEEEZER", pageUrl);

    fetch(pageUrl)
        .then(response => response.text())
        .then(html => {

            document.getElementById('main-content').innerHTML = html;
        })
        .catch(error => console.error(error));
}

export default function() {
  console.log("THIS SHOULD ONLY RUN ONCE!");
window.addEventListener('popstate', renderPage);
renderPage();
}