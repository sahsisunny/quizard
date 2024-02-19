import { BiBold, BiText } from 'react-icons/bi';
import { FaItalic } from 'react-icons/fa';
import { FcRemoveImage } from 'react-icons/fc';
import { IoImage } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import { Tooltip } from 'react-tooltip';

interface TextEditorProps {
// Strings
  editorStyles?: string;
  toolbarStyles?: string;
  placeholder?: string;
  value?: string;
  type?: "SINGLE" | "MULTIPLE";
// Boolean
  isDeleteButton?: boolean;
  isImageButton?: boolean;
  isAutoFocus?: boolean;
  isCheckboxChecked?: boolean;
  isRadioChecked?: boolean;
  isDisabled?: boolean;
// Functions
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onCheckCheckbox?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCheckRadio?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteButtonHandler?: () => void;
  onImageClickHandler?: () => void;
  imageDeleteHandler?: () => void;
}

const TextEditor = ({
  editorStyles = "",
  toolbarStyles = "",
  placeholder = "Type here",
  value = "",
  type,
  isDeleteButton = false,
  deleteButtonHandler,
  onChange,
  isAutoFocus = false,
  isCheckboxChecked = false,
  isRadioChecked = false,
  isImageButton = false,
  onCheckCheckbox,
  onCheckRadio,
  isDisabled = false,
  onImageClickHandler,
  imageDeleteHandler,
}: TextEditorProps) => {
  return (
    <div
      className={`flex flex-col gap-2 p-2 rounded text-white ${toolbarStyles}`}
    >
      <div className="flex flex-wrap items-center relative">
        {isImageButton ? (
          <>
            <button className="p-2">
              <BiBold />
            </button>
            <button className="p-2">
              <FaItalic />
            </button>
            <button className="p-2 underline">U</button>
          </>
        ) : (
          <>
            <button className="p-2">
              <BiText />
            </button>
            <button className="p-2" onClick={imageDeleteHandler}>
              <FcRemoveImage className="text-white" />
            </button>
          </>
        )}
        {isImageButton && (
          <button className="p-2" onClick={onImageClickHandler}>
            <IoImage />
          </button>
        )}
        {isDeleteButton && (
          <button className="p-2" onClick={deleteButtonHandler}>
            <MdDelete />
          </button>
        )}
        {type === "SINGLE" && (
          <>
            <input
              type="radio"
              name="option"
              className="w-4 h-4 absolute top-0 right-0 animate-pulse cursor-pointer"
              checked={isRadioChecked}
              onChange={onCheckRadio}
              disabled={isDisabled}
              data-tooltip-id="radio-tooltip"
              data-tooltip-content={
                isDisabled ? "Empty options cannot be selected" : ""
              }
            />
            <Tooltip id="radio-tooltip" />
          </>
        )}
        {type === "MULTIPLE" && (
          <>
            <input
              type="checkbox"
              name="option"
              className="w-4 h-4 absolute top-0 right-0 animate-pulse cursor-pointer"
              checked={isCheckboxChecked}
              onChange={onCheckCheckbox}
              disabled={isDisabled}
              data-tooltip-id="checkbox-tooltip"
              data-tooltip-content={
                isDisabled ? "Empty options cannot be selected" : ""
              }
            />
            {isDisabled && <Tooltip id="checkbox-tooltip" />}
          </>
        )}
      </div>
      <textarea
        className={`rounded min-w-10 min-h-[20vh] p-2  ${editorStyles}  border-none focus:outline-none`}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        autoFocus={isAutoFocus}
      />
    </div>
  );
};

export default TextEditor;
