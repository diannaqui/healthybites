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


export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {

  //const htmlStrings = list.map(templateFn);  //data to html
  //console.log(toString(htmlStrings))
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position,templateFn);
}


export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const recipe = urlParams.get(param);
  return recipe;
}


export async function loadTemplate(path) {
  const response = await fetch(path);
  const template = response.text();
  return template
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate(require("../partials/header.html"));
  const footerTemplate = await loadTemplate(require("../partials/footer.html"));

  const headerElement = document.querySelector("#main-header") 
  const footerElement = document.querySelector("#main-footer")

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}