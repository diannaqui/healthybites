import newsletterImage from "../images/happy-jumping.webp"

export function newsletter() {
    const newsletterContainer = document.createElement("div");
    newsletterContainer.classList.add("newsletterContainer");
    
    const newsletter = document.createElement("div");
    newsletter.classList.add("newsletter");

    // Create <img> element
    const image = document.createElement("img");
    image.src = newsletterImage;
    image.alt = "some description about the image";

    // Create <h2> element
    const title = document.createElement("h2");
    title.textContent = "Subscribe to our Newsletter";
    
    // Create a <form> element
    const form = document.createElement("form");

    // Creare a <label> element for the name field
    const nameLabel = document.createElement("label");
    nameLabel.textContent = "Name";

    // Create an <input> element for the name field
    const nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("name", "name");
    nameInput.setAttribute("required", true);

    // Create a <label> element for the email field
    const emailLabel = document.createElement("label");
    emailLabel.textContent = "Email Address";

    // Create an <input> element for the email field
    const emailInput = document.createElement("input");
    emailInput.setAttribute("type", "email");
    emailInput.setAttribute("name", "email");
    emailInput.setAttribute("required", true);
    // Create a submit <button> element
    const submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.textContent = "SUBSCRIBE";

    
    const message = document.createElement('p');
    message.classList.add('messageNewsletter');
    message.textContent = 'Thank you for subscribing to our Newsletter!';
    message.style.display = 'none';

    submitButton.addEventListener('submit', function(event) {
        event.preventDefault();
        message.style.display = 'block';
    })

    // Append the <label> and <input> elements to the <form> element
    form.appendChild(nameLabel);
    form.appendChild(nameInput);
    form.appendChild(emailLabel);
    form.appendChild(emailInput);
    form.appendChild(submitButton);

    // Append the title, image and form to the testimonial container
    newsletter.appendChild(title);
    newsletter.appendChild(image);
    newsletter.appendChild(form);
    newsletter.appendChild(message);

    newsletterContainer.appendChild(newsletter);
    const section = newsletterContainer;
    return section;
}