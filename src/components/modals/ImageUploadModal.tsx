import React, { useRef, useState } from 'react';
import { FcAddImage } from 'react-icons/fc';

import { useActiveQuestion, useQuizData } from '@/provider/QuizDataProvider';

import Modal from '../reusable/Modal';
import ImageCropModal from './ImageCropModal';

interface ImageUploadModalProps {
  keyName?: string;
  index?: number;
  onClose: () => void;
}

function ImageUploadModal({ onClose, index, keyName }: ImageUploadModalProps) {
  const { activeQuestion } = useActiveQuestion();
  const { quizData, setQuizData } = useQuizData();
  const [imgSrc, setImgSrc] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || ""),
      );
      reader.readAsDataURL(e.target.files[0]);
    }
    if (keyName) {
      setQuizData((prev) => ({
        ...prev,
        [keyName]: imgSrc,
      }));
    }
  }

  const onClickUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Modal
      title="Upload Image"
      subtitle="Upload an image to use in your question."
      onClose={onClose}
    >
      <div
        className="flex flex-row justify-between items-center gap-2 p-2 rounded border-dashed border-2 border-black text-black cursor-pointer"
        onClick={onClickUpload}
      >
        <div className="flex flex-row items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onSelectFile}
          />
          <FcAddImage size={50} />
          <span>Click to upload</span>
        </div>
        <div className="flex flex-col gap-2">
          <span>JPEG, JPG PNG</span>
        </div>
      </div>
    </Modal>
  );
}

export default ImageUploadModal;
