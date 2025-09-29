let uid = 0;
export const id = (p = "ds") => `${p}-${++uid}`;

export function labelledBy(labelId: string) {
  return { "aria-labelledby": labelId };
}
export function describedBy(descId: string) {
  return { "aria-describedby": descId };
}
