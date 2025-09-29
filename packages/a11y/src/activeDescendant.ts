export function createActiveDescendant(listboxId: string) {
  let activeId: string | null = null;
  function setActive(id: string) {
    activeId = id;
  }
  function getAriaAttrs(inputId: string) {
    return {
      role: "combobox",
      "aria-controls": listboxId,
      "aria-activedescendant": activeId ?? undefined,
    };
  }
  return { setActive, getAriaAttrs };
}
