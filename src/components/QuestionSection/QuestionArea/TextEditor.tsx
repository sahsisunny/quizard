import React, { useState } from "react";
import { IoImage } from "react-icons/io5";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface TextEditorProps {
  placeholder: string;
}

const TextEditor = ({ placeholder }: TextEditorProps) => {
  const [value, setValue] = useState("");

  const modules = {
    toolbar: [
      [
        "bold",
        "italic",
        "underline",
        { script: "sub" },
        { script: "super" },
        { list: "ordered" },
        { list: "bullet" },
        "link",
        "image",
        "clean",
      ],
    ],
  };

  return (
    <div className="rounded-md p-2">
      <ReactQuill
        modules={modules}
        theme="snow"
        onChange={setValue}
        className="h-96 bg-white p-2 rounded-md"
        placeholder={placeholder}
      />
      ;
    </div>
  );
};

export default TextEditor;
