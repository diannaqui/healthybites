import { initRouter } from "./router.js";
import logoImg from "../images/healthy-bites.jpg"

function Heater(mainDiv) {

    const content = `
        <div class="logo">
            <a href="#/src/js/mainPage"><img src=${logoImg} alt="healthy bites logo"></a>
        </div>
        <nav class="navbar">
            <ul>        
                <li><a href="#">About</a></li>
                <li class="dropdown">
                <button class="dropbtn">Recipes
                    <i class="fa fa-caret-down"></i>
                </button>
                <div class="dropdown-content">
                    <a href="#">Breakfast</a>
                    <a href="#">Main Course</a>
                    <a href="#">Dessert</a>
                    <a href="#">Drinks</a>
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
    div.appendChild(Heater(main));
    div.appendChild(main);
    div.appendChild(Footer());

    return div;

} 

export default App;