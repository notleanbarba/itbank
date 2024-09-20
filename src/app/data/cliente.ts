import { Cliente } from "@types";

const Clientes: Cliente[] = [
  {
    id: "132",
    nombre: "Juan Perez",
    email: "juan.perez@example.com",
    password: "1234",
    cuentas: [
      { numeroCuenta: "123456", tipo: "Ahorros", saldo: 20000 },
      { numeroCuenta: "342234", tipo: "Corriente", saldo: 5000 },
    ],
    tarjeta: [
      {
        numeroTarjeta: "5599 2838 4939 4884",
        tipo: "Tarjeta de credito",
        cvv: 123,
      },
    ],
  },
  {
    id: "2",
    nombre: "Maria Garcia",
    email: "mariagarcia@example.com",
    password: "1234",
    cuentas: [
      { numeroCuenta: "123453", tipo: "Ahorros", saldo: 30000 },
      { numeroCuenta: "342223", tipo: "Corriente", saldo: 2000 },
    ],
    tarjeta: [
      {
        numeroTarjeta: "5599 2838 4239 4884",
        tipo: "Tarjeta de credito",
        cvv: 321,
      },
    ],
  },
  {
    id: "3",
    nombre: "Robert C. Martin",
    email: "robert.martin@example.com",
    password: "1234",
    cuentas: [
      { numeroCuenta: "234233", tipo: "Ahorros", saldo: 6000000 },
      { numeroCuenta: "343234", tipo: "Corriente", saldo: 1000 },
    ],
    tarjeta: [
      {
        numeroTarjeta: "5599 2838 4349 4854",
        tipo: "Tarjeta de credito",
        cvv: 213,
      },
    ],
  },
];

export default Clientes;
