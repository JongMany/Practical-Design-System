import { useEffect } from "react";
import { createEscapeToClose } from "@acme/a11y";

/**
 * React hook wrapper for Escape key handling
 */
export function useEscapeToClose(enabled: boolean, onClose: () => void) {
  useEffect(() => {
    if (!enabled) return;
    const handler = createEscapeToClose(onClose);
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [enabled, onClose]);
}
