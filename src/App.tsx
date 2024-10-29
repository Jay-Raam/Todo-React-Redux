import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BackToTopButton from "./components/Back";
import TodoList from "./components/todolist";
import Users from "./components/users";
import Navbar from "./components/navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/users" element={<Users />} />
      </Routes>

      <BackToTopButton />
    </Router>
  );
}

export default App;
