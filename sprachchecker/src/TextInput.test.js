import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import TextInput from "./components/TextInput";
import App from "./App";

describe("TextInput", () => {
  it("calls onSend with expected arguments when form is submitted", async () => {
    const onSendMock = jest.fn();
    const { getByTestId, getByLabelText } = render(
      <TextInput onSend={onSendMock} />
    );
    const contentEditable = getByTestId("content-input");
    const selectElement = getByLabelText("Wähle das Sprachlevel:");
    const form = contentEditable.closest("form");

    fireEvent.change(selectElement, { target: { value: "a2" } });
    const text = "Some text";
    contentEditable.innerHTML = text;
    const range = document.createRange();
    range.selectNodeContents(contentEditable);
    range.collapse(false);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    fireEvent.input(contentEditable, { target: { innerHTML: text } });

    await waitFor(() => expect(contentEditable.innerHTML).toEqual(text));

    fireEvent.submit(form);

    await waitFor(() =>
      expect(onSendMock).toHaveBeenCalledWith({
        level: "a2",
        normalizedText: "Some text"
      })
    );
  });

  it("shows an error message when submitted with no text input", async () => {
    // Render the App component
    render(<App />);

    // Simulate a form submission without input
    const submitButton = screen.getByRole("button", { name: /check/i });
    fireEvent.click(submitButton);

    // Check if the toast error message element is present in the DOM
    await waitFor(() => {
      const toast = screen.getByRole("alert");
      expect(toast).toHaveTextContent("Bitte gib zuerst Text ein!");
    });
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
