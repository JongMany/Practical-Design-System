import React from "react";
import { DIALOG_CONTEXT_NAME, useDialogContext } from "./context";
import type { DialogContentProps } from "./types";

/**
 * Dialog Content 컴포넌트
 * Dialog의 실제 내용을 담는 컨테이너 요소입니다.
 */
export const DialogContent = React.forwardRef<
  HTMLDivElement,
  DialogContentProps
>(({ asChild = false, children, style, ...rest }, ref) => {
  const { dialogRef, getDialogProps } = useDialogContext(DIALOG_CONTEXT_NAME);

  const contentStyles: React.CSSProperties = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    minWidth: "300px",
    maxWidth: "90vw",
    maxHeight: "90vh",
    overflow: "auto",
    position: "relative",
    zIndex: 1001,
    ...style,
  };

  // ref 병합 함수
  const mergedRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      // 외부 ref 설정
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }

      // dialogRef 설정
      if (dialogRef.current !== node) {
        (dialogRef as React.MutableRefObject<HTMLElement | null>).current =
          node;
      }
    },
    [ref, dialogRef]
  );

  if (asChild) {
    return React.cloneElement(children as React.ReactElement, {
      ref: mergedRef,
      ...getDialogProps(),
      style: contentStyles,
      ...rest,
    });
  }

  return (
    <div ref={mergedRef} {...getDialogProps()} style={contentStyles} {...rest}>
      {children}
    </div>
  );
});

DialogContent.displayName = "Dialog.Content";
