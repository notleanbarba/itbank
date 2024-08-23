document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const toast = document.getElementById("toast");

    // Función para mostrar el toast con un mensaje específico y tipo (success, error, warning)
    function showToast(message, type = 'warning') {
        toast.textContent = message; // Establece el mensaje del toast
        toast.className = `toast show ${type}`; // Añade las clases necesarias para mostrar el toast

        // Después de 3 segundos, oculta el toast
        setTimeout(function() {
            toast.className = 'toast'; // Elimina las clases para ocultar el toast
        }, 3000);
    }

    // Maneja el evento de envío del formulario
    loginForm.onsubmit = function(event) {
        event.preventDefault(); // Evita que el formulario se envíe automáticamente

        // Toma la entrada de email y password
        var email = document.getElementById("email").value.trim();
        var password = document.getElementById("password").value.trim();

        // Valores hardcodeados para la validación
        var validEmail = "devfive@itbank.com";
        var validPassword = "devfive";

        // Valida si campos vacíos
        if (email === "" || password === "") {
            showToast("Por favor, completa todos los campos.", "warning");
        }
        // Verifica si el email y la contraseña son correctos
        else if (email === validEmail && password === validPassword) {
            showToast("Inicio de sesión exitoso.", "success");
            setTimeout(function() {
                window.location.href = "./home"; // Redirige a la página de inicio
            }, 1000);
        }
        // Si los datos son incorrectos
        else {
            showToast("Usuario o contraseña incorrectos.", "error");
        }
    };
});
