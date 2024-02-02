let id =new URLSearchParams(window.location.search).get('id')
let BASE_URL = "http://localhost:8080/menu";
console.log(id);
let menuAllData = null;
let menuCardLists = document.querySelector(".menu-card-lists");
async function getALLDataById() {
  let res = await axios(`${BASE_URL}/${id}`);
  console.log(res.data);
  menuAllData = res.data;

  menuCardLists.innerHTML = `
          <div class="menu-card">
                <div class="img">
                  <img src="${menuAllData.image}" alt="" />
                </div>
                <div class="menu-text">
                  <h5>${menuAllData.title}</h5>
                  <p>${menuAllData.desc}</p>
                
                  </div> 
                <h4>$${menuAllData.price}</h4>
              </div>
          `;
}
getALLDataById();