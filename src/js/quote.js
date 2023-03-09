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

        let author = newQuote[numberQuote].author;
        if (author == null) {author = "Not known"};

        document.querySelector(".quote").innerHTML = `Author: ${author} <br> ${newQuote[numberQuote].text};`
    }   
}