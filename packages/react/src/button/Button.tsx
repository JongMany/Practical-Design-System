import * as React from "react";
import { usePointerActivation } from "@acme/react-a11y";
import { composeEventHandlers } from "../utils/composeEventHandlers";
import { ButtonIcon } from "./ButtonIcon";
import type { ButtonProps } from "./types";
import { getButtonStyles } from "./styles";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      disabled,
      loading,
      onPress,
      onTouchEnd,
      children,
      leftIcon,
      rightIcon,
      onClick,
      onKeyDown,
      style,
      ...rest
    },
    ref
  ) => {
    const pointerActivation = usePointerActivation({
      disabled: disabled || loading,
      onPointerActivate: onPress
        ? (e) => {
            // MouseEvent 또는 TouchEvent를 { type: "click" | "keyboard" } 형태로 변환
            const eventType = e instanceof MouseEvent ? "click" : "click";
            onPress({ type: eventType });
          }
        : undefined,
    });

    // 이벤트 핸들러 조합
    const handleClick = composeEventHandlers(
      pointerActivation.onClick,
      onClick,
      { externalFirst: false }
    );
    const handleTouchEnd = composeEventHandlers(
      pointerActivation.onTouchEnd,
      onTouchEnd,
      { externalFirst: false }
    );

    // 스타일 생성
    const buttonStyles = getButtonStyles(variant, size, disabled, loading);

    return (
      <button
        {...rest}
        {...pointerActivation}
        ref={ref}
        type="button"
        disabled={disabled || loading}
        onClick={handleClick}
        onTouchEnd={handleTouchEnd}
        style={{
          ...buttonStyles,
          ...pointerActivation.style,
          ...style,
        }}
        data-focus-visible
        data-loading={loading || undefined}
        data-variant={variant}
        data-size={size}
      >
        {leftIcon && <ButtonIcon key="left">{leftIcon}</ButtonIcon>}
        {children}
        {rightIcon && <ButtonIcon key="right">{rightIcon}</ButtonIcon>}
      </button>
    );
  }
);

Button.displayName = "Button";
