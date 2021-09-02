import axios, { AxiosResponse } from "axios";
import authHeader from "../services/authHeader";

const { REACT_APP_API } = process.env;

export default function deleteTarget(_id: string): Promise<AxiosResponse> {
  return axios.delete(`${REACT_APP_API}/targets/${_id}`, {
    headers: authHeader(),
  });
}
