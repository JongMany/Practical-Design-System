import { forwardRef, useCallback } from "react";
import { Slot } from "../utils/Slot";
import type { FormSubmitProps } from "./types";

export const FormSubmit = forwardRef<HTMLButtonElement, FormSubmitProps>(
  ({ asChild, children, className, style, ...rest }, ref) => {
    const Comp = asChild ? Slot : "button";

    // 기본 버튼 스타일
    const defaultButtonStyles = {
      padding: "14px 28px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      fontSize: "1rem",
      fontWeight: "600",
      transition: "all 0.2s ease",
      boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
      outline: "none",
      minHeight: "48px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      userSelect: "none" as const,
      WebkitUserSelect: "none" as const,
      MozUserSelect: "none" as const,
      msUserSelect: "none" as const,
    };

    // ref 처리 - asChild일 때는 함수형 ref이므로 다르게 처리
    const handleRef = useCallback(
      (node: HTMLButtonElement | null) => {
        if (asChild && node) {
          // 기본 스타일 적용
          Object.entries(defaultButtonStyles).forEach(([key, value]) => {
            node.style.setProperty(key, value as string, "important");
          });
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
