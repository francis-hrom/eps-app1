import React from "react";
import RankingsTable from "../../components/RankingsTable/RankingsTable";
import "./RankingsPage.css";

const RankingsPage = (): JSX.Element => (
  <div className="RankingsPage" data-testid="RankingsPage">
    <RankingsTable />
  </div>
);

export default RankingsPage;
