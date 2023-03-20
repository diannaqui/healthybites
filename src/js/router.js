import mainPage from './mainPage.js';
import RecipePageDetailsEntrance from './recipePageDetailsEntrance.js';

export function initRouter(mainView) {
    // mainView.innerHTML = ""

    function updateView(newView) {
        console.log(newView)
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
        console.log(hash);
        let id = path.split('=')[1];
        
        console.log(id);

        switch(hash) {
            case '#/src/js/mainPage':
                updateView(mainPage());
                break;

            case '#/src/js/recipePageDetailsEntrance':
                updateView(RecipePageDetailsEntrance(id));
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