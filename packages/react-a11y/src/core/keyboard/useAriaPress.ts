import { createButtonHandlers, PressHandlers } from "@acme/core";
import * as React from "react";

/**
 * React용 훅: core util(createButtonHandlers)을 활용
 */
type ReactPressHandlers = Omit<PressHandlers, "onKeyDown" | "onClick"> & {
  onKeyDown: (e: React.KeyboardEvent) => void;
  onClick: (e: React.MouseEvent) => void;
};

export function useAriaPress(opts: {
  disabled?: boolean;
  onPress?: (e: { type: "click" | "keyboard" }) => void;
}): ReactPressHandlers {
  const handlers = React.useMemo(() => createButtonHandlers(opts), [opts]);

  return {
    ...handlers,
    onKeyDown: (e) => handlers.onKeyDown(e.nativeEvent),
    onClick: (e) => handlers.onClick(e.nativeEvent),
  };
}
