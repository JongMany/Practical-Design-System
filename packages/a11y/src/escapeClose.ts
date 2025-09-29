export function createEscapeToClose(onClose: () => void) {
  return function handler(e: KeyboardEvent) {
    if (e.key === "Escape") {
      onClose();
    }
  };
}
