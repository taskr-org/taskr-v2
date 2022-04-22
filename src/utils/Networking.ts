import { ApiResponse, create } from "apisauce";
import { Alert } from "react-native";
import { getFrom } from "./Utils";

const api = create({
  baseURL: "https://api.taskr.live/",
  timeout: 6000, // 6 seconds
});

type Ok = { status: "success"; message: string } & Record<string, string>;
type Err = { status: "failure"; message: string; devNote: string } & Record<
  string,
  string
>;

const apis = {
  login: async (username: string, password: string): Promise<boolean> => {
    const resp = await api.post<Ok, Err>("/user/login", {
      username,
      password,
    });

    if (resp.data) {
      Alert.alert(
        resp.data.status,
        `${resp.data.message} ${getFrom(resp.data.devNote)}`
      );
      return true;
    }

    return false;
  },
  register: async (
    fullname: string,
    username: string,
    password: string,
    email: string
  ): Promise<boolean> => {
    const resp = await api.post<Ok, Err>("/user/register", {
      fullname,
      username,
      password,
      email,
    });

    if (resp.data) {
      Alert.alert(
        resp.data.status,
        `${resp.data.message} ${getFrom(resp.data.devNote)}`
      );
      return true;
    }

    return false;
  },
};

export default apis;
