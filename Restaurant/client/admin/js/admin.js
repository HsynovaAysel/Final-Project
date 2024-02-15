let homeIcons = document.querySelectorAll(".fa-bars");
let homeIconScroll = document.querySelector(".home-icon");
let menuIconScroll = document.querySelector(".menu-icon");
let header = document.querySelector("header");
let xMarkIcon = document.querySelector(".fa-x");
let aside = document.querySelector("aside");
let userAllData = null;
let findAdmin = null;
let BASE_URL = "https://restaurant-crud.onrender.com";
let adminName = document.querySelector("#admin-name");
let logOut = document.querySelector(".fa-right-from-bracket");

// Scroll back to top

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

function toastifySuccesful(text) {
  Toastify({
    text: text,
    duration: 3000,
    newWindow: true,
    gravity: "bottom", // `top` or `bottom`
    positionLeft: true, // `true` or `false`
    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
  }).showToast();
}

window.addEventListener("scroll", function () {
  header.classList.toggle("header-scroll", this.window.scrollY > 30);
  menuIconScroll.classList.toggle("menu-scroll", this.window.scrollY > 0);
  homeIconScroll.classList.toggle("home-scroll", this.window.scrollY > 30);
});

homeIcons.forEach((homeIcon) =>
  homeIcon.addEventListener("click", function () {
    document.querySelector(".aside")?.classList.remove("aside");
    aside.classList.toggle("aside");
  })
);

xMarkIcon.addEventListener("click", function () {
  aside.classList.remove("aside");
});
if (!localStorage.getItem("isAdmin")) {
  window.location.pathname = "/Restaurant/client/login-signup.html";
}

let userNameLocal = localStorage.getItem("userName");
adminName.innerText = `Hello,${
  userNameLocal[0].toLocaleUpperCase() +
  userNameLocal.slice(1).toLocaleLowerCase()
}`;
logOut.addEventListener("click", function () {
  localStorage.removeItem("isAdmin");
  localStorage.removeItem("userName");
  window.location.pathname = "/Restaurant/client/login-signup.html";
});

toastifySuccesful(
  `Welcome Admin , ${
    userNameLocal[0].toLocaleUpperCase() +
    userNameLocal.slice(1).toLocaleLowerCase()
  }`
);
let moonIcon = document.querySelector(".fa-moon");
moonIcon.addEventListener("click", function (params) {
  document.body.classList.toggle("dark-mode");
  let mode;
  if (document.body.classList.contains("dark-mode")) {
    mode = "dark";
    moonIcon.className = "fas fa-sun";
    // console.log(mode);
  } else {
    moonIcon.className = "fas fa-moon";
    mode = "light";
    // console.log(mode);
  }
  localStorage.setItem("mode", JSON.stringify(mode));
});

let getMode = JSON.parse(localStorage.getItem("mode"));
if (getMode === "dark") {
  moonIcon.className = "fas fa-sun";
  document.body.classList.add("dark-mode");
}
let a = document.querySelectorAll("nav a");

a.forEach((item) => {
  if (item.href.slice(40) == window.location.pathname.slice(19)) {
    let li = item.parentElement;
    li.classList.add("active");
  }
});

const rezervCount = document.querySelector(".rezerv-count");
const vacancyCount = document.querySelector(".vacancy-count");
const messageCount = document.querySelector(".message-count");
const menuCount = document.querySelector(".menu-count");
const announCount = document.querySelector(".announcement-count");
const usersCount = document.querySelector(".users-count");
const teamCount = document.querySelector(".team-count");
const cardCount = document.querySelector(".card-count");
let rezervAdmin = null;
let vacancyAdmin = null;
let announcementAdmin = null;
let menuAdmin = null;
let usersAdmin = null;
let messageAdmin = null;
let cardAdmin = null;
let teamAdmin = null;

async function getData() {
  let rezerv = await axios(`${BASE_URL}/rezervs`);
  let vacancy = await axios(`${BASE_URL}/vakans`);
  let announ = await axios(`${BASE_URL}/announcement`);
  let menu = await axios(`${BASE_URL}/menus`);
  let users = await axios(`${BASE_URL}/users`);
  let message = await axios(`${BASE_URL}/messages`);
  let card = await axios(`${BASE_URL}/card`);
  let team = await axios(`${BASE_URL}/team`);

  rezervAdmin = rezerv.data;
  vacancyAdmin = vacancy.data;
  announcementAdmin = announ.data;
  menuAdmin = menu.data;
  usersAdmin = users.data;
  messageAdmin = message.data;
  cardAdmin = card.data;
  teamAdmin = team.data;

  rezervCount.textContent = rezervAdmin.length;
  vacancyCount.textContent = vacancyAdmin.length;
  announCount.textContent = announcementAdmin.length;
  menuCount.textContent = menuAdmin.length;
  usersCount.textContent = usersAdmin.length;
  messageCount.textContent = messageAdmin.length;
  cardCount.textContent = cardAdmin.length;
  teamCount.textContent = teamAdmin.length;

  let x = document.querySelectorAll(".count");

  let arr = Array.from(x);

  arr.map((item) => {
    let count = item.innerHTML;
    item.innerHTML = "0";
    let countNumber = 0;
    setInterval((counterUp) => {
      if (countNumber <= count) {
        item.innerHTML = countNumber;
        countNumber++;
      } else {
        clearInterval;
      }
    }, item.dataset.speed / count);
  });
}

getData();
