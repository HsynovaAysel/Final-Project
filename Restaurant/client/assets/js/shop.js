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
//Toastify
function toastifySuccesful(text) {
  Toastify({
    text: text,
    duration: 3000,
    newWindow: true,
    gravity: "top", // `top` or `bottom`
    positionLeft: true, // `true` or `false`
    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
  }).showToast();
}
function toastifyError(text) {
  Toastify({
    text: text,
    duration: 3000,
    newWindow: true,
    gravity: "top", // `top` or `bottom`
    positionLeft: false, // `true` or `false`
    backgroundColor: "#ff0000",
  }).showToast();
}
const spinner = document.querySelector(".spinner-loader");
const main = document.querySelector("main");
const candoreAside = document.querySelector("#candore-aside");
const navbar = document.querySelector(".navbar");
const pagesList = document.querySelector("#pages");
const pagesUl = document.querySelector(".pages");
let BASE_URL = "https://restaurant-crud.onrender.com";
let logOut = document.querySelector(".fa-right-to-bracket");
let login = localStorage.getItem("login");
let basket = getFromlocalStorageBasket();
let shopBody = document.querySelector(".shop-table table tbody");
let boxBody = document.querySelector(".shop-box table tbody");
const count = document.querySelector(".count-basket");

let rezervForm = document.querySelector(".form-rezerv");
let rezervNameInput = document.querySelector("#rezerv-name");
let rezervPhoneInput = document.querySelector("#rezerv-phone");
let rezervEmailInput = document.querySelector("#rezerv-email");
let rezervDateInput = document.querySelector("#rezerv-date");
let rezervTimeInput = document.querySelector("#rezerv-time");
let rezervPersonSelect = document.querySelector("#rezerv-person");
let reservsData = null;
let subTotalArray = basket?.map((item) => item.count * item.obj.price);

let subTotal =
  subTotalArray.length > 0 ? subTotalArray?.reduce((sum, el) => sum + el) : 0;

logOut.addEventListener("click", function () {
  localStorage.setItem("login", false);
});

if (login === "false") {
  logOut.style.display = "none";
} else {
  logOut.style.display = "inline-block";
}
pagesList.addEventListener("click", function () {
  pagesUl.classList.toggle("pages-ul");
});
main.style.display = "block";
candoreAside.style.display = "flex";

navbar.addEventListener("click", function () {
  candoreAside.classList.toggle("aside");
  navbar.classList.toggle("menu-icon");
});

function countBasket(arr) {
  let basketCount = arr?.reduce((acc, cur) => acc + cur.count, 0);
  count.innerText = basketCount;
  setTolocalStorageBasketCount(basketCount);
}
countBasket(basket);
function setTolocalStorageBasketCount(array) {
  localStorage.setItem("basketCount", JSON.stringify(array));
}
function getFromlocalStorageBasketCount() {
  return JSON.parse(localStorage.getItem("basketCount")) ?? 0;
}
function drawTableShop(array) {
  shopBody.innerHTML = "";
  array.forEach((el) => {
    shopBody.innerHTML += `
<tr>
<td class="image" >
  <div class="img"><img src="${el.obj.image}" alt="" /></div>
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
  if (login === "true") {
    let index = basket.findIndex((item) => item.obj._id == id);
    if (basket[index].count > 1) {
      basket[index].count -= 1;
      drawTableShop(basket);
      setTolocalStorageBasket(basket);
      countBasket(basket);
      drawTableBox();
      toastifySuccesful("successfully removed");
    }
  } else {
    window.location = "login-signup.html";
  }
}
function dec(id) {
  if (login === "true") {
    let index = basket.findIndex((item) => item.obj._id == id);
    basket[index].count += 1;
    drawTableShop(basket);
    setTolocalStorageBasket(basket);
    countBasket(basket);
    drawTableBox();
    toastifySuccesful("successfully added to basket");
  } else {
    window.location = "login-signup.html";
  }
}

function trash(btn, id) {
  if (login === "true") {
    basket = basket.filter((item) => item.obj._id != id);
    btn.closest("tr").remove();
    setTolocalStorageBasket(basket);
    drawTableShop(basket);
    countBasket(basket);
    drawTableBox();
    toastifySuccesful("successfully removed from basket ");
  } else {
    window.location = "login-signup.html";
  }
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

rezervDateInput.min = moment().format().slice(0, 10);
rezervDateInput.max = "2024-12-31";
rezervDateInput.value = moment().format().slice(0, 10);
rezervTimeInput.value = moment().format().slice(11, 16);
async function getRezervsData() {
  let res = await axios(`${BASE_URL}/rezervs`);
  console.log(res.data);
  reservsData = res.data;
}
getRezervsData();
rezervForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  let rezervsObj = {
    userName: rezervNameInput.value,
    email: rezervEmailInput.value,
    date: rezervDateInput.value,
    time: rezervTimeInput.value,
    phone: rezervPhoneInput.value,
    person: rezervPersonSelect.value,
  };
  // console.log(rezervDateInput.value);
  let date = reservsData.filter(
    (item) => rezervDateInput.value == item.date.slice(0, 10)
  );
  let time = date.find((item) => rezervTimeInput.value == item.time);
  if (login === "true") {
    if (!time) {
      await axios.post(`${BASE_URL}/rezervs`, rezervsObj);
      toastifySuccesful("successfully");
    } else {
      toastifyError("At this time, there is no reserve space ");
    }
  } else {
    window.location = "login-signup.html";
  }

  (rezervNameInput.value = ""),
    (rezervEmailInput.value = ""),
    (rezervDateInput.value = ""),
    (rezervTimeInput.value = ""),
    (rezervPhoneInput.value = ""),
    (rezervPersonSelect.value = "");
});
let checkOutBtn = document.querySelector(".check-out-btn");
checkOutBtn.addEventListener("click", function () {
  window.location = "card.html";
});
