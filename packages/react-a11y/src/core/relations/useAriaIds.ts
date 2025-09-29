import { createAriaIds } from "@acme/a11y";

export function useAriaIds(prefix: string) {
  return createAriaIds(prefix);
}
