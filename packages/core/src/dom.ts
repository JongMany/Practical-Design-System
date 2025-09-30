/**
 * DOM 관련 기본 유틸리티 함수들
 */

export const FOCUSABLE_SELECTOR =
  'a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"])';

/**
 * 요소가 포커스 가능한지 확인
 */
export function isFocusable(element: HTMLElement): boolean {
  if (element.hasAttribute("disabled")) return false;
  if (element.getAttribute("aria-disabled") === "true") return false;

  const tagName = element.tagName.toLowerCase();
  const tabIndex = element.getAttribute("tabindex");

  if (tabIndex === "-1") return false;
  if (tabIndex !== null) return true;

  return ["a", "button", "input", "select", "textarea"].includes(tagName);
}

/**
 * 컨테이너 내의 모든 포커스 가능한 요소들을 반환
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
  ).filter(isFocusable);
}

/**
 * 요소가 현재 포커스된 요소인지 확인
 */
export function isActiveElement(element: HTMLElement): boolean {
  return document.activeElement === element;
}

/**
 * 요소에 포커스를 설정하고 이전 포커스 요소를 반환
 */
export function focusElement(element: HTMLElement): HTMLElement | null {
  const prev = document.activeElement as HTMLElement | null;
  element.focus();
  return prev;
}
