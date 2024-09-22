"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { obtenerClientes } from "@/app/data/cliente"; // Importa la función correctamente
import Toast from "@components/Toast";
import { ToastType, Cliente } from "@/types";

import bg1 from "../app/assets/images/login/1.webp";
import bg2 from "../app/assets/images/login/2.webp";
import bg3 from "../app/assets/images/login/3.webp";

const backgrounds = [bg1, bg2, bg3];

type LoginForm = {
  email: string;
  password: string;
  success: boolean | null;
};

export default function Login() {
  const [currentBg, setCurrentBg] = useState(0);
  const [loginState, setLoginState] = useState<LoginForm>({
    email: "",
    password: "",
    success: null,
  });

  const [toast, setToast] = useState<ToastType>({
    open: false,
    type: null,
    message: null,
  });

  const router = useRouter();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [cargandoClientes, setCargandoClientes] = useState<boolean>(true);

  // Mostrar notificación
  const showToast = (type: "success" | "error", message: string) => {
    setToast({ open: true, type, message });
    setTimeout(() => {
      setToast((prevToast) => ({ ...prevToast, open: false }));
    }, 3000);
  };

  // Cargar clientes al montar el componente
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const datosClientes = await obtenerClientes();
        setClientes(datosClientes);
      } catch (error) {
        console.error("Error al cargar clientes:", error);
        showToast("error", "Error al cargar datos de clientes.");
      } finally {
        setCargandoClientes(false);
      }
    };

    fetchClientes();
  }, []);

  // Función para manejar el login
  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Verificar si el correo pertenece a un cliente
    const cliente = clientes.find(
      (cliente) =>
        cliente.email === loginState.email &&
        cliente.password === loginState.password,
    );

    if (cliente) {
      setLoginState({ ...loginState, success: true });
      showToast("success", "Inicio de sesión exitoso.");

      localStorage.setItem("clienteId", cliente.id);
      localStorage.setItem("clienteNombre", cliente.nombre);

      setTimeout(() => {
        router.push(`/homebanking`);
      }, 500);
    } else {
      showToast("error", "Correo o contraseña incorrectos.");
      setLoginState({ ...loginState, success: false });
    }
  };

  // Cambiar el fondo de pantalla cada 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prevBg) => (prevBg + 1) % backgrounds.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []); // Arreglo de dependencias vacío para evitar múltiples intervalos

  if (cargandoClientes) {
    return <p className="text-center mt-10">Cargando...</p>;
  }

  return (
    <>
      <div
        className="h-screen w-screen flex items-center justify-center bg-cover transition-[background]"
        style={{
          backgroundImage: `url(${backgrounds[currentBg].src || backgrounds[currentBg]})`,
        }}
      >
        <main className="flex justify-center">
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
              <h1 className="text-xl text-center text-slate-600 mb-5">
                Iniciar sesión
              </h1>
              <label className="mt-3 mb-1 text-lg" htmlFor="login-email">
                Email
              </label>
              <input
                id="login-email"
                className="w-full bg-[#f2f2f2] p-2 text-lg outline-none rounded-md"
                type="email"
                value={loginState.email}
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
                value={loginState.password}
                onChange={(e) =>
                  setLoginState({ ...loginState, password: e.target.value })
                }
                required
              />
              <button
                type="submit"
                className="w-min px-2 py-4 mt-4 border-none text-lg text-white bg-[#444] rounded-md outline-none cursor-pointer hover:bg-[#333] focus:bg-[#333]"
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
