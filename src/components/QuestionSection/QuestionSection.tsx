'use client';
import React from "react";
import QuestionSelectors from "./QuestionSelectors";
import QuestionTitle from "./QuestionTitle";
import TextEditor from "./QuestionArea/TextEditor";

function QuestionSection() {
  return (
    <div className="w-full">
      <QuestionTitle
        title="Untitled quiz"
        onClickTitle={() => console.log("clicked")}
      />

      <QuestionSelectors />
      <TextEditor placeholder="Enter your question here" />
    </div>
  );
}

export default QuestionSection;
