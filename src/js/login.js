export function login() {
    const loginContainer = document.createElement("div");
    loginContainer.classList.add("login");

    const title = document.createElement("h1");
    title.classList.add("title")

    // Create a <form> element
    const form = document.createElement("form");

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
    const loginButton = document.createElement("button");
    loginButton.setAttribute("type", "submit");
    loginButton.textContent = "Login";

    const message = document.createElement('p');
    message.classList.add('messageNewsletter');
    message.textContent = 'Our servers are under maintenance, please try again later';
    message.style.display = 'none';

    loginButton.addEventListener('click', function(event) {
        event.preventDefault();
        message.style.display = 'block';
    })


    // Append the <label> and <input> elements to the <form> element
    form.appendChild(emailLabel);
    form.appendChild(emailInput);
    form.appendChild(passwordLabel);
    form.appendChild(passwordInput);
    form.appendChild(loginButton);

    // Append the title, image and form to the testimonial container
    loginContainer.appendChild(title);
    loginContainer.appendChild(form);
    loginContainer.appendChild(message);


    const section = loginContainer;
    return section;
}