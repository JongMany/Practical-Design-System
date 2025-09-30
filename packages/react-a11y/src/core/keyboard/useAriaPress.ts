import {
  createKeyboardPressA11yHandlers,
  KeyboardPressA11yOptions,
  KeyboardPressA11yHandlers,
} from "@acme/a11y";
import * as React from "react";

/**
 * React용 Keyboard Press 핸들러 타입
 */
type ReactKeyboardPressHandlers = Omit<
  KeyboardPressA11yHandlers,
  "onKeyDown" | "onKeyUp"
> & {
  onKeyDown: (e: React.KeyboardEvent) => void;
  onKeyUp?: (e: React.KeyboardEvent) => void;
};

/**
 * React용 Keyboard Press 훅
 *
 * @param options - Keyboard Press 옵션들
 * @returns React 이벤트 핸들러들
 */
export function useKeyboardPress(
  options: KeyboardPressA11yOptions = {}
): ReactKeyboardPressHandlers {
  const handlers = React.useMemo(
    () => createKeyboardPressA11yHandlers(options),
    [options]
  );

  return {
    ...handlers,
    onKeyDown: (e) => handlers.onKeyDown(e.nativeEvent),
    onKeyUp: handlers.onKeyUp
      ? (e) => handlers.onKeyUp!(e.nativeEvent)
      : undefined,
  };
}
