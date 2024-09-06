import { Outlet } from "react-router-dom";
import Header from "./header.tsx";
import Footer from "./footer.tsx";

export default function HomebankingLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
