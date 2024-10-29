import React from "react";

const Modal: React.FC<{
  isOpen:
    | {
        id: number;
        title: string;
      }
    | boolean;
  onClose: () => void;
  editedTitle: string;
  setEditedTitle: (title: string) => void;
  handleSaveEdit: () => void;
}> = ({ isOpen, onClose, editedTitle, setEditedTitle, handleSaveEdit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Change task name</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

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
              onClick={onClose}
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
      </div>
    </div>
  );
};

export default Modal;
