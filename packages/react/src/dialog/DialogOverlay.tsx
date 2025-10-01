import React from "react";
import { DIALOG_CONTEXT_NAME, useDialogContext } from "./context";
import { Slot } from "../utils/Slot";
import { mergeRefs } from "../utils/mergeRefs";
import type { DialogOverlayProps } from "./types";

const defaultOverlayStyles: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 1000,
};

/**
 * Dialog Overlay 컴포넌트
 * Dialog가 열렸을 때 배경을 덮는 오버레이 요소입니다.
 */
export const DialogOverlay = React.forwardRef<
  HTMLDivElement,
  DialogOverlayProps
>(({ asChild = false, children, style, ...rest }, ref) => {
  const { getOverlayProps, overlayRef } = useDialogContext(DIALOG_CONTEXT_NAME);

  // getOverlayProps에서 onClick 핸들러 가져오기
  const overlayProps = getOverlayProps();
  const { onClick: overlayOnClick, ...restOverlayProps } = overlayProps;

  const handleOverlayClick = (e: React.MouseEvent) => {
    overlayOnClick?.(e.nativeEvent);
  };

  if (asChild) {
    return (
      <Slot
        ref={mergeRefs(ref, overlayRef)}
        onClick={handleOverlayClick}
        style={{
          ...defaultOverlayStyles,
          ...style,
        }}
        {...restOverlayProps}
        {...rest}
      >
        {children}
      </Slot>
    );
  }

  return (
    <div
      ref={mergeRefs(ref, overlayRef)}
      onClick={handleOverlayClick}
      style={{
        ...defaultOverlayStyles,
        ...style,
      }}
      {...restOverlayProps}
      {...rest}
    >
      {children}
    </div>
  );
});

DialogOverlay.displayName = "Dialog.Overlay";
