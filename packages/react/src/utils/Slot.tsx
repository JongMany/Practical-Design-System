import React, { forwardRef, isValidElement } from "react";
import { mergeRefs } from "./mergeRefs";

// 타입 가드 함수
function hasRef<T>(
  element: React.ReactElement
): element is React.ReactElement & { ref: React.Ref<T> } {
  return "ref" in element;
}

export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const Slot = forwardRef<HTMLElement, SlotProps>(
  ({ children, ...props }, ref) => {
    // children이 배열인 경우 첫 번째 요소를 사용
    const child = Array.isArray(children) ? children[0] : children;

    // ReactElement가 아닌 경우 그대로 반환
    if (!isValidElement(child)) {
      return children;
    }

    // children의 ref를 안전하게 추출
    const childRef = hasRef<HTMLElement>(child) ? child.ref : undefined;

    const childProps = {
      ...(child.props || {}),
      ...props,
      ref: mergeRefs(ref, childRef),
    };

    return React.cloneElement(child, childProps);
  }
);

Slot.displayName = "Slot";
