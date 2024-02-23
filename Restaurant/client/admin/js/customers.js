let BASE_URL = "https://restaurant-crud.onrender.com";
let form = document.querySelector("form");
let tbody = document.querySelector("tbody");
let nameInput = document.querySelector("#name-input");
let emailInput = document.querySelector("#email-input");
let passwordInput = document.querySelector("#password-input");
let aside = document.querySelector("aside");
let xMarkIcon = document.querySelector(".fa-x");
let homeIcons = document.querySelectorAll(".fa-bars");
let homeIconScroll = document.querySelector(".home-icon");
let menuIconScroll = document.querySelector(".menu-icon");
let header=document.querySelector('header')
let logOut = document.querySelector(".fa-right-from-bracket");
let adminName = document.querySelector("#admin-name");
let addBtn = document.querySelector(".add");
let search = document.querySelector("#search");
let userAllData = null;
let findAdmin = null;
let editId = null;
let editStatus = null;


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
  let bool = nameInput.value === "" || emailInput.value === "";
  let obj = {
    userName: nameInput.value,
    email: emailInput.value,
    isAdmin: false,
    password: passwordInput.value,
  };
  if (!bool) {
    if (!editStatus) {
      postData(obj);
      toastifySuccesful("created users successfully");
    } else {
      putData(editId, obj);
      editStatus = false;
      toastifySuccesful("updated Users successfully");
    }
  } else {
    toastifyError("Inputlari bos qoymayin");
  }
  nameInput.value = "";
  emailInput.value = "";
});

async function getALLData() {
  let res = await axios(`${BASE_URL}/users`);
  console.log(res.data);
  userAllData = res.data;
  drawTabel(userAllData);
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
    <td><h5>${el.isAdmin} <i class="fa-solid fa-rotate-right" onclick=rotateAdmin("${el._id}")></i></h5> </td>
    <td><h5>${created}</h5></td>
    <td><i class="fa-solid fa-trash" onclick=removeData("${el._id}",this)></i></td>

  </tr>
    `;
  });
}
async function postData(obj) {
  const response = await axios.post(`${BASE_URL}/users`, obj);
  // console.log(response);
  drawTabel(response.data.allData);
}
async function putData(id, obj) {
  let response = await axios.put(`${BASE_URL}/users/${id}`, obj);
  drawTabel(response.data.allData);
}
async function rotateAdmin(id) {
  let find = userAllData.find((item) => item._id == id);
  let obj = {
    userName: find.userName,
    email: find.email,
    isAdmin: find.isAdmin ? false : true,
  };
  editId = id;
  if (confirm("deyismeye eminsiniz??")) {
    putData(editId, obj);
    toastifySuccesful("updated isAdmin successfully");
  }
}
async function removeData(id, icon) {
  if (confirm("Are you sure you want to delete this?")) {
    await axios.delete(`${BASE_URL}/users/${id}`);
    icon.closest("tr").remove();
    toastifySuccesful("deleted users successfully");
  }
}
search.addEventListener("input", function (event) {
  let value = event.target.value.toLocaleLowerCase();
  let filtered = userAllData.filter((item) => item.email.toLocaleLowerCase().includes(value));
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
