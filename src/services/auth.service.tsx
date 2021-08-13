import axios from "axios";

const API_URL = process.env.REACT_APP_API;

const login = (email: string, password: string): any => {
  return axios
    .post(API_URL + "/users/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = (): void => {
  localStorage.removeItem("user");
};

const getCurrentUser = (): any => {
  if (localStorage.getItem("user")) {
    return JSON.parse(localStorage.getItem("user") || "");
  } else return null;
};

export default {
  login,
  logout,
  getCurrentUser,
};
