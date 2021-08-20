import React from "react";
import GetRankings from "../../components/GetRankings/GetRankings";
import "./GetRankingsPage.css";

const GetRankingsPage = (props: any) => (
  <div className="GetRankingsPage" data-testid="GetRankingsPage">
    <GetRankings props={props} />
  </div>
);

export default GetRankingsPage;
