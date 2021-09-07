import axios from "axios";
import setAuthHeader from "./setAuthHeader";

jest.mock("axios");

describe("setAuthHeader", () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjEyN2MxZGViM2ZjODEzZDZjNTVjZTIwIiwiZW1haWwiOiJhZGFAbG92ZWxhY2UudGVzdCIsImlhdCI6MTYzMDkzODAxNiwiZXhwIjoxNjMxNTQyODE2fQ.5ZlhcvRqz6fpcschtN6uGmR49jHKsYnOL2O9erMlMEDA";
  const fakeValues = JSON.stringify({
    token,
    isLoggedIn: "true",
    isInitialized: "true",
    user: '{"email":"ada@lovelace.test","password":"$2a$10$j95TM0xWVcey.EbLEm4KC.7FtfAqGUcr1SgsZLRlDkevV894UQ77G","id":"6127c1deb3fc813d6c55ce20"}',
    _persist: '{"version":-1,"rehydrated":true}',
  });

  it("should exist", () => {
    expect(typeof setAuthHeader).toEqual("function");
  });

  it("should access value from local storage", () => {
    jest.spyOn(localStorage.__proto__, "getItem");

    setAuthHeader();

    expect(localStorage.__proto__.getItem).toHaveBeenCalledOnce();
  });

  it("should set the axios header x-auth-token with a token", () => {
    localStorage.setItem("user-account", fakeValues);

    setAuthHeader();

    expect(axios.defaults.headers.common["x-auth-token"]).toBe("test token");
  });
});
