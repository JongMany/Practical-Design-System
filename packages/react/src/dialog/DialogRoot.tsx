import React from "react";
import { useDialog, useEscapeToClose, useScrollBlock } from "@acme/react-a11y";
import { DialogProvider } from "./context";
import { useControlledState } from "../hooks/useControlledState";
import type { DialogRootProps, DialogRootRef } from "./types";

/**
 * Dialog Root 컴포넌트
 * Dialog의 상태를 관리하고 Context Provider를 통해 하위 컴포넌트에 전달합니다.
 */
export const DialogRoot = React.forwardRef<DialogRootRef, DialogRootProps>(
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
    // DOM 요소를 위한 ref
    const domRef = React.useRef<HTMLDivElement>(null);

    // Controlled/Uncontrolled 상태 관리
    const openState = useControlledState({
      value: controlledOpen,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    });

    const { value: isOpen } = openState;

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
    const handleOpenChange = openState.setValue;

    // 외부에서 Dialog 상태를 제어할 수 있도록 ref 노출
    React.useImperativeHandle(
      ref,
      () => ({
        open: () => handleOpenChange(true),
        close: () => handleOpenChange(false),
        toggle: () => handleOpenChange(!isOpen),
        isOpen,
        setOpen: handleOpenChange,
      }),
      [handleOpenChange, isOpen]
    );

    // useControlledState가 자동으로 동기화를 처리하므로 별도 useEffect 불필요

    // DOM ref와 외부 ref를 병합 (useImperativeHandle과 분리)
    const mergedRef = React.useCallback((node: HTMLDivElement | null) => {
      domRef.current = node;
    }, []);

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
        <div ref={mergedRef} {...rest}>
          {children}
        </div>
      </DialogProvider>
    );
  }
);

DialogRoot.displayName = "Dialog.Root";
