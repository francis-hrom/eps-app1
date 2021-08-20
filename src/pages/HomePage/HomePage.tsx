import React from "react";

import "./HomePage.css";

const HomePage = (): JSX.Element => (
  <div className="HomePage" data-testid="HomePage">
    <h1>Welcome to EPS!</h1>
    <p>
      EPS (Element Position Scanner) can be used to scan order of positions
      (rankings) of elements (items) from any website.
    </p>
    <p>
      Main inputs are url link to the target web page and CSS selector which
      targets the relevant items on that specific web page.
    </p>
    <p>
      Selector can be generated via Find Selector tool, where as input is
      provided target web site url and list of relevant items (text). Then the
      tool visits the website and return the most statistically relevant
      selector.
    </p>
    <p> Example use case scenarios:</p>
    <p>
      Sales team is managing several partnerships. Part of the partnership deal
      is specification on what position (rank) on the partners website will be
      the company's product/service listed. To check manually 100+ partner
      websites is highly inefficient and possibly error prone. With usage of EPS
      the sales team can retrieve this data easily and in addition get data
      about position of product/services of their competitors.
    </p>
    <p>
      Another example would be a marketing / brand ambassador team of a major
      smartphone brand which is in charge of brand awareness. They need to
      monitor positions (ranks) of their smartphone brands as well their
      competitors on the major e-commerce websites.
    </p>
    <p>
      For illustration purposes data about smartphone popularity (rankings) are
      already preloaded from the major e-commerce websites (targets).
    </p>
  </div>
);

export default HomePage;
