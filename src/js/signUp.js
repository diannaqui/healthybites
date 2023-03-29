export function signUp() {
    const signUpContainer = document.createElement("div");
    signUpContainer.classList.add("signUp");

    const title = document.createElement("h1");
    title.classList.add("signUp")

    // Create a <form> element
    const form = document.createElement("form");

    // Creare a <label> element for the name field
    const nameLabel = document.createElement("label");
    nameLabel.textContent = "Name";

    // Create an <input> element for the name field
    const nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("name", "name");
    nameInput.required = true;

    // Creare a <label> element for the email field
    const emailLabel = document.createElement("label");
    emailLabel.textContent = "Email";

    // Create an <input> element for the email field
    const emailInput = document.createElement("input");
    emailInput.setAttribute("type", "email");
    emailInput.setAttribute("name", "email");
    emailInput.required = true;

    // Creare a <label> element for the password field
    const passwordLabel = document.createElement("label");
    passwordLabel.textContent = "Password";

    // Create a <input> element for the password field
    const passwordInput= document.createElement("input");
    passwordInput.textContent = "Password";
    passwordInput.required = true;

    // Create a login <button> element
    const signUpButton = document.createElement("button");
    signUpButton.setAttribute("type", "submit");
    signUpButton.textContent = "Sign Up";

    // Append the <label> and <input> elements to the <form> element
    form.appendChild(nameLabel);
    form.appendChild(nameInput);
    form.appendChild(emailLabel);
    form.appendChild(emailInput);
    form.appendChild(passwordLabel);
    form.appendChild(passwordInput);
    form.appendChild(signUpButton);

    // Append the title, image and form to the testimonial container
    signUpContainer.appendChild(title);
    signUpContainer.appendChild(form);

    const section = signUpContainer;
    return section;
}