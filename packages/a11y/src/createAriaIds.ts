let uid = 0;
const nextId = (p = "ds") => `${p}-${++uid}`;

export function createAriaIds(prefix: string) {
  return {
    label: nextId(`${prefix}-label`),
    desc: nextId(`${prefix}-desc`),
  };
}
