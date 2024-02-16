"use client";

import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

interface SelectorProps {
  options: { [key: string]: string };
  name: string;
  width?: string;
}

function Selector({ options, name, width }: SelectorProps) {
  const [selected, setSelected] = useState(false);
  const [selectedOption, setSelectedOption] = useState(name||"Select");

  const handleSelect = () => {
    setSelected(!selected);
  };

  const handleOption = (option: string) => {
    setSelectedOption(option);
    setSelected(!selected);
  };

  return (
    <div className="relative" style={{ width: width }}
    onClick={handleSelect}>
      <div>
        <button
          type="button"
          className="flex justify-between w-full  gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="menu-button"
        >
          {selectedOption}
          {selected ? (
            <IoIosArrowUp className="text-xl" />
          ) : (
            <IoIosArrowDown className="text-xl" />
          )}
        </button>
      </div>

      <div
        className={
          selected
            ? "absolute  z-10 w-40 origin-top-right divide-y divide-gray-100 rounded-b-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            : "hidden"
        }
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        {Object.keys(options).map((option, index) => (
          <div className="py-1" role="none" key={index}>
            <button
              className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              id={`menu-item-${index}`}
              onClick={() => handleOption(option)}
            >
              {option}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Selector;
