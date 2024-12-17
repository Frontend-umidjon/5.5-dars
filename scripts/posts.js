const Base_Url = "https://dummyjson.com"
const PostsEl = document.querySelector(".posts")
const btnSeemore = document.querySelector(".btn__seemore")

const loadingEl = document.querySelector(".loading");
let total = 0;
let offset = 0;

async function fetchData(endpoint) {
    const response = await fetch(`${Base_Url}${endpoint}`)
    response
        .json()
        .then(res => createPosts(res))
        .catch(error => console.log(error))
        .finally(() => {
            loadingEl.style.display = "none"
            btnSeemore.removeAttribute("disabled")
            btnSeemore.textContent = "See more"
          })
    
}

fetchData("/posts?limit=8")


function createPosts(data) {    
    data.posts.forEach(post => {
        const postEl = document.createElement("div")
        postEl.className = "post-card"
        postEl.innerHTML = `
            <div class="post-card__image">
                <img src="http://placehold.it/350x150" alt="">
            </div>
            <div class="post-card__content">
                <h2 class="post-card__title">${post.title}</h2>
                <p class="post-card__body">${post.body}</p> 
            </div>
              <div class="post-card__tags">
                <span class="post-card__tag">${post.tags[0]}</span>
                <span class="post-card__tag">${post.tags[1]}</span>
                <span class="post-card__tag">${post.tags[2]}</span>
            </div>
            <div class="post-card__reactions">
                <div class="post-card__reactions">
                    <div class="post-card__reaction">   
                        <i class="fa-regular fa-thumbs-up"></i> ${post.reactions.likes}
                    </div>
                    <div class="post-card__reaction">
                        <i class="fa-regular fa-thumbs-down"></i> ${post.reactions.dislikes}
                    </div>
                </div>
            </div>
            <div class="post-card__info">   
                <span class="post-card__views"><i class="fa-regular fa-eye"></i> ${post.views}</span>
                <span class="post-card__userId">ID : ${post.userId}</span>
            </div>
             
        `
        PostsEl.appendChild(postEl)
    })

    btnSeemore.addEventListener("click", () => {
        btnSeemore.setAttribute("disabled", true);
        btnSeemore.textContent = "Loading...";
        offset++;
        const endpoint = `/posts?limit=8&skip=${offset * 8}`;
        fetchData(endpoint);
    });


}       