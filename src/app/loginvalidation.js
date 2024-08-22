// SEBA.21/8/2024
document.getElementById("loginForm").onsubmit = function (event) {
  event.preventDefault(); // Evita que el formulario se envíe automáticamente

  // Toma la entrada de email y password FE
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  // Valores hardcodeados
  var validEmail = "devfive@itbank.com";
  var validPassword = "devfive";

  // Valida si campos vacios
  if (email === "" || password === "") {
    alert("Por favor, complete todos los campos.");
  }
  // Verifica si el email y la contraseña son correctos
  else if (email === validEmail && password === validPassword) {
    alert("Inicio de sesión exitoso.");
    window.location.href = "./home"; // Redirige a la página de inicio
  }
  // Si los datos que carga formulario no son correctos
  else {
    alert("Usuario o contraseña incorrectos.");
  }
};
