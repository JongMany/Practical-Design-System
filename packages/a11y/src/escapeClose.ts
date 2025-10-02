/**
 * Escape 키로 닫기 기능을 제공하는 이벤트 핸들러를 생성합니다.
 *
 * @param onClose - Escape 키가 눌렸을 때 실행될 콜백 함수
 * @returns 키보드 이벤트 핸들러 함수
 *
 * @example
 * ```typescript
 * const handleKeyDown = createEscapeToClose(() => {
 *   console.log('Dialog closed by Escape key');
 * });
 *
 * // 사용법
 * element.addEventListener('keydown', handleKeyDown);
 * ```
 */
export function createEscapeToClose(
  onClose: () => void
): (e: KeyboardEvent) => void {
  return function handler(e: KeyboardEvent): void {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };
}
