/**
 * Checkbox Indicator Component
 */

import React from "react";
import { useCheckboxContext } from "./context";
import type { CheckboxIndicatorProps } from "./types";

/**
 * Checkbox Indicator 컴포넌트
 * 체크박스의 시각적 표시(체크 아이콘 등)를 렌더링합니다.
 */
export const CheckboxIndicator = React.forwardRef<
  HTMLDivElement,
  CheckboxIndicatorProps
>(({ children, className, style, ...rest }, ref) => {
  const { checked, disabled, handlers } = useCheckboxContext();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "16px",
        height: "16px",
        border: "1px solid #ccc",
        borderRadius: "3px",
        backgroundColor: checked ? "#007bff" : "white",
        color: checked ? "white" : "transparent",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "all 0.2s ease",
        fontSize: "12px",
        fontWeight: "bold",
        lineHeight: 1,
        userSelect: "none",
        ...style,
      }}
      onClick={(e) => {
        if (!disabled) {
          e.preventDefault();
          handlers.toggle();
        }
      }}
      onMouseDown={(e) => {
        if (disabled) {
          e.preventDefault();
        }
      }}
      {...rest}
    >
      {checked && children}
    </div>
  );
});

CheckboxIndicator.displayName = "CheckboxIndicator";
