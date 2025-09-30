import {
  createPointerActivationHandlers,
  PointerActivationOptions,
  PointerActivationHandlers,
} from "@acme/core";

export interface PointerActivationA11yOptions extends PointerActivationOptions {
  /** 장시간 누름 감지 여부 */
  longPress?: boolean;
  /** 장시간 누름 지연 시간 (ms) */
  longPressDelay?: number;
  /** 장시간 누름 이벤트 핸들러 */
  onLongPress?: (event: { type: "longpress" }) => void;
  /** 연속 클릭/터치 방지 여부 */
  preventDoubleActivation?: boolean;
  /** 연속 클릭/터치 방지 지연 시간 (ms) */
  doubleActivationDelay?: number;
  /** 터치 액션 제어 */
  touchAction?: "auto" | "none" | "pan-x" | "pan-y" | "manipulation";
}

export interface PointerActivationA11yHandlers
  extends PointerActivationHandlers {
  /** 마우스 다운 이벤트 핸들러 */
  onMouseDown?: (e: MouseEvent) => void;
  /** 마우스 업 이벤트 핸들러 */
  onMouseUp?: (e: MouseEvent) => void;
  /** 마우스 리브 이벤트 핸들러 */
  onMouseLeave?: (e: MouseEvent) => void;
  /** 터치 스타트 이벤트 핸들러 */
  onTouchStart?: (e: TouchEvent) => void;
  /** 터치 캔슬 이벤트 핸들러 */
  onTouchCancel?: (e: TouchEvent) => void;
  /** CSS 터치 액션 */
  style?: { touchAction: string };
}

/**
 * Pointer Activation 핸들러를 생성하는 a11y 확장 함수
 *
 * @param options - Pointer Activation a11y 옵션들
 * @returns 확장된 Pointer Activation 핸들러들
 */
export function createPointerActivationA11yHandlers(
  options: PointerActivationA11yOptions = {}
): PointerActivationA11yHandlers {
  const {
    longPress = false,
    longPressDelay = 500,
    onLongPress,
    preventDoubleActivation = false,
    doubleActivationDelay = 300,
    touchAction = "manipulation",
    ...baseOptions
  } = options;

  // 기본 핸들러 생성
  const baseHandlers = createPointerActivationHandlers(baseOptions);

  // 상태 관리
  let longPressTimer: number | null = null;
  let lastActivationTime = 0;
  let isLongPressing = false;

  const clearLongPressTimer = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      longPressTimer = null;
    }
  };

  const startLongPressTimer = () => {
    if (!longPress || !onLongPress) return;

    clearLongPressTimer();
    longPressTimer = window.setTimeout(() => {
      isLongPressing = true;
      onLongPress({ type: "longpress" });
    }, longPressDelay);
  };

  const handleActivation = (type: "click" | "touch") => {
    // 연속 활성화 방지
    if (preventDoubleActivation) {
      const now = Date.now();
      if (now - lastActivationTime < doubleActivationDelay) {
        return;
      }
      lastActivationTime = now;
    }

    // 장시간 누름이 아닌 경우에만 일반 활성화 실행
    if (!isLongPressing) {
      baseOptions.onPointerActivate?.({ type });
    }

    // 상태 초기화
    isLongPressing = false;
  };

  return {
    ...baseHandlers,
    onClick(e) {
      if (baseOptions.disabled) return;
      handleActivation("click");
    },
    onTouchEnd(e) {
      if (baseOptions.disabled) return;
      handleActivation("touch");
    },
    onMouseDown(e) {
      if (baseOptions.disabled) return;
      startLongPressTimer();
    },
    onMouseUp(e) {
      if (baseOptions.disabled) return;
      clearLongPressTimer();
    },
    onMouseLeave(e) {
      if (baseOptions.disabled) return;
      clearLongPressTimer();
      isLongPressing = false;
    },
    onTouchStart(e) {
      if (baseOptions.disabled) return;
      startLongPressTimer();
    },
    onTouchCancel(e) {
      if (baseOptions.disabled) return;
      clearLongPressTimer();
      isLongPressing = false;
    },
    style: {
      touchAction,
    },
  };
}
