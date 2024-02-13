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
    close: true,
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
let homeIcons = document.querySelectorAll(".fa-bars");
let homeIconScroll = document.querySelector(".home-icon");
let menuIconScroll = document.querySelector(".menu-icon");
window.addEventListener("scroll", function () {
  menuIconScroll.classList.toggle("menu-scroll", this.window.scrollY > 0);
  homeIconScroll.classList.toggle("home-scroll", this.window.scrollY > 30);
});

homeIcons.forEach((homeIcon) =>
  homeIcon.addEventListener("click", function () {
    document.querySelector(".aside")?.classList.remove("aside");
    aside.classList.toggle("aside");
  })
);
let xMarkIcon = document.querySelector(".fa-x");
let aside = document.querySelector("aside");
let userAllData = null;
let findAdmin = null;
let BASE_URL = "http://localhost:8080";
let adminName = document.querySelector("#admin-name");
async function getALLUserData() {
  let res = await axios(`${BASE_URL}/users`);
  // console.log(res.data);
  userAllData = res.data;
  findAdmin = userAllData.find((item) => item.isAdmin);
  adminName.innerText = `Hello,${
    findAdmin.userName[0].toLocaleUpperCase() +
    findAdmin.userName.slice(1).toLocaleLowerCase()
  }`;
}
getALLUserData();
xMarkIcon.addEventListener("click", function () {
  aside.classList.remove("aside");
});
if (!localStorage.getItem("isAdmin")) {
  window.location = "login-signup.html";
}
let logOut = document.querySelector(".fa-right-from-bracket");

let userNameLocal=localStorage.getItem('userName')
adminName.innerText = `Hello,${
  userNameLocal[0].toLocaleUpperCase() +
  userNameLocal.slice(1).toLocaleLowerCase()
}`;
logOut.addEventListener("click", function () {
localStorage.removeItem("isAdmin");
localStorage.removeItem("userName");
});
