import React from 'react';

import QuestionAddBox from './QuestionAddBox';
import QuestionBox from './QuestionBox';
import SidebarButtons from './SidebarButtons';

function SideBar() {
  return (
    <div className="flex xl:flex-col flex-row  justify-between xl:w-[14rem] w-screen bg-gray-100  border-e-4 gap-2 p-2  border-r border-black xl:min-h-[90vh] h-auto sticky bottom-0 xl:top-14 ">
      <div className="flex xl:flex-col flex-row items-end gap-2  overflow-y-auto">
        <QuestionBox />
        <QuestionBox />
        <QuestionAddBox />
      </div>

      <SidebarButtons />
    </div>
  );
}

export default SideBar;
