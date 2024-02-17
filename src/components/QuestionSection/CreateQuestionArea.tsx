import React from 'react';

import Options from './Options';
import Question from './Question';

function CreateQuestionArea() {
  return (
    <div className="flex flex-col items-center w-full p-2">
      <div className="flex flex-col w-full gap-2 bg-red-900 p-2 rounded">
        <Question />
        <Options />
      </div>
    </div>
  );
}

export default CreateQuestionArea;
