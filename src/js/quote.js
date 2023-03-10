// INSPIRATIONAL QUOTE
import { convertToJson } from "./utils";

export class InspirationalQuote {

    async getData() {
        const response = await fetch("https://type.fit/api/quotes");
        const data = await convertToJson(response);
        return data;
    }

    async getQuote() {
        const newQuote = await this.getData();

        // Random number between 0 and the length of the quote array
        let numberQuote = Math.floor(Math.random() * newQuote.length);

        // Author's name
        let author = newQuote[numberQuote].author;
        if (author == null) {author = ""};

        const autorH2 = document.createElement("h2");
        autorH2.classList.add("authorQuote");
        autorH2.textContent = author;

        // Quote
        const quoteP = document.createElement("p");
        quoteP.classList.add("quoteText");
        quoteP.textContent = newQuote[numberQuote].text;

        // Append author and quote
        const quoteDay = document.querySelector(".quote");  
        quoteDay.appendChild(autorH2);
        quoteDay.appendChild(quoteP);
    }   
}