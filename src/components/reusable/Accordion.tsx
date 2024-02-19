import React, { useState } from 'react';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  styleString?: string;
}

const Accordion = ({ title, children, styleString }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`border border-gray-200 rounded-lg mb-4 bg-black text-white ${styleString}`}
    >
      <div
        className="flex justify-between items-center px-4 py-2 cursor-pointer"
        onClick={toggleAccordion}
      >
        <h3 className="text-lg font-semibold">{title}</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 transition-transform transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? "M19 9l-7 7-7-7" : "M5 15l7-7 7 7"}
          />
        </svg>
      </div>
      {isOpen && <div className="px-4 py-2">{children}</div>}
    </div>
  );
};

export default Accordion;
