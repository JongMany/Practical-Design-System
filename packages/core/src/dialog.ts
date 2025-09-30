/**
 * Dialog 관련 기본 유틸리티 함수들
 */

/** Dialog의 상태를 정의하는 인터페이스 */
export interface DialogState {
  /** Dialog가 열려있는지 여부 */
  isOpen: boolean;
  /** Dialog를 여는 함수 */
  open(): void;
  /** Dialog를 닫는 함수 */
  close(): void;
  /** Dialog의 열림/닫힘 상태를 토글하는 함수 */
  toggle(): void;
}

/** Dialog의 옵션을 정의하는 인터페이스 */
export interface DialogOptions {
  /** Dialog가 열릴 때 자동으로 포커스할지 여부 */
  autoFocus?: boolean;
  /** Dialog가 닫힐 때 이전 포커스 요소를 복원할지 여부 */
  restoreFocus?: boolean;
  /** Dialog가 열릴 때 body 스크롤을 방지할지 여부 */
  preventScroll?: boolean;
  /** Dialog 외부를 클릭했을 때 닫을지 여부 */
  closeOnOutsideClick?: boolean;
  /** Escape 키를 눌렀을 때 닫을지 여부 */
  closeOnEscape?: boolean;
  /** Dialog 내부에 포커스 트랩을 활성화할지 여부 */
  focusTrap?: boolean;
}

/**
 * Dialog의 기본 상태를 생성하는 함수
 *
 * @param initialOpen - 초기 열림 상태
 * @param options - Dialog 옵션들
 * @returns Dialog 상태
 */
export function createDialogState(
  initialOpen: boolean = false,
  options: DialogOptions = {}
): DialogState {
  let isOpen = initialOpen;
  const listeners = new Set<() => void>();

  const notify = () => {
    listeners.forEach((listener) => listener());
  };

  const open = () => {
    if (!isOpen) {
      isOpen = true;
      notify();
    }
  };

  const close = () => {
    if (isOpen) {
      isOpen = false;
      notify();
    }
  };

  const toggle = () => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  };

  return {
    get isOpen() {
      return isOpen;
    },
    open,
    close,
    toggle,
  };
}

/** Dialog의 ARIA 속성을 정의하는 인터페이스 */
export interface DialogAriaProps {
  /** ARIA role */
  role: "dialog";
  /** ARIA modal 속성 */
  "aria-modal": true;
  /** ARIA label */
  "aria-label"?: string;
  /** ARIA labelledby 속성 */
  "aria-labelledby"?: string;
  /** ARIA describedby 속성 */
  "aria-describedby"?: string;
}

/**
 * Dialog의 ARIA 속성을 생성하는 함수
 *
 * @param props - ARIA 속성 옵션
 * @returns ARIA 속성
 */
export function createDialogAriaProps(
  props: Omit<DialogAriaProps, "role" | "aria-modal">
): DialogAriaProps {
  return {
    role: "dialog",
    "aria-modal": true,
    ...props,
  };
}

/**
 * 고유한 ID를 생성하는 유틸리티 함수
 * @param prefix - ID 접두사
 * @returns 고유한 ID 문자열
 */
let idCounter = 0;
export function createUniqueId(prefix: string = "id"): string {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}

/**
 * Dialog 관련 ARIA ID를 생성하는 함수
 *
 * @param prefix - ID 접두사
 * @returns Dialog ARIA ID 객체
 */
export function createDialogIds(prefix: string = "dialog") {
  return {
    titleId: createUniqueId(`${prefix}-title`),
    descriptionId: createUniqueId(`${prefix}-description`),
  };
}
