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
pagesList.addEventListener("click", function () {
  pagesUl.classList.toggle("pages-ul");
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
let id = new URLSearchParams(window.location.search).get("id");
const BASE_URL = "http://localhost:8080/menus";
let detailsCard = document.querySelector(".details");
let detailsData = null;
// let goBackBtn = document.querySelector(".go-back");
let favorites = getFromlocalStorage();

async function getDataById() {
  let res = await axios(`${BASE_URL}/${id}`);
  console.log(res.data);
  detailsData = res.data;
  let find = favorites.find((item) => item._id == detailsData._id);

  detailsCard.innerHTML = `
  <div class="img">
              <img src="${detailsData.image}" alt="" />
            </div>
            <div class="content">
              <h5><span class="title">Title:</span>${detailsData.title}</h5>
              <h5><span class="price">Price:</span>${detailsData.price}$</h5>
              <p>
                <span class="descriptions">Descriptions:</span>${
                  detailsData.description
                }
              </p>
              <div class="icon">
              <i class="${
                find ? "fa-solid fa-heart" : "fa-regular fa-heart"
              }" onclick=favs(this,"${detailsData._id}")></i>
                <i class="fa-solid fa-cart-shopping" onclick=cart("${
                  detailsData._id
                }")></i>
              
              </div>
            </div>`;
}

// goBackBtn.addEventListener("click", function () {
//   window.location = "index.html";
// });

getDataById();

function favs(icon, id) {
  if (icon.className === "fa-regular fa-heart") {
    icon.className = "fa-solid fa-heart";

    favorites.push(detailsData);
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
  // let find = favorites.find((item) => item._id == id);
  // console.log(find);
  let index = basket.findIndex((item) => item.obj._id === id);
  if (index === -1) {
    basket.push({ count: 1, obj: detailsData });
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
