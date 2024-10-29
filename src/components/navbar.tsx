import { Link } from "react-router-dom";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

const Navbar: React.FC = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  const handleMenuToggle = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  return (
    <nav className="navbar mt-4 mb-4">
      <div className="flex justify-between max-w-[1200px] mx-auto my-0 mt-5 items-center gap-4">
        <h1 className="text-[30px]">Todo List</h1>
        <button className="menu-button" onClick={handleMenuToggle}>
          {isOpenMenu ? (
            <IoMdClose className="font-bold text-xl mr-2" />
          ) : (
            <GiHamburgerMenu className="font-bold text-xl mr-2" />
          )}
        </button>
      </div>
      {isOpenMenu && (
        <div className="links absolute z-50 top-10 right-0 left-0 h-svh flex justify-center items-center gap-5 flex-col bg-black w-full mx-auto my-0 mt-5 p-4 mb-3">
          <Link
            className="nav-link text-white font-bold text-xl uppercase"
            to="/"
            onClick={handleMenuToggle}
          >
            Todo
          </Link>
          <Link
            className="nav-link text-white font-bold text-xl uppercase"
            to="/users"
            onClick={handleMenuToggle}
          >
            Users
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
