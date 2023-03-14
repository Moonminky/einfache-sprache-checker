import React from "react";
import { render, waitFor } from "@testing-library/react";
import Check from "./components/Check";

describe("Check component", () => {
  const testCheck = { name: "Test Check", result: "pass" };

  it("1 renders without crashing", () => {
    render(<Check check={testCheck} />);
  });

  it("renders the ListItem component with the correct props", async () => {
    const { findByTestId } = render(<Check check={testCheck} />);
    const listItem = await findByTestId("check-listitem");

    expect(listItem).toHaveAttribute("data-testid", "check-listitem");
    expect(listItem).toHaveClass(`check ${testCheck.result}`);
  });

  it("renders the ListItemText component with the correct primary prop", async () => {
    const { getByText } = render(<Check check={testCheck} />);
    const listItemText = getByText(testCheck.name);

    expect(listItemText).toBeInTheDocument();
  });

  it("renders the DangerousIcon when result is 'fail'", async () => {
    const { findByTestId } = render(
      <Check check={{ ...testCheck, result: "fail" }} />
    );
    const dangerousIcon = await findByTestId("DangerousIcon");

    expect(dangerousIcon).toBeInTheDocument();
  });

  it("5 renders the CheckCircleIcon when result is 'pass'", async () => {
    const { findByTestId } = render(<Check check={testCheck} />);
    const checkCircleIcon = await findByTestId("CheckCircleIcon");

    expect(checkCircleIcon).toBeInTheDocument();
  });
});
