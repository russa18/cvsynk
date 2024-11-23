import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [mobile, setMobile] = useState();
  const [isMenu, setIsmenu] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setMobile(window.innerWidth < 640);
    };
    checkScreenSize();
    return () => {};
  }, []);

  function showMenu() {
    setIsmenu(!isMenu);
  }

  return (
    <div className="fixed top-0 left-0 w-full">
      <nav className="max-w-screen-xl m-auto flex justify-between items-center py-4 px-[1rem] sm:px-[5rem] text-white shadow-lg">
        <Link to="/" className="">
          <img src="/images/logo.webp" alt="cv synk " className="h-10 w-10" />
        </Link>

        <div className={mobile ? `hidden ` : `flex gap-5`}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-purple-100 underline underline-offset-2 font-bold"
                : "hover:text-red-200 hover:underline underline-offset-2 "
            }
          >
            Home
          </NavLink>
          <NavLink
            to="about"
            className={({ isActive }) =>
              isActive
                ? "text-purple-100 underline underline-offset-2 font-bold"
                : "hover:text-red-200 hover:underline underline-offset-2 "
            }
          >
            About us
          </NavLink>
        </div>
        <div className="flex items-center gap-5">
          <Link
            to="#"
            className=" font-bold outline-1 rounded-lg hover:bg-blue-600 hover:border-transparent border-white border px-4 py-2"
          >
            Login
          </Link>
          <Link
            to="#"
            className=" font-bold outline-1 rounded-lg bg-blue-600 hover:border-transparent border-blue-700 border px-4 py-2 shadow-md"
          >
            Register
          </Link>
          <div
            className={mobile ? `hover:cursor-pointer` : `hidden`}
            onClick={showMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="hamburger-icon"
            >
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </div>
          <aside
            className={`z-[99] sidebar ${
              isMenu
                ? " absolute right-[15px] top-[90%] bg-sky-600  rounded-l-md w-[30%] "
                : "hidden"
            }`}
            onClick={() => setIsmenu(!isMenu)}
          >
            <ul className="flex flex-col justify-between">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "hover:border hover:border-x-0 bg-blue-600 border-white  p-2 rounded-lb-md"
                    : "hover:border hover:border-x-0 hover:bg-blue-600 border-white  p-2 rounded-lb-md "
                }
              >
                Home
              </NavLink>

              <NavLink
                to="about"
                className={({ isActive }) =>
                  isActive
                    ? "hover:border hover:border-x-0 bg-blue-600 border-white  p-2 rounded-lb-md"
                    : "hover:border hover:border-x-0 hover:bg-blue-600 border-white  p-2 rounded-lb-md "
                }
              >
                About us
              </NavLink>
            </ul>
          </aside>
          <div
            className={`overlay ${isMenu ? "show" : ""}`}
            onClick={showMenu}
          ></div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
