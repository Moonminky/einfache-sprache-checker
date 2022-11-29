import React from "react";
import { useState } from "react";

const TextInput = ({ onSend }) => {
  const [text, setText] = useState("");

  const onSubmit = e => {
    e.preventDefault();

    if (!text) {
      alert("Please add some text first!");
    }
    console.log(text);
    onSend({ text });

    // setText("");
  };
  return (
    <form onSubmit={onSubmit}>
      <textarea
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        required
      />
      <input className="submit" type="submit" value="Submit" />
    </form>
  );
};

export default TextInput;
