"use client";
import React, { useState } from "react";
import Selector from "./Selector";
import ModelComponent from "@/components/ModelComponent";
import { IoMdSettings } from "react-icons/io";

function QuestionSelectors() {
  const [showModal, setShowModal] = useState(false);
  const questionType = {
    "Single Choice": "single",
    "Multiple Choice": "multi",
  };
  const questionPoints = {
    "1 Points": "1",
    "2 Points": "2",
    "4 Points": "4",
    "5 Points": "5",
  };
  const questionTime = {
    "15 Second": "15",
    "30 Second": "30",
    "45 Second": "45",
    "60 Second": "60",
  };
  const questionDifficulty = { Easy: "Easy", Medium: "Medium", Hard: "Hard" };

  const onClickClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex flex-row justify-between items-center p-2 h-14">
        <Selector options={questionType} name="Question Type" />
        <div className="lg:flex flex-row gap-2 hidden">
          <Selector options={questionPoints} name="Points" />
          <Selector options={questionTime} name="Time" />
          <Selector options={questionDifficulty} name="Difficulty" />
        </div>
        <div className="flex flex-row justify-center items-center gap-2 lg:hidden">
          <button
            onClick={() => setShowModal(true)}
            className="bg-gray-800 text-white px-3 py-2 rounded-md hover:shadow-md flex items-center gap-2"
          >
            <IoMdSettings />
            <span className="hidden sm:block text-sm">Question Settings</span>
          </button>
        </div>
      </div>

      {showModal && (
        <ModelComponent title="Question Settings" onClose={onClickClose}>
          <div className="flex flex-wrap justify-around items-center gap-2">
            <Selector options={questionPoints} name="Points" />
            <Selector options={questionTime} name="Time" />
            <Selector options={questionDifficulty} name="Difficulty" />
          </div>
        </ModelComponent>
      )}
    </div>
  );
}

export default QuestionSelectors;
