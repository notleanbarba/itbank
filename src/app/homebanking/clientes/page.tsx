import Link from "next/link";
import Clientes from "@/app/data/cliente";

const ClientesList = () => {
  return (
    <div>
      <h1>Lista de Clientes</h1>
      <ul>
        {Clientes.map((cliente) => (
          <li key={cliente.id}>
            <Link href={`/homebanking/clientes/${cliente.id}`}>
              {cliente.nombre}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientesList;
