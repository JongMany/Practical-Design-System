export function onEscape(node: HTMLElement, handler: () => void) {
  const fn = (e: KeyboardEvent) => {
    if (e.key === "Escape") handler();
  };
  node.addEventListener("keydown", fn);
  return () => node.removeEventListener("keydown", fn);
}
