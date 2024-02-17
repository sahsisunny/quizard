import React from 'react';
import { IoIosArrowBack, IoIosPlay } from 'react-icons/io';
import { MdPublish } from 'react-icons/md';

import { useQuizData } from '@/provider/QuizDataProvider';

function TopBarComponent() {
  const { quizData } = useQuizData();
  return (
    <div className="flex flex-row justify-between items-center p-2 border-b border-black h-[10vh] sticky top-0 bg-white z-40">
      <div className="flex flex-row items-center gap-2">
        <button className="flex flex-row items-center gap-2 py-2 px-3 bg-gray-200 rounded hover:shadow-md">
          <IoIosArrowBack className="sm:text-2xl text-md" />
          <h1 className="hidden sm:block">Back</h1>
        </button>
      </div>
      <div className="flex flex-row items-center gap-2">
        <button className="flex flex-row items-center gap-2 py-2 px-3 bg-gray-200 rounded hover:shadow-md">
          <IoIosPlay className="sm:text-2xl text-md" />
          <h1 className="hidden sm:block">Preview</h1>
        </button>
        <button
          className="flex flex-row items-center gap-2 py-2 px-3 bg-purple-600 text-white rounded hover:shadow-md"
          onClick={() => console.log(quizData)}
        >
          <MdPublish className="sm:text-2xl text-md" />
          <h1 className="hidden sm:block">Publish</h1>
        </button>
      </div>
    </div>
  );
}

export default TopBarComponent;
