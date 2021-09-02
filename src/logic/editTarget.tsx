import axios, { AxiosResponse } from "axios";
import authHeader from "../services/authHeader";

const { REACT_APP_API } = process.env;

export default function editTarget(
  _id: string,
  selector: string
): Promise<AxiosResponse> {
  return axios.patch(
    `${REACT_APP_API}/targets/${_id}`,
    { selector },
    { headers: authHeader() }
  );
}
