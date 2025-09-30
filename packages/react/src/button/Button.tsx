import * as React from "react";
import { createButtonHandlers } from "@acme/core";
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
    const press = React.useMemo(
      () =>
        createButtonHandlers({
          disabled: disabled || loading,
          onPress: onPress ? (e) => onPress(e) : undefined,
        }),
      [disabled, loading, onPress]
    );

    // 이벤트 핸들러 조합
    const handleClick = composeEventHandlers(
      (e: React.MouseEvent) => press.onClick(e.nativeEvent),
      onClick,
      { externalFirst: false }
    );
    const handleKeyDown = composeEventHandlers(
      (e: React.KeyboardEvent) => press.onKeyDown(e.nativeEvent),
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
        {...press}
        ref={ref}
        type="button"
        disabled={disabled || loading}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        style={{
          ...buttonStyles,
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
