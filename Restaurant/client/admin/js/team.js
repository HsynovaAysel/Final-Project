let homeIcons = document.querySelectorAll(".fa-bars");
let homeIconScroll = document.querySelector(".home-icon");
let menuIconScroll = document.querySelector(".menu-icon");
let BASE_URL = "http://localhost:8080";
let xMarkIcon = document.querySelector(".fa-x");
let aside = document.querySelector("aside");
let adminName = document.querySelector("#admin-name");
let logOut = document.querySelector(".fa-right-from-bracket");
let header = document.querySelector("header");
let form = document.querySelector("form");
let jobInput = document.querySelector("#job-input");
let nameInput = document.querySelector("#name-input");
let descriptionInput = document.querySelector("#description-input");
let imageInput = document.querySelector("#image-input");
let base64;
let addBtn = document.querySelector(".add");
let teamAllData = null;
let teamAllDataCopy = null;
let search = document.querySelector("#search");
// let goBackBtn = document.querySelector(".go-back");
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
  window.location = "login-signup.html";
}

let userNameLocal = localStorage.getItem("userName");
adminName.innerText = `Hello,${
  userNameLocal[0].toLocaleUpperCase() +
  userNameLocal.slice(1).toLocaleLowerCase()
}`;
logOut.addEventListener("click", function () {
  localStorage.removeItem("isAdmin");
  localStorage.removeItem("userName");
});

async function getALLData() {
  let res = await axios(`${BASE_URL}/team`);
  // console.log(res.data);
  teamAllData = res.data;
  teamAllDataCopy = structuredClone(teamAllData);
  drawCards(res.data);
}
getALLData();
let teamCardLists = document.querySelector(".team-card-lists");

function drawCards(array) {
  teamCardLists.innerHTML = "";
  array.forEach((el) => {
    teamCardLists.innerHTML += `
      <div class="team-card">
              <div class="img">
                <img src="${el.image}" alt="" />
              </div>
              <div class="text-content">
                <h3>${el.userName}</h3>
                <h5>${el.userJob}</h5>
                <p>${el.description}</p>
                <i class="fa-solid fa-trash" onclick=removeData("${el._id}",this)></i>
              </div>
            </div>`;
  });
}
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let bool =
    jobInput.value === "" ||
    imageInput.value === "" ||
    descriptionInput.value === "" ||
    nameInput.value === "";

  let obj = {
    userJob: jobInput.value,
    image: base64,
    userName: nameInput.value,
    description: descriptionInput.value,
  };
  if (!bool) {
    postData(obj);
    toastifySuccesful("created team succesful");
  } else {
    toastifyError("Inputlari bos qoymayin");
  }
  jobInput.value = "";
  imageInput.value = "";
  descriptionInput.value = "";
  nameInput.value = "";
});

async function removeData(id, icon) {
  if (confirm("Are you sure you want to delete this?")) {
    await axios.delete(`${BASE_URL}/team/${id}`);
    icon.closest("tr").remove();
    toastifySuccesful("deleted team succesful");
  }
}
async function postData(obj) {
  await axios.post(`${BASE_URL}/team`, obj);
}

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

const uploadImage = async (event) => {
  const file = event.target.files[0];
  base64 = await convertBase64(file);
};

imageInput.addEventListener("change", (e) => {
  uploadImage(e);
});

search.addEventListener("input", function (event) {
  let value = event.target.value.toLocaleLowerCase();
  let filtered = teamAllData.filter((item) =>
    item.userName.toLocaleLowerCase().includes(value)
  );
  drawCards(filtered);
});
let moonIcon=document.querySelector('.fa-moon')
moonIcon.addEventListener('click',function (params) {
  document.body.classList.toggle("dark-mode");
  let mode;
  if (document.body.classList.contains("dark-mode")) {
    mode = "dark";
    moonIcon.className='fas fa-sun'
    // console.log(mode);
  } else {
    moonIcon.className='fas fa-moon'
    mode = "light";
    // console.log(mode);
  }
  localStorage.setItem("mode", JSON.stringify(mode));
})



let getMode = JSON.parse(localStorage.getItem("mode"));
if (getMode === "dark") {
  moonIcon.className='fas fa-sun'
  document.body.classList.add("dark-mode");
}