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

//Scroll back to top
(function ($) {
  "use strict";

  $(document).ready(function () {
    "use strict";

    var progressPath = document.querySelector(".progress-wrap path");
    var pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition =
      "none";
    progressPath.style.strokeDasharray = pathLength + " " + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition =
      "stroke-dashoffset 10ms linear";
    var updateProgress = function () {
      var scroll = $(window).scrollTop();
      var height = $(document).height() - $(window).height();
      var progress = pathLength - (scroll * pathLength) / height;
      progressPath.style.strokeDashoffset = progress;
    };
    updateProgress();
    $(window).scroll(updateProgress);
    var offset = 50;
    var duration = 550;
    jQuery(window).on("scroll", function () {
      if (jQuery(this).scrollTop() > offset) {
        jQuery(".progress-wrap").addClass("active-progress");
      } else {
        jQuery(".progress-wrap").removeClass("active-progress");
      }
    });
    jQuery(".progress-wrap").on("click", function (event) {
      event.preventDefault();
      jQuery("html, body").animate({ scrollTop: 0 }, duration);
      return false;
    });
  });
})(jQuery);
const spinner = document.querySelector(".spinner-loader");
const main = document.querySelector("main");
const candoreAside = document.querySelector("#candore-aside");
const navbar = document.querySelector(".navbar");
const pagesList = document.querySelector("#pages");
const pagesUl = document.querySelector(".pages");

let logOut = document.querySelector(".fa-right-to-bracket");
logOut.addEventListener("click", function () {
  localStorage.setItem("login", false);
});
let login = localStorage.getItem("login");
if (login === "false") {
  logOut.style.display = "none";
} else {
  logOut.style.display = "inline-block";
}

main.style.display = "block";
candoreAside.style.display = "flex";
// setTimeout(() => {
//   spinner.style.display = "none";

// }, 1000);

navbar.addEventListener("click", function () {
  candoreAside.classList.toggle("aside");
  navbar.classList.toggle("menu-icon");
});
pagesList.addEventListener("click", function () {
  pagesUl.classList.toggle("pages-ul");
});

let rezervForm = document.querySelector(".form-rezerv");
let rezervNameInput = document.querySelector("#rezerv-name");
let rezervPhoneInput = document.querySelector("#rezerv-phone");
let rezervEmailInput = document.querySelector("#rezerv-email");
let rezervDateInput = document.querySelector("#rezerv-date");
let rezervTimeInput = document.querySelector("#rezerv-time");
let rezervPersonSelect = document.querySelector("#rezerv-person");
let reservsData = null;

async function getRezervsData() {
  let res = await axios(`http://localhost:8080/rezervs`);
  console.log(res.data);
  reservsData = res.data;
}
getRezervsData();
rezervForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  let rezervsObj = {
    userName: rezervNameInput.value,
    email: rezervEmailInput.value,
    date: rezervDateInput.value,
    time: rezervTimeInput.value,
    phone: rezervPhoneInput.value,
    person: rezervPersonSelect.value,
  };
  // console.log(rezervDateInput.value);
  let bool = reservsData.find(
    (item) =>
      rezervTimeInput.value == item.time ||
      rezervDateInput.value == item.date.slice(0, 10)
  );
  console.log(bool);
  if (login === "true") {
    if (!bool) {
      await axios.post(`http://localhost:8080/rezervs`, rezervsObj);
    } else {
      alert("bu vaxta bos yer yoxdur.");
    }
  } else {
    window.location = "login-signup.html";
  }

  (rezervNameInput.value = ""),
    (rezervEmailInput.value = ""),
    (rezervDateInput.value = ""),
    (rezervTimeInput.value = ""),
    (rezervPhoneInput.value = ""),
    (rezervPersonSelect.value = "");
});
let vakanForm = document.querySelector("form.vakan-form");
let lastnameVakanInput = document.querySelector("#lastname-vakan");
let firstnameVakanInput = document.querySelector("#firstname-vakan");
let emailVakanInput = document.querySelector("#email-vakan");
let phoneVakanInput = document.querySelector("#phone-vakan");
let ageVakanInput = document.querySelector("#age-vakan");
let jobVakanSelect = document.querySelector("#job-vakan");
let cityVakanSelect = document.querySelector("#city-vakan");
let cvVakanInput = document.querySelector("#cv-vakan");
let experienceTextarea = document.querySelector("#experience-vakan");
let base64;
vakanForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  let vakanObj = {
    lastName: lastnameVakanInput.value,
    firstName: firstnameVakanInput.value,
    email: emailVakanInput.value,
    phone: phoneVakanInput.value,
    age: ageVakanInput.value,
    job: jobVakanSelect.value,
    city: cityVakanSelect.value,
    cv: base64,
    experience: experienceTextarea.value,
  };
  if (login === "true") {
    await axios.post(`http://localhost:8080/vakans`, vakanObj);
  } else {
    window.location = "login-signup.html";
  }

  (lastnameVakanInput.value = ""),
    (firstnameVakanInput.value = ""),
    (emailVakanInput.value = ""),
    (phoneVakanInput.value = ""),
    (ageVakanInput.value = ""),
    (jobVakanSelect.value = ""),
    (cityVakanSelect.value = ""),
    (experienceTextarea.value = "");
});
const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

const uploadImage = async (event) => {
  const file = event.target.files[0];
  base64 = await convertBase64(file);
};

cvVakanInput.addEventListener("change", (e) => {
  uploadImage(e);
});
let announcementTbody = document.querySelector(".announcement-body");
async function getAllAnnouncementData() {
  let res = await axios(`http://localhost:8080/announcement`);
  drawAnnouncementTabel(res.data);
}
getAllAnnouncementData();

function drawAnnouncementTabel(array) {
  announcementTbody.innerHTML = "";
  array.forEach((el) => {
    announcementTbody.innerHTML += `
    <tr>
    <td><h5>${el.job}</h5></td>
    <td><h5>${el.salary}</h5></td>
    <td><h5>${el.hours}</h5></td>
    <td><h5>${el.city}</h5></td>
    <td><h5>${el.contact}</h5></td>
    <td><h5>${el.age}</h5></td>
  </tr>
    `;
  });
}
const count = document.querySelector(".count-basket");
let basketCount = JSON.parse(localStorage.getItem("basketCount")) ?? 0;
count.innerText = basketCount;
