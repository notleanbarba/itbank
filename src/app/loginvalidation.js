document.getElementById("loginForm").onsubmit = function(event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    // Obtén los valores de los campos de entrada
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Credenciales correctas
    var validEmail = "devfive@itbank.com";
    var validPassword = "devfive";

    // Verifica si los campos están vacíos
    if (email === "" || password === "") {
        alert("Por favor, complete todos los campos.");
    }
    // Verifica si el email y la contraseña son correctos
    else if (email === validEmail && password === validPassword) {
        alert("Inicio de sesión exitoso.");
        window.location.href = "/home"; // Redirige a la página de inicio
    }
    // Si las credenciales no son correctas
    else {
        alert("Usuario o contraseña incorrectos.");
    }
};
