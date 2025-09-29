import * as React from "react";
import { createFocusTrap } from "@acme/a11y";

export function useFocusTrap(active: boolean) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!active || !ref.current) return;
    const dispose = createFocusTrap(ref.current);
    return () => dispose();
  }, [active]);

  return { ref };
}
