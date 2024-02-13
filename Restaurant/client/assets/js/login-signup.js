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
let errorText = document.querySelector(".error");
let BASE_URL = "http://localhost:8080";
let usersAllData = null;

formSignUp.addEventListener("submit", async function (e) {
  e.preventDefault();
  let users = {
    email: emailInputSignup.value.toLocaleLowerCase(),
    password: passwordInputSignup.value,
    userName: nameInputSignup.value,
  };

  if (passwordInputSignup.value.length>=8) {
   try {
    const response = await axios.post(`${BASE_URL}/signUp`, users);
    if (response.status === 200) {
      window.location = "login-signup.html";
    }
  } catch (error) {
    Toastify({
      text: "bu mail artiq istifade olunub",
      duration: 3000,
      newWindow: true,
      gravity: "top", // `top` or `bottom`
      positionLeft: false, // `true` or `false`
      backgroundColor: "#ff0000",
    }).showToast();
  }
  }else{
    Toastify({
      text: "simvol sayi 8den cox olmalidir ",
      duration: 3000,
      newWindow: true,
      gravity: "top", // `top` or `bottom`
      positionLeft: false, // `true` or `false`
      backgroundColor: "#ff0000",
    }).showToast();
  }
  
  emailInputSignup.value = "";
  passwordInputSignup.value = "";
  nameInputSignup.value = "";
});

formSignin.addEventListener("submit", async function (e) {
  e.preventDefault();
  let users = {
    email: emailInputSignin.value.toLocaleLowerCase(),
    password: passwordInputSignin.value,
  };
  // console.log(obj);
  try {
    const response = await axios.post(`${BASE_URL}/signIn`, users);
    console.log(response);
    if (response.status === 200) {
      if (!response.data.userInfo.isAdmin) {
        window.location.href = "index.html";
        localStorage.setItem("login", true);
      } else {
        localStorage.setItem("isAdmin", true);
        window.location.href = "admin/admin.html";
      }
    }
  } catch (error) {
    Toastify({
      text: "bele bir istifadeci yoxdur",
      duration: 3000,
      newWindow: true,
      gravity: "top", // `top` or `bottom`
      positionLeft: false, // `true` or `false`
      backgroundColor: "#ff0000",
    }).showToast();
  }

  passwordInputSignin.value = "";
  emailInputSignin.value = "";
});

let eyeAllIcon = document.querySelectorAll(".fa-eye");
eyeAllIcon.forEach((eyeIcon) => {
  eyeIcon.addEventListener("click", function () {
    passwordInputSignin.type = "password";
    passwordInputSignup.type = "password";
    if (this.className === "fa-solid fa-eye") {
      passwordInputSignin.type = "text";
      passwordInputSignup.type = "text";
      this.className = "fa-solid fa-eye-slash";
    } else {
      passwordInputSignin.type = "password";
      passwordInputSignup.type = "password";
      this.className = "fa-solid fa-eye";
    }
  });
});
