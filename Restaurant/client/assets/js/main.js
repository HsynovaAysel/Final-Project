$(".owl-carousel").owlCarousel({
  loop: true,
  responsiveClass: true,
  autoplayTimeout: 10000,

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
const spinner = document.querySelector("#spinner");
window.addEventListener("load", function () {
  setTimeout(() => {
    spinner.style.visibility = "hidden";
  }, 3000);
});
