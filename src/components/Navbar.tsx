import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="flex w-full fixed top-0 left-0 border-b items-center h-[--navbar-height] bg-[#121212]">
      <div className="flex flex-col border-r h-full justify-center px-6">
        <Link className="" to="/">
          Home
        </Link>
      </div>
      <div className="flex flex-col border-r h-full justify-center px-6">
        <Link className="" to="Mining/">
          Mining
        </Link>
      </div>
    </div>
  );
};
