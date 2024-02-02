
let basket = getFromlocalStorageBasket();
let menuCardLists = document.querySelector(".menu-card-lists");
function drawCards(array) {
  menuCardLists.innerHTML = "";
  array.forEach((el) => {
    menuCardLists.innerHTML += `
          <div class="menu-card">
                <div class="img">
                  <img src="${el.obj.image}" alt="" />
                </div>
                <div class="menu-text">
                  <h5>${el.obj.title}</h5>
                  <p>${el.obj.desc}</p>
                  <i class= "fa-solid fa-trash"  onclick="remove(this,${el.obj.id})"></i>   <button onclick="inc(${el.obj.id})">-</button><span>${el.count}</span>
                  <button onclick="dec(${el.obj.id})">+</button>
                  </div> 
                <h4>$${el.obj.price}</h4>
              </div>
          `;
  });
}
drawCards(basket);
function remove(icon, id) {
  basket = basket.filter((item) => item.obj.id != id);
  icon.closest(".menu-card").remove();
  setTolocalStorageBasket(basket);
}
function inc(id) {
    // console.log(id);
    let index = basket.findIndex((item) => item.obj.id == id);
    if (basket[index].count > 1) {
      basket[index].count -= 1;
      setTolocalStorageBasket(basket);
      drawCards(basket);
    }
  }
  function dec(id) {
    let index = basket.findIndex((item) => item.obj.id == id);
    if (basket[index].count < 10) {
      basket[index].count += 1;
      setTolocalStorageBasket(basket);
      drawCards(basket);
    }
  }
  
  
  
  
  function setTolocalStorageBasket(array) {
  localStorage.setItem("basket", JSON.stringify(array));
}
function getFromlocalStorageBasket() {
  return JSON.parse(localStorage.getItem("basket")) ?? [];
}