import React, { useState, useEffect } from 'react';
import "./assets/styles/sass/login.scss";
import "./assets/styles/sass/responsive.scss";
import "./global.scss";
import fondo from './assets/images/fondo.jpg';
import logoCompleto from './assets/images/logoCompleto.png';
import logoITBA from './assets/images/logoITBA.png';
import { useNavigate } from 'react-router-dom'; // Importación de react-router-dom para navegación

const Login: React.FC = () => {
  // Estados para manejar los valores de los inputs y la visibilidad del formulario
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [registerEmail, setRegisterEmail] = useState<string>('');
  const [dni, setDni] = useState<string>('');
  const [registerPassword, setRegisterPassword] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | ''>('');
  const [emailBorder, setEmailBorder] = useState<string>('');
  const [passwordBorder, setPasswordBorder] = useState<string>('');
  const [isLoginVisible, setIsLoginVisible] = useState<boolean>(true);

  const navigate = useNavigate(); // Hook para redirigir a otras páginas

  // Credenciales válidas para la validación de inicio de sesión
  const validEmail = 'devfive@itbank.com';
  const validPassword = 'devfive';

  // Función para mostrar el mensaje toast
  const showToast = (message: string, type: 'success' | 'error' | 'warning') => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage('');
      setToastType('');
    }, 3000); // El mensaje desaparece después de 3 segundos
  };

  // Manejo de la validación del formulario de inicio de sesión
  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email.trim() === '' || password.trim() === '') {
      showToast('Por favor, completa todos los campos.', 'warning');
    } else if (email === validEmail && password === validPassword) {
      setEmailBorder('1px solid #4CAF50');
      setPasswordBorder('1px solid #4CAF50');
      setTimeout(() => {
        navigate('/home'); // Redirigirte al home
      }, 500);
    } else {
      showToast('Usuario o contraseña incorrectos.', 'error');
      setEmailBorder('1px solid #f44336');
      setPasswordBorder('1px solid #f44336');
    }
  };

  // Manejo de la validación del formulario de registro
  const handleRegisterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Lógica de registro aquí (actualmente solo muestra los datos en consola)
    console.log('Registro completado', { name, registerEmail, dni, registerPassword });
  };

  // Alternar entre formulario de inicio de sesión y registro
  const toggleForms = () => {
    setIsLoginVisible(!isLoginVisible);
  };

  // Actualización del fondo de pantalla cada 10 segundos (lógica eliminada para simplificación)
  useEffect(() => {
    document.body.style.backgroundImage = `url(${fondo})`;
  }, []);

  return (
    <>
      <header>
        <div className="logoCompleto">
          <img src={logoCompleto} alt="Logo de Argentarius" width="90px" height="50px" />
        </div>
        <img src={logoITBA} alt="Logo de ITBA" width="90px" height="50px" />
      </header>
      
      {/* Mostrar mensaje toast si hay uno */}
      {toastMessage && (
        <div id="toast" className={`toast show ${toastType}`}>
          {toastMessage}
        </div>
      )}

      <main>
        <div className="contenedor__todo">
          {isLoginVisible ? (
            <div className="contenedor__login-register">
              <form id="loginForm" className="formulario__login" onSubmit={handleLoginSubmit}>
                <h1 id="login">Iniciar sesión</h1>
                <label htmlFor="login-email">Email</label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ border: emailBorder }}
                  required
                  autoFocus
                />
                <label htmlFor="login-password">Contraseña</label>
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ border: passwordBorder }}
                  required
                />
                <button type="submit">Entrar</button>
              </form>
            </div>
          ) : (
            <div className="contenedor__login-register">
              <form id="registerForm" className="formulario__register" onSubmit={handleRegisterSubmit}>
                <h1 id="register">Registrarse</h1>
                <label htmlFor="register-name">Nombre completo</label>
                <input
                  id="register-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <label htmlFor="register-email">Email</label>
                <input
                  id="register-email"
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  required
                />
                <label htmlFor="register-dni">
                  <abbr title="Documento Nacional de Identidad">DNI</abbr>
                </label>
                <input
                  id="register-dni"
                  type="number"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  required
                />
                <label htmlFor="register-password">Contraseña</label>
                <input
                  id="register-password"
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  required
                />
                <button type="submit">Registrarse</button>
              </form>
            </div>
          )}
          
          {/* Caja trasera para alternar entre login y registro */}
          <div className="caja__trasera">
            {isLoginVisible ? (
              <>
                <h3>¿Aún no tienes una cuenta?</h3>
                <p>Registrate para que puedas iniciar sesión</p>
                <button id="btn__registrarse" onClick={toggleForms}>
                  Registrarse
                </button>
              </>
            ) : (
              <>
                <h3>¿Ya tienes una cuenta?</h3>
                <p>Inicia sesión para entrar en la página</p>
                <button id="btn__iniciar-sesion" onClick={toggleForms}>
                  Iniciar sesión
                </button>
              </>
            )}
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div>
            <h2>Nosotros</h2>
            <a href="../about-us">Sobre nosotros</a>
            <a href="../faq">FAQ</a>
            <button type="button" className="modal-open" name="contact-modal">
              Contacto
            </button>
            <dialog className="modal" id="contact-modal">
              <div className="modal-dialog" role="dialog">
                <button type="button" className="modal-close" tabIndex={-1}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
                <h3>Información de contacto</h3>
                <ul>
                  <li>Dirección: <span>Calle falsa 1234</span></li>
                  <li>Email: <span>itbank@corpo.com</span></li>
                  <li>Número: <span>+54 9 123456789</span></li>
                </ul>
              </div>
            </dialog>
          </div>
          <div id="footer-contact">
            <h2>Contacto</h2>
            <address>
              <ul>
                <li>Dirección: <span>Calle falsa 1234</span></li>
                <li>Email: <span>itbank@corpo.com</span></li>
                <li>Número: <span>+54 9 123456789</span></li>
              </ul>
            </address>
          </div>
          <div className="newsletter">
            <h2>Newsletter</h2>
            <p>Suscribite a nuestro Newsletter para recibir ofertas especiales</p>
            <form className="newsletter-input">
              <input
                type="email"
                name="newsletter_email"
                placeholder="Tu email"
                aria-label="Email"
                required
              />
              <button type="submit" className="submit-button" aria-label="enviar">
                <i className="fa-solid fa-newspaper"></i>
              </button>
            </form>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Login;
