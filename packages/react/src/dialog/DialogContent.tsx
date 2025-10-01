import React from "react";
import { DIALOG_CONTEXT_NAME, useDialogContext } from "./context";
import { Slot } from "../utils/Slot";
import { mergeRefs } from "../utils/mergeRefs";
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
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1001,
    ...style,
  };

  // ref 병합 - mergeRefs 유틸리티 사용
  const mergedRef = mergeRefs(ref, dialogRef);

  if (asChild) {
    return (
      <Slot
        ref={mergedRef}
        {...getDialogProps()}
        style={contentStyles}
        {...rest}
      >
        {children}
      </Slot>
    );
  }

  return (
    <div ref={mergedRef} {...getDialogProps()} style={contentStyles} {...rest}>
      {children}
    </div>
  );
});

DialogContent.displayName = "Dialog.Content";
