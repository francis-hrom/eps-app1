import axios, { AxiosResponse } from "axios";
import authHeader from "../services/authHeader";

const API_URL = process.env.REACT_APP_API;

export default async function getRankings(
  url: string,
  selector: string
): Promise<AxiosResponse> {
  return axios.post(
    API_URL + "/scrape/get-rankings",
    {
      url,
      selector,
    },
    { headers: authHeader() }
  );
}
