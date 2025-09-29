export function hideOthers(active: HTMLElement) {
  const root = document.body;
  const toRestore: Array<HTMLElement> = [];
  root.querySelectorAll<HTMLElement>("body *").forEach((el) => {
    if (!active.contains(el) && !el.closest("[aria-live]")) {
      const prev = el.getAttribute("aria-hidden");
      if (prev !== "true") {
        el.setAttribute("aria-hidden", "true");
        toRestore.push(el);
      }
    }
  });
  return () => {
    for (const el of toRestore) el.removeAttribute("aria-hidden");
  };
}
