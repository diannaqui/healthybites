
function renderPage() {
    const path = window.location.pathname;

    let pageUrl = '';
    switch (path) {
        case '/about':
            pageUrl =  require("./about");
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


    fetch(pageUrl)
        .then(response => response.text())
        .then(html => {

            document.getElementById('main-content').innerHTML = html;
        })
        .catch(error => console.error(error));
}

export default function() {
window.addEventListener('popstate', renderPage);
renderPage();
}