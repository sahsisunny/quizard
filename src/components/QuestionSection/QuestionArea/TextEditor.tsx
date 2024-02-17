import React, { useState } from "react";
import { IoImage } from "react-icons/io5";

interface TextEditorProps {
  width?: string;
  height?: string;
  backgroundColor?: string;
  textAreaBackgroundColor?: string;
  placeholder?: string;
  type?: "SINGLE" | "MULTIPLE";
}

const TextEditor = ({
  width = "w-full",
  backgroundColor = "bg-white",
  textAreaBackgroundColor = "bg-white",
  placeholder = "Type your question here",
  type,
  height,
}: TextEditorProps) => {
  return (
    <div
      className={`flex flex-col gap-2 p-2 rounded text-white ${height} ${width} ${backgroundColor}`}
    >
      <div className="flex items-center relative">
        <button className="p-2">
          <strong>B</strong>
        </button>
        <button className="p-2">
          <i>I</i>
        </button>
        <button className="p-2 underline">U</button>
        <button className="p-2">
          x<sup>2</sup>
        </button>
        <button className="p-2">
          x<sub>2</sub>
        </button>
        <button className="p-2">
          <IoImage />
        </button>
        {type === "SINGLE" ? (
          <input
            type="radio"
            className="w-4 h-4 absolute top-0 right-0 animate-pulse cursor-pointer"
          />
        ) : type === "MULTIPLE" ? (
          <input
            type="checkbox"
            className="w-4 h-4 absolute top-0 right-0 animate-pulse cursor-pointer"
          />
        ) : null}
      </div>

      <textarea
        className={`rounded w-full p-2 ${textAreaBackgroundColor} border-none focus:outline-none`}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextEditor;
