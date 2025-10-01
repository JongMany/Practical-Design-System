import React from "react";
import { useDialog, useEscapeToClose, useScrollBlock } from "@acme/react-a11y";
import { DialogProvider } from "./context";
import type { DialogRootProps } from "./types";

/**
 * Dialog Root 컴포넌트
 * Dialog의 상태를 관리하고 Context Provider를 통해 하위 컴포넌트에 전달합니다.
 */
export const DialogRoot = React.forwardRef<HTMLDivElement, DialogRootProps>(
  (
    {
      open: controlledOpen,
      onOpenChange,
      defaultOpen = false,
      autoFocus = true,
      restoreFocus = true,
      preventScroll = true,
      closeOnOutsideClick = true,
      closeOnEscape = true,
      focusTrap = true,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      idPrefix = "dialog",
      children,
      ...rest
    },
    ref
  ) => {
    // 내부 상태 관리
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);

    // 제어된 상태인지 확인
    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;

    // Dialog 훅 사용
    const dialogState = useDialog(isOpen, {
      autoFocus,
      restoreFocus,
      preventScroll,
      closeOnOutsideClick,
      closeOnEscape,
      focusTrap,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      idPrefix,
    });

    // 상태 변경 핸들러
    const handleOpenChange = React.useCallback(
      (newOpen: boolean) => {
        if (isControlled) {
          onOpenChange?.(newOpen);
        } else {
          setInternalOpen(newOpen);
        }
      },
      [isControlled, onOpenChange]
    );

    // 스크롤 방지 처리
    useScrollBlock(isOpen, {
      enabled: preventScroll,
      addRelativePosition: true,
      announceToScreenReader: true,
      enableFocusTrap: focusTrap,
      focusTrapElement: dialogState.dialogRef.current,
      compensateScrollbar: true,
    });

    // Escape 키 처리
    useEscapeToClose(() => handleOpenChange(false), {
      enabled: isOpen && closeOnEscape,
      announceToScreenReader: true,
      restoreFocus: restoreFocus,
      previousFocusedElement: document.activeElement as HTMLElement,
    });

    // Dialog 상태를 Context로 전달
    const dialogContext = React.useMemo(
      () => ({
        ...dialogState,
        open: () => handleOpenChange(true),
        close: () => handleOpenChange(false),
        toggle: () => handleOpenChange(!isOpen),
        getOverlayProps: () => ({
          onClick: (e: MouseEvent) => {
            if (
              closeOnOutsideClick &&
              dialogState.overlayRef.current === e.target
            ) {
              handleOpenChange(false);
            }
          },
        }),
      }),
      [dialogState, handleOpenChange, isOpen, closeOnOutsideClick]
    );

    return (
      <DialogProvider {...dialogContext}>
        <div ref={ref} {...rest}>
          {children}
        </div>
      </DialogProvider>
    );
  }
);

DialogRoot.displayName = "Dialog.Root";
