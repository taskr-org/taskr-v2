import { String } from "drytypes";
import { apiCallCreator } from "./netutils";

const apis = {
  login: apiCallCreator<{ username: string; password: string }>("/user/login")({
    token: String,
  }),

  register: apiCallCreator<{
    fullname: string;
    username: string;
    email: string;
    password: string;
  }>("/user/register")(),
} as const;

export default apis;
