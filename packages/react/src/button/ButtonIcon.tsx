/**
 * Button Icon Component
 * 버튼 내부의 아이콘을 렌더링하는 컴포넌트
 */

import React, { CSSProperties } from "react";

export interface ButtonIconProps {
  /** 아이콘 요소 */
  children: React.ReactNode;
  /** 추가 스타일 */
  style?: CSSProperties;
}

const defaultIconStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};

/**
 * Button Icon 컴포넌트
 */
export const ButtonIcon = React.forwardRef<HTMLSpanElement, ButtonIconProps>(
  ({ children, style, ...rest }, ref) => {
    if (!children) return null;

    return (
      <span
        ref={ref}
        aria-hidden="true"
        style={{
          ...defaultIconStyle,
          ...style,
        }}
        {...rest}
      >
        {children}
      </span>
    );
  }
);

ButtonIcon.displayName = "ButtonIcon";
