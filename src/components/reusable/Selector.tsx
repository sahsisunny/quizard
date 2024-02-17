import React, { useEffect, useRef, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import { useQuizData } from '@/provider/QuizDataProvider';

interface SelectorProps {
  options: { [key: string]: string };
  name: string;
  width?: string;
}

function Selector({ options, name, width }: SelectorProps) {
  const { quizData, setQuizData } = useQuizData();
  const [selected, setSelected] = useState(false);
  const [selectedOption, setSelectedOption] = useState(name || "Select");
  const selectorRef = useRef<HTMLDivElement>(null);

  const handleSelect = () => {
    setSelected(!selected);
  };

  const handleOption = (option: { key: string; value: string }) => {
    setSelectedOption(option.key);
    setSelected(!selected);
    setQuizData({ ...quizData, [name.toLocaleLowerCase()]: option.value });
    console.log({ quizData });
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectorRef.current &&
      !selectorRef.current.contains(event.target as Node)
    ) {
      setSelected(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selected]);
  return (
    <div
      className="relative"
      style={{ width: width }}
      ref={selectorRef}
      onClick={handleSelect}
    >
      <div>
        <button
          type="button"
          className="flex justify-between min-w-20 w-full  gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
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
            ? "absolute  z-10 w-full origin-top-right divide-y divide-gray-100 rounded-b-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            : "hidden"
        }
      >
        {!!options &&
          Object.keys(options).map((option, index) => (
            <div className="py-1" role="none" key={index}>
              <button
                className="w-fit text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                name={name}
                id={`menu-item-${index}`}
                onClick={() =>
                  handleOption({ key: option, value: options[option] })
                }
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
