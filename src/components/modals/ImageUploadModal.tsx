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
        className=" min-h-400px flex flex-row justify-center items-center gap-2 p-2 rounded border-dashed border-2 border-black text-black cursor-pointer"
        onClick={imageSelectHandler}
      >
        {imgSrc ? (
          <div className="h-auto w-full flex justify-center items-center relative">
            <Image
              src={imgSrc}
              alt="uploaded image"
              width={300}
              height={300}
              className="max-h-[400px] w-auto h-auto object-fit rounded-md"
            />
            <div className="absolute top-0 right-0">
              <ImageEditTool
                toolContainerStyle="flex-col justify-between "
                buttonStyle="w-full flex gap-2 items-center justify-center px-2 py-2 border rounded border-none  text-white"
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
            <div className="flex flex-row items-center gap-2 w-full">
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
            <div>
              <span className="text-sm text-gray-500 pr-1">JPEG</span>
              <span className="text-sm text-gray-500 p-1">PNG</span>
              <span className="text-sm text-gray-500 ">SVG</span>
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
