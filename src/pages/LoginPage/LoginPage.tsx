import React from "react";
import "./LoginPage.css";
import LoginForm from "../../components/LoginForm/LoginForm";

const LoginPage = (): JSX.Element => (
  <div className="LoginPage" data-testid="LoginPage">
    <LoginForm />
  </div>
);

export default LoginPage;
