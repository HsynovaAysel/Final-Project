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
let rezervForm = document.querySelector(".form-rezerv");
let rezervNameInput = document.querySelector("#rezerv-name");
let rezervPhoneInput = document.querySelector("#rezerv-phone");
let rezervEmailInput = document.querySelector("#rezerv-email");
let rezervDateInput = document.querySelector("#rezerv-date");
let rezervTimeInput = document.querySelector("#rezerv-time");
let rezervPersonSelect = document.querySelector("#rezerv-person");
let reservsData = null;
const spinner = document.querySelector(".spinner-loader");
const main = document.querySelector("main");
const candoreAside = document.querySelector("#candore-aside");
const navbar = document.querySelector(".navbar");
const pagesList = document.querySelector("#pages");
const pagesUl = document.querySelector(".pages");
const chefBgImg = document.querySelector(".chef-img");
let BASE_URL = "https://restaurant-crud.onrender.com";
let logOut = document.querySelector(".fa-right-to-bracket");
const count = document.querySelector(".count-basket");

let teamCardLists = document.querySelector(".team-card-lists");
let login = localStorage.getItem("login");
if (login === "false") {
  logOut.style.display = "none";
} else {
  logOut.style.display = "inline-block";
}
logOut.addEventListener("click", function () {
  localStorage.setItem("login", false);
});

main.style.display = "block";
candoreAside.style.display = "flex";

navbar.addEventListener("click", function () {
  candoreAside.classList.toggle("aside");
  navbar.classList.toggle("menu-icon");
});
pagesList.addEventListener("click", function () {
  pagesUl.classList.toggle("pages-ul");
});
window.addEventListener("scroll", function () {
  chefBgImg.classList.toggle("chef-animation-img", this.window.scrollY > "200");
});

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

let basketCount = JSON.parse(localStorage.getItem("basketCount")) ?? 0;
count.innerText = basketCount;
async function getALLTeamData() {
  let res = await axios(`${BASE_URL}/team`);
  drawTeamCard(res.data);
  // console.log(res.data);
}
getALLTeamData();
function drawTeamCard(array) {
  teamCardLists.innerHTML = "";
  array.forEach((el) => {
    teamCardLists.innerHTML += `             
   <div class="team-card">
                        <div class="team-img">
                          <img src="${el.image.slice(1)}" alt="" />
                        </div>
                        <div class="team-content">
                          <h4>${el.userName}</h4>
                          <span>${el.userJob}</span>
                          <p>
                          ${el.description}
                          </p>
                          <div class="social">
                            <a href="#"
                              ><i class="fa-brands fa-linkedin"></i
                            ></a>
                            <a href="#"
                              ><i class="fa-brands fa-facebook-f"></i
                            ></a>
                            <a href="#"><i class="fa-brands fa-twitter"></i></a>
                            <a href="#"
                              ><i class="fa-brands fa-instagram"></i
                            ></a>
                          </div>
                        </div>
                        <div class="title-box">
                          <h3>${el.userName}</h3>
                          <p>${el.userJob}</p>
                        </div>
                      </div>
   
   `;
  });
}
