import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import { IoClose } from 'react-icons/io5';

interface ModalProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
  title,
  subtitle,
  children,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="text-black fixed top-0 left-0 w-full h-full  flex justify-center items-center bg-gray-500 bg-opacity-80 z-40">
      <div
        ref={modalRef}
        className="bg-white rounded-lg p-4 md:w-[50%] w-[90%] "
      >
        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <Image
              src="/quiz.jpg"
              alt="quiz logo"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div className="flex flex-col">
              <h2 className="font-semibold">{title}</h2>
              <span className="text-sm text-gray-500">{subtitle}</span>
            </div>
          </div>
          <button
            onClick={onClose}
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

export default Modal;
