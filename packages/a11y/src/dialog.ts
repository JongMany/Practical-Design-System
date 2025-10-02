import {
  createDialogState,
  createDialogAriaProps,
  DialogOptions,
  DialogState,
  createDialogIds,
} from "@acme/core";
import { createFocusTrap } from "./focusTrap";
import { focusElement, getFocusableElements } from "@acme/core";

export interface DialogA11yOptions extends DialogOptions {
  /** Dialog의 레이블 */
  "aria-label"?: string;
  /** Dialog의 레이블 ID */
  "aria-labelledby"?: string;
  /** Dialog의 설명 ID */
  "aria-describedby"?: string;
  /** ID 접두사 */
  idPrefix?: string;
  /** Dialog 컨테이너 ref */
  dialogRef?: { current: HTMLElement | null };
  /** Dialog 오버레이 ref */
  overlayRef?: { current: HTMLElement | null };
}

export interface DialogA11yState extends DialogState {
  /** Dialog 컨테이너에 설정할 ref */
  dialogRef: { current: HTMLElement | null };
  /** Dialog 오버레이에 설정할 ref */
  overlayRef: { current: HTMLElement | null };
  /** Dialog 컨테이너에 적용할 ARIA 속성 및 이벤트 핸들러 */
  getDialogProps(): {
    role: "dialog";
    tabIndex: number;
    "aria-modal": true;
    "aria-labelledby"?: string;
    "aria-describedby"?: string;
  };
  /** Dialog 오버레이에 적용할 ARIA 속성 및 이벤트 핸들러 */
  getOverlayProps(): {
    onClick: (e: MouseEvent) => void;
  };
  /** Dialog에 적용할 키보드 이벤트 핸들러 */
  getKeyboardProps(): {
    onKeyDown: (e: KeyboardEvent) => void;
  };
  /** Dialog 제목에 적용할 ARIA 속성 */
  getTitleProps(): {
    id: string;
  };
  /** Dialog 설명에 적용할 ARIA 속성 */
  getDescriptionProps(): {
    id: string;
  };
}

/**
 * Dialog의 접근성 기능을 통합하는 함수
 *
 * @param initialOpen - 초기 열림 상태
 * @param options - Dialog 접근성 옵션
 * @returns Dialog 접근성 상태 및 핸들러
 */
export function createDialogA11y(
  initialOpen: boolean = false,
  options: DialogA11yOptions = {}
): DialogA11yState {
  const {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    "aria-describedby": ariaDescribedby,
    idPrefix,
    autoFocus = true,
    restoreFocus = true,
    preventScroll = true,
    closeOnOutsideClick = true,
    closeOnEscape = true,
    focusTrap = true,
  } = options;

  // 기본 상태 생성
  const baseState = createDialogState(initialOpen, options);

  // refs 생성 (전달받은 ref가 있으면 사용, 없으면 새로 생성)
  const dialogRef = options.dialogRef || {
    current: null as HTMLElement | null,
  };
  const overlayRef = options.overlayRef || {
    current: null as HTMLElement | null,
  };

  // ID 생성
  const { titleId, descriptionId } = createDialogIds(idPrefix);

  // ARIA 속성 생성
  const ariaProps = createDialogAriaProps({
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby || titleId,
    "aria-describedby": ariaDescribedby || descriptionId,
  });

  // 포커스 트랩 관리
  let focusTrapCleanup: (() => void) | null = null;

  // 이전 포커스 요소 저장
  let previouslyFocusedElement: HTMLElement | null = null;
  // 이전 body 스타일 저장
  let previousBodyStyle: {
    overflow: string;
    paddingRight: string;
    position: string;
  } | null = null;

  const open = () => {
    if (baseState.isOpen) return;

    previouslyFocusedElement = document.activeElement as HTMLElement;
    baseState.open();

    // 스크롤 방지 및 body position 설정
    if (preventScroll) {
      previousBodyStyle = {
        overflow: document.body.style.overflow,
        paddingRight: document.body.style.paddingRight,
        position: document.body.style.position,
      };
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`; // 스크롤바 공간 보정
      document.body.style.position = "relative"; // body에 relative 추가
    }

    // 포커스 트랩 활성화
    if (focusTrap && dialogRef.current) {
      focusTrapCleanup = createFocusTrap(dialogRef.current);
    }

    // 자동 포커스
    if (autoFocus && dialogRef.current) {
      const focusableElements = getFocusableElements(dialogRef.current);
      const firstFocusable = focusableElements[0];
      if (firstFocusable) {
        focusElement(firstFocusable);
      } else {
        focusElement(dialogRef.current); // 포커스 가능한 요소가 없으면 다이얼로그 자체에 포커스
      }
    }
  };

  const close = () => {
    if (!baseState.isOpen) return;

    baseState.close();

    // 스크롤 복원
    if (preventScroll && previousBodyStyle) {
      document.body.style.overflow = previousBodyStyle.overflow;
      document.body.style.paddingRight = previousBodyStyle.paddingRight;
      document.body.style.position = previousBodyStyle.position;
      previousBodyStyle = null;
    }

    // 포커스 트랩 비활성화
    if (focusTrapCleanup) {
      focusTrapCleanup();
      focusTrapCleanup = null;
    }

    // 포커스 복원
    if (restoreFocus && previouslyFocusedElement) {
      focusElement(previouslyFocusedElement);
      previouslyFocusedElement = null;
    }
  };

  const toggle = () => {
    if (baseState.isOpen) {
      close();
    } else {
      open();
    }
  };

  // Escape 키로 닫기
  const handleKeyDown = (e: KeyboardEvent) => {
    if (closeOnEscape && e.key === "Escape") {
      e.preventDefault();
      close();
    }
  };

  // 외부 클릭으로 닫기
  const handleOverlayClick = (e: MouseEvent) => {
    if (closeOnOutsideClick && overlayRef.current === e.target) {
      close();
    }
  };

  return {
    isOpen: baseState.isOpen,
    open,
    close,
    toggle,
    dialogRef,
    overlayRef,
    getDialogProps: () => ({
      ...ariaProps,
      role: "dialog",
      tabIndex: -1, // 다이얼로그 자체에 포커스 가능하도록
    }),
    getOverlayProps: () => ({
      onClick: handleOverlayClick,
    }),
    getKeyboardProps: () => ({
      onKeyDown: handleKeyDown,
    }),
    getTitleProps: () => ({
      id: titleId,
    }),
    getDescriptionProps: () => ({
      id: descriptionId,
    }),
  };
}
