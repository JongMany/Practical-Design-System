import React from "react";
import { DIALOG_CONTEXT_NAME, useDialogContext } from "./context";
import { Slot } from "../utils/Slot";
import type { DialogCloseProps } from "./types";

/**
 * Dialog Close 컴포넌트
 * Dialog를 닫기 위한 버튼 요소입니다.
 */
export const DialogClose = React.forwardRef<
  HTMLButtonElement,
  DialogCloseProps
>(({ asChild = false, children, onClick, style, ...rest }, ref) => {
  const { close } = useDialogContext(DIALOG_CONTEXT_NAME);

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      close();
    },
    [onClick, close]
  );

  const closeStyles: React.CSSProperties = {
    position: "absolute",
    top: "10px",
    right: "10px",
    border: "none",
    backgroundColor: "transparent",
    fontSize: "1.5rem",
    cursor: "pointer",
    padding: "5px",
    ...style,
  };

  if (asChild) {
    return (
      <Slot ref={ref} onClick={handleClick} style={closeStyles} {...rest}>
        {children}
      </Slot>
    );
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={handleClick}
      style={closeStyles}
      {...rest}
    >
      {children}
    </button>
  );
});

DialogClose.displayName = "Dialog.Close";
