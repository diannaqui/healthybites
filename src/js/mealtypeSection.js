import img1 from "../images/logoPlaceholder.webp"
import img2 from "../images/logoPlaceholder.webp"
import img3 from "../images/logoPlaceholder.webp"
import img4 from "../images/logoPlaceholder.webp"





export default function mealtypeSection() {
    const links = [
        { href: "#/src/js/mealtypeListingPage?idSelected=breakfast", src: img1, alt: "Tent Icon from Noun Project: Mustofa Bayu", title: "Breakfast" },
        { href: "#/src/js/mealtypeListingPage?idSelected=maincourse", src: img2, alt: "Backpack Icon from Noun Project: Mustofa Bayu", title: "Main Course" },
        { href: "#/src/js/mealtypeListingPage?idSelected=dessert", src: img3, alt: "Sleeping Bag Icon from Noun Project: Mustofa Bayu", title: "Dessert" },
        { href: "#/src/js/mealtypeListingPage?idSelected=drinks", src: img4, alt: "Hammock Icon from Noun Project: Paul Richard", title: "Drinks" },
      ];
      
      const productDivs = links.map(link => `
    <div>
    <h3>${link.title}</h3>
      <a href="${link.href}">
        <img src="${link.src}" alt="${link.alt}">
      </a>

    </div>
  `).join('');
    

  let section =  document.createElement('div');
  section.innerHTML = `
    <section class="products">
      <div class="product-grid">
        ${productDivs}
      </div>
    </section>
  `;
  
    return section 
}




  