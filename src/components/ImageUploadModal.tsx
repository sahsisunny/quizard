import React, { useRef, useState } from 'react';
import { FcAddImage } from 'react-icons/fc';

import ImageCropModal from './ImageCropModal';
import Modal from './Modal';

interface ImageUploadModalProps {
  onClose: () => void;
}

function ImageUploadModal({ onClose }: ImageUploadModalProps) {
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
      {imgSrc && <ImageCropModal imgSrc={imgSrc} onClose={onClose} />}
    </Modal>
  );
}

export default ImageUploadModal;