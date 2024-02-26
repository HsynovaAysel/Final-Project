//Toastify
function toastifySuccesful(text) {
  Toastify({
    text: text,
    duration: 3000,
    newWindow: true,
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
let BASE_URL = "https://restaurant-crud.onrender.com";
let form = document.querySelector("form");
let cardNumber = document.querySelector(".card-number-input");
let cardHolder = document.querySelector(".card-holder-input");
let cardMonth = document.querySelector(".month-input");
let cardYear = document.querySelector(".year-input");
let cardCvv = document.querySelector(".cvv-input");
let login = localStorage.getItem("login");
let basket = getFromlocalStorageBasket();
cardNumber.oninput = () => {
  document.querySelector(".card-number-box").innerText = cardNumber.value;
};
cardHolder.oninput = () => {
  document.querySelector(".card-holder-name").innerText = cardHolder.value;
};
cardMonth.oninput = () => {
  document.querySelector(".exp-month").innerText = cardMonth.value;
};
cardYear.oninput = () => {
  document.querySelector(".exp-year").innerText = cardYear.value;
};
// cardCvv.oninput = () => {
//   document.querySelector(".cvv-box").innerText = `${
//     cardCvv.type === "password" ? "***" : cardCvv.value
//   }`;
// };
cardCvv.onmouseenter = () => {
  document.querySelector(".front").style.transform =
    "perspective(1000px) rotateY(-180deg)";
  document.querySelector(".back").style.transform =
    "perspective(1000px) rotateY(0deg)";
};
cardCvv.onmouseleave = () => {
  document.querySelector(".front").style.transform =
    "perspective(1000px) rotateY(0deg)";
  document.querySelector(".back").style.transform =
    "perspective(1000px) rotateY(180deg)";
};

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  let obj = {
    cardHolder: cardHolder.value,
    cardMonth: cardMonth.value,
    cardYear: cardYear.value,
    cardCvv: cardCvv.value,
    cardNumber: cardNumber.value,
  };
  if (login === "true") {
    if (basket.length > 0) {
      await axios.post(`${BASE_URL}/card`, obj);
      toastifySuccesful("successfully ");
    } else {
      toastifyError("basketinde erzaq yoxdur");
    }
  } else {
    window.location = "login-signup.html";
  }

  cardHolder.value = "";
  cardNumber.value = "";
  cardMonth.value = "";
  cardYear.value = "";
  cardCvv.value = "";
  setTolocalStorageBasket([]);
});

function setTolocalStorageBasket(array) {
  localStorage.setItem("basket", JSON.stringify(array));
}
function getFromlocalStorageBasket() {
  return JSON.parse(localStorage.getItem("basket")) ?? [];
}

let eyeIcon = document.querySelector(".fa-eye");
eyeIcon.addEventListener("click", function () {
  if (this.className === "fa-solid fa-eye") {
    cardCvv.type = "text";
    this.className = "fa-solid fa-eye-slash";
  } else {
    cardCvv.type = "password";
    this.className = "fa-solid fa-eye";
  }
});
