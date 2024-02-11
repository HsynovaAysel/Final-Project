let homeIcon = document.querySelector(".fa-bars");
let xMarkIcon = document.querySelector(".fa-x");
let aside = document.querySelector("aside");

homeIcon.addEventListener("click", function () {
  // console.log('salam');
  aside.classList.toggle("aside");
});
xMarkIcon.addEventListener("click", function () {
  aside.classList.remove("aside");
});

let form = document.querySelector("form");
let tbody = document.querySelector("tbody");
let nameInput = document.querySelector("#name-input");
let emailInput = document.querySelector("#email-input");
let passwordInput = document.querySelector("#password-input");

let BASE_URL = "http://localhost:8080/users";
let editId = null;
let editStatus = null;
let errorText = document.querySelector(".error");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let bool =
    nameInput.value === "" ||
    passwordInput.value === "" ||
    emailInput.value === "";
  let obj = {
    userName: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  };
  if (!bool) {
    if (!editStatus) {
      postData(obj);
    } else {
      patchData(editId, obj);
      editStatus = false;
    }
  } else {
    errorText.innerText = "Inputlari bos qoymayin";
  }
  nameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
});
let userAllData = null;
let userAllDataCopy = null;
async function getALLData() {
  let res = await axios(`${BASE_URL}`);
  console.log(res.data);
  userAllData = res.data;
  userAllDataCopy = structuredClone(userAllData);
  drawTabel(userAllData);
}
getALLData();
function drawTabel(array) {
  tbody.innerHTML = "";
  array.forEach((el) => {
    tbody.innerHTML += `
    <tr>
    <td><h5>${el.userName}</h5></td>
    <td><h5>${el.email}</h5></td>
    
    <td><i class="fa-solid fa-trash" onclick=removeData("${el._id}",this)></i></td>
    <td><i class="fa-solid fa-pen-to-square" onclick=updateData("${el._id}")></i></td>
  </tr>
    `;
  });
}
async function postData(obj) {
  await axios.post(`${BASE_URL}`, obj);
}
async function patchData(id, obj) {
  await axios.put(`${BASE_URL}/${id}`, obj);
}

let addBtn = document.querySelector(".add");
function updateData(id) {
  let find = userAllData.find((item) => item._id == id);
  console.log(id);
  editId = id;
  editStatus = true;
  nameInput.value = find.userName;
  emailInput.value = find.email;
  passwordInput.value = find.password;
  addBtn.innerText = "Edit";
}

async function removeData(id, icon) {
  if (confirm("data silinsin??")) {
    await axios.delete(`${BASE_URL}/${id}`);
    icon.closest("tr").remove();
  }
}
// let search = document.querySelector("#search");
// let sort = document.querySelector(".sort");
// search.addEventListener("input", function (event) {
//   let value = event.target.value;
//   let filtered = menuAllData.filter((item) => item.caregory.includes(value));
//   drawTabel(filtered);
// });
// sort.addEventListener("click", function () {
//   let sorted = [];

//   if (this.innerText === "ASC") {
//     sorted = menuAllData.sort((a, b) => a.price - b.price);
//     this.innerText = "DESC";
//   } else if (this.innerText === "DESC") {
//     sorted = menuAllData.sort((a, b) => b.price - a.price);
//     this.innerText = "DEFAULT";
//   } else {
//     sorted = menuAllDataCopy;
//     this.innerText = "ASC";
//   }
//   drawTabel(sorted);
// });
// let goBackBtn = document.querySelector(".go-back");
// goBackBtn.addEventListener("click", function () {
//   window.location = "index.html";
// });
