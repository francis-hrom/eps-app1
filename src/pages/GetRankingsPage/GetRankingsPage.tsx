import React from "react";
import GetRankings from "../../components/GetRankings/GetRankings";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";

const GetRankingsPage = (props: any): JSX.Element => (
  <div className="GetRankingsPage" data-testid="GetRankingsPage">
    <Card>
      <Container>
        <GetRankings props={props} />
      </Container>
    </Card>
  </div>
);

export default GetRankingsPage;
