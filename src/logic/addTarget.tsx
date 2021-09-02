import axios, { AxiosResponse } from "axios";
import validUrl from "valid-url";
import authHeader from "../services/authHeader";

const { REACT_APP_API } = process.env;

export default function addTarget(
  url: string,
  selector: string
): Promise<AxiosResponse> {
  if (!validUrl.isUri(url)) throw new TypeError(`${url} is not a valid URL.`);

  return axios.post(
    `${REACT_APP_API}/targets`,
    { url, selector },
    { headers: authHeader() }
  );
}
