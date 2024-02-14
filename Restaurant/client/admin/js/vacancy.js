let homeIcons = document.querySelectorAll(".fa-bars");
let homeIconScroll = document.querySelector(".home-icon");
let menuIconScroll = document.querySelector(".menu-icon");
let BASE_URL = "http://localhost:8080";
let xMarkIcon = document.querySelector(".fa-x");
let aside = document.querySelector("aside");
let userAllData = null;
let findAdmin = null;
let adminName = document.querySelector("#admin-name");
let logOut = document.querySelector(".fa-right-from-bracket");
let header = document.querySelector("header");
let form = document.querySelector("form");
let tbody = document.querySelector("tbody");
let jobInput = document.querySelector("#job-input");
let cityInput = document.querySelector("#city-input");
let ageInput = document.querySelector("#age-input");
let lastnameInput = document.querySelector("#lastname-input");
let firstnameInput = document.querySelector("#firstname-input");
let emailInput = document.querySelector("#email-input");
let phoneInput = document.querySelector("#phone-input");
let experienceInput = document.querySelector("#experience-input");
let cvInput = document.querySelector("#cv-input");
let editId = null;
let editStatus = null;
let base64;
let errorText = document.querySelector(".error");
let addBtn = document.querySelector(".add");
let vacancyAllData = null;
let vacancyAllDataCopy = null;
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

let userNameLocal=localStorage.getItem('userName')
adminName.innerText = `Hello,${
  userNameLocal[0].toLocaleUpperCase() +
  userNameLocal.slice(1).toLocaleLowerCase()
}`;
logOut.addEventListener("click", function () {
localStorage.removeItem("isAdmin");
localStorage.removeItem("userName");
});

async function getALLData() {
  let res = await axios(`${BASE_URL}/vakans`);
  console.log(res.data);
  vacancyAllData = res.data;
  vacancyAllDataCopy = structuredClone(vacancyAllData);
  drawTabel(vacancyAllData);
}
getALLData();
function drawTabel(array) {
  tbody.innerHTML = "";
  array.forEach((el) => {
    let created = el.createdAt.slice(0, 10);
    let updated = el.updatedAt.slice(0, 10);
    tbody.innerHTML += `
    <tr>
    <td><img src="${el.cv}" alt="" style="width: 50px; "></td>
    <td><h5>${el.firstName} ${el.lastName}</h5></td>
    <td><h5>${el.email}</h5></td>
    <td><h5>${el.phone}</h5></td>
    <td><h5>${el.age}</h5></td>
    <td><h5>${el.job}</h5></td>
    <td><h5>${el.city}</h5></td>
    <td><h5>${el.experience}</h5></td>
    <td><h5>${created}</h5></td>
    <td><h5>${updated}</h5></td>
    <td><i class="fa-solid fa-trash" onclick=removeData("${el._id}",this)></i></td>
    <td><i class="fa-solid fa-pen-to-square" onclick=updateData("${el._id}")></i></td>
  </tr>
    `;
  });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let bool =
    jobInput.value === "" ||
    cityInput.value === "" ||
    phoneInput.value === "" ||
    ageInput.value === "" ||
    lastnameInput.value === "" ||
    cvInput.value === "" ||
    emailInput.value === "" ||
    experienceInput.value === "" ||
    firstnameInput.value === "";
  let obj = {
    job: jobInput.value,
    cv: base64,
    phone: phoneInput.value,
    lastName: lastnameInput.value,
    firstName: firstnameInput.value,
    email: emailInput.value,
    experience: experienceInput.value,
    city: cityInput.value,
    age: ageInput.value,
  };
  if (!bool) {
    toastifySuccesful("updated Vcancy succesful");
    putData(editId, obj);
  } else {
    toastifyError("Inputlari bos qoymayin");
  }
  jobInput.value = "";
  phoneInput.value = "";
  lastnameInput.value = "";
  cityInput.value = "";
  ageInput.value = "";
  firstnameInput.value = "";
  emailInput.value = "";
  cvInput.value = "";
  experienceInput.value = "";
});

async function putData(id, obj) {
  await axios.put(`${BASE_URL}/vakans/${id}`, obj);
}

async function removeData(id, icon) {
  if (confirm("Are you sure you want to delete this?")) {
    await axios.delete(`${BASE_URL}/vakans/${id}`);
    icon.closest("tr").remove();
    toastifySuccesful("deleted vacancy succesful");
  }
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

cvInput.addEventListener("change", (e) => {
  uploadImage(e);
});

function updateData(id) {
  let find = vacancyAllData.find((item) => item._id == id);
  // console.log(id);
  editId = id;
  editStatus = true;
  jobInput.value = find.job;
  phoneInput.value = find.phone;
  lastnameInput.value = find.lastName;
  cityInput.value = find.city;
  ageInput.value = find.age;
  firstnameInput.value = find.firstName;
  emailInput.value = find.email;
  cvInput.value = find.cv;
  experienceInput.value = find.experience;
  addBtn.innerText = "Edit";
}

search.addEventListener("input", function (event) {
  let value = event.target.value.toLocaleLowerCase();
  let filtered = vacancyAllData.filter((item) =>
    `${item.firstName} ${item.lastName}`.toLocaleLowerCase().includes(value)
  );
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