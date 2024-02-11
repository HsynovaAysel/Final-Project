let homeIcon = document.querySelector(".fa-bars");
let xMarkIcon = document.querySelector(".fa-x");
let aside = document.querySelector("aside");

homeIcon.addEventListener('click',function(){
    // console.log('salam');
    aside.classList.toggle('aside')

})
xMarkIcon.addEventListener('click',function(){
    aside.classList.remove('aside')
})