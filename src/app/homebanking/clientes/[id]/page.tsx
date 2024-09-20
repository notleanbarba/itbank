import { notFound } from "next/navigation";
import Clientes from "@/app/data/cliente";
import { Cliente } from "@/types";
import ClienteCard from "@/components/clienteCard";

const getCliente = (id: string): Cliente | undefined => {
  return Clientes.find((cliente) => cliente.id === id);
};

const ClientePage = ({ params }: { params: { id: string } }) => {
  const cliente = getCliente(params.id);

  if (!cliente) {
    return notFound();
  }

  return (
    <div>
      <h1>Información del Cliente</h1>
      <ClienteCard cliente={cliente} />
    </div>
  );
};

export default ClientePage;
