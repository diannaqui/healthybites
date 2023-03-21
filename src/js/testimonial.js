export function testimonial() {
    const divOne = document.createElement("div");
    divOne.classList.add("testimonials");

    const testimonials = [
        {
            name: "Diana Quispe",
            message: '"I love this product! It has made my life so much easier."'
        },
        {
            name: "Nikita Wong",
            message: '"This is the best product I have ever used. Highly recommended!"'
        },
        {
            name: "Josue Centurion",
            message: '"I was skeptical at first, but this product exceeded my expectation."'
        }
    ];
    
    // Convert the array to JSON format
    const jsonTestimonials = JSON.stringify(testimonials);
    console.log(jsonTestimonials);
    
    // Parse or read the JSON data into JavaScrip object
    const objectTestimonial = JSON.parse(jsonTestimonials);
    console.log(objectTestimonial);

    // Create <h2> element
    const title = document.createElement("h2");
    title.classList.add("testimonialsTitle");
    title.textContent = "Testimonials";
    divOne.appendChild(title);

    // Loop through each testimonial and create a new HTML element for it
    objectTestimonial.forEach(testimonial => {
        console.log(testimonial)

        // Create a <div> element for the testimonial
        const divTwo = document.createElement("div");
        divTwo.classList.add("customerTestimonial");

        // Add the testimonial name and message to the <div> element
        divTwo.innerHTML = `
        <p>${testimonial.name}</p>
        <p>${testimonial.message}</p>
        `
        
        divOne.appendChild(divTwo);
    });

    return divOne;
}