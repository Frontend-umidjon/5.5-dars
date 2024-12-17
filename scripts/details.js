const detailEl = document.querySelector(".detail");
const productDetailsSection = document.querySelector(".product-details");
const loader = document.querySelector(".product-loading");
const BASE_URL = "https://dummyjson.com";


async function fetchProductDetails(id) {
    let params = new URLSearchParams(window.location.search)
    const response = await fetch(`${BASE_URL}/products/${params.get("id")}`)
    response
        .json()
        .then(res => {
            ProductDetails(res);
        })
        .catch(error => console.log(error))
        .finally(() => loader.style.display = "none")
}
const ProductDetails = (data) => {
    productDetailsSection.style.display = "block";
    detailEl.innerHTML = `
        <div >
            <img src="${data.images[0]}" alt="${data.title}" ">
        </div>
        <div class="product-info">
            <h1>${data.title}</h1>
            <p>${data.description}</p>
            <p><strong>Price:</strong> $${data.price}</p>
            <button class="btn-buy">Buy Now</button>
        </div>
    `;
};

fetchProductDetails();
