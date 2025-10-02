import {
  createKeyboardPressHandlers,
  KeyboardPressOptions,
  KeyboardPressHandlers,
} from "@acme/core";

export interface KeyboardPressA11yOptions extends KeyboardPressOptions {
  /** 키 반복 방지 여부 */
  preventKeyRepeat?: boolean;
  /** 키 반복 방지 지연 시간 (ms) */
  keyRepeatDelay?: number;
  /** 키 조합 지원 (예: Ctrl+Enter) */
  keyCombinations?: string[][];
  /** 키 조합 이벤트 핸들러 */
  onKeyCombination?: (event: KeyboardEvent, combination: string[]) => void;
}

export interface KeyboardPressA11yHandlers extends KeyboardPressHandlers {
  /** 키 업 이벤트 핸들러 */
  onKeyUp?: (e: KeyboardEvent) => void;
}

/**
 * Keyboard Press 핸들러를 생성하는 a11y 확장 함수
 *
 * @param options - Keyboard Press a11y 옵션들
 * @returns 확장된 Keyboard Press 핸들러들
 */
export function createKeyboardPressA11yHandlers(
  options: KeyboardPressA11yOptions = {}
): KeyboardPressA11yHandlers {
  const {
    preventKeyRepeat = false,
    keyRepeatDelay = 100,
    keyCombinations = [],
    onKeyCombination,
    ...baseOptions
  } = options;

  // 기본 핸들러 생성
  const baseHandlers = createKeyboardPressHandlers(baseOptions);

  // 상태 관리
  let lastKeyTime = 0;
  let pressedKeys = new Set<string>();

  const handleKeyDown = (e: KeyboardEvent) => {
    if (baseOptions.disabled) return;

    // 키 반복 방지
    if (preventKeyRepeat) {
      const now = Date.now();
      if (now - lastKeyTime < keyRepeatDelay) {
        return;
      }
      lastKeyTime = now;
    }

    // 키 조합 확인
    pressedKeys.add(e.key);
    const currentCombination = Array.from(pressedKeys).sort();

    for (const combination of keyCombinations) {
      const sortedCombination = [...combination].sort();
      if (
        JSON.stringify(currentCombination) === JSON.stringify(sortedCombination)
      ) {
        e.preventDefault();
        onKeyCombination?.(e, combination);
        return;
      }
    }

    // 기본 키 처리
    const activationKeys = ["Enter", " "];
    const allKeys = [...activationKeys, ...(baseOptions.additionalKeys || [])];

    if (allKeys.includes(e.key)) {
      e.preventDefault();
      baseOptions.onKeyDown?.(e);
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    pressedKeys.delete(e.key);
  };

  return {
    ...baseHandlers,
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
  };
}
