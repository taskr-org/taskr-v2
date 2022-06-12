import { MMKVLoader } from "react-native-mmkv-storage";

export const storage = new MMKVLoader().initialize();

/**
 * returns @param def if @param v is == undefined
 */
export const getFromDef = <T>(v: T | undefined | null, def: T): T => {
  if (v == undefined) return def;
  return v;
};

export function getRandomDate() {
  const start = new Date();
  const end = new Date(2022, 9, 15);

  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

export const ah = (v: string) => (v.length < 2 ? `0${v}` : v);

export const formatDate = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const strHours = hours < 10 ? "0" + hours : hours;
  const strMinutes = minutes < 10 ? "0" + minutes : minutes;

  return `${strHours}:${strMinutes}`;
};

export const capitaliseStart = (str: string) =>
  str[0].toUpperCase() + str.slice(1);
