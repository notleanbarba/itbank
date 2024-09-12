import WithHeader from "@app/homebanking/WithHeader";

export default function Pagos() {
  return (
    <WithHeader
      title="Todos tus pagos"
      submenuOptions={[]}
      tags={[
        {
          text: "Calendario de pagos",
        },
      ]}
    >
      <main />
    </WithHeader>
  );
}
