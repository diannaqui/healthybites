import { InspirationalQuote } from "./quote";
import { loadHeaderFooter } from "./utils";
import { renderTemplateRecipes } from "./recipeSide";

loadHeaderFooter();

renderTemplateRecipes();

const quote = new InspirationalQuote();
quote.getQuote();