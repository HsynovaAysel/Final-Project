document
  .querySelectorAll(".lvideo")
  .forEach((d) => d.addEventListener("click", playVideos));
const body = document.body;

function playVideos(e) {
  lvideo(e.currentTarget.dataset.url);

  body.classList.add("lvideo-active");

  var lvideoWrap = document.createElement("DIV");
  lvideoWrap.setAttribute("id", "lvideo-wrap");
  document.body.appendChild(lvideoWrap);

  // console.log(this.dataset.url)
  // console.log(this.dataset.video)

  const wrapper = document.getElementById("lvideo-wrap");
  wrapper.classList.add("active");

  const url = this.dataset.url;

  const startModal = `<span onclick="lvideoClose();" class="lvideo-overlay"></span> <div class="lvideo-container">`;
  const finishModal = `</div><button onclick="lvideoClose();" class="lvideo-close">x</button>`;

  // if (url.indexOf("youtube") !== -1) {
  if (url.indexOf("youtube") !== -1 || url.indexOf("youtu") !== -1) {
    //console.log("is youtube")

    const ytUrl = [this.dataset.url];

    var i,
      r,
      regExp =
        /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

    for (i = 0; i < ytUrl.length; ++i) {
      r = ytUrl[i].match(regExp);
      //console.log(r[1])

      document.getElementById(
        "lvideo-wrap"
      ).innerHTML = `${startModal}<iframe width="560" height="315" title="YouTube Video" src='https://www.youtube.com/embed/${r[1]}?rel=0&autoplay=1&mute=1&loop=1&playlist=${r[1]}' frameborder="0" allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>${finishModal}`;
    }
  } else if (url.indexOf("vimeo") !== -1) {
    // console.log("is Vimeo")

    const vimeoURL = this.dataset.url;
    const regExp = /https:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;

    const match = vimeoURL.match(regExp);

    if (match) {
      document.getElementById(
        "lvideo-wrap"
      ).innerHTML = `${startModal}<iframe title="Vimeo" src="https://player.vimeo.com/video/${match[2]}?autoplay=1&loop=1" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>${finishModal}`;
    } else {
      alert("Not a Vimeo!  URL example:\n https://vimeo.com/120206922");
    }
  } else if (url.indexOf("mp4") !== -1 || url.indexOf("m4v") !== -1) {
    document.getElementById(
      "lvideo-wrap"
    ).innerHTML = `${startModal}<video controls loop playsinline autoplay><source src='${this.dataset.url}' type="video/mp4"></video>${finishModal}`;
  } else {
    alert("No video link found.");
  }
}

// CLOSE MODAL LVIDEO
const lvideoClose = () => {
  body.classList.remove("lvideo-active");

  const wrapper = document.getElementById("lvideo-wrap");
  wrapper.parentNode.removeChild(wrapper);
};

// LAUNCH
function lvideo() {}

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
const count = document.querySelector(".count-basket");

let BASE_URL = "http://localhost:8080";
let menuCardLists = document.querySelector(".menu-card-lists");
let menuAllData = null;

async function getALLData() {
  let res = await axios(`${BASE_URL}/menus`);
  // console.log(res.data);
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
      <h4>${el.price}$</h4>
      </div>
      <div class="line"></div>
      <div class="desc-icon"> <p class="descriptions">
      ${el.description.slice(0, 30)}...
      </p><div class="icon">
              <i class="${
                find ? "fa-solid fa-heart" : "fa-regular fa-heart"
              }" onclick=favs(this,"${el._id}")></i>
               <i class="fa-solid fa-cart-shopping" onclick=cart("${
                 el._id
               }")></i> 
              <a href="details.html?id=${
                el._id
              }"><i class="fa-solid fa-magnifying-glass"></i></a>
              </div></div>
     
      
  
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
      <h4>${el.price}$</h4>
      </div>
      <div class="line"></div>
      <div class="desc-icon"> <p class="descriptions">
      ${el.description.slice(0, 30)}...
      </p><div class="icon">
              <i class="${
                find ? "fa-solid fa-heart" : "fa-regular fa-heart"
              }" onclick=favs(this,"${el._id}")></i>
               <i class="fa-solid fa-cart-shopping" onclick=cart("${
                 el._id
               }")></i> 
              <a href="details.html?id=${
                el._id
              }"><i class="fa-solid fa-magnifying-glass"></i></a>
              </div></div>
  
    </div>
  </div>                
        `;
  });
}

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
    // console.log(id);
    let find = menuAllData.find((item) => item._id == id);
    // console.log(find);
    let index = basket.findIndex((item) => item.obj._id === id);
    if (index === -1) {
      basket.push({ count: 1, obj: find });
    } else {
      basket[index].count += 1;
    }
    countBasket(basket);
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

let rezervForm = document.querySelector(".form-rezerv");
let rezervNameInput = document.querySelector("#rezerv-name");
let rezervPhoneInput = document.querySelector("#rezerv-phone");
let rezervEmailInput = document.querySelector("#rezerv-email");
let rezervDateInput = document.querySelector("#rezerv-date");
let rezervTimeInput = document.querySelector("#rezerv-time");
let rezervPersonSelect = document.querySelector("#rezerv-person");
let reservsData = null;

// console.log(moment().format().slice(0, 10));

rezervDateInput.min = moment().format().slice(0, 10);
rezervDateInput.max = "2024-12-31";
rezervDateInput.value = moment().format().slice(0, 10);
rezervTimeInput.value = moment().format().slice(11, 16);

async function getRezervsData() {
  let res = await axios(`${BASE_URL}/rezervs`);
  // console.log(res.data);
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

  let date = reservsData.filter(
    (item) => rezervDateInput.value == item.date.slice(0, 10)
  );
  let time = date.find((item) => rezervTimeInput.value == item.time);
  if (login === "true") {
    if (!time) {
      await axios.post(`${BASE_URL}/rezervs`, rezervsObj);
    } else {
      Toastify({
        text: "bu vaxta bos yer yoxdur. ",
        duration: 3000,
        newWindow: true,
        gravity: "top", // `top` or `bottom`
        positionLeft: false, // `true` or `false`
        backgroundColor: "#ff0000",
      }).showToast();
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

// if (window.location.pathname=='*') {
//   window.location="error.html";
// }
