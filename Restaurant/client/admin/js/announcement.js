
let BASE_URL = "https://restaurant-crud.onrender.com";
let homeIcons = document.querySelectorAll(".fa-bars");
let homeIconScroll = document.querySelector(".home-icon");
let menuIconScroll = document.querySelector(".menu-icon");
let xMarkIcon = document.querySelector(".fa-x");
let aside = document.querySelector("aside");
let userAllData = null;
let findAdmin = null;
let header = document.querySelector("header");
let adminName = document.querySelector("#admin-name");
let form = document.querySelector("form");
let tbody = document.querySelector("tbody");
let jobInput = document.querySelector("#job-input");
let salaryInput = document.querySelector("#salary-input");
let hoursInput = document.querySelector("#hours-input");
let cityInput = document.querySelector("#city-input");
let contactInput = document.querySelector("#contact-input");
let ageInput = document.querySelector("#age-input");
let editId = null;
let editStatus = null;
let errorText = document.querySelector(".error");
let addBtn = document.querySelector(".add");
let announcementAllData = null;
let announcementAllDataCopy = null;
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
  window.location.pathname = "/Restaurant/client/login-signup.html";
  
}

let userNameLocal=localStorage.getItem('userName')
adminName.innerText = `Hello,${
    userNameLocal[0].toLocaleUpperCase() +
    userNameLocal.slice(1).toLocaleLowerCase()
  }`;
logOut.addEventListener("click", function () {
  localStorage.removeItem("isAdmin");
  localStorage.removeItem("userName");
  window.location.pathname = "/Restaurant/client/login-signup.html";

});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let bool =
    jobInput.value === "" ||
    salaryInput.value === "" ||
    cityInput.value === "" ||
    contactInput.value === "" ||
    ageInput.value === "" ||
    hoursInput.value === "";
  let obj = {
    job: jobInput.value,
    hours: hoursInput.value,
    salary: salaryInput.value,
    city: cityInput.value,
    contact: contactInput.value,
    age: ageInput.value,
  };
  if (!bool) {
    if (!editStatus) {
      postData(obj);
      toastifySuccesful("created announcement succesful");
    } else {
      patchData(editId, obj);
      editStatus = false;
      toastifySuccesful("updated announcement succesful");
      addBtn.innerText = "Add";
    }
  } else {
    toastifyError("Inputlari bos qoymayin");
  }
  jobInput.value = "";
  hoursInput.value = "";
  salaryInput.value = "";
  cityInput.value = "";
  ageInput.value = "";
  contactInput.value = "";
});

async function getALLData() {
  let res = await axios(`${BASE_URL}/announcement`);
  console.log(res.data);
  announcementAllData = res.data;
  announcementAllDataCopy = structuredClone(announcementAllData);
  drawTabel(announcementAllData);
}

getALLData();
function drawTabel(array) {
  tbody.innerHTML = "";
  array.forEach((el) => {
    tbody.innerHTML += `
    <tr>
    <td><h5>${el.job}</h5></td>
    <td><h5>${el.salary}</h5></td>
    <td><h5>${el.hours}</h5></td>
    <td><h5>${el.city}</h5></td>
    <td><h5>${el.contact}</h5></td>
    <td><h5>${el.age}</h5></td>
    <td><i class="fa-solid fa-trash" onclick=removeData("${el._id}",this)></i></td>
    <td><i class="fa-solid fa-pen-to-square" onclick=updateData("${el._id}")></i></td>
  </tr>
    `;
  });
}

async function postData(obj) {
  await axios.post(`${BASE_URL}/announcement`, obj);
 
}
async function patchData(id, obj) {
  await axios.put(`${BASE_URL}/announcement/${id}`, obj);
  
}

async function removeData(id, icon) {
  if (confirm("Are you sure you want to delete this?")) {
    await axios.delete(`${BASE_URL}/announcement/${id}`);
    icon.closest("tr").remove();
    toastifySuccesful("deleted announcement succesful");
  }
}
function updateData(id) {
  let find = announcementAllData.find((item) => item._id == id);
  // console.log(id);
  editId = id;
  editStatus = true;
  jobInput.value = find.job;
  salaryInput.value = find.salary;
  hoursInput.value = find.hours;
  cityInput.value = find.city;
  contactInput.value = find.contact;
  ageInput.value = find.age;
  addBtn.innerText = "Edit";
}
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
let a = document.querySelectorAll("nav a");

a.forEach((item) => {
  if (item.href.slice(40) == window.location.pathname.slice(19)) {
    let li = item.parentElement;
    li.classList.add("active");
  }
});
