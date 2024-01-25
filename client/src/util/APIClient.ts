import axios from "axios";
import config from "../../../server/utils/Config";
const axiosInstance = axios.create({
  baseURL:
    config.NODE_ENV === "production"
      ? "https://codecademy-secret-santa-2.fly.dev"
      : "http://localhost:3000",
  timeout: 1000,
});

const response = await axiosInstance.get("/user?ID=12345");

interface APIClientI {
  get: (url: string) => Promise<any>;
  post: (url: string, body: any) => Promise<any>;
  put: (url: string, body: any) => Promise<any>;
  delete: (url: string) => Promise<any>;
}
