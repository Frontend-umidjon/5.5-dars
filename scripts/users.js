const Base_Url = "https://dummyjson.com"
const ProfileCards = document.querySelector(".profile-cards")

const loadingEl = document.querySelector(".loading")
const loader = document.querySelector(".loader")

async function fetchData(endpoint) {
  const response =  await fetch(`${Base_Url}${endpoint}`)
  response
    .json()
    .then(res => createProfileCard(res))
    .catch(error => console.log(error))
    .finally(() => loadingEl.style.display = "none")
}

fetchData("/users")

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

}


