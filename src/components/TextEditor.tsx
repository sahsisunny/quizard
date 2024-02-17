import { IoImage } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';

interface TextEditorProps {
  editorStyles?: string;
  toolbarStyles?: string;
  placeholder?: string;
  type?: "SINGLE" | "MULTIPLE";
  deleteButtonHandler?: () => void;
  isDeleteButton?: boolean;
}

const TextEditor = ({
  editorStyles,
  toolbarStyles,
  placeholder = "Type your question here",
  type,
  isDeleteButton,
  deleteButtonHandler,
}: TextEditorProps) => {
  console.log("toolbarStyles:", toolbarStyles); // Log editorStyles prop

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
        <button className="p-2">
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
            className="w-4 h-4 absolute top-0 right-0 animate-pulse cursor-pointer"
          />
        ) : type === "MULTIPLE" ? (
          <input
            type="checkbox"
            className="w-4 h-4 absolute top-0 right-0 animate-pulse cursor-pointer"
          />
        ) : null}
      </div>

      <textarea
        className={`rounded min-w-2  p-2  ${editorStyles}  border-none focus:outline-none`}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextEditor;
