import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { ToastType } from "./types";
import Toast from "./components/Toast.tsx";

type Image = {
  sources: {
    avif: string;
    webp: string;

    png: string;
  };
  img: {
    src: string;
    w: number;
    h: number;
  };
};

type LoginForm = {
  email: string | null;
  password: string | null;
  success: boolean | null;
};

type RegisterForm = {
  email: string | null;
  password: string | null;
  name: string | null;
  dni: number | null;
  success: boolean | null;
};

const backgrounds = Object.values(
  import.meta.glob<Image>("./assets/images/login/*.{png,jpg}", {
    query: { enhanced: true },
    import: "default",
    eager: true,
  }),
);

const validEmail = "devfive@itbank.com";
const validPassword = "devfive";

export default function Login() {
  const [currentBg, setCurrentBg] = useState(0);
  const [loginState, setLoginState] = useState<LoginForm>({
    email: null,
    password: null,
    success: null,
  });
  const [registerState, setRegisterState] = useState<RegisterForm>({
    email: null,
    password: null,
    name: null,
    dni: null,
    success: null,
  });

  const [toast, setToast] = useState<ToastType>({
    open: false,
    type: null,
    message: null,
  });

  const [isLoginVisible, setIsLoginVisible] = useState<boolean>(true);

  const navigate = useNavigate();

  const showToast = (
    type: "success" | "error" | "warning" | "info",
    message: string,
  ) => {
    setToast({ open: true, type: type, message: message });
    setTimeout(() => {
      setToast({ ...toast, open: false });
    }, 3000);
  };

  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      loginState.email === validEmail &&
      loginState.password === validPassword
    ) {
      setLoginState({ ...loginState, success: true });
      showToast("success", " Inicio de sesión exitoso.");
      return setTimeout(() => {
        navigate("/homebanking");
      }, 1000);
    }

    showToast("error", "Usuario o contraseña incorrectos.");
    setLoginState({ ...loginState, success: false });
  };

  const handleRegisterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRegisterState({ ...registerState, success: true });
    showToast("success", "Usuario creado exitosamente.");
    return setTimeout(() => {
      navigate("/homebanking");
    }, 1000);
  };

  const toggleForms = () => {
    setIsLoginVisible(!isLoginVisible);
  };

  useEffect(() => {
    setTimeout(() => {
      setCurrentBg((currentBg + 1) % backgrounds.length);
    }, 10000);
  }, [currentBg]);

  return (
    <>
      <div
        className="h-screen w-screen flex items-center justify-center bg-cover transition-[background]"
        style={{
          backgroundImage: `url(${backgrounds[currentBg]})`,
        }}
      >
        <main className="h-min grid grid-cols-2 w-1/2">
          {isLoginVisible ? (
            <>
              <div className="min-w-40 w-full bg-white rounded-xl z-10">
                <form
                  className={`flex flex-col justify-center px-12 py-8 [&>input]:border ${
                    loginState.success !== null &&
                    (loginState.success
                      ? "[&>input]:border-[#4caf50]"
                      : "[&>input]:border-[#f44336]")
                  }`}
                  onSubmit={handleLoginSubmit}
                  onInvalid={() => {
                    if (!!loginState.email || !!loginState.password)
                      showToast(
                        "warning",
                        "Por favor, completa todos los campos.",
                      );
                  }}
                >
                  <h1 className="text-2xl text-center text-slate-600 mb-5">
                    Iniciar sesión
                  </h1>
                  <label className="mt-3 mb-1 text-lg" htmlFor="login-email">
                    Email
                  </label>
                  <input
                    id="login-email"
                    className="w-full bg-[#f2f2f2] p-2 text-lg outline-none rounded-md"
                    type="email"
                    value={loginState.email ?? ""}
                    onChange={(e) =>
                      setLoginState({ ...loginState, email: e.target.value })
                    }
                    required
                    // biome-ignore lint/a11y/noAutofocus: Self explanatory autofocus. This is a login form
                    autoFocus
                  />
                  <label className="mt-3 mb-1 text-lg" htmlFor="login-password">
                    Contraseña
                  </label>
                  <input
                    id="login-password"
                    className="w-full bg-[#f2f2f2] p-2 text-lg outline-none rounded-md"
                    type="password"
                    value={loginState.password ?? ""}
                    onChange={(e) =>
                      setLoginState({ ...loginState, password: e.target.value })
                    }
                    required
                  />
                  <button
                    type="submit"
                    className="w-min px-2 py-4 mt-4 border-none text-lg text-white bg-[#444] rounded-md outline-none cursor-pointer hover:bg-[#333] focus:bg-[#333] "
                  >
                    Entrar
                  </button>
                </form>
              </div>
              <div className="min-w-40 w-full bg-black/50 backdrop-blur rounded-xl flex flex-col gap-4 text-white p-10">
                <h3 className="font-bold text-2xl">
                  ¿Aún no tienes una cuenta?
                </h3>
                <p>Registrate para que puedas iniciar sesión</p>
                <button
                  className="px-2 py-4 mt-2 border-2 border-white border-solid w-min text-white outline-none cursor-pointer text-nowrap bg-transparent text-lg font-bold hover:bg-[#333] focus:bg-[#333] "
                  type="button"
                  onClick={toggleForms}
                >
                  Registrarse
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="min-w-40 w-full bg-white rounded-xl z-10 order-2">
                <form
                  className={`flex flex-col justify-center px-12 py-8 [&>input]:border ${
                    registerState.success !== null &&
                    (registerState.success
                      ? "[&>input]:border-[#4caf50]"
                      : "[&>input]:border-[#f44336]")
                  }`}
                  onSubmit={handleRegisterSubmit}
                >
                  <h1 className="text-2xl text-center text-slate-600 mb-5">
                    Registrarse
                  </h1>
                  <label className="mt-3 mb-1 text-lg" htmlFor="register-name">
                    Nombre completo
                  </label>
                  <input
                    id="register-name"
                    className="w-full bg-[#f2f2f2] p-2 text-lg outline-none rounded-md"
                    type="text"
                    value={registerState.name ?? ""}
                    onChange={(e) =>
                      setRegisterState({
                        ...registerState,
                        name: e.target.value,
                      })
                    }
                    required
                  />
                  <label className="mt-3 mb-1 text-lg" htmlFor="register-email">
                    Email
                  </label>
                  <input
                    id="register-email"
                    className="w-full bg-[#f2f2f2] p-2 text-lg outline-none rounded-md"
                    type="email"
                    value={registerState.email ?? ""}
                    onChange={(e) =>
                      setRegisterState({
                        ...registerState,
                        email: e.target.value,
                      })
                    }
                    required
                  />
                  <label className="mt-3 mb-1 text-lg" htmlFor="register-dni">
                    <abbr title="Documento Nacional de Identidad">DNI</abbr>
                  </label>
                  <input
                    id="register-dni"
                    className="w-full bg-[#f2f2f2] p-2 text-lg outline-none rounded-md"
                    type="number"
                    value={registerState.dni ?? ""}
                    onChange={(e) =>
                      setRegisterState({
                        ...registerState,
                        dni: +e.target.value,
                      })
                    }
                    required
                  />
                  <label
                    className="mt-3 mb-1 text-lg"
                    htmlFor="register-password"
                  >
                    Contraseña
                  </label>
                  <input
                    id="register-password"
                    className="w-full bg-[#f2f2f2] p-2 text-lg outline-none rounded-md"
                    type="password"
                    value={registerState.password ?? ""}
                    onChange={(e) =>
                      setRegisterState({
                        ...registerState,
                        password: e.target.value,
                      })
                    }
                    required
                  />
                  <button
                    className="w-min px-2 py-4 mt-4 border-none text-lg text-white bg-[#444] rounded-md outline-none cursor-pointer hover:bg-[#333] focus:bg-[#333] "
                    type="submit"
                  >
                    Registrarse
                  </button>
                </form>
              </div>

              <div className="min-w-40 w-full bg-black/50 backdrop-blur rounded-xl flex flex-col gap-4 text-white p-10">
                <h3 className="font-bold text-2xl">¿Ya tienes una cuenta?</h3>
                <p>Inicia sesión para entrar en la página</p>
                <button
                  type="button"
                  className="px-2 py-4 mt-2 border-2 border-white border-solid w-min text-white outline-none cursor-pointer text-nowrap bg-transparent text-lg font-bold hover:bg-[#333] focus:bg-[#333] "
                  onClick={toggleForms}
                >
                  Iniciar sesión
                </button>
              </div>
            </>
          )}
        </main>
      </div>
      <Toast open={toast.open} type={toast.type} message={toast.message} />
    </>
  );
}
