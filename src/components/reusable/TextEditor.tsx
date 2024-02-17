import { useState } from 'react';
import { IoImage } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';

import ImageUploadModal from '../modals/ImageUploadModal';

interface TextEditorProps {
  editorStyles?: string;
  toolbarStyles?: string;
  placeholder?: string;
  type?: "SINGLE" | "MULTIPLE";
  deleteButtonHandler?: () => void;
  isDeleteButton?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
  isAutoFocus?: boolean;
  checkboxChecked?: boolean;
  radioChecked?: boolean;
  onCheckCheckbox?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCheckRadio?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
}

const TextEditor = ({
  editorStyles,
  toolbarStyles,
  placeholder = "Type your question here",
  type,
  isDeleteButton,
  deleteButtonHandler,
  onChange,
  value,
  isAutoFocus,
  checkboxChecked,
  radioChecked,
  onCheckCheckbox,
  onCheckRadio,
  isDisabled,
}: TextEditorProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div
      className={`flex flex-col gap-2 p-2 rounded text-white ${toolbarStyles}`}
    >
      <div className="flex flex-wrap items-center relative">
        <button className="p-2">
          <strong>B</strong>
        </button>
        <button className="p-2">
          <i>I</i>
        </button>
        <button className="p-2 underline">U</button>
        <button className="p-2" onClick={() => setShowModal(true)}>
          <IoImage />
        </button>
        {isDeleteButton && (
          <button className="p-2" onClick={deleteButtonHandler}>
            <MdDelete />
          </button>
        )}
        {type === "SINGLE" ? (
          <input
            type="radio"
            name="option"
            className="w-4 h-4 absolute top-0 right-0 animate-pulse cursor-pointer"
            checked={radioChecked}
            onChange={onCheckRadio}
            disabled={isDisabled}
          />
        ) : type === "MULTIPLE" ? (
          <input
            type="checkbox"
            name="option"
            className="w-4 h-4 absolute top-0 right-0 animate-pulse cursor-pointer"
            checked={checkboxChecked}
            onChange={onCheckCheckbox}
            disabled={isDisabled}
          />
        ) : null}
      </div>

      <textarea
        className={`rounded min-w-10 min-h-[20vh] p-2  ${editorStyles}  border-none focus:outline-none`}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        autoFocus={isAutoFocus}
      />
      {showModal && <ImageUploadModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default TextEditor;
