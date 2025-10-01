/**
 * Checkbox Label Component
 */

import React from "react";
import { useCheckboxContext } from "./context";
import type { CheckboxLabelProps } from "./types";

/**
 * Checkbox Label 컴포넌트
 * 체크박스와 연결된 라벨을 렌더링합니다.
 * disabled 상태에 따라 커서 스타일을 자동으로 관리합니다.
 */
export const CheckboxLabel = React.forwardRef<
  HTMLLabelElement,
  CheckboxLabelProps
>(({ children, className, style, ...rest }, ref) => {
  const { disabled, checkboxId } = useCheckboxContext();

  return (
    <label
      ref={ref}
      htmlFor={checkboxId}
      className={className}
      style={{
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        userSelect: "none",
        ...style,
      }}
      {...rest}
    >
      {children}
    </label>
  );
});

CheckboxLabel.displayName = "CheckboxLabel";
