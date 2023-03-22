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
  <div class='cardProduct'>
    <h3>${link.title}</h3>
      <a href="${link.href}">
        <img src="${link.src}" alt="${link.alt}">
      </a>
  </div>
`).join('');
  

  let section =  document.createElement('section');
  section.classList.add('products')
  section.innerHTML = `
      <div class="product-grid">
        ${productDivs}
      </div>
  `;
  //add title to the section outside the cards container but inside the section container
  const title = document.createElement('h2');
  title.classList.add('sectionTitle');
  title.textContent = 'Meal Types';
  section.prepend(title);
  return section 
}




  