import * as React from "react";
import { useAriaPress } from "@acme/react-a11y";

export type ButtonProps = React.PropsWithChildren<{
  disabled?: boolean;
  onPress?: (e: { type: "click" | "keyboard" }) => void;
}>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ disabled, onPress, children, ...rest }, ref) => {
    const press = useAriaPress({ disabled, onPress });

    return (
      <button
        {...rest}
        {...press} // a11y props/handlers 주입
        ref={ref}
        type="button"
        data-focus-visible="" // focus ring 표시용
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
