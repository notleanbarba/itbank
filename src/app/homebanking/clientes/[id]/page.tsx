import { notFound } from "next/navigation";
import { obtenerClientes } from "@/app/data/cliente";
import { Cliente } from "@/types";
import ClienteCard from "@/components/clienteCard";

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Información del Cliente</h1>
      <ClienteCard cliente={cliente} />
    </div>
  );
};

export default ClientePage;
