import { Link } from "react-router-dom";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

const Navbar: React.FC = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  const HandleSearch = () => {
    setIsOpenMenu(true);
  };

  return (
    <div>
      <nav className="navbar">
        <h1>Todo List</h1>
        <button className="menu-button" onClick={() => HandleSearch()}>
          {isOpenMenu ? <IoMdClose /> : <GiHamburgerMenu />}
        </button>
        {isOpenMenu && (
          <div className="links">
            <Link className="nav-link" to="/">
              Todo
            </Link>
            <Link className="nav-link" to="/users">
              Users
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
