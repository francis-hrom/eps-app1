import axios from "axios";
import { login, logout, getCurrentUser } from "./auth.service";

jest.mock("axios");

describe("auth.service", () => {
  const email = "ada@lovelace.test";
  const password = "FIRSTprogrammer!";
  const fakeUser = {
    user: {
      email: "ada@lovelace.test",
      id: "6127c1deb3fc813d6c55ce20",
    },
    accessToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjEyN2MxZGViM2ZjODEzZDZjNTVjZTIwIiwiZW1haWwiOiJhZGFAbG92ZWxhY2UudGVzdCIsImlhdCI6MTYzMTAyMjY1MiwiZXhwIjoxNjMxNjI3NDUyfQ.kKo5kLSpwx4K-yx6Z-mwnhk8e7YURi6enTZ_dTSHzY8",
  };
  const response = { data: fakeUser };

  describe("login", () => {
    it("should exist", () => {
      expect(typeof login).toEqual("function");
    });

    it("should call endpoint with given data", async () => {
      axios.post.mockImplementationOnce(() => Promise.resolve(response));

      await login(email, password);

      expect(axios.post).toBeCalledWith(`${REACT_APP_API}/users/login`, {
        email,
        password,
      });
    });

    it("should receive success response from API", async () => {
      axios.post.mockImplementationOnce(() => Promise.resolve(response));

      const user = await login(email, password);

      expect(user).toEqual(fakeUser);
    });
  });

  describe("logout", () => {
    it("should exist", () => {
      expect(typeof logout).toEqual("function");
    });

    it("should remove value from local storage", () => {
      jest.spyOn(localStorage.__proto__, "removeItem");

      logout();

      expect(localStorage.__proto__.removeItem).toHaveBeenCalledOnce();
    });
  });

  describe("getCurrentUser", () => {
    it("should exist", () => {
      expect(typeof getCurrentUser).toEqual("function");
    });

    it("should access value from local storage", () => {
      jest.spyOn(localStorage.__proto__, "getItem");

      getCurrentUser();

      expect(localStorage.__proto__.getItem).toHaveBeenCalledOnce();
    });
  });
});
