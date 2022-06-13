import { ApiResponse, create, NETWORK_ERROR } from "apisauce";
import {
  dtObj,
  dtObjStatic,
  ExactRecord,
  ExactString,
  Record,
  String,
  Undefined,
} from "drytypes";
import { Alert } from "react-native";
import { JsxOpeningLikeElement } from "typescript";
import { AuthInfo } from "../auth-utils";
import { StorageKeys } from "../constants";
import { storage } from "../generic-utils";

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
  <T extends Record<string, unknown>>(
    endpoint: string,
    method: "POST" | "GET" | "DELETE" = "POST"
  ) =>
  <S extends dtObj, R extends dtObj>(
    respKeys?: S,
    errKeys?: R
  ): ((
    data: T
  ) => Promise<
    (dtObjStatic<S> & Ok) | (dtObjStatic<R> & Err) | NetworkErr | ValidationErr
  >) =>
  async (data) => {
    const info = await storage.getMapAsync<AuthInfo>(StorageKeys.AUTH_INFO);
    if (info && info.authenticated) api.setHeader("Authorization", info.token);

    let resp: ApiResponse<Ok, Err> | undefined = undefined;

    if (method == "POST") resp = await api.post<Ok, Err>(endpoint, data);
    else if (method == "GET") resp = await api.get<Ok, Err>(endpoint, data);
    else if (method == "DELETE")
      resp = await api.delete<Ok, Err>(endpoint, data);

    if (resp == undefined)
      return {
        status: "network-failure",
        message: "Unable to obtain a response",
      };

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
