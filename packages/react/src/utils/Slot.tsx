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
    // ReactElement가 아닌 경우 그대로 반환
    if (!isValidElement(children)) {
      return children;
    }

    // children의 ref를 안전하게 추출
    const childRef = hasRef<HTMLElement>(children) ? children.ref : undefined;

    const childProps = {
      ...props,
      ref: mergeRefs(ref, childRef),
    };

    return React.cloneElement(children, childProps);
  }
);

Slot.displayName = "Slot";
