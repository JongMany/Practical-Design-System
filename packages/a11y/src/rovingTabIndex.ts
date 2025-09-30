import {
  isArrowKey,
  isHomeKey,
  isEndKey,
  preventDefaultAndStopPropagation,
} from "@acme/core";

export function createRovingFocus(opts: {
  orientation: "horizontal" | "vertical" | "both";
}) {
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
    register(node: HTMLElement) {
      items.push(node);
      node.tabIndex = items.length === 1 ? 0 : -1;
    },
    unregister(node: HTMLElement) {
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
    onKeyDown(e: KeyboardEvent) {
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
