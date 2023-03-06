import React from "react";
import "../App.css";

const TextOutput = ({ submittedText, highlightIndices }) => {
  console.log("highlightIndices", highlightIndices);

  // Split text into an array of words
  const words = submittedText.split(/\s+|\b/);

  // Map over words and add highlight class to highlighted words
  let highlightEndIndex = -1;
  return words.map((word, index) => {
    const wordStartIndex = submittedText.indexOf(word, highlightEndIndex + 1);
    const wordEndIndex = wordStartIndex + word.length;
    highlightEndIndex = Math.max(highlightEndIndex, wordEndIndex - 1);
    const shouldHighlight = highlightIndices ? highlightIndices.includes(wordStartIndex) : false;
    const className = shouldHighlight ? 'highlighted' : '';
    return (
      <div className="textinput">
      <span key={index} className={className}>
        {word}
      </span>
      </div>
    );
  });
};

export default TextOutput;
