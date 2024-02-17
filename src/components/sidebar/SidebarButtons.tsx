import React from 'react';
import { IoMdSave, IoMdSearch } from 'react-icons/io';

function SidebarButtons() {
  return (
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
  );
}

export default SidebarButtons;
