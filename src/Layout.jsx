import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
