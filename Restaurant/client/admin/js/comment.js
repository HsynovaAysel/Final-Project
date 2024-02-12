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
  let tbody = document.querySelector("tbody");
let BASE_URL = "http://localhost:8080/messages";
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
     
      <td><h5>${el.userName}</h5></td>
      <td><h5>${el.email}</h5></td>
      <td><h5>${el.subject}</h5></td>
      <td><h5>${el.phone}</h5></td>
      <td><h5>${el.message}</h5></td>
      <td><i class="fa-solid fa-trash" onclick=removeData("${el._id}",this)></i></td>

    </tr>
      `;
  });
}async function removeData(id, icon) {
    if (confirm("data silinsin??")) {
      await axios.delete(`${BASE_URL}/${id}`);
      icon.closest("tr").remove();
    }
  }