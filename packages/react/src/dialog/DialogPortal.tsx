import React from "react";
import { createPortal } from "react-dom";
import { useDialogContext } from "./context";
import type { DialogPortalProps } from "./types";

/**
 * Dialog Portal 컴포넌트
 * Dialog를 DOM의 다른 위치에 렌더링합니다.
 */
export const DialogPortal: React.FC<DialogPortalProps> = ({
  children,
  container,
}) => {
  const { isOpen } = useDialogContext();

  if (!isOpen) {
    return null;
  }

  const portalContainer = container || document.body;

  return createPortal(children, portalContainer);
};

DialogPortal.displayName = "Dialog.Portal";
