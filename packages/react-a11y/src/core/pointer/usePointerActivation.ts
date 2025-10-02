import {
  createPointerActivationA11yHandlers,
  PointerActivationA11yOptions,
  PointerActivationA11yHandlers,
} from "@acme/a11y";
import * as React from "react";

/**
 * React용 Pointer Activation 옵션 타입
 */
type ReactPointerActivationOptions<T = Element> = Omit<
  PointerActivationA11yOptions,
  "onClick" | "onTouchEnd" | "onLongPress"
> & {
  onClick?: (e: React.MouseEvent<T>) => void;
  onTouchEnd?: (e: React.TouchEvent<T>) => void;
  onLongPress?: (e: React.MouseEvent<T> | React.TouchEvent<T>) => void;
};

/**
 * React용 Pointer Activation 핸들러 타입
 */
type ReactPointerActivationHandlers<T = Element> = Omit<
  PointerActivationA11yHandlers,
  | "onClick"
  | "onTouchEnd"
  | "onMouseDown"
  | "onMouseUp"
  | "onMouseLeave"
  | "onTouchStart"
  | "onTouchCancel"
> & {
  onClick: (e: React.MouseEvent<T>) => void;
  onTouchEnd: (e: React.TouchEvent<T>) => void;
  onMouseDown?: (e: React.MouseEvent<T>) => void;
  onMouseUp?: (e: React.MouseEvent<T>) => void;
  onMouseLeave?: (e: React.MouseEvent<T>) => void;
  onTouchStart?: (e: React.TouchEvent<T>) => void;
  onTouchCancel?: (e: React.TouchEvent<T>) => void;
};

/**
 * React용 Pointer Activation 훅
 *
 * @param options - Pointer Activation 옵션들
 * @returns React 이벤트 핸들러들
 */
export function usePointerActivation<T = Element>(
  options: ReactPointerActivationOptions<T> = {}
): ReactPointerActivationHandlers<T> {
  // React 이벤트를 DOM 이벤트로 변환하는 옵션 생성
  const domOptions: PointerActivationA11yOptions = React.useMemo(
    () => ({
      ...options,
      onClick: options.onClick
        ? (e: MouseEvent) => {
            // DOM 이벤트를 React 이벤트로 변환
            const reactEvent = e as unknown as React.MouseEvent<T>;
            options.onClick!(reactEvent);
          }
        : undefined,
      onTouchEnd: options.onTouchEnd
        ? (e: TouchEvent) => {
            // DOM 이벤트를 React 이벤트로 변환
            const reactEvent = e as unknown as React.TouchEvent<T>;
            options.onTouchEnd!(reactEvent);
          }
        : undefined,
      onLongPress: options.onLongPress
        ? (e: MouseEvent | TouchEvent) => {
            // DOM 이벤트를 React 이벤트로 변환
            const reactEvent = e as unknown as
              | React.MouseEvent<T>
              | React.TouchEvent<T>;
            options.onLongPress!(reactEvent);
          }
        : undefined,
    }),
    [options]
  );

  const handlers = React.useMemo(
    () => createPointerActivationA11yHandlers(domOptions),
    [domOptions]
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
