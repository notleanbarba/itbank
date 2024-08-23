document.getElementById("loginForm").onsubmit = function(event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    // Toma la entrada de email y password FE
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Valores hardcodeados
    var validEmail = "devfive@itbank.com";
    var validPassword = "devfive";

    // Función para mostrar el toast
    function showToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast ${type} show`;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.remove('show');
            document.body.removeChild(toast);
        }, 3000);
    }

    // Valida si campos vacíos
    if (email === "" || password === "") {
        showToast("Por favor, completa todos los campos.", "warning");
    }
    // Verifica si el email y la contraseña son correctos
    else if (email === validEmail && password === validPassword) {
        showToast("Inicio de sesión exitoso.", "success");
        setTimeout(() => {
            window.location.href = "./home"; // Redirige a la página de inicio
        }, 1000);
    }
    // Si los datos que carga formulario no son correctos
    else {
        showToast("Usuario o contraseña incorrectos.", "error");
    }
};

