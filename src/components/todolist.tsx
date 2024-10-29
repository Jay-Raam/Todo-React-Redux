import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { BsFillGridFill } from "react-icons/bs";
import { TbListDetails } from "react-icons/tb";
import { addTodo, deleteTodo, editTodo } from "../todo/todolistSlice";
import Modal from "./modal";

const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [inputError, setInputError] = useState<string | null>(null);
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
            "Failed to fetch todos. Please check your internet connection."
          );
        }
        const data = await response.json();
        console.log(data);

        data.forEach((todo: any) => {
          dispatch(
            addTodo({
              id: todo.id,
              title: todo.title,
              completed: todo.completed,
            })
          );
        });
      } catch (error) {
        setError("Failed to fetch todos");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const handleAdd = () => {
    if (newTodo.trim() !== "") {
      const newTodoItem = {
        id: Date.now(), // Ensure unique ID
        title: newTodo,
        completed: false,
      };
      dispatch(addTodo(newTodoItem));
      setNewTodo("");
      setInputError(null);
    } else {
      setInputError("Please enter a valid todo task");
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
      setEditedTitle("");
    }
  };

  const handleCloseEdit = () => {
    setEditingTodo(null);
    setEditedTitle("");
  };

  return (
    <>
      <div className="p-4">
        <div className="flex flex-col md:flex-row justify-center items-center gap-5">
          <div className="input w-72">
            <input
              type="text"
              onChange={handleChange}
              value={newTodo}
              className="w-full h-10 border border-gray-300 rounded px-3"
              placeholder="Task"
              required
              autoFocus
            />
          </div>
          <button
            onClick={handleAdd}
            className="w-52 px-5 py-2 bg-gradient-to-r from-gray-700 to-black text-white rounded-full"
          >
            Add
          </button>
        </div>
        {inputError && (
          <div className="text-red-600 flex justify-center items-center mt-5">
            {inputError}
          </div>
        )}

        <div className="flex justify-between items-center gap-3 max-w-[1200px] mx-auto mt-4">
          <h1 className="text-sm text-gray-500">Your day task</h1>
          <div
            onClick={handleChangeLayout}
            className="p-3 bg-slate-400 cursor-pointer rounded-lg"
          >
            {isOpen ? (
              <BsFillGridFill className="text-black" />
            ) : (
              <TbListDetails className="text-black" />
            )}
          </div>
        </div>

        <ul
          className={
            isOpen ? "flex flex-col mt-5" : "flex flex-wrap mt-5 gap-6"
          }
        >
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={
                isOpen
                  ? "flex justify-between items-center mb-2"
                  : "flex items-center justify-center w-[350px] flex-col gap-5 p-7 border-[2px] border-gray-200"
              }
            >
              <span className="text-center font-semibold">{todo.title}</span>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setEditingTodo(todo);
                    setEditedTitle(todo.title);
                  }}
                  className="bg-green-500 text-white px-2 py-1 rounded"
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
            </li>
          ))}
        </ul>
      </div>

      <Modal
        isOpen={!!editingTodo}
        onClose={handleCloseEdit}
        editedTitle={editedTitle}
        setEditedTitle={setEditedTitle}
        handleSaveEdit={handleSaveEdit}
      />

      {isLoading && (
        <div className="flex justify-center items-center mt-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-dasharray="16"
              stroke-dashoffset="16"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 3c4.97 0 9 4.03 9 9"
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                dur="0.2s"
                values="16;0"
              />
              <animateTransform
                attributeName="transform"
                dur="1.5s"
                repeatCount="indefinite"
                type="rotate"
                values="0 12 12;360 12 12"
              />
            </path>
          </svg>
        </div>
      )}
      {error && <div className="text-center text-red-600">{error}</div>}
    </>
  );
};

export default TodoList;
