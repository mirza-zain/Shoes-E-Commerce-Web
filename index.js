// Array of product data
const products = [
    { name: "Nike Sneakers", price: "$120", image: "./public/prod1.png" },
    { name: "Adidas Sneakers", price: "$140", image: "./public/prod2.png" },
    { name: "Puma Sneakers", price: "$100", image: "./public/prod3.png" },
    { name: "Reebok Sneakers", price: "$110", image: "./public/prod3.png" },
    { name: "Nike Sneakers", price: "$120", image: "./public/prod1.png" },
    { name: "Adidas Sneakers", price: "$140", image: "./public/prod2.png" },
    { name: "Puma Sneakers", price: "$100", image: "./public/hero.png" },
];

const productsContainer = document.getElementById("products");

products.forEach(product => {
    
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;
    img.id = "sneaker";
    card.appendChild(img);

    const h3 = document.createElement("h3");
    h3.textContent = product.name;
    card.appendChild(h3);

    const detailsDiv = document.createElement("div");

    const price = document.createElement("p");
    price.textContent = product.price;
    detailsDiv.appendChild(price);

    const button = document.createElement("button");
    button.textContent = "Add to cart";
    detailsDiv.appendChild(button);

    card.appendChild(detailsDiv);

    productsContainer.appendChild(card);
});

const currentYear = new Date().getFullYear();
const copyrightText = `© ${currentYear} Random Fashion. All rights reserved.`;

document.getElementById('copyright').textContent = copyrightText;