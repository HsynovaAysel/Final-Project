function setTolocalStorage(array) {
  localStorage.setItem("favorites", JSON.stringify(array));
}
function getFromlocalStorage() {
  return JSON.parse(localStorage.getItem("favorites")) ?? [];
}
let favorites = getFromlocalStorage();
let menuCardLists = document.querySelector(".menu-card-lists");
function drawCards(array) {
  menuCardLists.innerHTML = "";
  array.forEach((el) => {
    menuCardLists.innerHTML += `
          <div class="menu-card">
                <div class="img">
                  <img src="${el.image}" alt="" />
                </div>
                <div class="menu-text">
                  <h5>${el.title}</h5>
                  <p>${el.desc}</p>
                  <i class= "fa-solid fa-heart"  onclick=favs(this,${el.id})></i>
                  </div> 
                <h4>$${el.price}</h4>
              </div>
          `;
  });
}
drawCards(favorites);
function favs(icon, id) {
    favorites = favorites.filter((item) => item.id != id);
    icon.closest(".menu-card").remove();
  setTolocalStorage(favorites);
}
