import * as React from "react";
import { getButtonHandlers } from "@acme/core";

export type ButtonProps = React.PropsWithChildren<{
  disabled?: boolean;
  onPress?: (e: { type: "click" | "keyboard" }) => void;
}>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ disabled, onPress, children, ...rest }, ref) => {
    const handlers = React.useMemo(
      () => getButtonHandlers({ disabled, onPress }),
      [disabled, onPress]
    );

    return (
      <button
        {...rest}
        ref={ref}
        role={handlers.role}
        aria-disabled={handlers["aria-disabled"]}
        tabIndex={handlers.tabIndex}
        onClick={() => handlers.onClick?.()}
        onKeyDown={(e) => handlers.onKeyDown?.(e as unknown as KeyboardEvent)}
        /* 스타일은 어댑터/전역 CSS 변수로 */
        style={{
          paddingInline: "var(--ds-space-control-padding-x)",
          paddingBlock: "var(--ds-space-control-padding-y)",
          borderRadius: "var(--ds-radius-control)",
          background: "var(--ds-color-button-primary-bg)",
          color: "var(--ds-color-button-primary-fg)",
        }}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
