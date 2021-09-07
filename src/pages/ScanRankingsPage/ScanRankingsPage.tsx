import React from "react";
import ScanRankings from "../../components/ScanRankings/ScanRankings";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import { Row, Col, Image } from "react-bootstrap";

const ScanRankingsPage = (): JSX.Element => (
  <div className="ScanRankingsPage" data-testid="ScanRankingsPage">
    <Card>
      <Container>
        <Row>
          <Col>
            <ScanRankings />
          </Col>
          <Col lg={6}>
            <Image src="images/explainer.jpg" alt="explainer" fluid />
          </Col>
        </Row>
      </Container>
    </Card>
  </div>
);

export default ScanRankingsPage;
