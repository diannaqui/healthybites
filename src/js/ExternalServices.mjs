const baseURL = "https://api.spoonacular.com/recipes/";

const apiKeyNumber = "bd9690f36eb2416991bd24870cd5b0e3";        // Diana 
// const apiKeyNumber = "";        // Nikita
// const apiKeyNumber = "";        // Zeir
// const apiKeyNumber = "";        // Josue
// const apiKeyNumber = "";        // Felix


export function convertToJson(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw { name: "servicesError", message: res.json() };
    }
}


export default class ExternalServices {
  constructor() {}

  async getRandom(typeFood) {
    try {
        const response = await fetch(baseURL + `random?apiKey=${apiKeyNumber}&tags=${typeFood},image&number=1`);
        const data = await convertToJson(response);
        return data.recipes;
    } 
   catch (err){
     console.log(err);
   }
  }  
 }
