/**
 * Pointer Activation (Click/Touch) 관련 기본 유틸리티 함수들
 */

export interface PointerActivationOptions {
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 포인터 활성화 이벤트 핸들러 */
  onPointerActivate?: (event: { type: "click" | "touch" }) => void;
}

export interface PointerActivationHandlers {
  /** 마우스 클릭 이벤트 핸들러 */
  onClick(e: MouseEvent): void;
  /** 터치 엔드 이벤트 핸들러 */
  onTouchEnd(e: TouchEvent): void;
  /** ARIA role */
  role: "button";
  /** 탭 인덱스 */
  tabIndex: number;
  /** ARIA disabled 속성 */
  "aria-disabled"?: boolean;
}

/**
 * Pointer Activation 핸들러를 생성하는 기본 함수
 *
 * @param options - Pointer Activation 옵션들
 * @returns Pointer Activation 핸들러들
 */
export function createPointerActivationHandlers(
  options: PointerActivationOptions = {}
): PointerActivationHandlers {
  const { disabled = false, onPointerActivate } = options;

  return {
    role: "button",
    tabIndex: disabled ? -1 : 0,
    "aria-disabled": disabled || undefined,
    onClick(e) {
      if (!disabled) {
        onPointerActivate?.({ type: "click" });
      }
    },
    onTouchEnd(e) {
      if (!disabled) {
        onPointerActivate?.({ type: "touch" });
      }
    },
  };
}
