import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BackToTopButton from "./components/Back";
import TodoList from "./components/todolist";
import Users from "./components/users";
import { Link } from "react-router-dom";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

function App() {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  const handleMenuToggle = () => {
    setIsOpenMenu((prevState) => !prevState);
  };

  return (
    <Router>
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
          <div className="links flex justify-center items-center gap-5 flex-col bg-black max-w-[600px] mx-auto my-0 mt-5 p-4 mb-3 rounded-2xl">
            <Link
              className="nav-link text-white"
              to="/"
              onClick={handleMenuToggle}
            >
              Todo
            </Link>
            <Link
              className="nav-link text-white"
              to="/users"
              onClick={handleMenuToggle}
            >
              Users
            </Link>
          </div>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/users" element={<Users />} />
      </Routes>

      <BackToTopButton />
    </Router>
  );
}

export default App;
