import { InspirationalQuote } from "./quote";
import { loadHeaderFooter } from "./utils";
import { renderTemplateRecipes } from "./recipeSide";
import { testimonial } from "./testimonial";

loadHeaderFooter();

renderTemplateRecipes();

testimonial();

const quote = new InspirationalQuote();
quote.getQuote();