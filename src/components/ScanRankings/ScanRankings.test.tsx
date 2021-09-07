import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ScanRankings from "./ScanRankings";

describe("<ScanRankings />", () => {
  test("it should mount", () => {
    render(<ScanRankings />);

    const ScanRankings = screen.getByTestId("ScanRankings");

    expect(ScanRankings).toBeInTheDocument();
  });
});
