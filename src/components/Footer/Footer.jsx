import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-sky-600 text-white border-y px-[1rem] sm:px-[5rem] py-6 grid grid-cols-5 gap-4 sm:flex sm:justify-between max-w-screen-xl m-auto ">
      <Link to="/">
        <img
          src="src\assets\images\logo.webp"
          alt="cvsynk logo"
          className="w-20 h-20 object-contain"
        />
      </Link>
    <div className="col-span-4">
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <ul className="flex flex-col gap-y-2">
          <Link to="/" className="hover:text-gray-800 hover:underline hover:underline-offset-2">About us</Link>
          <Link to="/" className="hover:text-gray-800 hover:underline hover:underline-offset-2">Careers</Link>
          <Link to="/" className="hover:text-gray-800 hover:underline hover:underline-offset-2">Home</Link>
        </ul>
        <ul className="flex flex-col gap-y-2">
          <Link to="/" className="hover:text-gray-800 hover:underline hover:underline-offset-2">Help center</Link>
          <Link to="/" className="hover:text-gray-800 hover:underline hover:underline-offset-2">Report issue</Link>
        </ul>
        <ul className="flex flex-col gap-y-2">
          <Link to="/" className="hover:text-gray-800 hover:underline hover:underline-offset-2">Privacy policy</Link>
          <Link to="/" className="hover:text-gray-800 hover:underline hover:underline-offset-2">Terms & conditions</Link>
          <Link to="/" className="hover:text-gray-800 hover:underline hover:underline-offset-2">Fraud alert</Link>
          <Link to="/" className="hover:text-gray-800 hover:underline hover:underline-offset-2">Trust & safety</Link>
        </ul>
      </div>
    </div>

    </footer>
  );
}
