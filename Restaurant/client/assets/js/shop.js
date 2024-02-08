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
let basket = getFromlocalStorageBasket();
let shopBody = document.querySelector(".shop-table table tbody");
let boxBody = document.querySelector(".shop-box table tbody");
let subTotalArray = basket.map((item) => item.count * item.obj.price);
let subTotal = subTotalArray.reduce((sum, el) => sum + el);
function drawTableShop(array) {
  shopBody.innerHTML = "";
  array.forEach((el) => {
    shopBody.innerHTML += `
<tr>
<td>
  <img src="${el.obj.image}" alt="" />
</td>
<td><p>${el.obj.title}</p></td>
<td><h5>$${el.obj.price}</h5></td>
<td class="btn">
  <span>${el.count}</span>
  <div class="dec-inc-btn">
    <button onclick=dec("${el.obj._id}")>+</button>
    <button  onclick=inc("${el.obj._id}")>-</button>
  </div>
</td>
<td><h5>$${el.obj.price * el.count}</h5></td>
<td>
  <button onclick=trash(this,"${el.obj._id}")><span>x</span></button>
</td>
</tr>
          `;
  });
}
drawTableShop(basket);

function inc(id) {
  let index = basket.findIndex((item) => item.obj._id == id);
  if (basket[index].count > 1) {
    basket[index].count -= 1;
    drawTableShop(basket);
    setTolocalStorageBasket(basket);
    drawTableBox();
  }
}
function dec(id) {
  let index = basket.findIndex((item) => item.obj._id == id);
  basket[index].count += 1;
  drawTableShop(basket);
  setTolocalStorageBasket(basket);
  drawTableBox();
}

function trash(btn, id) {
  basket = basket.filter((item) => item.obj._id != id);
  btn.closest("tr").remove();
  setTolocalStorageBasket(basket);
  drawTableShop(basket);
  drawTableBox();
}


function drawTableBox() {
    boxBody.innerHTML = "";
  boxBody.innerHTML = `
    <tr>
    <td><p>Cart Subtotal:</p></td>
    <td><h5>$${subTotal}</h5></td>
  </tr>
  <tr>
    <td><p>Shipping Total:</p></td>
    <td><h5>$15</h5></td>
  </tr>
  <tr>
    <td><p>Total:</p></td>
    <td><h5>$${subTotal + 15}</h5></td>
  </tr>
            `;
}
drawTableBox();

function setTolocalStorageBasket(array) {
  localStorage.setItem("basket", JSON.stringify(array));
}
function getFromlocalStorageBasket() {
  return JSON.parse(localStorage.getItem("basket")) ?? [];
}
setTolocalStorageBasket(basket);
