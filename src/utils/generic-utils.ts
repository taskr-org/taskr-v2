import { MMKVLoader } from "react-native-mmkv-storage";

export const storage = new MMKVLoader().initialize();

/**
 * returns @param def if @param v is == undefined
 */
export const getFromDef = <T>(v: T | undefined | null, def: T): T => {
  if (v == undefined) return def;
  return v;
};

export const capitaliseStart = (str: string) =>
  str[0].toUpperCase() + str.slice(1);
