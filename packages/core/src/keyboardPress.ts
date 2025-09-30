/**
 * Keyboard Press 관련 기본 유틸리티 함수들
 */

export interface KeyboardPressOptions {
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 키보드 활성화 이벤트 핸들러 */
  onKeyboardPress?: (event: { type: "keyboard" }) => void;
  /** 추가 키보드 키 지원 */
  additionalKeys?: string[];
}

export interface KeyboardPressHandlers {
  /** 키보드 이벤트 핸들러 */
  onKeyDown(e: KeyboardEvent): void;
  /** ARIA role */
  role: "button";
  /** 탭 인덱스 */
  tabIndex: number;
  /** ARIA disabled 속성 */
  "aria-disabled"?: boolean;
}

/**
 * Keyboard Press 핸들러를 생성하는 기본 함수
 *
 * @param options - Keyboard Press 옵션들
 * @returns Keyboard Press 핸들러들
 */
export function createKeyboardPressHandlers(
  options: KeyboardPressOptions = {}
): KeyboardPressHandlers {
  const { disabled = false, onKeyboardPress, additionalKeys = [] } = options;

  // 기본 활성화 키들 (Enter, Space)
  const activationKeys = ["Enter", " "];
  // 추가 키들과 합치기
  const allKeys = [...activationKeys, ...additionalKeys];

  return {
    role: "button",
    tabIndex: disabled ? -1 : 0,
    "aria-disabled": disabled || undefined,
    onKeyDown(e) {
      if (disabled) return;

      // 지원하는 키인지 확인
      if (allKeys.includes(e.key)) {
        e.preventDefault();
        onKeyboardPress?.({ type: "keyboard" });
      }
    },
  };
}

/**
 * 키가 키보드 활성화 키인지 확인하는 함수
 *
 * @param key - 확인할 키
 * @param additionalKeys - 추가 활성화 키들
 * @returns 활성화 키 여부
 */
export function isKeyboardActivationKey(
  key: string,
  additionalKeys: string[] = []
): boolean {
  const activationKeys = ["Enter", " "];
  return [...activationKeys, ...additionalKeys].includes(key);
}
