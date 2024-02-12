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