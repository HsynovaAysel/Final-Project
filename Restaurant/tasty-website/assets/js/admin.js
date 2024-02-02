let form = document.querySelector("form");
let tbody = document.querySelector("tbody");
let title = document.querySelector("#title");
let price = document.querySelector("#price");
let desc = document.querySelector("#desc");
let image = document.querySelector("#image");
let category = document.querySelector("#category");
let BASE_URL = "http://localhost:8080/menu";
let editId = null;
let editStatus = null;
let errorText = document.querySelector(".error");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let bool =
    image.value === "" ||
    price.value === "" ||
    desc.value === "" ||
    title.value === "" ||
    category.value === "";
  let obj = {
    title: title.value,
    image: image.value,
    desc: desc.value,
    price: price.value,
    caregory: category.value,
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
  image.value = "";
  price.value = "";
  desc.value = "";
  title.value = "";
  category.value = "";
});
let menuAllData = null;
let menuAllDataCopy = null;
async function getALLData() {
  let res = await axios(`${BASE_URL}`);
  console.log(res.data);
  menuAllData = res.data;
  menuAllDataCopy = structuredClone(menuAllData);
  drawTabel(menuAllData);
}
getALLData();
function drawTabel(array) {
  tbody.innerHTML = "";
  array.forEach((el) => {
    tbody.innerHTML += `
    <tr>
    <td>${el.id}</td>
    <td>
      <img
        src="${el.image}"
        alt=""
        style="width: 100px; height: 100px; border-radius: 50%"
      />
    </td>
    <td>${el.title}</td>
    <td>${el.desc}</td>
    <td>${el.price}</td>
    <td>${el.caregory}</td>
    <td><i class="fa-solid fa-trash" onclick=removeData("${el.id}",this)></i></td>
    <td><i class="fa-solid fa-pen-to-square" onclick=updateData("${el.id}")></i></td>
  </tr>
    `;
  });
}
async function postData(obj) {
  await axios.post(`${BASE_URL}`, obj);
}
async function patchData(id, obj) {
  await axios.patch(`${BASE_URL}/${id}`, obj);
}
let addBtn = document.querySelector(".add");
function updateData(id) {
  let find = menuAllData.find((item) => item.id == id);
  editId = id;
  editStatus = true;
  image.value = find.image;
  price.value = find.price;
  desc.value = find.desc;
  title.value = find.title;
  category.value = find.caregory;
  addBtn.className = "btn btn-primary";
  addBtn.innerText = "Edit";
}
let search = document.querySelector("#search");
let sort = document.querySelector(".sort");
search.addEventListener("input", function (event) {
  let value = event.target.value;
  let filtered = menuAllData.filter((item) => item.caregory.includes(value));
  drawTabel(filtered);
});
async function removeData(id, icon) {
  if (confirm("data silinsin??")) {
    await axios.delete(`${BASE_URL}/${id}`);
    icon.closest("tr").remove();
  }
}
sort.addEventListener("click", function () {
  let sorted = [];

  if (this.innerText === "ASC") {
    sorted = menuAllData.sort((a, b) => a.price - b.price);
    this.innerText = "DESC";
  } else if (this.innerText === "DESC") {
    sorted = menuAllData.sort((a, b) => b.price - a.price);
    this.innerText = "DEFAULT";
  } else {
    sorted = menuAllDataCopy;
    this.innerText = "ASC";
  }
  drawTabel(sorted);
});
let goBackBtn = document.querySelector(".go-back");
goBackBtn.addEventListener("click", function () {
  window.location = "index.html";
});
