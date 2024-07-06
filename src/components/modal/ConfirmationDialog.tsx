import React from "react";

const ConfirmationDialog = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  const handlingPropogation = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 cursor-pointer bg-black/60"
      onClick={onClose}
    >
      <div
        className="p-6 bg-[#252525] text-[#DEE1E2] rounded-md  cursor-default"
        onClick={handlingPropogation}
      >
        <h2 className="mb-4 text-lg font-semibold">
          Are you sure you want to move to this website?
        </h2>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 font-semibold text-gray-800 bg-gray-400 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 font-semibold rounded-md bg-rose-800 hover:bg-rose-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
