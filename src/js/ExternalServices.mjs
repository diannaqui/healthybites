const baseURL = "https://api.spoonacular.com/recipes/";

 const apiKeyNumber = "6c24c552149041ef978d2802024b4955";        // Diana 
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

  // 4 random foods for the main page  // typeFood = breakfast - dinner - main course - drinks
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

  // Detail information by ID
  async getRecipeById(idSelected) {
    try {
      const response = await fetch(baseURL + `${idSelected}/nutritionWidget.json?apiKey=${apiKeyNumber}`);
      const data = await convertToJson(response);
      return data;
    }
    catch (err) {
      console.log(err)
    }
  }
 }
