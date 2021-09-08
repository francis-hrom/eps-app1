import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ScanRankingsPage from "./ScanRankingsPage";

describe("<ScanRankingsPage />", () => {
  test("it should mount", () => {
    render(<ScanRankingsPage />);

    const scanRankingsPage = screen.getByTestId("ScanRankingsPage");

    expect(scanRankingsPage).toBeInTheDocument();
  });
});
