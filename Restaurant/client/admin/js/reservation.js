let BASE_URL = "https://restaurant-crud.onrender.com";
let homeIcons = document.querySelectorAll(".fa-bars");
let homeIconScroll = document.querySelector(".home-icon");
let menuIconScroll = document.querySelector(".menu-icon");
let header=document.querySelector('header')
let xMarkIcon = document.querySelector(".fa-x");
let aside = document.querySelector("aside");
let userAllData = null;
let findAdmin = null;
let adminName = document.querySelector("#admin-name");
let form = document.querySelector("form");
let tbody = document.querySelector("tbody");
let nameInput = document.querySelector("#name-input");
let emailInput = document.querySelector("#email-input");
let timeInput = document.querySelector("#time-input");
let phoneInput = document.querySelector("#phone-input");
let personSelect = document.querySelector("#person-select");
let dateInput = document.querySelector("#date-input");
let editId = null;
let editStatus = null;
let errorText = document.querySelector(".error");
let logOut = document.querySelector(".fa-right-from-bracket");
let rezervAllData = null;
let rezervAllDataCopy = null;
let addBtn = document.querySelector(".add");
let search = document.querySelector("#search");
;
// console.log(moment().format().slice(0, 10));
dateInput.min = moment().format().slice(0, 10);
dateInput.max = "2024-12-31";
dateInput.value = moment().format().slice(0, 10);
timeInput.value = moment().format().slice(11, 16);

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
  header.classList.toggle('header-scroll',this.window.scrollY > 30)
  menuIconScroll.classList.toggle("menu-scroll", this.window.scrollY > 0);
  homeIconScroll.classList.toggle("home-scroll", this.window.scrollY > 30);
});

homeIcons.forEach((homeIcon) =>
  homeIcon.addEventListener("click", function () {
    document.querySelector('.aside')?.classList.remove('aside')
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
    nameInput.value === "" ||
    emailInput.value === "" ||
    timeInput.value === "" ||
    personSelect.value === "" ||
    phoneInput.value === "" ||
    dateInput.value === "";
  let obj = {
    userName: nameInput.value,
    email: emailInput.value,
    date: dateInput.value,
    time: timeInput.value,
    phone: phoneInput.value,
    person: personSelect.value,
  };
  if (!bool) {
    if (!editStatus) {
      postData(obj);
      toastifySuccesful("created rezerv succesful");
    } else {
      patchData(editId, obj);
      editStatus = false;
      toastifySuccesful("updated rezerv succesful");
      addBtn.innerText = "Add";
    }
  } else {
    toastifyError("Inputlari bos qoymayin");
  }
  nameInput.value = "";
  emailInput.value = "";
  timeInput.value = "";
  personSelect.value = "";
  phoneInput.value = "";
  dateInput.value = "";
});

async function getALLData() {
  let res = await axios(`${BASE_URL}/rezervs`);
  console.log(res.data);
  rezervAllData = res.data;
  rezervAllDataCopy = structuredClone(rezervAllData);
  drawTabel(rezervAllData);
}
getALLData();
function drawTabel(array) {
  tbody.innerHTML = "";
  array.forEach((el) => {
    let created = el.createdAt.slice(0, 10);
   
    tbody.innerHTML += `
    <tr>
    <td><h5>${el.userName}</h5></td>
    <td><h5>${el.email}</h5></td>
    <td><h5>${el.date.slice(0, 10)}</h5></td>
    <td><h5>${el.time}</h5></td>
    <td><h5>${el.phone}</h5></td>
    <td><h5>${el.person}</h5></td>
    <td><h5>${created}</h5></td>
    <td><i class="fa-solid fa-trash" onclick=removeData(this,"${
      el._id
    }")></i></td>
    <td><i class="fa-solid fa-pen-to-square" onclick=updateData("${
      el._id
    }")></i></td>
  </tr>
    `;
  });
  // removeData()
}
async function postData(obj) {
  await axios.post(`${BASE_URL}/rezervs`, obj);
}
async function patchData(id, obj) {
  await axios.put(`${BASE_URL}/rezervs/${id}`, obj);
}


function updateData(id) {
  let find = rezervAllData.find((item) => item._id == id);
  console.log(id);
  editId = id;
  editStatus = true;
  nameInput.value = find.userName;
  emailInput.value = find.email;
  timeInput.value = find.time;
  personSelect.value = find.person;
  phoneInput.value = find.phone;
  dateInput.value = find.date.slice(0, 10);
  addBtn.innerText = "Edit";
}

async function removeData(icon, id) {
  if (confirm("Are you sure you want to delete this?")) {
    await axios.delete(`${BASE_URL}/rezervs/${id}`);
    icon.closest("tr").remove();
    toastifySuccesful("deleted rezervs succesful");
  }
}

search.addEventListener("input", function (event) {
  let value = event.target.value.toLocaleLowerCase();
  let filtered = rezervAllData.filter((item) => item.email.toLocaleLowerCase().includes(value));
  drawTabel(filtered);
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
let a = document.querySelectorAll("nav a");

a.forEach((item) => {
  if (item.href.slice(40) == window.location.pathname.slice(19)) {
    let li = item.parentElement;
    li.classList.add("active");
  }
});
