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
if (!localStorage.getItem("isAdmin")) {
  window.location = "../login-signup.html";
}
let logOut = document.querySelector(".fa-right-from-bracket");

logOut.addEventListener('click',function(){
    localStorage.removeItem("isAdmin");
})
let form = document.querySelector("form");
let tbody = document.querySelector("tbody");
let nameInput = document.querySelector("#name-input");
let emailInput = document.querySelector("#email-input");
let timeInput = document.querySelector("#time-input");
let phoneInput = document.querySelector("#phone-input");
let personSelect = document.querySelector("#person-select");
let dateInput = document.querySelector("#date-input");

let BASE_URL = "http://localhost:8080/rezervs";
let editId = null;
let editStatus = null;
let errorText = document.querySelector(".error");
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
    } else {
      patchData(editId, obj);
      editStatus = false;
      addBtn.innerText='Add'
    }
  } else {
    errorText.innerText = "Inputlari bos qoymayin";
  }
  nameInput.value = "";
  emailInput.value = "";
  timeInput.value = "";
  personSelect.value = "";
  phoneInput.value = "";
  dateInput.value = "";
});
let rezervAllData = null;
let rezervAllDataCopy = null;
async function getALLData() {
  let res = await axios(`${BASE_URL}`);
  console.log(res.data);
  rezervAllData = res.data;
  rezervAllDataCopy = structuredClone(rezervAllData);
  drawTabel(rezervAllData);
}
getALLData();
function drawTabel(array) {
  tbody.innerHTML = "";
  array.forEach((el) => {
    tbody.innerHTML += `
    <tr>
    <td><h5>${el.userName}</h5></td>
    <td><h5>${el.email}</h5></td>
    <td><h5>${el.date.slice(0, 10)}</h5></td>
    <td><h5>${el.time}</h5></td>
    <td><h5>${el.phone}</h5></td>
    <td><h5>${el.person}</h5></td>
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
  await axios.post(`${BASE_URL}`, obj);
}
async function patchData(id, obj) {
  await axios.put(`${BASE_URL}/${id}`, obj);
}

let addBtn = document.querySelector(".add");
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
