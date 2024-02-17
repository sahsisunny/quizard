"use client";
import QuestionSection from '@/components/QuestionSection';
import SideBar from '@/components/SideBar';
import TopBarComponent from '@/components/TopBar';
import { QuizDataProvider } from '@/provider/QuizDataProvider';

export default function Home() {
  return (
    <QuizDataProvider>
      <main className="min-h-[100vh]">
        <TopBarComponent />
        <div className="h-full flex xl:flex-row flex-col-reverse">
          <SideBar />
          <QuestionSection />
        </div>
      </main>
    </QuizDataProvider>
  );
}
