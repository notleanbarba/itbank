import Link from "next/link";
import { obtenerClientes } from "@/app/data/cliente";
import { Cliente } from "@/types";

const ClientesList = async () => {
  try {
    const clientes: Cliente[] = await obtenerClientes();

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Lista de Clientes</h1>
        <ul className="list-disc pl-5">
          {clientes.map((cliente) => (
            <li key={cliente.id} className="mb-2">
              <Link
                href={`/homebanking/clientes/${cliente.id}`}
                className="text-blue-500 hover:underline"
              >
                {cliente.nombre}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    return <p>Error al cargar la lista de users</p>;
  }
};

export default ClientesList;
