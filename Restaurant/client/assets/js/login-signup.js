let cont = document.querySelector(".cont");
let btnInUp = document.querySelector(".img__btn");

btnInUp.addEventListener("click", function () {
  cont.classList.toggle("s--signup");
});

let formSignUp = document.querySelector("form.sign-up");
let nameInputSignup = document.querySelector("#name-signup");
let emailInputSignup = document.querySelector("#email-signup");
let passwordInputSignup = document.querySelector("#password-signup");
let formSignin = document.querySelector("form.sign-in");
let emailInputSignin = document.querySelector("#email-signin");
let passwordInputSignin = document.querySelector("#password-signin");

let BASE_URL = "http://localhost:8080/users";
let usersAllData = null;
async function getALLData() {
  let res = await axios(`${BASE_URL}`);
  console.log(res.data);
  usersAllData = res.data;
}
getALLData();
formSignUp.addEventListener("submit", async function (e) {
  e.preventDefault();
  let users = {
    email: emailInputSignup.value,
    password: passwordInputSignup.value,
    userName: nameInputSignup.value,
  };

  await axios.post(`${BASE_URL}`, users);
  // emailInputSignup.value=''
  //  passwordInputSignup.value=''
  //  nameInputSignup.value=''
});



formSignin.addEventListener("submit", function (e) {
  e.preventDefault();
  let user = usersAllData.find(
    (item) =>
      item.password === passwordInputSignin.value &&
      item.email === emailInputSignin.value
  );
//   console.log(user);
//   console.log(passwordInputSignin.value);
  if(user){
    window.location="index.html"
    localStorage.setItem('login',true)
  }else{
    alert('bele bir istifadeci yoxdur')
  }
  // passwordInputSignin.value=''
  // emailInputSignin.value=''
});

