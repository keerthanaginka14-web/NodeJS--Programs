
const catalog = [
    { id: 1, name: "Product 1", price: 20 },
    { id: 2, name: "Product 2", price: 30 },
    { id: 3, name: "Product 3", price: 25 }
];

function loadCatalog() {
    const container = document.getElementById("content");

    container.innerHTML = "<h2 id='catalog'>Catalog</h2>";

    catalog.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        `;

        container.appendChild(card);
    });
}

function addToCart(productId) {
    console.log(`Product ${productId} added to cart`);
    alert(`Product ${productId} added to cart`);
}

loadCatalog();
