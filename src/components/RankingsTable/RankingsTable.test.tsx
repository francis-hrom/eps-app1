import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import RankingsTable from "./RankingsTable";

describe("<RankingsTable />", () => {
  test("it should mount", () => {
    render(<RankingsTable />);

    const RankingsTable = screen.getByTestId("RankingsTable");

    expect(RankingsTable).toBeInTheDocument();
  });
});
