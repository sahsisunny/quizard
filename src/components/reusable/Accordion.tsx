import React, { useState } from 'react';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';

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
        <div className="text-3xl">
          {isOpen ? <MdArrowDropUp /> : <MdArrowDropDown />}
        </div>
      </div>
      {isOpen && <div className="px-4 py-2">{children}</div>}
    </div>
  );
};

export default Accordion;
