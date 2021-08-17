import axios, { AxiosResponse } from "axios";
import authHeader from "../services/auth-header";

const API_URL = process.env.REACT_APP_API;

export default async function getSelector(
  url: string,
  textArr: string[]
): Promise<AxiosResponse> {
  return axios.post(
    API_URL + "/scrape/find-selector",
    {
      url,
      textArr,
    },
    { headers: authHeader() }
  );
}
