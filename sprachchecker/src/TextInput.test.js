import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import TextInput from "./components/TextInput";
import { toast } from "react-toastify";

describe("TextInput", () => {
  it("renders the component correctly", () => {
    const { getByLabelText } = render(<TextInput />);
    expect(getByLabelText("Wähle das Sprachlevel:")).toBeInTheDocument();
  });

  it("calls onSend when submitted with text input", () => {
    //TODO: implement
    // const onSend = jest.fn();
    // const { getByText, getByPlaceholderText } = render(
    //   <TextInput onSend={onSend} />
    // );
    // const input = getByPlaceholderText(/Gib hier deinen Text ein./i);
    // const button = getByText("Check");
    // fireEvent.change(input, { target: { value: "Hello world" } });
    // fireEvent.click(button);
    // expect(onSend).toHaveBeenCalledWith({
    //   text: "Hello world",
    //   level: "a1",
    // });
  });

  it("shows an error message when submitted with no text input", () => {
    //TODO: test if toast.error is shown
    // const onSend = jest.fn();
    // const { getByText } = render(<TextInput onSend={onSend} />);
    // const button = getByText("Check");
    // fireEvent.click(button);
    // expect(toast.error).toHaveBeenCalled();
  });

  it("renders highlighted text with given submittedText and highlights", async () => {
    //TODO: Test mit sinnvollen deutschen Inputs für alle möglichen Checks
    const submittedText =
      `Dieses ist nicht mein Testsatz. Stattdessen haben wir schon zwei Sätze, 
      die direkt hintereinander stehen und dieser ist zu lang.
      Wie wäre es denn mit einem Konjunktiv?`;
    const highlights = [
      {
        "index-based": {
          neg_highlights: [[11, 16]],
          sentence_len_highlights: [[74, 158]],
          passive_highlights: []
        }
      },
      {
        "character-based": {
          punctuation_highlights: ["!"],
          goethe_highlights: ['Sätze', 'direkt', 'Konjunktiv', 'Testsatz', 'hintereinander', 'Stattdessen'],
          num_highlights: ["zwei"],
          subjunctive_highlights: ["wäre"]
        }
      }
    ];

    const { queryAllByText } = render(
      <TextInput submittedText={submittedText} highlights={highlights} />
    );

    const highlightedWords = queryAllByText(/Testsatz|nicht|\!/i);
    console.log("highlightedWords:", highlightedWords);
    await waitFor(() => {
      highlightedWords.forEach(element => {
        console.log(element.textContent);
        expect(element).toHaveClass("highlighted");
      });
    });
  });
});
