import React from "react";

const TextInput = () => {
  return (
    <form>
      <label>
        Text input:
        <textarea />
      </label>
      <input className="submit" type="submit" value="Submit" />
    </form>
  );
};

export default TextInput;
