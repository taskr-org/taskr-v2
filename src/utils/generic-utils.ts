import MMKVStorage from "react-native-mmkv-storage";

export const storage = new MMKVStorage.Loader().initialize();

/**
 * returns @param def if @param v is == undefined
 */
export const getFromDef = <T>(v: T | undefined | null, def: T): T => {
  if (v == undefined) return def;
  return v;
};
