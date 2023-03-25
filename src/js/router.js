import mainPage from './mainPage.js';
import RecipePageDetailsEntrance from './recipePageDetailsEntrance.js';
import { mealtypeListingPage } from './mealtypeListingPage.js';
import Nutrition from './recipeNutrientsDetailsEntrance.js'
import Print from './recipePrint.js'
import aboutPage from './about.js';
import { createRecipeForm } from './makeRecipe.js';
import {makeRecipeView} from './makeRecipeView.js';


export function initRouter(mainView) {
    //mainView.innerHTML = ""

    function updateView(newView) {
        console.log(newView);
        mainView.innerHTML = '';
        mainView.appendChild(newView);
    }

    function page404() {
        const page = document.createElement('h3');
        page.textContent = '404 Page not found';

        return page;
    }

    function hashToRoute(path) {

        let hash = path.split('?')[0];
        let id = path.split('=')[1];

        switch (hash) {
            case '#/src/js/mainPage':
                updateView(mainPage());
                break;

            case '#/src/js/recipePageDetailsEntrance':
                updateView(RecipePageDetailsEntrance(id));
                break;

            case '#/src/js/mealtypeListingPage':
                updateView(mealtypeListingPage(id));
                break;
            
            case '#/src/js/recipeNutrientsDetailsEntrance':
                updateView(Nutrition(id));
                break;

            case '#/src/js/recipePrint':
                updateView(Print(id));
                break;

                case '#/src/js/about':
                    updateView(aboutPage());
                    break;
                
                case '#/src/js/makeRecipe':
                    updateView(createRecipeForm());
                    break;
                
                case '#/src/js/makeRecipeView':
                    updateView(makeRecipeView());
                    break;
                    
            default:
                updateView(page404());
                break;

        }
    }

    // actual location 
    const defaultHash = window.location.hash || '#/src/js/mainPage';
    hashToRoute(defaultHash);


    window.addEventListener('hashchange', (evt) => {

        //console.log(evt.newURL)

        const newURL = new URL(evt.newURL);
        const hash = newURL.hash;

        hashToRoute(hash);
    })
}