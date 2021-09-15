import React from "react";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import { Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomePage = (): JSX.Element => (
  <div className="HomePage" data-testid="HomePage">
    <Card>
      <Container>
        <Row>
          <Col>
            <h1>Welcome to EPS!</h1>
            <p>
              EPS (Element Position Scanner) is a tool for businesses to
              efficiently monitor positions (rankings) of their products (and
              their competitors) on other websites.
            </p>
            <p> Example use case scenarios:</p>
            <ul>
              <li>
                Sales team is managing several partnerships (resellers,
                distributors etc.). Part of the partnership deal is
                specification on what position (ranking) on the partners web
                page will be the company's product/service listed. To check
                manually 100+ partner web pages is highly inefficient and
                possibly error prone. With usage of EPS the sales team can
                retrieve this data easily and in addition get data about
                position of product/services of their competitors.
              </li>
              <li>
                Marketing / brand ambassador team of a major smartphone brand
                which is in charge of brand awareness. They need to monitor
                positions (rankings) of their smartphone brands as well their
                competitors on the major e-commerce websites.
              </li>
            </ul>
            <p>
              User provides <Link to="/targets">Targets</Link> - list of urls
              (web pages) and selectors (CSS) targeting the relevant items on
              those web pages. EPS then opens these web pages one by one in a
              virtual web browser, scans the positions (rankings) and saves them
              to the database. Then the user (data analyst, marketer, sales
              person etc.) can view them or download them for further analysis
              from <Link to="/rankings">Rankings</Link>.
            </p>
            <p>
              Scannings of rankings can be set up according to the business
              needs (for example once per week, once per day or several times
              per day).
            </p>
            <p>
              Selector can be generated via{" "}
              <Link to="/find-selector">Find Selector</Link> tool, which helps
              users without technical knowledge of HTML/CSS to find relevant
              Selector. User enters the url (target web page) and list of
              relevant items (text from the web page). Then EPS visits the web
              page, evaluates all possible options and returns the most
              statistically relevant selector, which can be then verified via{" "}
              <Link to="/verify-selector">Verify Selector</Link> and saved to
              database (<Link to="/targets">Targets</Link>
              ).
            </p>
            <p>
              For illustration purposes data about smartphone popularity
              (rankings) are already preloaded from the major e-commerce web
              pages (targets). <Link to="/targets">Targets Table</Link> has
              unlocked all features (add/edit/delete/export) and reset to
              default values.
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
