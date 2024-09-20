"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Clientes from "@/app/data/cliente";
import Toast from "@components/Toast.tsx";
import { ToastType } from "@/types";

import bg1 from "../app/assets/images/login/1.webp";
import bg2 from "../app/assets/images/login/2.webp";
import bg3 from "../app/assets/images/login/3.webp";

const backgrounds = [bg1, bg2, bg3];

type LoginForm = {
  email: string | null;
  password: string | null;
  success: boolean | null;
};

export default function Login() {
  const [currentBg, setCurrentBg] = useState(0);
  const [loginState, setLoginState] = useState<LoginForm>({
    email: null,
    password: null,
    success: null,
  });

  const [toast, setToast] = useState<ToastType>({
    open: false,
    type: null,
    message: null,
  });

  const router = useRouter();

  // Mostrar notificación
  const showToast = (type: "success" | "error", message: string) => {
    setToast({ open: true, type, message });
    setTimeout(() => {
      setToast({ ...toast, open: false });
    }, 3000);
  };

  // Función para manejar el login
  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Verificar si el correo pertenece a un cliente
    const cliente = Clientes.find(
      (cliente) =>
        cliente.email === loginState.email &&
        cliente.password === loginState.password,
    );

    if (cliente) {
      setLoginState({ ...loginState, success: true });
      showToast("success", "Inicio de sesión exitoso.");

      // Redirigir al cliente a su cuenta personal
      return setTimeout(() => {
        router.push(`/homebanking/clientes/${cliente.id}`);
      }, 500);
    }

    showToast("error", "Correo o contraseña incorrectos.");
    setLoginState({ ...loginState, success: false });
  };

  // Cambiar el fondo de pantalla cada 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((currentBg + 1) % backgrounds.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [currentBg]);

  return (
    <>
      <div
        className="h-screen w-screen flex items-center justify-center bg-cover transition-[background]"
        style={{
          backgroundImage: `url(${backgrounds[currentBg].src})`,
        }}
      >
        <main className="h-min grid grid-cols-2 w-1/2">
          <div className="min-w-40 w-full bg-white rounded-xl z-10">
            <form
              className={`flex flex-col justify-center px-12 py-8 [&>input]:border ${
                loginState.success !== null &&
                (loginState.success
                  ? "[&>input]:border-[#4caf50]"
                  : "[&>input]:border-[#f44336]")
              }`}
              onSubmit={handleLoginSubmit}
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
        </main>
      </div>
      <Toast open={toast.open} type={toast.type} message={toast.message} />
    </>
  );
}
