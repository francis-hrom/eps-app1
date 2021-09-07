import axios from "axios";
import setAuthHeader from "../setAuthHeader";

const { REACT_APP_API } = process.env;

export default async function editTarget(
  id: string,
  selector: string
): Promise<any> {
  setAuthHeader();

  try {
    const response = await axios.patch(`${REACT_APP_API}/targets/${id}`, {
      selector,
    });

    return response.data;
  } catch (error: any) {
    if (error.response) throw new Error(error.response.data);

    throw new Error("Server error. Please contact administrator.");
  }
}
