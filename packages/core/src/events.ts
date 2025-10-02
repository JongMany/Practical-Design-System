/**
 * 이벤트 관련 기본 유틸리티 함수들
 */

/**
 * 키보드 이벤트가 특정 키인지 확인
 */
export function isKey(event: KeyboardEvent, key: string): boolean {
  return event.key === key;
}

/**
 * 키보드 이벤트가 Enter 또는 Space 키인지 확인
 */
export function isActivationKey(event: KeyboardEvent): boolean {
  return isKey(event, "Enter") || isKey(event, " ");
}

/**
 * 키보드 이벤트가 화살표 키인지 확인
 */
export function isArrowKey(event: KeyboardEvent): boolean {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(
    event.key
  );
}

/**
 * 키보드 이벤트가 Escape 키인지 확인
 */
export function isEscapeKey(event: KeyboardEvent): boolean {
  return isKey(event, "Escape");
}

/**
 * 키보드 이벤트가 Tab 키인지 확인
 */
export function isTabKey(event: KeyboardEvent): boolean {
  return isKey(event, "Tab");
}

/**
 * 키보드 이벤트가 Home 키인지 확인
 */
export function isHomeKey(event: KeyboardEvent): boolean {
  return isKey(event, "Home");
}

/**
 * 키보드 이벤트가 End 키인지 확인
 */
export function isEndKey(event: KeyboardEvent): boolean {
  return isKey(event, "End");
}

/**
 * 이벤트의 기본 동작을 방지하고 전파를 중지
 */
export function preventDefaultAndStopPropagation(event: Event): void {
  event.preventDefault();
  event.stopPropagation();
}
