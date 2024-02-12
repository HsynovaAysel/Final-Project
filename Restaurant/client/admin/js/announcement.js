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
let jobInput = document.querySelector("#job-input");
let salaryInput = document.querySelector("#salary-input");
let hoursInput = document.querySelector("#hours-input");
let cityInput = document.querySelector("#city-input");
let contactInput = document.querySelector("#contact-input");
let ageInput = document.querySelector("#age-input");
let BASE_URL = "http://localhost:8080/announcement";
let editId = null;
let editStatus = null;
let errorText = document.querySelector(".error");
let addBtn = document.querySelector(".add");
let announcementAllData = null;
let announcementAllDataCopy = null;

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
    } else {
      patchData(editId, obj);
      editStatus = false;
    }
  } else {
    errorText.innerText = "Inputlari bos qoymayin";
  }
  jobInput.value = "";
  hoursInput.value = "";
  salaryInput.value = "";
  cityInput.value = "";
  ageInput.value = "";
  contactInput.value = "";
});

async function getALLData() {
  let res = await axios(`${BASE_URL}`);
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
  await axios.post(`${BASE_URL}`, obj);
}
async function patchData(id, obj) {
  await axios.put(`${BASE_URL}/${id}`, obj);
}

async function removeData(id, icon) {
  if (confirm("data silinsin??")) {
    await axios.delete(`${BASE_URL}/${id}`);
    icon.closest("tr").remove();
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
