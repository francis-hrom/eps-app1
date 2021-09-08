import React from "react";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import { Row, Col, Image } from "react-bootstrap";

const HomePage = (): JSX.Element => (
  <div className="HomePage" data-testid="HomePage">
    <Card>
      <Container>
        <Row>
          <Col>
            <h1>Welcome to EPS!</h1>
            <p>
              EPS (Element Position Scanner) gives possibility to scan order of
              positions (rankings) of elements (items) on any web page.
            </p>
            <p>
              Main inputs are url link to the target web page and CSS selector
              which targets the relevant items on that specific web page.
            </p>
            <p>
              Selector can be generated via Find Selector tool, where as input
              is provided target web page url and list of relevant items (text).
              Then the tool visits the web page and return the most
              statistically relevant selector.
            </p>
            <p> Example use case scenarios:</p>
            <ul>
              <li>
                Sales team is managing several partnerships. Part of the
                partnership deal is specification on what position (rank) on the
                partners web page will be the company's product/service listed.
                To check manually 100+ partner web pages is highly inefficient
                and possibly error prone. With usage of EPS the sales team can
                retrieve this data easily and in addition get data about
                position of product/services of their competitors.
              </li>
              <li>
                Marketing / brand ambassador team of a major smartphone brand
                which is in charge of brand awareness. They need to monitor
                positions (ranks) of their smartphone brands as well their
                competitors on the major e-commerce websites.
              </li>
            </ul>
            <p>
              For illustration purposes data about smartphone popularity
              (rankings) are already preloaded from the major e-commerce web
              pages (targets).
            </p>
          </Col>
          <Col lg={6}>
            <Image src="images/explainer.jpg" alt="explainer" fluid />
          </Col>
        </Row>
      </Container>
    </Card>
  </div>
);

export default HomePage;
