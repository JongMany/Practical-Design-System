import {
  getFocusableElements,
  isActiveElement,
  focusElement,
  isTabKey,
} from "@acme/core";

/**
 * Focus Trap 정리 함수 타입
 */
export type FocusTrapCleanup = () => void;

/**
 * Focus Trap을 생성합니다.
 * 컨테이너 내부에서 Tab 키를 사용한 포커스 이동을 제한합니다.
 *
 * @param container - 포커스 트랩을 적용할 컨테이너 요소
 * @returns 포커스 트랩을 정리하는 함수
 *
 * @example
 * ```typescript
 * const cleanup = createFocusTrap(dialogElement);
 *
 * // 다이얼로그가 닫힐 때 정리
 * cleanup();
 * ```
 */
export function createFocusTrap(container: HTMLElement): FocusTrapCleanup {
  const onKeyDown = (e: KeyboardEvent): void => {
    if (!isTabKey(e)) return;

    const items = getFocusableElements(container);
    const first = items[0];
    const last = items[items.length - 1];

    if (!first || !last) return;

    if (e.shiftKey && isActiveElement(first)) {
      e.preventDefault();
      focusElement(last);
    } else if (!e.shiftKey && isActiveElement(last)) {
      e.preventDefault();
      focusElement(first);
    }
  };

  container.addEventListener("keydown", onKeyDown);
  const prev = focusElement(container);

  return (): void => {
    container.removeEventListener("keydown", onKeyDown);
    prev?.focus?.();
  };
}
