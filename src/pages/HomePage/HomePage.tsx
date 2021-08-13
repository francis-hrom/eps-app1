import React from "react";
import Login from "../../components/Login/Login";
import "./HomePage.css";

const HomePage = () => (
  <div className="HomePage" data-testid="HomePage">
    <h1>Welcome to EPS!</h1>
    <Login></Login>
  </div>
);

export default HomePage;
