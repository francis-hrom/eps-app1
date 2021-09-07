import axios from "axios";
import setAuthHeader from "../setAuthHeader";

const { REACT_APP_API } = process.env;

export default async function resetTargets(): Promise<any> {
  setAuthHeader();

  try {
    const response = await axios.post(
      `${REACT_APP_API}/targets/reset-to-default-data`
    );

    return response.data;
  } catch (error: any) {
    if (error.response) throw new Error(error.response.data);

    throw new Error("Server error. Please contact administrator.");
  }
}
