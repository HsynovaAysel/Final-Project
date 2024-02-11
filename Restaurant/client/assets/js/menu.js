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

let logOut = document.querySelector(".fa-right-to-bracket");
logOut.addEventListener("click", function () {
  localStorage.setItem("login", false);
});
let login = localStorage.getItem("login");
if (login === "false") {
  logOut.style.display = "none";
} else {
  logOut.style.display = "inline-block";
}
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

  drawCards(filtered);
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

function favs(icon, id) {
  if (login === "true") {
    if (icon.className === "fa-regular fa-heart") {
      icon.className = "fa-solid fa-heart";
      let find = menuAllData.find((item) => item._id == id);
      favorites.push(find);
    } else {
      icon.className = "fa-regular fa-heart";
      favorites = favorites.filter((item) => item._id != id);
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

let basket = getFromlocalStorageBasket();
const count = document.querySelector(".count-basket");
function countBasket(arr) {
  let basketCount = arr.reduce((acc, cur) => acc + cur.count, 0);
  count.innerText = basketCount;
}
countBasket(basket);
function cart(id) {
  if (login === "true") {
    console.log(id);
    let find = menuAllData.find((item) => item._id == id);
    // console.log(find);
    let index = basket.findIndex((item) => item.obj._id === id);
    if (index === -1) {
      basket.push({ count: 1, obj: find });
    } else {
      basket[index].count += 1;
    }
countBasket(basket)
    setTolocalStorageBasket(basket);
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
logOut.addEventListener("click", function () {
  localStorage.setItem("login", false);
});
let rezervForm = document.querySelector(".form-rezerv");
let rezervNameInput = document.querySelector("#rezerv-name");
let rezervPhoneInput = document.querySelector("#rezerv-phone");
let rezervEmailInput = document.querySelector("#rezerv-email");
let rezervDateInput = document.querySelector("#rezerv-date");
let rezervTimeInput = document.querySelector("#rezerv-time");
let rezervPersonSelect = document.querySelector("#rezerv-person");
let reservsData = null;
async function getRezervsData() {
  let res = await axios(`http://localhost:8080/rezervs`);
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
  let bool = reservsData.find(
    (item) =>
      rezervTimeInput.value == item.time ||
      rezervDateInput.value == item.date.slice(0, 10)
  );
  console.log(bool);
  if (login === "true") {
    if (!bool) {
      await axios.post(`http://localhost:8080/rezervs`, rezervsObj);
    } else {
      alert("bu vaxta bos yer yoxdur.");
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
