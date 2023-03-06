import React from "react";
import { useState } from "react";

// const TextInput = ({ onSend, submittedText, highlights }) => {
//   const [text, setText] = useState("");

//   const onSubmit = e => {
//     e.preventDefault();

//     if (!text) {
//       alert("Please add some text first!");
//     }
//     onSend({ text });
//   };

//   const renderText = (submittedText, highlightIndices) => {
//     if (!submittedText || !highlightIndices) {
//       return (<div className="empty"></div>)
//     }
//     else {
//     // Split text into an array of words
//     const words = submittedText.split(/\s+|\b/);

//     // Map over words and add highlight class to highlighted words
//     let highlightEndIndex = -1;
//     return words.map((word, index) => {
//       const wordStartIndex = submittedText.indexOf(word, highlightEndIndex + 1);
//       const wordEndIndex = wordStartIndex + word.length;
//       highlightEndIndex = Math.max(highlightEndIndex, wordEndIndex - 1);
//       const shouldHighlight = highlightIndices ? highlightIndices.includes(wordStartIndex) : false;
//       const className = shouldHighlight ? 'highlighted' : '';
//       return (
//         <div className="textinput">
//         <span key={index} className={className}>
//           {word}
//         </span>
//         </div>
//       );
//     });
//   }
//     }

//   return (
//     <form onSubmit={onSubmit}>
//       <textarea
//         type="text"
//         value={text}
//         onChange={e => setText(e.target.value)}
//         required
//       />
//       <input className="submit" type="submit" value="Submit" />
//     </form>
//   );
// };

const TextInput = ({ onSend, submittedText, highlights }) => {
  const [text, setText] = useState("");

  const onSubmit = e => {
    e.preventDefault();

    if (!text) {
      alert("Please add some text first!");
    } else {
      onSend({ text });
    }
  };

  const renderText = (submittedText, highlightIndices) => {
    if (!submittedText || !highlightIndices) {
      return '';
    } else {
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
          `<span class="${className}">${word} </span>`
        );
      }).join('');
    }
  };
  

  return (
    <form onSubmit={onSubmit}>
      <div
        contentEditable={true}
        className="textarea"
        onInput={(e) => setText(e.target.textContent.trim())}
        dangerouslySetInnerHTML={{ __html: renderText(submittedText, highlights) }}
      />
      <input className="submit" type="submit" value="Submit" />
    </form>
  );
};


export default TextInput;