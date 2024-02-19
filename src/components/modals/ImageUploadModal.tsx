import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { FcAddImage } from 'react-icons/fc';

import ImageEditTool from '../reusable/ImageEditTool';
import Modal from '../reusable/Modal';
import ImageCropModal from './ImageCropModal';

interface ImageUploadModalProps {
  onClose: () => void;
  SetImage: (src: string) => void;
  deleteOnClick: () => void;
  doneOnClick: () => void;
}

function ImageUploadModal({
  onClose,
  SetImage,
  deleteOnClick,
  doneOnClick,
}: ImageUploadModalProps) {
  const [imgSrc, setImgSrc] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showImageCropModal, setShowImageCropModal] = useState(false);

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || ""),
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const imageSelectHandler = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onCropComplete = (base64Image: string) => {
    setImgSrc(base64Image);
  };

  return (
    <Modal
      title="Upload Image"
      subtitle="Upload an image to use in your question."
      onClose={onClose}
    >
      <div
        className="flex flex-row justify-between items-center gap-2 p-2 rounded border-dashed border-2 border-black text-black cursor-pointer"
        onClick={imageSelectHandler}
      >
        {imgSrc ? (
          <div className="h-50 w-full flex justify-between items-center relative">
            <Image
              src={imgSrc}
              alt="uploaded image"
              width={300}
              height={300}
              className="rounded-lg"
            />
            <div className="absolute top-0 right-0">
              <ImageEditTool
                toolContainerStyle="flex-row justify-between "
                buttonStyle="w-fit flex gap-2 items-center justify-center px-2 py-2 border rounded border-none  text-white"
                deleteOnClick={deleteOnClick}
                setShowImageCropModal={setShowImageCropModal}
                setImgSrc={setImgSrc}
                doneOnClick={() => {
                  SetImage(imgSrc);
                  doneOnClick();
                  onClose();
                }}
              />
            </div>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
      {showImageCropModal && (
        <ImageCropModal
          imgSrc={imgSrc}
          onClose={() => setShowImageCropModal(false)}
          onCropComplete={onCropComplete}
        />
      )}
    </Modal>
  );
}

export default ImageUploadModal;
