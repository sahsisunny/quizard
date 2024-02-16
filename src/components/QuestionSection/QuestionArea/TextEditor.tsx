import React, { useState } from "react";
import { IoImage } from "react-icons/io5";

const TextEditor: React.FC = () => {
  const [text, setText] = useState(""); // State to hold the text
  const [selectedText, setSelectedText] = useState(""); // State to hold the selected text

  // Function to handle formatting buttons
  const handleFormat = (format: string) => {
    const formattedText = applyFormat(text, format);
    setText(formattedText.props.children);
  };

  // Function to apply formatting to selected text
  const applyFormat = (text: string, format: string): JSX.Element => {
    const startPos = text.indexOf(selectedText);
    const endPos = startPos + selectedText.length;
    switch (format) {
      case "bold":
        return (
          <>
            {text.slice(0, startPos)}
            <strong>
              <i>{selectedText}</i>
            </strong>
            {text.slice(endPos)}
          </>
        );
      case "italic":
        return (
          <>
            {text.slice(0, startPos)}
            <i>{selectedText}</i>
            {text.slice(endPos)}
          </>
        );
      // Add more cases for other formatting options as needed
      default:
        return <>{text}</>;
    }
  };

  // Function to handle text selection
  const handleSelection = () => {
    const selectedText = window.getSelection()?.toString() || "";
    setSelectedText(selectedText);
  };

  return (
    <div className="p-4">
      <div className="flex items-center">
        <button className="p-2" onClick={() => handleFormat("bold")}>
          <strong>B</strong>
        </button>
        <button className="p-2" onClick={() => handleFormat("italic")}>
          <i>I</i>
        </button>
        <button className="p-2 underline">U</button>
        <button className="p-2">
          <IoImage />
        </button>
        <button className="p-2">
          x<sup>2</sup>
        </button>
        <button className="p-2">
          x<sub>2</sub>
        </button>
      </div>

      <textarea
        className="mt-4 p-2 border border-gray-300 rounded-md w-full"
        onChange={(e) => setText(e.target.value)}
        onSelect={handleSelection}
        value={text}
      />
    </div>
  );
};

export default TextEditor;
