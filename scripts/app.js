    const wrapperEl = document.querySelector(".wrapper");
    const loadingEl = document.querySelector(".loading");
    const btnSeemore = document.querySelector(".btn__seemore");
    const collectionEl = document.querySelector(".collection");
    const likeBtn = document.querySelector(".add-to-wishlist");
    const countEl = document.querySelector(".wishlist-count");

    const BASE_URL = "https://dummyjson.com";

    const perPageCount = 10;
    let total = 0;
    let offset = 0;
    let currentCategory = null;
    let data = []
    let count = 0;

    const fetchData = async (endpoint) => {
        const response = await fetch(`${BASE_URL}${endpoint}`);
        response
            .json()
            .then((res) => {
                data = [...data, ...res.products];
                
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
            divEl.dataset.id = product.id;
            divEl.innerHTML = `
                <img src=${product.thumbnail} alt="rasm" >
                <h3 title="${product.title}">${product.title}</h3>
                <p>${product.price} USD</p>
                <button>Buy now</button>
                <button name="like-btn" class="add-to-wishlist"><i class="fa-regular fa-heart"></i></button>
            `;
            wrapperEl.appendChild(divEl);
        });
    };

    btnSeemore.addEventListener("click", () => {
        btnSeemore.setAttribute("disabled", true);
        btnSeemore.textContent = "Loading...";
        createLoading(perPageCount);
        offset++;
        window.scrollTo(0, document.documentElement.scrollHeight - 750);
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
        let element = e.target;
        let id = element.closest(".card").dataset.id;
        if (e.target.tagName === "IMG") {
            open(`./pages/product.html?id=${id}`, "_self");
        } else if (element.name === "like-btn") {
              const wish = data.find(item => item.id === +id);   
            let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
            let index = wishlist.findIndex(item => item.id === +id);
            if (index < 0) {
                localStorage.setItem("wishlist", JSON.stringify([...wishlist, wish]));
            }
            count = JSON.parse(localStorage.getItem("wishlist")).length;
            countEl.textContent = count;
           
           
        }
    });

