import React from "react";
import { render } from "@testing-library/react";
import AnalysisResult from "./components/AnalysisResult";

describe("AnalysisResult component", () => {
  const checks = [
    { name: "Test Check 1", result: "pass" },
    { name: "Test Check 2", result: "fail" },
    { name: "Test Check 3", result: "pass" },
  ];

  it("renders without crashing", () => {
     render(<AnalysisResult checks={checks} />);
  });

  it("renders the correct number of Check components", async () => {
    const { findAllByTestId } = render(<AnalysisResult checks={checks} />);
    const checkItems = await findAllByTestId("check-listitem");
  
    expect(checkItems.length).toBe(checks.length);
  });

  it("renders the Check components with the correct props", async() => {
    const { findAllByTestId } = render(<AnalysisResult checks={checks} />);
    const checkItems = await findAllByTestId("check-listitem");

    checkItems.forEach((checkItem, index) => {
      expect(checkItem).toHaveAttribute("data-testid", "check-listitem");
      expect(checkItem).toHaveClass(`check ${checks[index].result}`);
    });
  });
});
