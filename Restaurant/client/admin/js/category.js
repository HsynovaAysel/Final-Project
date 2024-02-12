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
let BASE_URL = "http://localhost:8080/menus";
let editId = null;
let editStatus = null;
let errorText = document.querySelector(".error");
let addBtn = document.querySelector(".add");
let menuAllData = null;
let menuAllDataCopy = null;
let nameInput = document.querySelector("#name-input");
let itemInput = document.querySelector("#item-input");
let descriptionInput = document.querySelector("#description-input");
let priceInput = document.querySelector("#price-input");
let categoryInput = document.querySelector("#category-input");

async function getALLData() {
  let res = await axios(`${BASE_URL}`);
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
    image: itemInput.value,
    title: nameInput.value,
    price: priceInput.value,
    description: descriptionInput.value,
    category: categoryInput.value,
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
  itemInput.value = "";
  nameInput.value = "";
  priceInput.value = "";
  descriptionInput.value = "";
  categoryInput.value=''
});


function drawTabel(array) {
  tbody.innerHTML = "";
  array.forEach((el) => {
    tbody.innerHTML += `
      <tr>
      <td><img src="${el.image}" alt=""  style="width: 50px;"></td>
      <td><h5>${el.title}</h5></td>
      <td><h5>${el.description}</h5></td>
      <td><h5>${el.price}$</h5></td>
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
  menuBtnAll = document.querySelectorAll(".menu-button");
menuBtnAll.forEach((item) =>
  item.addEventListener("click", function () {
    document.querySelector(".button-active").classList.remove("button-active");
    this.classList.add("button-active");
    let filtered = menuAllData.filter(
      (item) =>
        item.category.toLocaleLowerCase() === this.innerText.toLocaleLowerCase() || this.innerText==='All'
    );
    drawTabel(filtered);
  })
);