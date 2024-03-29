import { initRouter } from "./router.js";
import logoImg from "../images/healthy-bites.jpg"
import login from "../images/login.png"

function Header() {

    const content = `
        <div class="logo">
            <a href="#/src/js/mainPage"><img src=${logoImg} alt="healthy bites logo"></a>
        </div>
        <nav class="navbar">
            <ul>        
                <li class="dropdown">
                    <button class="dropbtn">Recipes
                        <i class="fa fa-caret-down"></i>
                    </button>
                    <div class="dropdown-content">
                        <a href="#/src/js/mealtypeListingPage?idSelected=breakfast">Breakfast</a>
                        <a href="#/src/js/mealtypeListingPage?idSelected=maincourse">Main Course</a>
                        <a href="#/src/js/mealtypeListingPage?idSelected=dessert">Dessert</a>
                        <a href="#/src/js/mealtypeListingPage?idSelected=drinks">Drinks</a>
                    </div>
                </li>

                <li class="dropdown">
                    <button class="dropbtn">My Recipes
                        <i class="fa fa-caret-down"></i>
                    </button>
                    <div class="dropdown-content">
                        <a href="#/src/js/makeRecipe">Make your Recipe</a>
                        <a href="#/src/js/makeRecipeView">View your Recipe</a>
                    </div>
                </li>

                <li><a href="#/src/js/about">About</a></li>

                <li class="dropdown">
                    <img src=${login} alt="login">
                    <div class="dropdown-content">
                        <a href="#/src/js/signUp">Sign Up</a>
                        <a href="#/src/js/login">Login</a>
                    </div>
                </li>
            </ul>
            </nav>
        `
    const header = document.createElement('header');
    header.id = 'main-header';
    header.innerHTML = content;

    return header;    
}

function Footer() {
    const copy = document.createElement('p');
    copy.classList.add('copy');
    copy.innerHTML = '&copy; 2023 Healthy Bites';

    const footer = document.createElement('footer');
    footer.id = 'main-footer';
    footer.appendChild(copy);

    return footer;
}

function App() {

    // Main
    const main = document.createElement('main');

    initRouter(main);

    // Together / header - main - footer
    const div = document.createElement('div');
    div.id = 'headerMainFooterContainer';
    div.appendChild(Header());
    div.appendChild(main);
    div.appendChild(Footer());

    return div;
} 

export default App;