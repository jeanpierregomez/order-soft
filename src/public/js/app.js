const imgBx = document.querySelector('.imgBx');
const slider = imgBx.getElementsByTagName('img');
let i = 0;

setInterval(() => nextSlide(), 4000);
setInterval(() => nextSlideText(), 4000);

function nextSlide() {
    slider[i].classList.remove('active');
    i = (i + 1) % slider.length;
    slider[i].classList.add('active');
}
function prevSlide() {
    slider[i].classList.remove('active');
    i = (i - 1 + slider.length) % slider.length;
    slider[i].classList.add('active');
}

const contentBx = document.querySelector('.contentBx');
const sliderText = contentBx.getElementsByTagName('div');
let j = 0;

function nextSlideText() {
    sliderText[j].classList.remove('active');
    j = (j + 1) % sliderText.length;
    sliderText[j].classList.add('active');
}
function prevSlideText() {
    sliderText[j].classList.remove('active');
    j = (j - 1 + sliderText.length) % sliderText.length;
    sliderText[j].classList.add('active');
}

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("header").style.background = "rgba(0, 0, 0, 0.7)";
    } else {
        document.getElementById("header").style.background = "transparent";
    }
}
// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
function openModal(){
    document.getElementById('id01').style.display="block";
    if (document.getElementById("flogin").style.display == "none") {
        document.getElementById("flogin").style.display = "block";
        document.getElementById("fregister").style.display = "none";
    }
}
function registerModal(){
    document.getElementById("fregister").style.display = "block";
    document.getElementById("flogin").style.display = "none";
    document.getElementById("id01").style.overflow = "hidden";
}
function loginModal(){
    document.getElementById("fregister").style.display = "none";
    document.getElementById("flogin").style.display = "block";
    
}