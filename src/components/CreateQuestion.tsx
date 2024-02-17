import React from 'react';

import OptionsComponents from './OptionsComponents';
import Question from './Question';

function CreateQuestion() {
  return (
    <div className="flex flex-col items-center w-full p-2 min-h-[74vh]">
      <div className="flex flex-col w-full h-full gap-2 bg-red-900 p-2 rounded">
        <Question />
        <OptionsComponents />
      </div>
    </div>
  );
}

export default CreateQuestion;
