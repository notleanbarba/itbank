import WithHeader from "@app/homebanking/WithHeader";
import Table from "@components/Table.tsx";

export default function Transferencias() {
  return (
    <>
      <WithHeader
        title="Transferencias"
        submenuOptions={[]}
        tags={[
          {
            text: "Transferencias agendadas",
          },
          {
            text: "Mis destinatarios frecuentes",
          },
        ]}
      >
        <main>
          <Table
            thead={["Fecha", "Destinatario", "Tipo", "Importe"]}
            tbody={[
              [
                "01/01/2024",
                "Lionel Messi",
                "Transferencia automática",
                "$10000",
              ],
              [
                "02/01/2024",
                "Jorge Luis Borges",
                "Transferencia automática",
                "$100",
              ],
              ["04/01/2024", "Juan Pérez", "DEBIN", "$1234"],
              ["11/08/2024", "María González", "E-Cheq", "$993"],
            ]}
          />
        </main>
      </WithHeader>
    </>
  );
}
