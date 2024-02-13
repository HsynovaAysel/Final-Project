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
  window.location = "login-signup.html";
}
let logOut = document.querySelector(".fa-right-from-bracket");

logOut.addEventListener('click',function(){
    localStorage.removeItem("isAdmin");
})
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
let BASE_URL = "http://localhost:8080/vakans";
let editId = null;
let editStatus = null;
let base64;
let errorText = document.querySelector(".error");
let addBtn = document.querySelector(".add");
let vacancyAllData = null;
let vacancyAllDataCopy = null;
async function getALLData() {
  let res = await axios(`${BASE_URL}`);
  console.log(res.data);
  vacancyAllData = res.data;
  vacancyAllDataCopy = structuredClone(vacancyAllData);
  drawTabel(vacancyAllData);
}
getALLData();
function drawTabel(array) {
  tbody.innerHTML = "";
  array.forEach((el) => {
    tbody.innerHTML += `
    <tr>
    <td><img src="" alt="" style="width: 50px; "></td>
    <td><h5>${el.firstName} ${el.lastName}</h5></td>
    <td><h5>${el.email}</h5></td>
    <td><h5>${el.phone}</h5></td>
    <td><h5>${el.age}</h5></td>
    <td><h5>${el.job}</h5></td>
    <td><h5>${el.city}</h5></td>
    <td><h5>${el.experience}</h5></td>
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
    // cvInput.value === "" ||
    emailInput.value === "" ||
    experienceInput.value === "" ||
    firstnameInput.value === "";
  let obj = {
    job: jobInput.value,
    // cv: base64,
    phone: phoneInput.value,
    lastName: lastnameInput.value,
    firstName: firstnameInput.value,
    email: emailInput.value,
    experience: experienceInput.value,
    city: cityInput.value,
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
  phoneInput.value = "";
  lastnameInput.value = "";
  cityInput.value = "";
  ageInput.value = "";
  firstnameInput.value = "";
  emailInput.value = "";
  // cvInput.value = "";
  experienceInput.value = "";
});
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
  // cvInput.value = find.cv;
  experienceInput.value = find.experience;
  addBtn.innerText = "Edit";
}
