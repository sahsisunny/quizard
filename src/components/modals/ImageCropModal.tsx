import 'cropperjs/dist/cropper.css';

import React, { useRef, useState } from 'react';
import Cropper from 'react-cropper';
import { MdDone } from 'react-icons/md';

import Modal from '../reusable/Modal';

interface ImageCropModalProps {
  imgSrc: string;
  onCropComplete: (base64Image: string) => void;
  onClose: () => void;
}
function ImageCropModal({
  imgSrc,
  onCropComplete,
  onClose,
}: ImageCropModalProps) {
  const cropperRef = useRef<any>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const handleCropComplete = () => {
    if (cropperRef.current) {
      const cropper = cropperRef.current.cropper;
      if (cropper) {
        const base64Image = cropper.getCroppedCanvas().toDataURL();
        setCroppedImage(base64Image);
        onCropComplete(base64Image);
      }
    }
    onClose();
  };

  return (
    <Modal
      title="Crop Image"
      subtitle="Crop the image to use in your question."
      onClose={onClose}
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-col justify-between items-center gap-2 borde">
          <Cropper
            src={imgSrc}
            ref={cropperRef}
            style={{ height: 400, backgroundColor:"white", width:"100%" }}
            viewMode={1}
          />
        </div>
        <div className="flex flex-row justify-center items-center gap-2 text-black">
          <button
            className="flex flex-row justify-center items-center gap-2 py-2 w-1/3 bg-purple-600 text-white rounded hover:shadow-md"
            onClick={handleCropComplete}
          >
            <MdDone className="text-2xl" />
            <span>Crop</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ImageCropModal;
