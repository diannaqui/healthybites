import mainPage from './mainPage.js';
import RecipePageDetailsEntrance from './recipePageDetailsEntrance.js';
import { mealtypeListingPage } from './mealtypeListingPage.js';
import Nutrition from './recipeNutrientsDetailsEntrance.js'
import Print from './recipePrint.js'
import aboutPage from './about.js';
import { createRecipeForm } from './makeRecipe.js';
import {makeRecipeView} from './makeRecipeView.js';
import { login } from "./login.js";
import { signUp } from "./signUp.js";
import { searchResult } from './searchResult.js';

export function initRouter(mainView, callback) {
    //mainView.innerHTML = ""

    function updateView(newView) {
        mainView.innerHTML = '';
        Promise.resolve(newView).then((node) => {
          if (node instanceof Node) {
            mainView.appendChild(node);
          } else if (node === null || node === undefined) {
            // console.error('Invalid node: null or undefined');
          } else {
            console.error('Invalid node:', node);
          }
        });
      }

    function page404() {
        const page = document.createElement('h3');
        page.classList.add('page404');
        page.textContent = '404 Page not found';

        return page;
    }

    function hashToRoute(path) {

        let hash = path.split('?')[0];
        let value = path.split('=')[1];

        switch (hash) {
            case '#/src/js/mainPage':
                updateView(mainPage());
                break;

            case '#/src/js/recipePageDetailsEntrance':
                updateView(RecipePageDetailsEntrance(value));
                break;

            case '#/src/js/mealtypeListingPage':
                updateView(mealtypeListingPage(value));
                break;
            
            case '#/src/js/recipeNutrientsDetailsEntrance':
                updateView(Nutrition(value));
                break;

            case '#/src/js/recipePrint':
                updateView(Print(value));
                break;

            case '#/src/js/about':
                updateView(aboutPage());
                break;
            
            case '#/src/js/makeRecipe':
                const recipeForm = createRecipeForm();
                updateView(recipeForm);
                break;
            
            case '#/src/js/makeRecipeView':
                updateView(makeRecipeView(callback));
                break;

            case '#/src/js/signUp':
                updateView(signUp());
                break;

            case '#/src/js/login':
                updateView(login());
                break;
                    
            case '#/src/js/searchResult':
                updateView(searchResult(value));
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