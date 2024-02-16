import React, { useRef, useEffect } from "react";
import { IoClose } from "react-icons/io5";

interface ModelComponentProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

const ModelComponent: React.FC<ModelComponentProps> = ({ title, children, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div ref={modalRef} className="bg-white rounded-lg p-4 md:w-[50%] w-[90%]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <IoClose size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ModelComponent;
