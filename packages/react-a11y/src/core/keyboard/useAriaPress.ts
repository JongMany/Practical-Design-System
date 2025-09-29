import { createAriaPress, PressHandlers } from "@acme/a11y";
import * as React from "react";

/**
 * React용 훅: core util(createAriaPress)을 활용
 */
type ReactPressHandlers = Omit<PressHandlers, "onKeyDown" | "onClick"> & {
  onKeyDown: (e: React.KeyboardEvent) => void;
  onClick: (e: React.MouseEvent) => void;
};

export function useAriaPress(opts: {
  disabled?: boolean;
  onPress?: (e: { type: "click" | "keyboard" }) => void;
}): ReactPressHandlers {
  const handlers = React.useMemo(() => createAriaPress(opts), [opts]);

  return {
    ...handlers,
    onKeyDown: (e) => handlers.onKeyDown(e.nativeEvent),
    onClick: (e) => handlers.onClick(e.nativeEvent),
  };
}
