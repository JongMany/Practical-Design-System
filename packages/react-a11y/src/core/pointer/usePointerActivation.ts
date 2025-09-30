import {
  createPointerActivationA11yHandlers,
  PointerActivationA11yOptions,
  PointerActivationA11yHandlers,
} from "@acme/a11y";
import * as React from "react";

/**
 * React용 Pointer Activation 핸들러 타입
 */
type ReactPointerActivationHandlers = Omit<
  PointerActivationA11yHandlers,
  | "onClick"
  | "onTouchEnd"
  | "onMouseDown"
  | "onMouseUp"
  | "onMouseLeave"
  | "onTouchStart"
  | "onTouchCancel"
> & {
  onClick: (e: React.MouseEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
  onMouseDown?: (e: React.MouseEvent) => void;
  onMouseUp?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  onTouchStart?: (e: React.TouchEvent) => void;
  onTouchCancel?: (e: React.TouchEvent) => void;
};

/**
 * React용 Pointer Activation 훅
 *
 * @param options - Pointer Activation 옵션들
 * @returns React 이벤트 핸들러들
 */
export function usePointerActivation(
  options: PointerActivationA11yOptions = {}
): ReactPointerActivationHandlers {
  const handlers = React.useMemo(
    () => createPointerActivationA11yHandlers(options),
    [options]
  );

  return {
    ...handlers,
    onClick: (e) => handlers.onClick(e.nativeEvent),
    onTouchEnd: (e) => handlers.onTouchEnd(e.nativeEvent),
    onMouseDown: handlers.onMouseDown
      ? (e) => handlers.onMouseDown!(e.nativeEvent)
      : undefined,
    onMouseUp: handlers.onMouseUp
      ? (e) => handlers.onMouseUp!(e.nativeEvent)
      : undefined,
    onMouseLeave: handlers.onMouseLeave
      ? (e) => handlers.onMouseLeave!(e.nativeEvent)
      : undefined,
    onTouchStart: handlers.onTouchStart
      ? (e) => handlers.onTouchStart!(e.nativeEvent)
      : undefined,
    onTouchCancel: handlers.onTouchCancel
      ? (e) => handlers.onTouchCancel!(e.nativeEvent)
      : undefined,
  };
}
