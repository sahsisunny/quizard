"use client";
import { useState } from 'react';

import QuestionSection from '@/components/QuestionSection';
import QuizPreview from '@/components/QuizPreview';
import SideBar from '@/components/SideBar';
import TopBarComponent from '@/components/TopBar';
import { QuizDataProvider } from '@/provider/QuizDataProvider';

export default function Home() {
  const [showPreview, setShowPreview] = useState(false);
  const previewButtonHandler = () => {
    setShowPreview(!showPreview);
  };

  return (
    <QuizDataProvider>
      <main className="min-h-[100vh]">
        <TopBarComponent previewButtonHandler={previewButtonHandler} />
        <div className="h-full flex xl:flex-row flex-col-reverse">
          <SideBar />
          {showPreview ? <QuizPreview /> : <QuestionSection />}
        </div>
      </main>
    </QuizDataProvider>
  );
}
