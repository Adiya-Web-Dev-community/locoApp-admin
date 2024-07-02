import React, { useState } from "react";

import CloseICONSVG from "../assets/SVG/closeICON";

interface CustomAlertProps {
  message: string;
  onYesClick: () => void;
  onCloseClick: () => void;
}



const CustomAlert: React.FC<CustomAlertProps> = ({ message, onYesClick, onCloseClick }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <button className="absolute top-0 right-0 m-2 p-2" onClick={onCloseClick}>
          <CloseICONSVG height={20} width={20} fill={"#5b5a5a"} />
        </button>
        <p className="text-center text-lg">{message}</p>
        <div className="flex justify-center mt-4">
          <button
            onClick={onYesClick}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
          >
            Yes
          </button>
          <button
            onClick={onCloseClick}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};


interface AlertProps {
  message: string;
  onYesClick: () => void;
  onCloseClick: () => void;
}
const Alert: React.FC<AlertProps> = ({ message, onYesClick, onCloseClick }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleYesClick = () => {
    setIsOpen(false);
    onYesClick();
  };

  const handleModalClose = () => {
    setIsOpen(false);
    onCloseClick();
  };

  return isOpen ? (
    <CustomAlert message={message} onYesClick={handleYesClick} onCloseClick={handleModalClose} />
  ) : null;
};

export default Alert;

