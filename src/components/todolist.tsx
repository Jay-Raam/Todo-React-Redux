import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { BsFillGridFill } from "react-icons/bs";
import { TbListDetails } from "react-icons/tb";
import { addTodo, deleteTodo, editTodo } from "../todo/todolistSlice";
import Modal from "./modal"; // Assuming you have Modal component correctly imported

const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false); // Corrected naming to isOpen
  const [error, setError] = useState<string | null>(null);
  const [editingTodo, setEditingTodo] = useState<{
    id: number;
    title: string;
  } | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos?_limit=20"
        );
        if (!response.ok) {
          throw new Error(
            "Failed to fetch todos. Please check internet connection."
          );
        }
        const data = await response.json();
        data.forEach((todo: any) =>
          dispatch(
            addTodo({
              id: todo.id,
              title: todo.title,
              completed: todo.completed,
            })
          )
        );
      } catch (error) {
        setError("Failed to fetch todos");
      } finally {
        setIsLoading(false);
      }
    };

    const savedTodos = sessionStorage.getItem("todos");
    if (savedTodos) {
      JSON.parse(savedTodos).forEach((todo: any) => dispatch(addTodo(todo)));
    } else {
      fetchTodos();
    }
  }, [dispatch]);

  useEffect(() => {
    sessionStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const handleAdd = () => {
    if (newTodo.trim() !== "") {
      dispatch(
        addTodo({
          id: todos.length + 1,
          title: newTodo,
          completed: false,
        })
      );
      setNewTodo("");
    } else {
      alert("Please enter a valid todo title.");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const handleChangeLayout = () => {
    setIsOpen(!isOpen);
  };

  const handleSaveEdit = () => {
    if (editingTodo && editedTitle.trim() !== "") {
      dispatch(
        editTodo({
          ...editingTodo,
          title: editedTitle,
          completed: false,
        })
      );
      setEditingTodo(null);
    }
  };

  const handleCloseEdit = () => {
    setEditingTodo(null);
  };

  return (
    <>
      <div className="p-4">
        <div className="flex flex-col md:flex-row justify-center items-center gap-5">
          <div className="input w-72">
            <div className="relative w-full min-w-[200px] h-10">
              <input
                type="text"
                onChange={handleChange}
                value={newTodo}
                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                required
                autoFocus
              />
              <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                Task
              </label>
            </div>
          </div>
          <button
            onClick={handleAdd}
            className="relative px-[58px] py-[9px] overflow-hidden group bg-gradient-to-r from-gray-700 to-black hover:bg-gradient-to-r hover:from-gray-600 hover:to-black text-white transition-all ease-out duration-300 rounded-full"
          >
            <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-36 ease"></span>
            <span className="relative text-xl font-semibold">Add</span>
          </button>
        </div>
        <div className="flex justify-between items-center gap-3 max-w-[1200px] mx-auto my-0 mt-4">
          <h1 className="text-sm text-gray-500">Your day task</h1>
          <div className="flex justify-center-items-center gap-2">
            {isOpen ? (
              <span className="flex justify-center items-center bg-slate-400 p-3 cursor-pointer rounded-lg">
                <BsFillGridFill
                  className="text-black font-medium"
                  onClick={handleChangeLayout}
                />
              </span>
            ) : (
              <span className="flex justify-center items-center bg-slate-400 p-3 cursor-pointer rounded-lg">
                <TbListDetails
                  className="text-black font-medium"
                  onClick={handleChangeLayout}
                />
              </span>
            )}
          </div>
        </div>

        <div className="list-items">
          <ul
            className={
              isOpen
                ? "flex justify-between items-center flex-col mt-5 gap-3"
                : "flex justify-center items-center flex-wrap gap-6 mt-5"
            }
          >
            {todos.map((todo, index) => (
              <li
                key={index}
                className={
                  isOpen
                    ? "mb-2 flex justify-between items-center w-full"
                    : "flex items-center justify-center w-[350px] flex-col gap-5 p-7 border-[2px] border-gray-200"
                }
              >
                <span className="text-center font-semibold">{todo.title}</span>
                <div>
                  <div className="flex justify-center items-center gap-3">
                    <button
                      onClick={() => setEditingTodo(todo)}
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Modal isOpen={!!editingTodo} onClose={handleCloseEdit}>
        <div className="flex flex-col gap-4">
          <label htmlFor="editedTitle" className="font-semibold">
            Edit Todo Title:
          </label>
          <input
            id="editedTitle"
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md"
          />
          <div className="flex justify-end gap-3">
            <button
              onClick={handleCloseEdit}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveEdit}
              className="relative px-[58px] py-[9px] overflow-hidden group bg-gradient-to-r from-gray-700 to-black hover:bg-gradient-to-r hover:from-gray-600 hover:to-black text-white transition-all ease-out duration-300 rounded-full"
            >
              <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-36 ease"></span>
              <span className="relative text-xl font-semibold">Save</span>
            </button>
          </div>
        </div>
      </Modal>

      {isLoading && <div className="loader"></div>}
      {error && (
        <div className="flex justify-between items-center flex-col gap-3 max-w-[1200px] mx-auto my-0 mt-4">
          <p className="text-center">Error: {error}</p>
          <p className="text-center">Please try again...</p>
        </div>
      )}
    </>
  );
};

export default TodoList;
