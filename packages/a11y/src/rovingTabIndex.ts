import {
  isArrowKey,
  isHomeKey,
  isEndKey,
  preventDefaultAndStopPropagation,
} from "@acme/core";

/**
 * Roving Tab Index 옵션
 */
export interface RovingFocusOptions {
  /** 포커스 이동 방향 */
  orientation: "horizontal" | "vertical" | "both";
}

/**
 * Roving Tab Index 핸들러 인터페이스
 */
export interface RovingFocusHandlers {
  /** 요소를 roving focus에 등록 */
  register: (node: HTMLElement) => void;
  /** 요소를 roving focus에서 제거 */
  unregister: (node: HTMLElement) => void;
  /** 키보드 이벤트 핸들러 */
  onKeyDown: (e: KeyboardEvent) => void;
}

/**
 * Roving Tab Index 기능을 제공하는 핸들러를 생성합니다.
 *
 * @param opts - Roving focus 옵션
 * @returns Roving focus 핸들러 객체
 *
 * @example
 * ```typescript
 * const rovingFocus = createRovingFocus({ orientation: "horizontal" });
 *
 * // 요소 등록
 * rovingFocus.register(element1);
 * rovingFocus.register(element2);
 *
 * // 키보드 이벤트 핸들러 연결
 * container.addEventListener('keydown', rovingFocus.onKeyDown);
 * ```
 */
export function createRovingFocus(
  opts: RovingFocusOptions
): RovingFocusHandlers {
  let current = 0;
  let items: HTMLElement[] = [];

  const updateFocus = (index: number) => {
    items.forEach((item) => (item.tabIndex = -1));
    const targetItem = items[index];
    if (targetItem) {
      targetItem.tabIndex = 0;
      targetItem.focus();
    }
  };

  return {
    register(node: HTMLElement): void {
      items.push(node);
      node.tabIndex = items.length === 1 ? 0 : -1;
    },
    unregister(node: HTMLElement): void {
      const index = items.indexOf(node);
      items = items.filter((n) => n !== node);

      // 현재 포커스된 요소가 제거된 경우 인덱스 조정
      if (index !== -1 && index <= current) {
        current = Math.max(0, current - 1);
        if (items.length > 0) {
          updateFocus(current);
        }
      }
    },
    onKeyDown(e: KeyboardEvent): void {
      const horiz = opts.orientation !== "vertical";
      const vert = opts.orientation !== "horizontal";

      if (isArrowKey(e)) {
        const isHorizontalArrow =
          e.key === "ArrowRight" || e.key === "ArrowLeft";
        const isVerticalArrow = e.key === "ArrowDown" || e.key === "ArrowUp";

        if ((horiz && isHorizontalArrow) || (vert && isVerticalArrow)) {
          preventDefaultAndStopPropagation(e);
          const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : -1;
          current = (current + dir + items.length) % items.length;
          updateFocus(current);
        }
      }

      if (isHomeKey(e)) {
        preventDefaultAndStopPropagation(e);
        current = 0;
        updateFocus(current);
      }

      if (isEndKey(e)) {
        preventDefaultAndStopPropagation(e);
        current = items.length - 1;
        updateFocus(current);
      }
    },
  };
}
