import { useEffect, useState } from "react";
interface Props {
  message?: string;
  type?: string;
  onClose?: () => void;
}
const Notification = ({ message, type }: Props) => {
  const [countdown, setCountdown] = useState(4);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timer);
          setIsVisible(false);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const backgroundColor = type === "success" ? "bg-green-100" : "bg-red-100";
  const textColor = type === "success" ? "text-green-800" : "text-red-800";
  const borderColor =
    type === "success" ? "border-green-400" : "border-red-400";

  return (
    <div
      className={`fixed top-4 right-4 rounded-[9px] max-w-xs w-full p-4 border-l-4 ${backgroundColor} ${borderColor} shadow-md flex items-start space-x-2 transition-all duration-300 ${
        isVisible ? "opacity-100 mr-0" : "opacity-0 mr-[-100%]"
      }`}
    >
      <div className="flex-1 text-sm">
        <p className={`font-semibold ${textColor}`}>
          {type === "success"
            ? message || "Success"
            : message || "Something went wrong"}
        </p>
        <p className={`text-xs ${textColor}`}>Closing in {countdown} seconds</p>
      </div>
      <button
        onClick={handleClose}
        className="text-lg font-bold text-gray-600 hover:text-gray-800"
      >
        &times;
      </button>
    </div>
  );
};

export default Notification;
