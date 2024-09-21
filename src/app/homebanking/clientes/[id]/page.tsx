import { notFound } from "next/navigation";
import { obtenerClientes } from "@/app/data/cliente";
import { Cliente } from "@/types";

interface ClientePageProps {
  params: {
    id: string;
  };
}

const ClientePage = async ({ params }: ClientePageProps) => {
  const clientes: Cliente[] = await obtenerClientes();

  const cliente = clientes.find((cliente) => cliente.id === params.id);

  if (!cliente) {
    notFound();
  }

  return <div></div>;
};

export default ClientePage;
