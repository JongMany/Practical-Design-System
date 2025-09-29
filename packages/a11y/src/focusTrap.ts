export function focusTrap(container: HTMLElement) {
  const FOCUSABLE = [
    "a[href]",
    "button",
    "input",
    "select",
    "textarea",
    '[tabindex]:not([tabindex="-1"])',
  ].join(",");
  const prev = document.activeElement as HTMLElement | null;
  function onKeydown(e: KeyboardEvent) {
    if (e.key !== "Tab") return;
    const nodes = Array.from(
      container.querySelectorAll<HTMLElement>(FOCUSABLE)
    ).filter(
      (n) => !n.hasAttribute("disabled") && !n.getAttribute("aria-disabled")
    );
    const first = nodes[0],
      last = nodes[nodes.length - 1];
    if (!first || !last) return;
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
  container.addEventListener("keydown", onKeydown);
  return {
    activate(initial?: HTMLElement) {
      (initial ?? container).focus();
    },
    deactivate() {
      container.removeEventListener("keydown", onKeydown);
      prev?.focus();
    },
  };
}
