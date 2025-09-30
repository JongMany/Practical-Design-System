import React from "react";
import { DIALOG_CONTEXT_NAME, useDialogContext } from "./context";
import { Slot } from "../utils/Slot";
import type { DialogDescriptionProps } from "./types";

/**
 * Dialog Description 컴포넌트
 * Dialog의 설명을 표시하는 요소입니다.
 */
export const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>(({ asChild = false, children, style, ...rest }, ref) => {
  const { getDescriptionProps } = useDialogContext(DIALOG_CONTEXT_NAME);

  const descriptionStyles: React.CSSProperties = {
    margin: "0 0 20px 0",
    fontSize: "1rem",
    color: "#555",
    ...style,
  };

  if (asChild) {
    return (
      <Slot
        ref={ref}
        {...getDescriptionProps()}
        style={descriptionStyles}
        {...rest}
      >
        {children}
      </Slot>
    );
  }

  return (
    <p ref={ref} {...getDescriptionProps()} style={descriptionStyles} {...rest}>
      {children}
    </p>
  );
});

DialogDescription.displayName = "Dialog.Description";
