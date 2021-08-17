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
      Main inputs are url link to the specific web page and CSS selector which
      targets the relevant items on that web page.
    </p>
    <p>
      Example use case scenario: Sales team is managing partnerships. Part of
      the partnership deal is on what position on the partners website will be
      the product listed. To check manually 100+ website would be very
      inefficient and error prone. WIth EPS can be this done easily.
    </p>
  </div>
);

export default HomePage;
