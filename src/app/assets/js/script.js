document.getElementById("btn__iniciar-sesion").addEventListener("click", iniciarSesion);
document.getElementById("btn__registrarse").addEventListener("click", register);
window.addEventListener("resize", anchoPage);

var formulario_login = document.querySelector(".formulario__login");
var formulario_register = document.querySelector(".formulario__register");
var contenedor_login_register = document.querySelector(
  ".contenedor__login-register",
);
var caja__trasera_login = document.querySelector(".caja__trasera_login");
var caja__trasera_register = document.querySelector(".caja__trasera_register");

//Background
const images = [
  './public/login1.jpg',
  './public/login2.jpg',
  './public/login3.jpeg'
];

let currentIndex = 0;

//Las funciones cambian la opacidad del texto de registro y de login

function anchoPage() {
  if (window.innerWidth > 850) {
    caja__trasera_register.style.display = "block";
    caja__trasera_login.style.display = "block";
  } else {
    caja__trasera_register.style.display = "block";
    caja__trasera_register.style.opacity = "1";
    caja__trasera_login.style.display = "none";
    formulario_login.style.display = "block";
    contenedor_login_register.style.left = "0px";
    formulario_register.style.display = "none";
  }
}

anchoPage();

function iniciarSesion() {
  if (window.innerWidth > 850) {
    formulario_login.style.display = "block";
    contenedor_login_register.style.left = "10px";
    formulario_register.style.display = "none";
    caja__trasera_register.style.opacity = "1";
    caja__trasera_login.style.opacity = "0";
  } else {
    formulario_login.style.display = "block";
    contenedor_login_register.style.left = "0px";
    formulario_register.style.display = "none";
    caja__trasera_register.style.display = "block";
    caja__trasera_login.style.display = "none";
  }
}

function register() {
  if (window.innerWidth > 850) {
    formulario_register.style.display = "block";
    contenedor_login_register.style.left = "410px";
    formulario_login.style.display = "none";
    caja__trasera_register.style.opacity = "0";
    caja__trasera_login.style.opacity = "1";
  } else {
    formulario_register.style.display = "block";
    contenedor_login_register.style.left = "0px";
    formulario_login.style.display = "none";
    caja__trasera_register.style.display = "none";
    caja__trasera_login.style.display = "block";
    caja__trasera_login.style.opacity = "1";
  }
}

//Background
function changeBackground() {
  document.body.style.backgroundImage = `url(${images[currentIndex]})`;
  currentIndex = (currentIndex + 1) % images.length;
}
setInterval(changeBackground, 10000);

changeBackground();
