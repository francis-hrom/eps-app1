import axios from "axios";

export default function setAuthHeader(): void {
  const { accessToken } = JSON.parse(localStorage.getItem("user") || "");

  if (accessToken) {
    axios.defaults.headers.common["x-access-token"] = accessToken;

    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
  } else {
    axios.defaults.headers.common["x-access-token"] = "";

    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
  }
}
