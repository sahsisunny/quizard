import React, { useRef, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { MdCrop, MdDone, MdImage } from 'react-icons/md';

interface AddExplanationProps {
  toolContainerStyle?: string;
  buttonStyle?: string;
  buttonTextStyle?: string;
  setShowImageCropModal: (show: boolean) => void;
  deleteOnClick: () => void;
  doneOnClick: () => void;
  setImgSrc: (src: string) => void;
}
function ImageEditTool({
  toolContainerStyle,
  buttonStyle,
  buttonTextStyle,
  setShowImageCropModal,
  deleteOnClick,
  setImgSrc,
  doneOnClick,
}: AddExplanationProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageSelectHandler = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || ""),
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }
  return (
    <div className={` flex gap-2 flex-wrap ${toolContainerStyle}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onSelectFile}
      />
      <button
        className={`bg-purple-600 hover:bg-purple-700 ${buttonStyle}`}
        onClick={imageSelectHandler}
      >
        <MdImage className="text-xl" />
        <span className="hidden sm:block text-sm">Change</span>
      </button>
      <button
        className={` bg-green-600  hover:bg-green-700 ${buttonStyle}`}
        onClick={doneOnClick}
      >
        <MdDone className="text-xl" />
        <span className="hidden sm:block text-sm">Done</span>
      </button>
      <button
        className={` bg-yellow-600  hover:bg-yellow-700 ${buttonStyle}`}
        onClick={() => setShowImageCropModal(true)}
      >
        <MdCrop className="text-xl" />
        <span className="hidden sm:block text-sm">Crop</span>
      </button>

      <button
        className={`bg-red-600 hover:bg-red-700 ${buttonStyle}`}
        onClick={deleteOnClick}
      >
        <AiOutlineDelete className="text-xl" />
        <span className="hidden sm:block text-sm">Delete</span>
      </button>
    </div>
  );
}

export default ImageEditTool;
