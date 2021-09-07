import axios from "axios";
import validUrl from "valid-url";
import setAuthHeader from "../setAuthHeader";

const { REACT_APP_API } = process.env;

export default function (url: string, selector: string): Promise<any> {
  if (!validUrl.isUri(url)) throw new TypeError(`${url} is not a valid URL.`);
  setAuthHeader();

  return (async () => {
    try {
      const response = await axios.post(`${REACT_APP_API}/targets`, {
        url,
        selector,
      });

      return response.data;
    } catch (error: any) {
      if (error.response) throw new Error(error.response.data);

      throw new Error("Server error. Please contact administrator.");
    }
  })();
}
