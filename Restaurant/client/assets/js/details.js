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
    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)"
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
let logOut = document.querySelector(".fa-right-to-bracket");
let login = localStorage.getItem("login");
let id = new URLSearchParams(window.location.search).get("id");
const BASE_URL = "http://localhost:8080";
let detailsCard = document.querySelector(".details");
let detailsData = null;
// let goBackBtn = document.querySelector(".go-back");
let favorites = getFromlocalStorage();
let basket = getFromlocalStorageBasket();
const count = document.querySelector(".count-basket");
let rezervForm = document.querySelector(".form-rezerv");
let rezervNameInput = document.querySelector("#rezerv-name");
let rezervPhoneInput = document.querySelector("#rezerv-phone");
let rezervEmailInput = document.querySelector("#rezerv-email");
let rezervDateInput = document.querySelector("#rezerv-date");
let rezervTimeInput = document.querySelector("#rezerv-time");
let rezervPersonSelect = document.querySelector("#rezerv-person");
let reservsData = null;






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
// setTimeout(() => {
//   spinner.style.display = "none";

// }, 1000);

navbar.addEventListener("click", function () {
  candoreAside.classList.toggle("aside");
  navbar.classList.toggle("menu-icon");
});


async function getDataById() {
  let res = await axios(`${BASE_URL}/menus/${id}`);
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
  if (login === "true") {
    if (icon.className === "fa-regular fa-heart") {
      icon.className = "fa-solid fa-heart";
      toastifySuccesful('succesfuly add favorites')
      favorites.push(detailsData);
    } else {
      icon.className = "fa-regular fa-heart";
      favorites = favorites.filter((item) => item._id != id);
      toastifySuccesful('succesfuly remove favorites')
    }
    setTolocalStorage(favorites);
  } else {
    window.location = "login-signup.html";
  }
}
function setTolocalStorage(array) {
  localStorage.setItem("favorites", JSON.stringify(array));
}
function getFromlocalStorage() {
  return JSON.parse(localStorage.getItem("favorites")) ?? [];
}

function countBasket(arr) {
  let basketCount = arr.reduce((acc, cur) => acc + cur.count, 0);
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

function cart(id) {
  if (login === "true") {
    console.log(id);
    // let find = favorites.find((item) => item._id == id);
    // console.log(find);
    let index = basket.findIndex((item) => item.obj._id === id);
    if (index === -1) {
      basket.push({ count: 1, obj: detailsData });
    } else {
      basket[index].count += 1;
    }
    countBasket(basket)
    setTolocalStorageBasket(basket);
    toastifySuccesful('succesfuly add btn')

  } else {
    window.location = "login-signup.html";
  }
}

function setTolocalStorageBasket(array) {
  localStorage.setItem("basket", JSON.stringify(array));
}
function getFromlocalStorageBasket() {
  return JSON.parse(localStorage.getItem("basket")) ?? [];
}


rezervDateInput.min = moment().format().slice(0, 10);
rezervDateInput.max = "2024-12-31";
rezervDateInput.value = moment().format().slice(0, 10);
rezervTimeInput.value=moment().format().slice(11,16)
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
      toastifySuccesful('succesfuly add rezervs')

    } else {
    toastifyError("bu vaxta bos yer yoxdur. ",)
      
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
let a = document.querySelectorAll("nav a");

a.forEach((item) => {
  
  if (item.href.slice(40) == window.location.pathname.slice(19)) {
    
    let li = item.parentElement;
    li.classList.add("active");
  }
});