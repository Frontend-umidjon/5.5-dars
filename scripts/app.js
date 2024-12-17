const wrapperEl = document.querySelector(".wrapper");
const loadingEl = document.querySelector(".loading");
const btnSeemore = document.querySelector(".btn__seemore");
const collectionEl = document.querySelector(".collection");
const BASE_URL = "https://dummyjson.com";

const perPageCount = 10;
let total = 0;
let offset = 0;
let currentCategory = null;

const fetchData = async (endpoint) => {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    response
        .json()
        .then((res) => {
            createCard(res);
            total = res.total;
            btnSeemore.style.display = total <= perPageCount + offset * perPageCount ? "none" : "block";
        })
        .catch((err) => console.log(err))
        .finally(() => {
            loadingEl.style.display = "none";
            btnSeemore.removeAttribute("disabled");
            btnSeemore.textContent = "See more";
        });
};

window.addEventListener("load", () => {
    createLoading(perPageCount);
    fetchData(`/products?limit=${perPageCount}`);
    fetchCategory("/products/category-list");
});

const createLoading = (n) => {
    loadingEl.style.display = "grid";
    loadingEl.innerHTML = null;
    Array(n).fill().forEach(() => {
        const div = document.createElement("div");
        div.className = "loading__item";
        div.innerHTML = `
            <div class="loading__image to-left"></div>
            <div class="loading__title to-left"></div>
            <div class="loading__title to-left"></div>
        `;
        loadingEl.appendChild(div);
    });
};

const createCard = (data) => {
    data.products.forEach(product => {
        const divEl = document.createElement("div");
        divEl.className = "card";
        divEl.innerHTML = `
            <img src=${product.thumbnail} alt="rasm" data-id=${product.id}>
            <h3>${product.title}</h3>
            <p>${product.price} USD</p>
            <button>Buy now</button>
        `;
        wrapperEl.appendChild(divEl);
    });
};

btnSeemore.addEventListener("click", () => {
    btnSeemore.setAttribute("disabled", true);
    btnSeemore.textContent = "Loading...";
    createLoading(perPageCount);
    offset++;
    const endpoint = currentCategory
        ? `${currentCategory}?limit=${perPageCount}&skip=${offset * perPageCount}`
        : `/products?limit=${perPageCount}&skip=${offset * perPageCount}`;
    fetchData(endpoint);
});

const fetchCategory = async (endpoint) => {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    response
        .json()
        .then(res => createCategory(res));
};

const createCategory = (data) => {
    data.forEach((category) => {
        const listEl = document.createElement("li");
        listEl.className = "item";
        listEl.dataset.category = `/products/category/${category}`;
        listEl.textContent = category;
        listEl.addEventListener("click", () => {
            wrapperEl.innerHTML = "";
            createLoading(perPageCount);
            offset = 0;
            currentCategory = listEl.dataset.category;
            fetchData(`${currentCategory}?limit=${perPageCount}`);
        });
        collectionEl.appendChild(listEl);
    });
};

wrapperEl.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
        open(`./pages/product.html?id=${e.target.dataset.id}`, "_self");
        console.log(e.target.dataset.id);
    }
});
