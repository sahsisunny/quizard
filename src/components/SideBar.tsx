import React from 'react';
import { IoIosAddCircleOutline, IoMdSave, IoMdSearch } from 'react-icons/io';

function SideBar() {
  return (
    <div className="flex xl:flex-col flex-row  justify-between xl:w-[14rem] w-full bg-gray-100  border-e-4 gap-2 p-2  border-r border-black xl:h-[90vh] h-auto sticky bottom-0 xl:top-14 z-20 ">
      <div className="flex xl:flex-col flex-row items-end gap-2  overflow-y-auto">
        {/* Question */}
        <div className="w-full  flex justify-center cursor-pointer gap-2">
          <span>1</span>
          <div className="min-h-[6rem]  min-w-[10rem] border-2 border-gray-500 rounded flex justify-center items-center cursor-pointer hover:shadow-md"></div>
        </div>
        {/* new Question Button */}
        <div className="min-h-[6rem]  min-w-[10rem] border-2 border-gray-500 rounded flex justify-center items-center cursor-pointer hover:shadow-md">
          <IoIosAddCircleOutline className="text-4xl" />
        </div>
      </div>
      {/* Buttons */}
      <div className="gap-2 flex flex-col justify-around">
        <button className="flex flex-row items-center justify-center gap-2 py-2  w-full bg-gray-200 rounded hover:shadow-md">
          <IoMdSearch className="xl:text-xl text-md" />
          <p className="hidden lg:block text-sm">Search Library</p>
        </button>
        <button className="flex flex-row items-center gap-2 py-2 px-3 w-full justify-center bg-purple-600 text-white rounded hover:shadow-md">
          <IoMdSave className="xl:text-xl text-md" />
          <p className="hidden lg:block text-sm">Save Draft</p>
        </button>
      </div>
    </div>
  );
}

export default SideBar;
