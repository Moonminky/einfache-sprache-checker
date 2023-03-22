import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TextInput = ({ onSend, submittedText, highlights }) => {
  const [text, setText] = useState("");
  const [level, setLevel] = useState('a1');

  const onSubmit = e => {
    e.preventDefault();

    if (!text) {
      toast.error('Bitte gib zuerst Text ein!', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    } else {
      const normalizedText = text.normalize('NFC').replace(/[\u0300-\u0302\u0304-\u036f]/g, '');
      onSend({ normalizedText, level });
    }
  };

  const renderText = (submittedText, highlights) => {
    if (!submittedText || !highlights) {
      return "";
    } else {
      //get indexed Highlights
      let indexBasedHighlights = [];
      const indexBasedKeys = Object.keys(highlights[0]["index-based"]);

      // iterate through the keys in 'index-based'
      for (let j = 0; j < indexBasedKeys.length; j++) {
        const key = indexBasedKeys[j];
        const iHighlightsArray = highlights[0]["index-based"][key] || [];
        // add the values to the array
        indexBasedHighlights.push(...iHighlightsArray);
      }

      //get character-based Highlights
      let charBasedHighlights = [];
      const charBasedKeys = Object.keys(highlights[1]["character-based"]);

      // iterate through the keys in 'index-based'
      for (let j = 0; j < charBasedKeys.length; j++) {
        const key = charBasedKeys[j];
        const cHighlightsArray = highlights[1]["character-based"][key] || [];
        // add the values to the array
        charBasedHighlights.push(...cHighlightsArray);
      }

      //make list of words to highlight

      // Split text into an array of words
      const words = submittedText.split(/([\p{P}\p{Z}\p{M}]+)/u);
      const filteredWords = words.filter(word => !/^\s*$/.test(word));
      const trimmedWords = filteredWords.map(str => str.replace(/\s/g, ""));

      // Map over words and add highlight class to highlighted words
      let currentIndex = 0;
      let highlightStartIndex = 0;
      let highlightEndIndex = 0;

      return trimmedWords
        .map((word, index) => {
          const wordStartIndex = submittedText.indexOf(word, currentIndex);
          const wordEndIndex = wordStartIndex + word.length;
          currentIndex = wordEndIndex;

          indexBasedHighlights.forEach(([start, end]) => {
            if (wordStartIndex <= end && start <= wordEndIndex) {
              highlightStartIndex = Math.max(
                highlightStartIndex,
                wordStartIndex
              );
              highlightEndIndex = Math.max(highlightEndIndex, wordEndIndex - 1);
            }
          });

          const shouldHighlight =
            (highlightStartIndex === wordStartIndex &&
            highlightEndIndex === wordEndIndex - 1) ||
            charBasedHighlights.includes(word);
          const className = shouldHighlight ? "highlighted" : "";
          let separator = "";
          if (/([\p{P}\p{Z}\p{M}]+)/u.test(trimmedWords[index + 1])) {
            separator = "";
          } else {
            separator = " ";
          }
          return `<span class="${className}">${word}</span>${separator}`;
        })
        .join("");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <ToastContainer/>
      <label className="glevel" htmlFor="levelselect">
        Wähle das Sprachlevel:{' '}
        <select
          id="levelselect"
          value={level}
          onChange={e => setLevel(e.target.value)}
        >
          <option value="a1">Deutsch A1</option>
          <option value="a2">Deutsch A2</option>
          <option value="b1">Deutsch B1</option>
        </select>
      </label>
      <div className="textandlabel">
      <label htmlFor="textinput">Gib hier deinen Text ein.
      <div
        contentEditable={true}
        className="textarea"
        id="textinput"
        data-testid="content-input"
        onInput={(e) => {
          const text = e.target.textContent;
          const selection = window.getSelection();
          const cursorOffset = selection.focusOffset;
          const normalizedText = text.normalize('NFC').replace(/[\u0300-\u0302\u0304-\u036f]/g, '');
          e.target.textContent = normalizedText;
          const newRange = new Range();
          newRange.setStart(selection.anchorNode, cursorOffset);
          newRange.setEnd(selection.focusNode, cursorOffset);
          selection.removeAllRanges();
          selection.addRange(newRange);
          setText(normalizedText);
        }}       
        data-placeholder="Gib hier deinen Text ein."
        dangerouslySetInnerHTML={{
          __html: renderText(submittedText, highlights)
        }}
      />
      </label>
      </div>
      <input className="submit" type="submit" value="Check" />
    </form>
  );
};

export default TextInput;
