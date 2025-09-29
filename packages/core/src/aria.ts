export type DataState = "open" | "closed" | "on" | "off" | "invalid";
export function boolAttr(v?: boolean) {
  return v ? "" : undefined;
}
export function dataState(v: DataState) {
  return { "data-state": v };
}
