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
  login: async (
    username: string,
    password: string,
    onClickAlert?: () => void
  ): Promise<boolean> => {
    const resp = await api.post<Ok, Err>("/user/login", {
      username,
      password,
    });

    if (resp.data) {
      Alert.alert(
        resp.data.status,
        `${resp.data.message} ${getFrom(resp.data.devNote)}`,
        [
          {
            text: "Okay",
            onPress: () => {
              onClickAlert && onClickAlert();
            },
          },
        ]
      );
      return resp.data.status === "success";
    }

    return false;
  },
  register: async (
    fullname: string,
    username: string,
    password: string,
    email: string,
    onClickAlert?: () => void
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
        `${resp.data.message} ${getFrom(resp.data.devNote)}`,
        [
          {
            text: "Okay",
            onPress: () => {
              onClickAlert && onClickAlert();
            },
          },
        ]
      );
      return resp.data.status === "success";
    }

    return false;
  },
};

export default apis;
