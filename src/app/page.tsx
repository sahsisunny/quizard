"use client";
import QuestionSection from '@/components/questionSection/QuestionSection';
import SideBar from '@/components/sidebar/SideBar';
import TopBarComponent from '@/components/TopBar';

export default function Home() {
  return (
    <main className="max-h-screen">
      <TopBarComponent />
      <div className="h-full flex xl:flex-row flex-col-reverse">
        <SideBar />
        <QuestionSection />
      </div>
    </main>
  );
}
