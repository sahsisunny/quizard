import Image from 'next/image';
import { AiOutlineDelete } from 'react-icons/ai';
import { MdImage, MdSave } from 'react-icons/md';

interface ImageUploadModalProps {
  image: string;
  setShowQuestionImageUploadModal: (value: boolean) => void;
  onSaveImage: () => void;
  onDeleteImage: () => void;
}

const ImageComponent = ({
  image,
  setShowQuestionImageUploadModal,
  onSaveImage,
  onDeleteImage,
}: ImageUploadModalProps) => {
  return (
    <div className="relative flex items-center justify-center lg:w-auto w-full h-fit min-h-[150px] ">
      {image && (
        <div className="absolute right-0 top-0 flex flex-col gap-2 text-white p-2">
          <button
            className="flex gap-2 items-center justify-center  px-2 py-2 border rounded bg-blue-600 border-none hover:bg-blue-700"
            onClick={onSaveImage}
          >
            <MdSave className="text-xl" />
          </button>

          <button
            className="flex gap-2 items-center justify-center  px-2 py-2 border rounded bg-green-600 border-none hover:bg-green-700"
            onClick={() => setShowQuestionImageUploadModal(true)}
          >
            <MdImage className="text-xl" />
          </button>
          <button
            className="flex gap-2 items-center justify-center  px-2 py-2 border rounded bg-red-600 border-none hover:bg-red-700"
            onClick={onDeleteImage}
          >
            <AiOutlineDelete className="text-xl" />
          </button>
        </div>
      )}
      <Image
        src={image}
        alt="Image"
        className="rounded-md max-w-[200px]  max-h-[200px] object-scale-down "
        width={300}
        height={300}
      />
    </div>
  );
};

export default ImageComponent;
