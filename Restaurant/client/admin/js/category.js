let BASE_URL = "http://localhost:8080";
let header=document.querySelector('header')
let homeIcons = document.querySelectorAll(".fa-bars");
let homeIconScroll = document.querySelector(".home-icon");
let menuIconScroll = document.querySelector(".menu-icon");
let xMarkIcon = document.querySelector(".fa-x");
let aside = document.querySelector("aside");
let userAllData = null;
let findAdmin = null;
let adminName = document.querySelector("#admin-name");
let logOut = document.querySelector(".fa-right-from-bracket");
// let search = document.querySelector("#search");
let form = document.querySelector("form");
let tbody = document.querySelector("tbody");
let editId = null;
let editStatus = null;
let addBtn = document.querySelector(".add");
let menuAllData = null;
let menuAllDataCopy = null;
let nameInput = document.querySelector("#name-input");
let itemInput = document.querySelector("#item-input");
let descriptionInput = document.querySelector("#description-input");
let priceInput = document.querySelector("#price-input");
let categoryInput = document.querySelector("#category-input");
let base64=null;
// let sort = document.querySelector(".sort");
let menuBtnAll = document.querySelectorAll(".menu-button");





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
  let res = await axios(`${BASE_URL}/menus`);
  console.log(res.data);
  menuAllData = res.data;
  menuAllDataCopy = structuredClone(menuAllData);
  drawTabel(menuAllData);
}
getALLData();
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let bool =
    itemInput.value === "" ||
    nameInput.value === "" ||
    priceInput.value === "" ||
    categoryInput.value === "" ||
    descriptionInput.value === "";
  let obj = {
    image: base64,
    title: nameInput.value,
    price: priceInput.value,
    description: descriptionInput.value,
    category: categoryInput.value,
  };
  if (!bool) {
    if (!editStatus) {
      postData(obj);
      toastifySuccesful("created menu succesful");
    } else {
      putData(editId, obj);
      editStatus = false;
      addBtn.innerText = "Add";
      toastifySuccesful("updated menu succesful");
    }
  } else {
    toastifyError("Inputlari bos qoymayin");
  }
  itemInput.value = "";
  nameInput.value = "";
  priceInput.value = "";
  descriptionInput.value = "";
  categoryInput.value = "";
});

function drawTabel(array) {
  tbody.innerHTML = "";
  array.forEach((el) => {
    tbody.innerHTML += `
      <tr>
      <td><img src="${el.image}" alt=""  style="width: 50px;"></td>
      <td><h5>${el.title}</h5></td>
      <td><h5>${el.category}</h5></td>
      <td><h5>${el.description}</h5></td>
      <td><h5>${el.price}$</h5></td>
      <td><i class="fa-solid fa-trash" onclick=removeData("${el._id}",this)></i></td>
      <td><i class="fa-solid fa-pen-to-square" onclick=updateData("${el._id}")></i></td>
    </tr>
      `;
  });
}
async function postData(obj) {
  let response = await axios.post(`${BASE_URL}/menus`, obj);
  drawTabel(response.data.allData);
}
async function putData(id, obj) {
  let response = await axios.put(`${BASE_URL}/menus/${id}`, obj);
  drawTabel(response.data.allData);
}

async function removeData(id, icon) {
  if (confirm("Are you sure you want to delete this?")) {
    await axios.delete(`${BASE_URL}/menus/${id}`);
    icon.closest("tr").remove();
    toastifySuccesful("deleted menu succesful");
  }
}
function updateData(id) {
  let find = menuAllData.find((item) => item._id == id);
  // console.log(id);
  editId = id;
  editStatus = true;
  // itemInput.value = find.image;
  nameInput.value = find.title;
  priceInput.value = find.price;
  descriptionInput.value = find.description;
  categoryInput.value = find.category;
  addBtn.innerText = "Edit";
}

menuBtnAll.forEach((item) =>
  item.addEventListener("click", function () {
    document.querySelector(".button-active").classList.remove("button-active");
    this.classList.add("button-active");
    let filtered = menuAllData.filter(
      (item) =>
        item.category.toLocaleLowerCase() ===
          this.innerText.toLocaleLowerCase() || this.innerText === "All"
    );
    drawTabel(filtered);
  })
);
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

itemInput.addEventListener("change", (e) => {
  uploadImage(e);
});


search.addEventListener("input", function (event) {
  let value = event.target.value.toLocaleLowerCase();
  let filtered = menuAllData.filter((item) => item.title.toLocaleLowerCase().includes(value));
  drawTabel(filtered);
});
