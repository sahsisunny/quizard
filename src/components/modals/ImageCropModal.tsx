import 'react-image-crop/dist/ReactCrop.css';

import React, { useRef, useState } from 'react';
import { FcAddImage } from 'react-icons/fc';
import { IoMdSave } from 'react-icons/io';
import { MdDone } from 'react-icons/md';
import ReactCrop, { centerCrop, Crop, makeAspectCrop, PixelCrop } from 'react-image-crop';

import Modal from '../reusable/Modal';

interface ImageCropModalProps {
  imgSrc: string;
  onClose: () => void;
}
function ImageCropModal({ imgSrc, onClose }: ImageCropModalProps) {
  function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number,
  ) {
    return centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 90,
        },
        aspect,
        mediaWidth,
        mediaHeight,
      ),
      mediaWidth,
      mediaHeight,
    );
  }

  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const aspect = 16 / 9;
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, aspect));
  }

  const getCroppedImg = (image: HTMLImageElement, crop: PixelCrop) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width!;
    canvas.height = crop.height!;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(
      image,
      crop.x! * scaleX,
      crop.y! * scaleY,
      crop.width! * scaleX,
      crop.height! * scaleY,
      0,
      0,
      crop.width!,
      crop.height!,
    );

    return new Promise<string>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => resolve(reader.result as string);
      }, "image/jpeg");
    });
  };

  return (
    <Modal
      title="Crop Image"
      subtitle="Crop the image to use in your question."
      onClose={onClose}
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-col justify-between items-center gap-2">
          {!!imgSrc && (
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              aspect={undefined}
              minHeight={100}
              className="rounded max-w-[400px] max-h-[400px] object-cover overflow-hidden"
            >
              <img
                ref={imgRef}
                src={imgSrc}
                alt="Crop"
                onLoad={onImageLoad}
                style={{ maxWidth: "100%" }}
                className="rounded object-cover"
              />
            </ReactCrop>
          )}
        </div>
        <div className="flex flex-row justify-center items-center gap-2 text-black">
          <button
            className="flex flex-row justify-center items-center gap-2 py-2 w-1/3 bg-purple-600 text-white rounded hover:shadow-md"
            onClick={onClose}
          >
            <MdDone className="text-2xl" />
            <span>Done</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ImageCropModal;
