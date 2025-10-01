import React from "react";
import { DIALOG_CONTEXT_NAME, useDialogContext } from "./context";
import { Slot } from "../utils/Slot";
import { mergeRefs } from "../utils/mergeRefs";
import type { DialogContentProps } from "./types";

const defaultContentStyles: React.CSSProperties = {
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
};

/**
 * Dialog Content 컴포넌트
 * Dialog의 실제 내용을 담는 컨테이너 요소입니다.
 */
export const DialogContent = React.forwardRef<
  HTMLDivElement,
  DialogContentProps
>(({ asChild = false, children, style, ...rest }, ref) => {
  const { dialogRef, getDialogProps } = useDialogContext(DIALOG_CONTEXT_NAME);

  if (asChild) {
    return (
      <Slot
        ref={mergeRefs(ref, dialogRef)}
        {...getDialogProps()}
        style={{
          ...defaultContentStyles,
          ...style,
        }}
        {...rest}
      >
        {children}
      </Slot>
    );
  }

  return (
    <div
      ref={mergeRefs(ref, dialogRef)}
      {...getDialogProps()}
      style={{
        ...defaultContentStyles,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
});

DialogContent.displayName = "Dialog.Content";
