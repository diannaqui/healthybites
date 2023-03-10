export function convertToJson(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw { name: "servicesError", message: res.json() };
    }
}

// To load templates.
export function renderWithTemplate(
  template,
  parentElement, // <main>, <footer>, <ul>, <div>, etc.
  data,
  position = "afterbegin",
  callback // Insert template at the beginning of the parent element
) {
  parentElement.insertAdjacentHTML(position, template);
  // If the callback exists then call it.
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const response = await fetch(path);
  const template = response.text();
  console.log(template)
  return template
}

export async function loadHeaderFooter() {
  console.log("loadHeaderFooter")
  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTemplate = await loadTemplate("../partials/footer.html");

  const headerElement = document.querySelector("#main-header") // Grab the header element out of the DOM
  const footerElement = document.querySelector("#main-footer") // Grab the footer element out of the DOM

  renderWithTemplate(headerTemplate, headerElement);
  // renderWithTemplate(footerTemplate, footerElement);
}