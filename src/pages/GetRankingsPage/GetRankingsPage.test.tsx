import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import GetRankingsPage from "./GetRankingsPage";

describe("<GetRankingsPage />", () => {
  test("it should mount", () => {
    render(<GetRankingsPage />);

    const getRankingsPage = screen.getByTestId("GetRankingsPage");

    expect(getRankingsPage).toBeInTheDocument();
  });
});
