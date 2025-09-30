import React from "react";
import { DIALOG_CONTEXT_NAME, useDialogContext } from "./context";
import type { DialogOverlayProps } from "./types";

/**
 * Dialog Overlay 컴포넌트
 * Dialog가 열렸을 때 배경을 덮는 오버레이 요소입니다.
 */
export const DialogOverlay = React.forwardRef<
  HTMLDivElement,
  DialogOverlayProps
>(({ asChild = false, children, style, ...rest }, ref) => {
  const { getOverlayProps } = useDialogContext(DIALOG_CONTEXT_NAME);

  const overlayStyles: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    ...style,
  };

  if (asChild) {
    return React.cloneElement(children as React.ReactElement, {
      ref,
      ...getOverlayProps(),
      style: overlayStyles,
      ...rest,
    });
  }

  return (
    <div ref={ref} {...getOverlayProps()} style={overlayStyles} {...rest}>
      {children}
    </div>
  );
});

DialogOverlay.displayName = "Dialog.Overlay";
