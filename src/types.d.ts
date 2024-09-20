export type ToastType = {
  open: boolean;
  type: "success" | "error" | "warning" | "info" | null;
  message: string | null;
};

export type TickerDefinition = {
  ticker: string;
  name: string;
};

export type StockAggregateDefinition = {
  c: number;
  v: number;
  t: number;
};

export type OperationsDefinition = {
  id: number;
  text: string;
  callback: () => void;
}[];

export type TagsDefinition = {
  text: string;
  callback?: () => void;
}[];

export type AccountCardDefinition = {
  accountType: string;
  accountNumber: string;
  balances: {
    name: string;
    unit: "$" | "U$D";
    balance: number;
  }[];
  button: {
    text: string;
    url: string;
  };
};

export type CreditCardDefinition = {
  cardType: string;
  cardNumber: number;
  cvv: number;
};

export type CardDefinitions =
  | {
      id: number;
      type: "account";
      card: AccountCardDefinition;
    }
  | {
      id: number;
      type: "creditCard";
      card: CreditCardDefinition;
    };

export type FacturaType = {
  id: string;
  cliente: string;
  total: number;
  servicio: string;
  estado: string;
};

export type Cuenta = {
  numeroCuenta: string;
  tipo: string;
  saldo: number;
};

export type datoTarjeta = {
  numeroTarjeta: string;
  tipo: string;
};

export type Cliente = {
  id: string;
  nombre: string;
  email: string;
  password: string;
  cuentas: Cuenta[];
  tarjeta: datoTarjeta[];
};
