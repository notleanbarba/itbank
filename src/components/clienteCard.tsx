import { Cliente } from "@/types";

interface ClienteCardProps {
  cliente: Cliente;
}

const ClienteCard: React.FC<ClienteCardProps> = ({ cliente }) => {
  return (
    <div>
      <h2>{cliente.nombre}</h2>
      <ul>
        {cliente.cuentas.map((cuenta) => (
          <li key={cuenta.numeroCuenta}>
            Cuenta {cuenta.numeroCuenta} ({cuenta.tipo}) - Saldo: $
            {cuenta.saldo.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClienteCard;
