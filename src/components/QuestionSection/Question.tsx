import Image from 'next/image';
import React from 'react';

import TextEditor from '@/components/TextEditor';

function Question() {
  return (
    <div className="flex flex-row gap-2 h-1/2">
      <div className="w-auto h-auto">
        <Image
          src="/computer.png"
          alt="quiz cover"
          width={250}
          height={250}
          className="rounded-md w-auto h-auto object-cover bg-red-900 border-2 border-red-900"
        />
      </div>
      <div className="w-full h-full">
        <TextEditor
          toolbarStyles="bg-red-900 border h-auto"
          editorStyles="focus:bg-red-800 bg-red-900 "
          placeholder="Type question here"
        />
      </div>
    </div>
  );
}

export default Question;
