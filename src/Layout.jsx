import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="flex flex-col items-center min-h-screen ">
      <Navbar />
      <main className="grow w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
