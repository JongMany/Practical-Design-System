import * as React from "react";
import { useKeyboardPress, usePointerActivation } from "@acme/react-a11y";
import { composeEventHandlers } from "../utils/composeEventHandlers";
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
      children,
      leftIcon,
      rightIcon,
      iconOnly,
      onClick,
      onKeyDown,
      style,
      ...rest
    },
    ref
  ) => {
    // 키보드와 포인터 활성화를 분리하여 처리
    const keyboardPress = useKeyboardPress({
      disabled: disabled || loading,
      onKeyboardPress: onPress ? (e) => onPress(e) : undefined,
    });

    const pointerActivation = usePointerActivation({
      disabled: disabled || loading,
      onPointerActivate: onPress ? (e) => onPress(e) : undefined,
    });

    // 이벤트 핸들러 조합
    const handleClick = composeEventHandlers(
      pointerActivation.onClick,
      onClick,
      { externalFirst: false }
    );
    const handleKeyDown = composeEventHandlers(
      keyboardPress.onKeyDown,
      onKeyDown,
      { externalFirst: false }
    );

    // 스타일 생성
    const buttonStyles = getButtonStyles(variant, size, disabled, loading);

    // 아이콘 렌더링
    const renderIcon = (icon: React.ReactNode, position: "left" | "right") => {
      if (!icon) return null;

      return React.createElement(
        "span",
        {
          "aria-hidden": "true",
          style: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            ...(iconOnly && {
              width: "100%",
              height: "100%",
            }),
          },
        },
        icon
      );
    };

    // 버튼 내용
    const buttonContent = iconOnly
      ? // 아이콘만 표시
        leftIcon || rightIcon || null // 텍스트와 아이콘 조합
      : [
          renderIcon(leftIcon, "left"),
          children,
          renderIcon(rightIcon, "right"),
        ].filter(Boolean);

    return (
      <button
        {...rest}
        {...keyboardPress}
        {...pointerActivation}
        ref={ref}
        type="button"
        disabled={disabled || loading}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
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
        {buttonContent}
      </button>
    );
  }
);

Button.displayName = "Button";
