const Base_Url = "https://dummyjson.com"
const ProfileCards = document.querySelector(".profile-cards")
const btnSeemore = document.querySelector(".btn__seemore")

const loadingEl = document.querySelector(".loading")
const loader = document.querySelector(".loader")
let total = 0;
let offset = 0;

async function fetchData(endpoint) {
  const response =  await fetch(`${Base_Url}${endpoint}`)
  response
    .json()
    .then(res => createProfileCard(res))
    .catch(error => console.log(error))
    .finally(() => {
      loadingEl.style.display = "none"
      btnSeemore.removeAttribute("disabled")
      btnSeemore.textContent = "See more"
    })
}

fetchData("/users?limit=8")

function createProfileCard(data) {
    data.users.forEach((user) => {
      const profileCard = document.createElement("div");
      profileCard.classList.add("profile-card");
      profileCard.innerHTML = `
        <div class="profile-card__image">
          <img src="${user.image}" alt="${user.firstName} ${user.lastName}">
        </div>
        <div class="profile-card__content">
          <h2 class="profile-card__name">${user.firstName} ${user.lastName}</h2>
          <p class="profile-card__title">${user.gender}</p>
          <p class="profile-card__email">${user.email}</p>
          <p class="profile-card__phone">${user.phone}</p>
          <p class="profile-card__address">
            ${user.address.address}, ${user.address.city}, ${user.address.state}
          </p>
          <a href="#" class="profile-card__btn" id="${user.id}">About Me</a>
        </div>

         
      `;
    ProfileCards.appendChild(profileCard)
  })
  btnSeemore.addEventListener("click", () => {
    btnSeemore.setAttribute("disabled", true);
    btnSeemore.textContent = "Loading...";
    offset++;
    const endpoint = `/users?limit=8&skip=${offset * 8}`;
    fetchData(endpoint);
});

  

    
}


