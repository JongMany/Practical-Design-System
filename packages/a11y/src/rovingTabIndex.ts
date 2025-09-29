export function createRovingFocus(opts: {
  orientation: "horizontal" | "vertical" | "both";
}) {
  let current = 0;
  let items: HTMLElement[] = [];
  return {
    register(node: HTMLElement) {
      items.push(node);
      node.tabIndex = items.length === 1 ? 0 : -1;
    },
    unregister(node: HTMLElement) {
      items = items.filter((n) => n !== node);
    },
    onKeyDown(e: KeyboardEvent) {
      const horiz = opts.orientation !== "vertical";
      const vert = opts.orientation !== "horizontal";
      if (
        (horiz && (e.key === "ArrowRight" || e.key === "ArrowLeft")) ||
        (vert && (e.key === "ArrowDown" || e.key === "ArrowUp"))
      ) {
        e.preventDefault();
        const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : -1;
        current = (current + dir + items.length) % items.length;
        items.forEach((i) => (i.tabIndex = -1));
        const currentItem = items[current];
        if (currentItem) {
          currentItem.tabIndex = 0;
          currentItem.focus();
        }
      }
      if (e.key === "Home") {
        e.preventDefault();
        current = 0;
        items.forEach((i) => (i.tabIndex = -1));
        if (items[0]) {
          items[0].focus();
          items[0].tabIndex = 0;
        }
      }
      if (e.key === "End") {
        e.preventDefault();
        current = items.length - 1;
        items.forEach((i) => (i.tabIndex = -1));
        const currentItem = items[current];
        currentItem?.focus();
        if (currentItem) {
          currentItem.tabIndex = 0;
        }
      }
    },
  };
}
