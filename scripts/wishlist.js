const wishlistWrapper = document.querySelector('.wishlist');

const createCard = () => {
    const data = JSON.parse(localStorage.getItem("wishlist"));
    data.forEach(product => {
        const divEl = document.createElement("div");
        divEl.className = "item";
        divEl.dataset.id = product.id;
        divEl.innerHTML = `
              <img src="${product.thumbnail}" alt="Item 1">
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <button class="add-to-cart">Add to Cart</button>
                <button class="remove-from-wishlist">Remove</button>
        `;
        wishlistWrapper.appendChild(divEl);
    });
};

window.onload = () => {
    createCard()
}