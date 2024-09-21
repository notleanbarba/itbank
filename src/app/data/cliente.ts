import { Cliente, FacturaType } from "@types";

const obtenerFacturas = async (): Promise<FacturaType[]> => {
  const response = await fetch("/facturas.json");
  if (!response.ok) {
    throw new Error("No cargo facturas.json");
  }
  const facturas = await response.json();
  return facturas;
};

export const obtenerClientes = async (): Promise<Cliente[]> => {
  const facturas = await obtenerFacturas();

  const Clientes: Cliente[] = [
    {
      id: "132",
      nombre: "Juan Perez",
      email: "juan.perez@example.com",
      password: "1234",
      cuentas: [
        {
          numeroCuenta: "123456/1",
          tipo: "Ahorros",
          saldo: [
            {
              nombre: "ARS Balance",
              unidad: "$",
              balance: 1000000,
            },
            {
              nombre: "USD Balance",
              unidad: "U$D",
              balance: 10000,
            },
          ],
          button: {
            text: "Ver movimientos",
            url: "./cuentas",
          },
        },
        {
          numeroCuenta: "342234/2",
          tipo: "Corrientes",
          saldo: [
            {
              nombre: "ARS Balance",
              unidad: "$",
              balance: 50000,
            },
            {
              nombre: "USD Balance",
              unidad: "U$D",
              balance: 1000,
            },
          ],
          button: {
            text: "Ver movimientos",
            url: "./cuentas",
          },
        },
      ],
      tarjeta: [
        {
          numeroTarjeta: "5599 2838 4939 4884",
          tipo: "Tarjeta de crédito",
          cvv: 123,
        },
        {
          numeroTarjeta: "5676 3454 2312 4522",
          tipo: "Tarjeta de débito",
          cvv: 232,
        },
      ],
      facturas: facturas.filter(
        (facturas) => facturas.cliente === "Juan Perez",
      ),
    },
    {
      id: "2",
      nombre: "Maria Garcia",
      email: "mariagarcia@example.com",
      password: "1234",
      cuentas: [
        {
          numeroCuenta: "123453/1",
          tipo: "Ahorros",
          saldo: [
            {
              nombre: "ARS Balance",
              unidad: "$",
              balance: 30000,
            },
            {
              nombre: "USD Balance",
              unidad: "U$D",
              balance: 10000,
            },
          ],
          button: {
            text: "Ver movimientos",
            url: "./cuentas",
          },
        },
        {
          numeroCuenta: "342234/2",
          tipo: "Corrientes",
          saldo: [
            {
              nombre: "ARS Balance",
              unidad: "$",
              balance: 80000,
            },
            {
              nombre: "USD Balance",
              unidad: "U$D",
              balance: 5000,
            },
          ],
          button: {
            text: "Ver movimientos",
            url: "./cuentas",
          },
        },
        {
          numeroCuenta: "342223/2",
          tipo: "Corriente",
          saldo: [
            {
              nombre: "ARS Balance",
              unidad: "$",
              balance: 2000,
            },
            {
              nombre: "USD Balance",
              unidad: "U$D",
              balance: 50,
            },
          ],
          button: {
            text: "Ver movimientos",
            url: "./cuentas",
          },
        },
        {
          numeroCuenta: "342234/2",
          tipo: "Corrientes",
          saldo: [
            {
              nombre: "ARS Balance",
              unidad: "$",
              balance: 600,
            },
            {
              nombre: "USD Balance",
              unidad: "U$D",
              balance: 10,
            },
          ],
          button: {
            text: "Ver movimientos",
            url: "./cuentas",
          },
        },
      ],
      tarjeta: [
        {
          numeroTarjeta: "5599 2838 4239 4884",
          tipo: "Tarjeta de crédito",
          cvv: 321,
        },
      ],
      facturas: facturas.filter(
        (facturas) => facturas.cliente === "Maria Garcia",
      ),
    },
    {
      id: "3",
      nombre: "Robert C. Martin",
      email: "robert.martin@example.com",
      password: "1234",
      cuentas: [
        {
          numeroCuenta: "234233/1",
          tipo: "Ahorros",
          saldo: [
            {
              nombre: "ARS Balance",
              unidad: "$",
              balance: 6000000,
            },
            {
              nombre: "USD Balance",
              unidad: "U$D",
              balance: 30000,
            },
          ],
          button: {
            text: "Ver movimientos",
            url: "./cuentas",
          },
        },
        {
          numeroCuenta: "342234/2",
          tipo: "Corrientes",
          saldo: [
            {
              nombre: "ARS Balance",
              unidad: "$",
              balance: 1000,
            },
            {
              nombre: "USD Balance",
              unidad: "U$D",
              balance: 200,
            },
          ],
          button: {
            text: "Ver movimientos",
            url: "./cuentas",
          },
        },
      ],
      tarjeta: [
        {
          numeroTarjeta: "5599 2838 4349 4854",
          tipo: "Tarjeta de crédito",
          cvv: 213,
        },
        {
          numeroTarjeta: "5676 3454 2312 4522",
          tipo: "Tarjeta de débito",
          cvv: 232,
        },
      ],
      facturas: facturas.filter(
        (facturas) => facturas.cliente === "Robert C. Martin",
      ),
    },
  ];

  return Clientes;
};
