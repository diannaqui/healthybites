import { loadHeaderFooter } from "./utils";

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
       pageUrl = require("../index.html");
       break;
  
    }

    fetch(pageUrl)
        .then(response => response.text())
        .then(html => {
            
            document.getElementById('main-content').innerHTML = html;
        })
        .catch(error => console.error(error));
}

window.addEventListener('popstate', renderPage);


renderPage();
