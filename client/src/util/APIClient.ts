import axios, { AxiosInstance, AxiosResponse } from "axios";
import config from "../../../server/utils/Config";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
abstract class APIHelper {
  protected instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL:
        config.NODE_ENV === "production"
          ? "https://codecademy-secret-santa-2.fly.dev"
          : `http://localhost:${config.PORT}`,
      timeout: 5000,
    });
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface APIClientI {
  get: <T>(url: string) => Promise<AxiosResponse<T>>;
  post: <T>(url: string, body: object) => Promise<AxiosResponse<T>>;
  put: <T>(url: string, body: object) => Promise<AxiosResponse<T>>;
  delete: <T>(url: string) => Promise<AxiosResponse<T>>;
}
