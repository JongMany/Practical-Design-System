import {
  createKeyboardPressA11yHandlers,
  KeyboardPressA11yOptions,
  KeyboardPressA11yHandlers,
} from "@acme/a11y";
import * as React from "react";

/**
 * React용 Keyboard Press 옵션 타입
 */
type ReactKeyboardPressOptions = Omit<
  KeyboardPressA11yOptions,
  "onKeyDown" | "onKeyCombination"
> & {
  onKeyDown?: (e: React.KeyboardEvent) => void;
  onKeyCombination?: (e: React.KeyboardEvent, combination: string[]) => void;
};

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
  options: ReactKeyboardPressOptions = {}
): ReactKeyboardPressHandlers {
  // React 이벤트를 DOM 이벤트로 변환하는 옵션 생성
  const domOptions: KeyboardPressA11yOptions = React.useMemo(
    () => ({
      ...options,
      onKeyDown: options.onKeyDown
        ? (e: KeyboardEvent) => {
            // DOM 이벤트를 React 이벤트로 변환
            const reactEvent = e as unknown as React.KeyboardEvent;
            options.onKeyDown!(reactEvent);
          }
        : undefined,
      onKeyCombination: options.onKeyCombination
        ? (e: KeyboardEvent, combination: string[]) => {
            // DOM 이벤트를 React 이벤트로 변환
            const reactEvent = e as unknown as React.KeyboardEvent;
            options.onKeyCombination!(reactEvent, combination);
          }
        : undefined,
    }),
    [options]
  );

  const handlers = React.useMemo(
    () => createKeyboardPressA11yHandlers(domOptions),
    [domOptions]
  );

  return {
    ...handlers,
    onKeyDown: (e) => handlers.onKeyDown(e.nativeEvent),
    onKeyUp: handlers.onKeyUp
      ? (e) => handlers.onKeyUp!(e.nativeEvent)
      : undefined,
  };
}
