const baseURL = "https://api.spoonacular.com/recipes/";

const apiKeyNumber = "85fc6e9102e54cd3b863cc238b62f727";        // Diana 
// const apiKeyNumber = "";        // Nikita
// const apiKeyNumber = "";        // Zeir
// const apiKeyNumber = "85fc6e9102e54cd3b863cc238b62f727";        // Josue
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
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async getOrders(token) {
    const options = {
      method: "GET",
      // the server will reject our request if we don't include the Authorization header with a valid token!
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(baseURL + "orders", options).then(
      convertToJson
    );
    return response;
  }
 }
