
const products = [
    { id: 1, name: "Product 1", price: 20 },
    { id: 2, name: "Product 2", price: 30 },
    { id: 3, name: "Product 3", price: 25 }
];

const container = document.getElementById("products");

products.forEach(product => {
    const column = document.createElement("div");
    column.className = "col-md-4";

    column.innerHTML = `
        <div class="product-card">
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <button class="btn btn-primary"
                onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `;

    container.appendChild(column);
});

function addToCart(productId) {
    alert("Product " + productId + " added to cart!");
}

