import { create, NETWORK_ERROR } from "apisauce";
import {
  dtObj,
  dtObjStatic,
  ExactRecord,
  ExactString,
  Record,
  String,
  Undefined,
} from "drytypes";

export const api = create({
  baseURL: "https://api.taskr.live/",
  timeout: 3000, // 3 seconds
});

/// the ok response type
type Ok = { status: "success"; message: string };
const okDt = Record({
  status: ExactString("success"),
  message: String,
});

/// the error response type
type Err = { status: "failure"; message: string; devNote?: string };
const errDt = Record({
  status: ExactString("failure"),
  message: String,
  devNote: Undefined.union(String),
});

/// when the server could not be reached
type NetworkErr = { status: "network-failure"; message: string };

/// when the response does not match the expected structure
type ValidationErr = { status: "validation-failure"; message: string };

/// generic helper to create API call functions
export const apiCallCreator =
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