import React from "react";
import GetRankings from "../../components/GetRankings/GetRankings";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import { Row, Col, Image } from "react-bootstrap";

const GetRankingsPage = (): JSX.Element => (
  <div className="GetRankingsPage" data-testid="GetRankingsPage">
    <Card>
      <Container>
        <Row>
          <Col>
            <GetRankings />
          </Col>
          <Col lg={6}>
            <Image src="images/explainer.jpg" alt="explainer" fluid />
          </Col>
        </Row>
      </Container>
    </Card>
  </div>
);

export default GetRankingsPage;
