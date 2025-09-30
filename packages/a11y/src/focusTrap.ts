import {
  getFocusableElements,
  isActiveElement,
  focusElement,
  isTabKey,
} from "@acme/core";

export function createFocusTrap(container: HTMLElement) {
  const onKeyDown = (e: KeyboardEvent) => {
    if (!isTabKey(e)) return;

    const items = getFocusableElements(container);
    const first = items[0];
    const last = items[items.length - 1];

    if (!first || !last) return;

    if (e.shiftKey && isActiveElement(first)) {
      e.preventDefault();
      focusElement(last);
    } else if (!e.shiftKey && isActiveElement(last)) {
      e.preventDefault();
      focusElement(first);
    }
  };

  container.addEventListener("keydown", onKeyDown);
  const prev = focusElement(container);

  return () => {
    container.removeEventListener("keydown", onKeyDown);
    prev?.focus?.();
  };
}
