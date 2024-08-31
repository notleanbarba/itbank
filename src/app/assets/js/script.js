document.getElementById('btn__iniciar-sesion').addEventListener('click', iniciarSesion);
document.getElementById('btn__registrarse').addEventListener('click', register);
window.addEventListener('resize', anchoPage);

var formulario_login = document.querySelector('.formulario__login');
var formulario_register = document.querySelector('.formulario__register');
var contenedor_login_register = document.querySelector('.contenedor__login-register');
var caja__trasera = document.querySelector('.caja__trasera');

//Background
const images = ['./public/login1.jpg', './public/login2.jpg', './public/login3.jpeg'];

let currentIndex = 0;

var contenedorLogin = document.querySelector('.contenedor__todo');
var contenedorRegister = document.querySelector('.contenedor__todo.reverse');

//Las funciones cambian la opacidad del texto de registro y de login

function anchoPage() {
  if (window.innerWidth > 850) {
    caja__trasera.style.display = 'flex';
    caja__trasera.style.display = 'flex';
  } else {
    caja__trasera.style.display = 'flex';
    caja__trasera.style.opacity = '1';
    caja__trasera.style.display = 'none';
    formulario_login.style.display = 'flex';
    contenedor_login_register.style.left = '0px';
    formulario_register.style.display = 'none';
  }
}

anchoPage();

function iniciarSesion() {
  contenedorRegister.classList.add('transition');
  setTimeout(() => {
    contenedorRegister.classList.remove('transition');
    contenedorRegister.classList.add('hidden');
    contenedorLogin.classList.remove('hidden');
    document.getElementById('login-email').focus();
  }, 500);
}

function register() {
  contenedorLogin.classList.add('transition');
  setTimeout(() => {
    contenedorLogin.classList.remove('transition');
    contenedorLogin.classList.add('hidden');
    contenedorRegister.classList.remove('hidden');
    document.getElementById('register-name').focus();
  }, 500);
}

//Background
function changeBackground() {
  document.body.style.backgroundImage = `url(${images[currentIndex]})`;
  currentIndex = (currentIndex + 1) % images.length;
}
setInterval(changeBackground, 10000);

changeBackground();
