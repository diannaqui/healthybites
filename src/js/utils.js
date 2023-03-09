export function convertToJson(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw { name: "servicesError", message: res.json() };
    }
}