import React from 'react';
import { IoIosAddCircleOutline, IoMdSave, IoMdSearch } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';

import { useActiveQuestion, useQuizData } from '@/provider/QuizDataProvider';

function SideBar() {
  const { quizData, setQuizData } = useQuizData();
  const { activeQuestion, setActiveQuestion } = useActiveQuestion();
  return (
    <div className="flex xl:flex-col flex-row  justify-between xl:w-[14.5rem] w-full bg-gray-100  border-e-4 gap-2 p-2  border-r border-black xl:h-[90vh] h-auto sticky bottom-0 xl:top-14 z-20 ">
      <div className="flex xl:flex-col flex-row items-end gap-2  overflow-y-auto no-scrollbar">
        {/* Question */}
        {quizData.questions.map((questions: any, index: number) => (
          <div
            className="w-full  flex justify-center cursor-pointer gap-2"
            key={index}
            onClick={() => {
              setActiveQuestion(index);
            }}
          >
            <div className="flex flex-col items-center gap-2">
              <span
                className={`text-white bg-black rounded-full w-6 h-6 flex items-center justify-center ${
                  activeQuestion === index ? "bg-green-500" : ""
                }`}
              >
                {index + 1}
              </span>
              <button
                onClick={() => {
                  const updatedQuestions = quizData.questions.filter(
                    (_, i) => i !== index,
                  );
                  setQuizData({ ...quizData, questions: updatedQuestions });
                }}
                className="bg-black text-white rounded-full p-1 hover:bg-red-500 hover:shadow-md transition-all duration-300 ease-in-out flex items-center justify-center"
              >
                <MdDelete />
              </button>
            </div>
            <div
              className={`min-h-[6rem]  min-w-[10rem] border-2 border-gray-500 rounded flex justify-center items-center cursor-pointer hover:shadow-md ${
                activeQuestion === index
                  ? "border-2 border-green-500 box-border"
                  : ""
              }`}
            >
              <span
                className={`text-center text-sm overflow-hidden p-2
                 ${activeQuestion === index ? "text-green-500" : ""}`}
              >
                {quizData.questions[index].question ||
                  "Question " + (index + 1)}
              </span>
            </div>
          </div>
        ))}
        {/* new Question Button */}
        <div
          className="min-h-[6rem]  min-w-[10rem] border-2 border-gray-500 rounded flex justify-center items-center cursor-pointer hover:shadow-md"
          onClick={() => {
            setQuizData({
              ...quizData,
              questions: [
                ...quizData.questions,
                {
                  question: "",
                  options: [],
                  answer: [],
                  type: "Type",
                  points: "Points",
                  difficulty: "Difficulty",
                  time: "Time",
                  explanation: {
                    text: "",
                    image: "",
                  },
                },
              ],
            });
          }}
        >
          <IoIosAddCircleOutline className="text-4xl" />
        </div>
      </div>
      {/* Buttons */}
      <div className="gap-2 flex flex-col justify-around">
        <button className="flex flex-row items-center justify-center gap-2 py-2  w-full bg-gray-200 rounded hover:shadow-md">
          <IoMdSearch className="xl:text-xl text-md" />
          <p className="hidden lg:block text-sm">Search Library</p>
        </button>
        <button className="flex flex-row items-center gap-2 py-2 px-3 w-full justify-center bg-purple-600 text-white rounded hover:shadow-md">
          <IoMdSave className="xl:text-xl text-md" />
          <p className="hidden lg:block text-sm">Save Draft</p>
        </button>
      </div>
    </div>
  );
}

export default SideBar;
