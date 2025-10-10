import { forwardRef, useCallback } from "react";
import { Slot } from "../utils/Slot";
import type { FormSubmitProps } from "./types";
import { defaultButtonStyles, applyStylesToElement } from "./styles";

export const FormSubmit = forwardRef<HTMLButtonElement, FormSubmitProps>(
  ({ asChild, children, className, style, ...rest }, ref) => {
    const Comp = asChild ? Slot : "button";

    // 기본 버튼 스타일

    // ref 처리 - asChild일 때는 함수형 ref이므로 다르게 처리
    const handleRef = useCallback(
      (node: HTMLButtonElement | null) => {
        if (asChild && node) {
          // 기본 스타일 적용
          applyStylesToElement(node, defaultButtonStyles);
        }

        // 원래 ref 처리
        if (typeof ref === "function") {
          ref(node);
        } else if (ref && typeof ref === "object" && "current" in ref) {
          const mutableRef =
            ref as React.MutableRefObject<HTMLButtonElement | null>;
          mutableRef.current = node;
        }
      },
      [asChild, ref]
    );

    return (
      <Comp
        {...rest}
        ref={handleRef}
        type="submit"
        className={className}
        style={asChild ? style : { ...defaultButtonStyles, ...style }}
      >
        {children}
      </Comp>
    );
  }
);

FormSubmit.displayName = "FormSubmit";
