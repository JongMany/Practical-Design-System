import React from "react";
import { DIALOG_CONTEXT_NAME, useDialogContext } from "./context";
import type { DialogTriggerProps } from "./types";

/**
 * Dialog Trigger 컴포넌트
 * Dialog를 열기 위한 트리거 요소입니다.
 */
export const DialogTrigger = React.forwardRef<
  HTMLButtonElement,
  DialogTriggerProps
>(({ asChild = false, children, onClick, ...rest }, ref) => {
  const { open } = useDialogContext(DIALOG_CONTEXT_NAME);

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      open();
    },
    [onClick, open]
  );

  if (asChild) {
    return React.cloneElement(children as React.ReactElement, {
      ref,
      onClick: handleClick,
      ...rest,
    });
  }

  return (
    <button ref={ref} type="button" onClick={handleClick} {...rest}>
      {children}
    </button>
  );
});

DialogTrigger.displayName = "Dialog.Trigger";
