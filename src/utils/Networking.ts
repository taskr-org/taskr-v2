import { create, NETWORK_ERROR } from "apisauce";
import {
  DryType,
  dtObj,
  dtObjStatic,
  ExactRecord,
  ExactString,
  Record,
  String,
  Undefined,
  UnDryType,
} from "drytypes";
import { Alert } from "react-native";
import { getFrom, removeKey } from "./Utils";

const api = create({
  baseURL: "https://api.taskr.live/",
  timeout: 3000, // 3 seconds
});

type Ok = { status: "success"; message: string };
const okDt = Record({
  status: ExactString("success"),
  message: String,
});

type Err = { status: "failure"; message: string; devNote?: string };
const errDt = Record({
  status: ExactString("failure"),
  message: String,
  devNote: Undefined.union(String),
});

type NetworkErr = { status: "network-failure"; message: string };
type ValidationErr = { status: "validation-failure"; message: string };

type UnDtObj<T> = { [K in keyof T]: UnDryType<T[K]> };

const apiCall =
  <T extends Record<string, unknown>>(endpoint: string) =>
  <S extends dtObj, R extends dtObj>(
    respKeys?: S,
    errKeys?: R
  ): ((
    data: T
  ) => Promise<
    (UnDtObj<S> & Ok) | (UnDtObj<R> & Err) | NetworkErr | ValidationErr
  >) =>
  async (data) => {
    const resp = await api.post<Ok, Err>(endpoint, data);
    const rdata = resp.data;

    if (resp.problem == NETWORK_ERROR)
      return {
        status: "network-failure",
        message: "Please check your internet connection",
      };

    const rk = (respKeys == undefined ? {} : respKeys) as S;
    const ek = (errKeys == undefined ? {} : errKeys) as R;

    if (okDt.intersect(ExactRecord<S>(rk)).guard(rdata)) return rdata;
    if (errDt.intersect(ExactRecord<R>(ek)).guard(rdata)) return rdata;

    return {
      status: "validation-failure",
      message: "Something is wrong on our side! Please try again later.",
    };
  };

const apis = {
  login: apiCall<{ username: string; password: string }>("/user/login")(),
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
        `${resp.data.message} ${getFrom(resp.data.status)}`,
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
} as const;

export default apis;
