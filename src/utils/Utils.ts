export const getFrom = (val: string | undefined) =>
  val == undefined ? "" : val;

export const removeKey = <T extends Record<string, unknown>, K extends keyof T>(
  key: K,
  { [key]: _, ...rest }: T
): Omit<T, K> => rest;
