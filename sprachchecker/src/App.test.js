import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("should render the header, text input, analysis result, and footer", () => {
    render(<App />);

    expect(
      screen.getByText("Einfache Sprache Quick-Check")
    ).toBeInTheDocument();
    expect(screen.getByText("Developed with 🍵 by")).toBeInTheDocument();
    expect(screen.getByText("Copyright © 2023")).toBeInTheDocument();
    expect(screen.getByTestId("content-input")).toBeInTheDocument();
    expect(screen.getByText("Check")).toBeInTheDocument();
    expect(screen.getByTestId("analysis-result")).toBeInTheDocument();
  });
});

//TODO:  test if the runChecks method correctly updates the state with new data after a successful server call
//TODO: test if the component can handle server errors correctly