import React from "react";
import { useDialog, useEscapeToClose, useScrollBlock } from "@acme/react-a11y";
import { DialogProvider } from "./context";
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

    // 외부에서 controlledOpen이 변경될 때 내부 상태 동기화
    React.useEffect(() => {
      if (isControlled && controlledOpen !== undefined) {
        // 외부에서 상태가 변경된 경우, 내부 상태도 동기화
        // (uncontrolled 모드에서 controlled 모드로 전환될 때)
        if (controlledOpen !== internalOpen) {
          setInternalOpen(controlledOpen);
        }
      }
    }, [isControlled, controlledOpen, internalOpen]);

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
