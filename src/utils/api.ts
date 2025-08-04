import axios from "axios";
import { BaseUrl } from "@/constants/BaseUrl";

const api = axios.create({
  baseURL: BaseUrl,
});


export const setApiToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export default api;
