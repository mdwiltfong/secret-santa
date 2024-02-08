import axios, { AxiosInstance, AxiosResponse } from "axios";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
abstract class APIHelper {
  protected instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:3000",
      /* config.NODE_ENV === "production"
          ? "https://codecademy-secret-santa-2.fly.dev"
          : `http://localhost:3000`, */
      timeout: 5000,
    });
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface APIClientI {
  get: <T>(url: string) => Promise<AxiosResponse<T>>;
  post: <T>(url: string, body: object) => Promise<AxiosResponse<T>> | undefined;
  put: <T>(url: string, body: object) => Promise<AxiosResponse<T>>;
  delete: <T>(url: string) => Promise<AxiosResponse<T>>;
}
//TODO: @MelindaH26 -> These methods need better error logging. Please refer to this doc: https://axios-http.com/docs/handling_errors
class APIClient extends APIHelper implements APIClientI {
  constructor() {
    super();
  }

  get<T>(url: string): Promise<AxiosResponse<T>> {
    return this.instance.get(url);
  }

  post<T>(url: string, body: object): Promise<AxiosResponse<T>> | undefined {
    try {
      return this.instance.post(url, body);
    } catch (error) {
      console.error(error);
    }
  }

  put<T>(url: string, body: object): Promise<AxiosResponse<T>> {
    return this.instance.put(url, body);
  }

  delete<T>(url: string): Promise<AxiosResponse<T>> {
    return this.instance.delete(url);
  }
}

export default APIClient;
