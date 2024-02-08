$(".owl-carousel").owlCarousel({
  loop: true,
  responsiveClass: true,
  autoplayTimeout: 10000,
  nav: true,
  smartSpeed: 2000,
  autoplay: true,
  responsive: {
    0: {
      items: 1,
      // nav:true
    },
    600: {
      items: 1,
      // nav:false
    },
    1000: {
      items: 1,
      // nav:false,
      // loop:false
    },
  },
});

//Scroll back to top

(function ($) {
  "use strict";

  $(document).ready(function () {
    "use strict";

    var progressPath = document.querySelector(".progress-wrap path");
    var pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition =
      "none";
    progressPath.style.strokeDasharray = pathLength + " " + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition =
      "stroke-dashoffset 10ms linear";
    var updateProgress = function () {
      var scroll = $(window).scrollTop();
      var height = $(document).height() - $(window).height();
      var progress = pathLength - (scroll * pathLength) / height;
      progressPath.style.strokeDashoffset = progress;
    };
    updateProgress();
    $(window).scroll(updateProgress);
    var offset = 50;
    var duration = 550;
    jQuery(window).on("scroll", function () {
      if (jQuery(this).scrollTop() > offset) {
        jQuery(".progress-wrap").addClass("active-progress");
      } else {
        jQuery(".progress-wrap").removeClass("active-progress");
      }
    });
    jQuery(".progress-wrap").on("click", function (event) {
      event.preventDefault();
      jQuery("html, body").animate({ scrollTop: 0 }, duration);
      return false;
    });
  });
})(jQuery);
const spinner = document.querySelector(".spinner-loader");
const main = document.querySelector("main");
const candoreAside = document.querySelector("#candore-aside");
const navbar = document.querySelector(".navbar");
const pagesList = document.querySelector("#pages");
const pagesUl = document.querySelector(".pages");
const chefBgImg = document.querySelector(".chef-img");
const aboutImg = document.querySelector(".about-img");
const faqs = document.querySelectorAll(".faq");

faqs.forEach((item) => {
  item.addEventListener("click", function () {
    document
      .querySelector(".accordion-active")
      ?.classList.remove("accordion-active");
    item.classList.toggle("accordion-active");
  });
});

main.style.display = "block";
candoreAside.style.display = "flex";
// setTimeout(() => {
//   spinner.style.display = "none";

// }, 1000);

navbar.addEventListener("click", function () {
  candoreAside.classList.toggle("aside");
  navbar.classList.toggle("menu-icon");
});
pagesList.addEventListener("click", function () {
  pagesUl.classList.toggle("pages-ul");
});

window.addEventListener("scroll", function () {
  chefBgImg.classList.toggle("chef-animation-img", this.window.scrollY > "750");
  aboutImg.classList.toggle("bg-img-about", this.window.scrollY > "100");
});
let BASE_URL = "http://localhost:8080/menus";
let menuCardLists = document.querySelector(".menu-card-lists");
let menuAllData = null;

async function getALLData() {
  let res = await axios(`${BASE_URL}`);
  console.log(res.data);
  menuAllData = res.data;

  let filtered = menuAllData.filter(
    (item) => item.category.toLocaleLowerCase() === "starters"
  );
  let filteredWine = menuAllData.filter(
    (item) => item.category.toLocaleLowerCase() === "wine"
  );
  drawCards(filtered);
  drawWineCard(filteredWine);
}
getALLData();
let favorites = getFromlocalStorage();
function drawCards(array) {
  menuCardLists.innerHTML = "";
  array.forEach((el) => {
    let find = favorites.find((item) => item._id == el._id);

    menuCardLists.innerHTML += `


    <div class="menu-card">
    <div class="img">
    <img src="${el.image}" alt="" />
    </div>
    <div class="menu-content">
      <div class="name-price">
      <h5>${el.title}</h5>
        <p class="descriptions">
        ${el.description}
        </p>
      </div>
      <div class="line"></div>
      <h4>${el.price}$</h4>
      <div class="icon">
              <i class="${
                find ? "fa-solid fa-heart" : "fa-regular fa-heart"
              }" onclick=favs(this,"${el._id}")></i>
               <i class="fa-solid fa-cart-shopping" onclick=cart("${
                 el._id
               }")></i> 
              <a href="details.html?id=${
                el._id
              }"><i class="fa-solid fa-magnifying-glass"></i></a>
              </div>
  
    </div>
  </div>                
        `;
  });
}

menuBtnAll = document.querySelectorAll(".menu-button");
menuBtnAll.forEach((item) =>
  item.addEventListener("click", function () {
    document.querySelector(".button-active").classList.remove("button-active");
    this.classList.add("button-active");
    let filtered = menuAllData.filter(
      (item) =>
        item.category.toLocaleLowerCase() === this.innerText.toLocaleLowerCase()
    );
    drawCards(filtered);
  })
);


let wineCardLists = document.querySelector(".wine-card-list");

function drawWineCard(array) {
  wineCardLists.innerHTML = "";
  array.forEach((el) => {
    let find = favorites.find((item) => item._id == el._id);

    wineCardLists.innerHTML += `


    <div class="menu-card">
    <div class="img">
    <img src="${el.image}" alt="" />
    </div>
    <div class="menu-content">
      <div class="name-price">
      <h5>${el.title}</h5>
        <p class="descriptions">
        ${el.description}
        </p>
      </div>
      <div class="line"></div>
      <h4>${el.price}$</h4>
      <div class="icon">
              <i class="${
                find ? "fa-solid fa-heart" : "fa-regular fa-heart"
              }" onclick=favs(this,"${el._id}")></i>
               <i class="fa-solid fa-cart-shopping" onclick=cart("${
                 el._id
               }")></i> 
              <a href="details.html?id=${
                el._id
              }"><i class="fa-solid fa-magnifying-glass"></i></a>
              </div>
  
    </div>
  </div>                
        `;
  });
}
function favs(icon, id) {
  if (icon.className === "fa-regular fa-heart") {
    icon.className = "fa-solid fa-heart";
    let find = menuAllData.find((item) => item._id == id);
    favorites.push(find);
  } else {
    icon.className = "fa-regular fa-heart";
    favorites = favorites.filter((item) => item._id != id);
  }
  setTolocalStorage(favorites);
}
function setTolocalStorage(array) {
  localStorage.setItem("favorites", JSON.stringify(array));
}
function getFromlocalStorage() {
  return JSON.parse(localStorage.getItem("favorites")) ?? [];
}

let basket = getFromlocalStorageBasket();

function cart(id) {
  console.log(id);
  let find = menuAllData.find((item) => item._id == id);
  // console.log(find);
  let index = basket.findIndex((item) => item.obj._id === id);
  if (index === -1) {
    basket.push({ count: 1, obj: find });
  } else {
    basket[index].count += 1;
  }

  setTolocalStorageBasket(basket);
}

function setTolocalStorageBasket(array) {
  localStorage.setItem("basket", JSON.stringify(array));
}
function getFromlocalStorageBasket() {
  return JSON.parse(localStorage.getItem("basket")) ?? [];
}


