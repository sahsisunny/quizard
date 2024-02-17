"use client";
import React, { useState } from 'react';
import { IoMdSettings } from 'react-icons/io';

import Modal from '@/components/Modal';
import { questionDifficulty, questionPoints, questionTime, questionType } from '@/data/selectors';

import Selector from '../Selector';

function QuestionSettings() {
  const [showModal, setShowModal] = useState(false);

  const onClickClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex flex-row justify-between items-center p-2 h-[8vh]">
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
        <Modal
          title="Question Settings"
          subtitle="Select the question settings"
          onClose={onClickClose}
        >
          <div className="flex flex-wrap justify-around items-center gap-2">
            <Selector options={questionPoints} name="Points" />
            <Selector options={questionTime} name="Time" />
            <Selector options={questionDifficulty} name="Difficulty" />
          </div>
        </Modal>
      )}
    </div>
  );
}

export default QuestionSettings;
