import { Outlet } from "react-router-dom";
import Header from "@app/homebanking/Header.tsx";
import Footer from "@app/homebanking/Footer.tsx";

export default function HomebankingLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
