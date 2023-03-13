import { InspirationalQuote } from "./quote";
import { loadHeaderFooter } from "./utils";

loadHeaderFooter();

const quote = new InspirationalQuote();
quote.getQuote();

