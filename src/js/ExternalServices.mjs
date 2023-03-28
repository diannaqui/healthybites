const baseURL = "https://api.spoonacular.com/recipes/";
const mealTypeUrl = "https://api.spoonacular.com/recipes/complexSearch";

// const apiKeyNumber = "85fc6e9102e54cd3b863cc238b62f727";        // Josue 
// const apiKeyNumber = "11ba0971201241a89d43b8e7edef3ce1";        // Nikita
// const apiKeyNumber = "d3803da0dba2444fac1dbeeb579fe87f";        // Zeir
// const apiKeyNumber = "bd9690f36eb2416991bd24870cd5b0e33";        // Diana
// const apiKeyNumber = "079ad1367c2e40e79eb0363dd32b6c51";        // Felix
    

export function convertToJson(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw { name: "servicesError", message: res.json() };
    }
}

export default class ExternalServices {
  constructor() {}

  message(jsonResponse){

    let show = jsonResponse.message;
    console.log(show)
    if (!show) {
        show = jsonResponse;
    }
      const alert = document.createElement('div');
      alert.classList.add('alertMessage');
        alert.innerHTML = `<h2 class="messageError">${show}</h2>`;
        const main = document.querySelector("main");
        main.prepend(alert);
  }

    // 4 random foods for the main page  // typeFood = breakfast - dinner - main course - drinks
  async getRandom(typeFood) {
      try {
          const response = await fetch(baseURL + `random?apiKey=${apiKeyNumber}&tags=${typeFood},image&number=1`);
          const data = await convertToJson(response);
          return data.recipes;
      } 
    catch (err){
      const jsonResponse = await err.message;
      this.message(jsonResponse);
      console.log(err);
    }
  }  

   // Recipe ready to be printed
  async printRecipe(id) {
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/${id}/card?apiKey=${apiKeyNumber}`);
        const data = await convertToJson(response);
        console.log(data);
        return data.url;
    } 
   catch (err){
      const jsonResponse = await err.message;
      this.message(jsonResponse);
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
      const jsonResponse = await err.message;
      this.message(jsonResponse);
      console.log(err);
    }
  }

  // Info by meal type by ID
  async getByMealtype(typeFood){
    try {
      const response = await fetch(mealTypeUrl + `?apiKey=${apiKeyNumber}&type=${typeFood}`);
      const data = await convertToJson(response);
      return data;
    } 
    catch (err){
      const jsonResponse = await err.message;
      this.message(jsonResponse);
      console.log(err);
    }
  }
  
  // Recipe Information with details
  async getRecipeByIdInformation(idSelected) {
    try {
      const response = await fetch(baseURL + `${idSelected}/information?apiKey=${apiKeyNumber}&includeNutrition=true`);
      const data = await convertToJson(response);
      return data;
    }
    catch (err) {
      const jsonResponse = await err.message;
      this.message(jsonResponse);
      console.log(err);
    }
  }


 }
