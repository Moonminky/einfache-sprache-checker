import { render, screen, fireEvent, waitFor, userEvent } from "@testing-library/react";
import React from "react";
import TextInput from "./components/TextInput";
import { toast } from "react-toastify";

describe("TextInput", () => {
  it("renders the component correctly", () => {
    const { getByLabelText } = render(<TextInput />);
    expect(getByLabelText("Wähle das Sprachlevel:")).toBeInTheDocument();
  });

  //TODO:implement
  // it("calls onSend when submitted with text input", async () => {
  //   // declare as async function
  //   const onSend = jest.fn();
  //   const user = userEvent.setup();
  //   const { getByText, getByTestId } = render(<TextInput onSend={onSend} />);
  //   const input = getByTestId("content-input");
  //   const button = getByText("Check");
  //   await user.type(input, "Hello world"); // use userEvent.type
  //   await user.click(button);
  //   expect(input.value).toBe("Hello world"); // use value instead of textContent
  //   expect(onSend).toHaveBeenCalledWith({
  //     text: "Hello world",
  //     level: "a1"
  //   });
  // });

  it("shows an error message when submitted with no text input", () => {
    //TODO: test if toast.error is shown
    // const onSend = jest.fn();
    // const { getByText } = render(<TextInput onSend={onSend} />);
    // const button = getByText("Check");
    // fireEvent.click(button);
    // expect(toast.error).toHaveBeenCalled();
  });

  it("renders highlighted text with given submittedText and highlights", async () => {
    const submittedText = `Dieses ist nicht mein Testsatz! Stattdessen haben wir schon zwei Sätze, 
      die direkt hintereinander stehen und dieser ist zu lang.
      Wie wäre es denn mit einem Konjunktiv?`;
    const highlights = [
      {
        "index-based": {
          neg_highlights: [[11, 16]],
          sentence_len_highlights: [[32, 128]],
          passive_highlights: []
        }
      },
      {
        "character-based": {
          punctuation_highlights: ["!"],
          goethe_highlights: [
            "Testsatz",
            "Sätze",
            "Konjunktiv",
            "hintereinander",
            "direkt",
            "Stattdessen"
          ],
          num_highlights: ["zwei"],
          subjunctive_highlights: ["wäre"]
        }
      }
    ];

    const { queryAllByText } = render(
      <TextInput submittedText={submittedText} highlights={highlights} />
    );

    const highlightedWords = queryAllByText(
      /Testsatz|nicht|\!|Stattdessen haben wir schon zwei Sätze, die direkt hintereinander stehen und dieser ist zu lang\.|direkt|Konjunktiv|hintereinander|Stattdessen|zwei|wäre/i
    );
    await waitFor(() => {
      highlightedWords.forEach(element => {
        expect(element).toHaveClass("highlighted");
      });
    });
    const nonHighlightedWords = queryAllByText(
      /\b(Dieses|mein|Wie|es|denn|mit|einem)\b/i
    );
    await waitFor(() => {
      nonHighlightedWords.forEach(element => {
        expect(element).not.toHaveClass("highlighted");
      });
    });
  });
});
