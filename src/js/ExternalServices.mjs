const baseURL = "https://api.spoonacular.com/recipes/";
const mealTypeUrl = "https://api.spoonacular.com/recipes/complexSearch"

//  const apiKeyNumber = "85fc6e9102e54cd3b863cc238b62f727";        // Josue 
const apiKeyNumber = "d3803da0dba2444fac1dbeeb579fe87f";        // Nikita
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
  async getByMealtype(typeFood){
    try {
      const response = await fetch(mealTypeUrl + `?apiKey=${apiKeyNumber}&type=${typeFood}`);
      const data = await convertToJson(response);
      return data;
  } 
 catch (err){
   console.log(err);
 }
}  

 }
