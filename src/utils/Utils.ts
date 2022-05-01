import { NETWORK_ERROR } from "apisauce";
import {
  dtObj,
  dtObjStatic,
  ExactRecord,
  ExactString,
  Record,
  String,
  Undefined,
} from "drytypes";
import MMKVStorage from "react-native-mmkv-storage";
import { api } from "./Networking";

export const storage = new MMKVStorage.Loader().initialize();

export const getFrom = (val: string | undefined) =>
  val == undefined ? "" : val;

export const removeKey = <T extends Record<string, unknown>, K extends keyof T>(
  key: K,
  { [key]: _, ...rest }: T
): Omit<T, K> => rest;

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

export type AuthenticationInfo =
  | {
      authenticated: false;
    }
  | {
      authenticated: true;
      username: string;
      token: string;
    };

type NetworkErr = { status: "network-failure"; message: string };
type ValidationErr = { status: "validation-failure"; message: string };

export const apiCall =
  <T extends Record<string, unknown>>(endpoint: string) =>
  <S extends dtObj, R extends dtObj>(
    respKeys?: S,
    errKeys?: R
  ): ((
    data: T
  ) => Promise<
    (dtObjStatic<S> & Ok) | (dtObjStatic<R> & Err) | NetworkErr | ValidationErr
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
