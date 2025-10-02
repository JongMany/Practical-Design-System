/**
 * Active Descendant ARIA 속성 타입
 */
export interface ActiveDescendantAriaAttrs {
  role: "combobox";
  "aria-controls": string;
  "aria-activedescendant"?: string;
}

/**
 * Active Descendant 핸들러 인터페이스
 */
export interface ActiveDescendantHandlers {
  /** 활성 요소 ID 설정 */
  setActive: (id: string) => void;
  /** ARIA 속성 생성 */
  getAriaAttrs: (inputId: string) => ActiveDescendantAriaAttrs;
}

/**
 * Active Descendant 기능을 제공하는 핸들러를 생성합니다.
 *
 * @param listboxId - 연결된 listbox 요소의 ID
 * @returns Active Descendant 핸들러 객체
 *
 * @example
 * ```typescript
 * const activeDescendant = createActiveDescendant("my-listbox");
 *
 * // 활성 요소 설정
 * activeDescendant.setActive("option-1");
 *
 * // ARIA 속성 생성
 * const ariaAttrs = activeDescendant.getAriaAttrs("my-input");
 * ```
 */
export function createActiveDescendant(
  listboxId: string
): ActiveDescendantHandlers {
  let activeId: string | null = null;

  const setActive = (id: string): void => {
    activeId = id;
  };

  const getAriaAttrs = (inputId: string): ActiveDescendantAriaAttrs => {
    return {
      role: "combobox",
      "aria-controls": listboxId,
      "aria-activedescendant": activeId ?? undefined,
    };
  };

  return { setActive, getAriaAttrs };
}
