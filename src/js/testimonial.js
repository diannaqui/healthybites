export function testimonial() {
    const testimonialsMainContainer = document.createElement("div");
    testimonialsMainContainer.classList.add("testimonials");

    const testimonials = [
        {
        name: "Diana Quispe",
        message: `"I can't express how much this product has improved my life. It's been a game-changer and I highly recommend it to anyone looking for an easier way to accomplish their goals."`
        },
        {
        name: "Nikita Wong",
        message: `"I've tried many products in the past, but this one truly stands out. It has exceeded my expectations and I can confidently say it's the best product I've ever used."`
        },
        {
        name: "Josue Centurion",
        message: `"I was hesitant at first, but this product has truly amazed me. Not only has it given me a significant boost in energy, but it has also helped me overcome fatigue. I highly recommend it to anyone looking for a natural way to improve their health."`
        },
        {
        name: "Zeir Braidi",
        message: `"This tool has revolutionized my weight loss journey. It's helped me achieve my goals while still enjoying delicious and varied foods. I'm grateful to have discovered it and would recommend it to anyone looking to lose weight in a healthy and sustainable way."`
        }
    ];
    
    // Convert the array to JSON format
    const jsonTestimonials = JSON.stringify(testimonials);
    // Parse or read the JSON data into JavaScrip object
    const objectTestimonial = JSON.parse(jsonTestimonials);
    // Create <h2> element
    const title = document.createElement("h2");
    title.classList.add("testimonialsTitle");
    title.textContent = "Testimonials";
    const testimonialsSectionContainer = document.createElement('section');
    testimonialsSectionContainer.appendChild(title);
    // Loop through each testimonial and create a new HTML element for it
    objectTestimonial.forEach(testimonial => {
        // Create a <div> element for every single testimonial
        const singleTestimonialContainer = document.createElement("div");
        singleTestimonialContainer.classList.add("customerTestimonial");

        // Add the testimonial name and message to the <div> element
        singleTestimonialContainer.innerHTML = `
        <p>${testimonial.name}</p>
        <p>${testimonial.message}</p>
        `
        
        testimonialsMainContainer.appendChild(singleTestimonialContainer);
    });
    testimonialsSectionContainer.appendChild(testimonialsMainContainer)
    return testimonialsSectionContainer;
}