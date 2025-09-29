const FOCUSABLE =
  'a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"])';

export function createFocusTrap(container: HTMLElement) {
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== "Tab") return;
    const items = Array.from(
      container.querySelectorAll<HTMLElement>(FOCUSABLE)
    ).filter(
      (el) =>
        !el.hasAttribute("disabled") &&
        el.getAttribute("aria-disabled") !== "true"
    );
    const first = items[0],
      last = items[items.length - 1];
    if (!first || !last) return;

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  container.addEventListener("keydown", onKeyDown);
  const prev = document.activeElement as HTMLElement | null;
  (container as HTMLElement).focus();

  return () => {
    container.removeEventListener("keydown", onKeyDown);
    prev?.focus?.();
  };
}
