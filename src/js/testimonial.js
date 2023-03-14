export function testimonial() {

    const testimonials = [
        {
            name: "Diana Quispe",
            message: "I love this product! It has made my life so much easier."
        },
        {
            name: "Nikita Wong",
            message: "This is the best product I have ever used. Highly recommended!"
        },
        {
            name: "Josue Centurion",
            message: "I was skeptical at first, but this product exceeded my expectation."
        }
    ];
    
    // Convert the array to JSON format
    const jsonTestimonials = JSON.stringify(testimonials);
    console.log(jsonTestimonials);
    
    // Parse or load the JSON data into JavaScrip object
    const objectTestimonial = JSON.parse(jsonTestimonials);
    console.log(objectTestimonial);
    
    const testimonialContainer = querySelector(".testimonial");
    testimonialContainer.textContent = objectTestimonial    
}