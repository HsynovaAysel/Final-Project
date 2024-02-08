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

let favoritesList = document.querySelector(".favorites");

let favorites = getFromlocalStorageFavorites();
function drawCard(data) {
  favoritesList.innerHTML = "";
  data.forEach((el) => {
    favoritesList.innerHTML += `



    <div class="favorites-card">
    <div class="img">
      <img src="${el.image}" alt="" />
    </div>
    <div class="content">
      <h4 >${el.title}</h4>
      <h5 >${el.price}$</h5>
      <p>
      ${el.description.slice(0, 20)}...
      </p>
      <div class="icon">
        <i class="fa-solid fa-heart"  onclick=trash(this,"${el._id}")></i>
        <i class="fa-solid fa-cart-shopping" onclick=cart("${el._id}")></i>
        <a href=""><i class="fa-solid fa-magnifying-glass"></i></a>
      </div>
    </div>
  </div>
   `;
  });
}
drawCard(favorites);

function trash(icon, id) {
  favorites = favorites.filter((item) => item._id != id);
  icon.closest(".favorites-card").remove();
  setTolocalStorageFavorites(favorites);
  drawCard(favorites);
}

function setTolocalStorageFavorites(array) {
  localStorage.setItem("favorites", JSON.stringify(array));
}
function getFromlocalStorageFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) ?? [];
}
let basket = getFromlocalStorageBasket();

function cart(id) {
  console.log(id);
  let find = favorites.find((item) => item._id == id);
  // console.log(find);
  let index = basket.findIndex((item) => item.obj._id === id);
  if (index === -1) {
    basket.push({ count: 1, obj: find });
  } else {
    // basket[index].count += 1;
  }

  setTolocalStorageBasket(basket);
}

function setTolocalStorageBasket(array) {
  localStorage.setItem("basket", JSON.stringify(array));
}
function getFromlocalStorageBasket() {
  return JSON.parse(localStorage.getItem("basket")) ?? [];
}
