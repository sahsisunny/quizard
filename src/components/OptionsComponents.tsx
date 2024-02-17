import React, { useState } from 'react';
import { IoIosAdd } from 'react-icons/io';

import TextEditor from './reusable/TextEditor';

function OptionsComponents() {
  const [editors, setEditors] = useState([{ id: 1 }, { id: 2 }]);

  const handleAddEditor = () => {
    if (editors.length < 5) {
      setEditors((prevEditors) => [...prevEditors, { id: Date.now() }]);
    }
  };

  const handleDeleteEditor = (id: number) => {
    if (editors.length > 2) {
      setEditors((prevEditors) =>
        prevEditors.filter((editor) => editor.id !== id),
      );
    }
  };
  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-2 w-full">
      {editors.map((editor, index) => (
        <TextEditor
          key={editor.id}
          deleteButtonHandler={() => handleDeleteEditor(editor.id)}
          isDeleteButton={editors.length > 2}
          toolbarStyles={
            index === 0
              ? "bg-green-900"
              : index === 1
                ? "bg-blue-900"
                : index === 2
                  ? "bg-fuchsia-900"
                  : index === 3
                    ? "bg-purple-900"
                    : "bg-yellow-900"
          }
          editorStyles={
            index === 0
              ? "focus:bg-green-800 bg-green-900"
              : index === 1
                ? "focus:bg-blue-800 bg-blue-900"
                : index === 2
                  ? "focus:bg-fuchsia-800 bg-fuchsia-900"
                  : index === 3
                    ? "focus:bg-purple-800 bg-purple-900"
                    : "focus:bg-yellow-800 bg-yellow-900"
          }
          type="MULTIPLE"
          placeholder={`Type option ${index + 1} here`}
        />
      ))}
      {editors.length < 5 && (
        <div
          className="flex items-center justify-center rounded-md p-2 cursor-pointer h-full border"
          onClick={handleAddEditor}
        >
          <IoIosAdd className="text-4xl" />
        </div>
      )}
    </div>
  );
}

export default OptionsComponents;
