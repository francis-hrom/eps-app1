import React from "react";
import GetRankings from "../../components/GetRankings/GetRankings";

const GetRankingsPage = (props: any): JSX.Element => (
  <div className="GetRankingsPage" data-testid="GetRankingsPage">
    <GetRankings props={props} />
  </div>
);

export default GetRankingsPage;
