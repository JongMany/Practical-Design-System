import {
  createDialogA11y,
  DialogA11yOptions,
  DialogA11yState,
} from "@acme/a11y";
import * as React from "react";

/**
 * React용 Dialog 상태 타입
 */
type ReactDialogState = Omit<DialogA11yState, "dialogRef" | "overlayRef"> & {
  /** Dialog 컨테이너에 설정할 ref */
  dialogRef: React.RefObject<HTMLElement | null>;
  /** Dialog 오버레이에 설정할 ref */
  overlayRef: React.RefObject<HTMLElement | null>;
};

/**
 * React용 Dialog 훅
 *
 * @param initialOpen - 초기 열림 상태
 * @param options - Dialog 옵션들
 * @returns Dialog 상태 및 핸들러
 */
export function useDialog(
  initialOpen: boolean = false,
  options: DialogA11yOptions = {}
): ReactDialogState {
  const dialogRef = React.useRef<HTMLElement | null>(null);
  const overlayRef = React.useRef<HTMLElement | null>(null);

  // a11y dialog 상태 생성
  const dialogState = React.useMemo(() => {
    return createDialogA11y(initialOpen, {
      ...options,
      dialogRef,
      overlayRef,
    });
  }, [initialOpen, options, dialogRef, overlayRef]);

  return {
    isOpen: dialogState.isOpen,
    open: dialogState.open,
    close: dialogState.close,
    toggle: dialogState.toggle,
    dialogRef,
    overlayRef,
    getDialogProps: dialogState.getDialogProps,
    getOverlayProps: dialogState.getOverlayProps,
    getKeyboardProps: dialogState.getKeyboardProps,
    getTitleProps: dialogState.getTitleProps,
    getDescriptionProps: dialogState.getDescriptionProps,
  };
}
