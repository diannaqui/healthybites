export function testimonial() {

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
    const title = document.createElement("h1");
    title.classList.add('testimonialsTitle')
    title.textContent = "Testimonials";
    // Parse or load the JSON data into JavaScrip object
    const objectTestimonial = JSON.parse(jsonTestimonials);

    const testimonialContainer = document.querySelector(".testimonial");
    testimonialContainer.appendChild(title);

    const testimonialdTitleCardContainer = document.createElement('div');
    testimonialContainer.appendChild(testimonialdTitleCardContainer);
    testimonialdTitleCardContainer.classList.add('cardsContainer')
    objectTestimonial.forEach(testimonial => {
        const divElement = document.createElement("div");
        divElement.classList.add("customerTestimonial");
        divElement.innerHTML = `
        <p>${testimonial.message}</p>
        <h3>${testimonial.name}</h3>
        `
        testimonialdTitleCardContainer.appendChild(divElement);
    });
}