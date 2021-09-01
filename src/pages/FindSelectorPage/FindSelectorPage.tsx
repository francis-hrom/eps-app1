import React from "react";
import FindSelector from "../../components/FindSelector/FindSelector";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";

const FindSelectorPage = (): JSX.Element => (
  <div className="FindSelectorPage" data-testid="FindSelectorPage">
    <Card>
      <Container>
        <FindSelector />
      </Container>
    </Card>
  </div>
);

export default FindSelectorPage;
