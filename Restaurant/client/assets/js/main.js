$(".owl-carousel").owlCarousel({
  loop: true,
  responsiveClass: true,
  autoplayTimeout: 10000,
  nav: true,
  smartSpeed: 2000,
  autoplay: true,
  responsive: {
    0: {
      items: 1,
      // nav:true
    },
    600: {
      items: 1,
      // nav:false
    },
    1000: {
      items: 1,
      // nav:false,
      // loop:false
    },
  },
});

const spinner = document.querySelector(".spinner-loader");
const main = document.querySelector("main");
const aside = document.querySelector("aside");
const navbar = document.querySelector(".navbar");
main.style.display = "block";
aside.style.display = "flex";
// setTimeout(() => {
//   spinner.style.display = "none";

// }, 1000);

// navbar.addEventListener("click", function () {
//   console.log("salam");
// });
