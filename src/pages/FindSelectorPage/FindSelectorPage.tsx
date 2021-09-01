import React from "react";
import FindSelector from "../../components/FindSelector/FindSelector";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import { Row, Col, Image } from "react-bootstrap";

const FindSelectorPage = (): JSX.Element => (
  <div className="FindSelectorPage" data-testid="FindSelectorPage">
    <Card>
      <Container>
        <Row>
          <Col>
            <FindSelector />
          </Col>
          <Col lg={6}>
            <Image src="images/explainer.jpg" alt="explainer" fluid />
          </Col>
        </Row>
      </Container>
    </Card>
  </div>
);

export default FindSelectorPage;
