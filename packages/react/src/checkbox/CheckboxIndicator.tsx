/**
 * Checkbox Indicator Component
 */

import React, { CSSProperties } from "react";
import { CHECKBOX_CONTEXT_NAME, useCheckboxContext } from "./context";
import { composeEventHandlers } from "../utils/composeEventHandlers";
import type { CheckboxIndicatorProps } from "./types";

const defaultIndicatorStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "16px",
  height: "16px",
  border: "1px solid #ccc",
  borderRadius: "3px",
  transition: "all 0.2s ease",
  fontSize: "12px",
  fontWeight: "bold",
  lineHeight: 1,
  userSelect: "none",
};

/**
 * Checkbox Indicator 컴포넌트
 * 체크박스의 시각적 표시(체크 아이콘 등)를 렌더링합니다.
 */
export const CheckboxIndicator = React.forwardRef<
  HTMLDivElement,
  CheckboxIndicatorProps
>(
  (
    {
      children,
      className,
      style,
      onClick: externalOnClick,
      onMouseDown: externalOnMouseDown,
      ...rest
    },
    ref
  ) => {
    const { checked, disabled, handlers } = useCheckboxContext(
      CHECKBOX_CONTEXT_NAME
    );

    return (
      <div
        ref={ref}
        className={className}
        style={{
          ...defaultIndicatorStyle,
          backgroundColor: checked ? "#007bff" : "white",
          color: checked ? "white" : "transparent",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.5 : 1,
          ...style,
        }}
        onClick={composeEventHandlers((e) => {
          if (!disabled) {
            e.preventDefault();
            handlers.toggle();
          }
        }, externalOnClick)}
        onMouseDown={composeEventHandlers((e) => {
          if (disabled) {
            e.preventDefault();
          }
        }, externalOnMouseDown)}
        {...rest}
      >
        {checked && children}
      </div>
    );
  }
);

CheckboxIndicator.displayName = "CheckboxIndicator";
