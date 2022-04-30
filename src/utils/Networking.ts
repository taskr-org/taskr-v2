import { create } from "apisauce";
import { String } from "drytypes";
import { apiCall } from "./Utils";

export const api = create({
  baseURL: "https://api.taskr.live/",
  timeout: 3000, // 3 seconds
});

const apis = {
  login: apiCall<{ username: string; password: string }>("/user/login")({
    token: String,
  }),

  register: apiCall<{
    fullname: string;
    username: string;
    email: string;
    password: string;
  }>("/user/register")(),
} as const;

export default apis;
