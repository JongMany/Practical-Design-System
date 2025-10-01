import * as React from "react";

/**
 * 스크롤 방지 옵션 (접근성 고려)
 */
export interface UseScrollBlockOptions {
  /** 스크롤 방지 여부 */
  enabled?: boolean;
  /** body에 relative position 추가 여부 */
  addRelativePosition?: boolean;
  /** 접근성: 스크린 리더에게 스크롤 방지 알림 여부 */
  announceToScreenReader?: boolean;
  /** 접근성: 포커스 트랩 활성화 여부 */
  enableFocusTrap?: boolean;
  /** 포커스 트랩 대상 요소 */
  focusTrapElement?: HTMLElement | null;
  /** 스크롤바 너비 보정 여부 */
  compensateScrollbar?: boolean;
}

/**
 * 스크롤 방지 훅 (접근성 고려)
 * Dialog나 Modal이 열릴 때 body 스크롤을 방지하고 접근성을 보장합니다.
 *
 * @param isActive - 스크롤 방지가 활성화되어야 하는지 여부
 * @param options - 스크롤 방지 옵션
 */
export function useScrollBlock(
  isActive: boolean,
  options: UseScrollBlockOptions = {}
): void {
  const {
    enabled = true,
    addRelativePosition = true,
    announceToScreenReader = false,
    enableFocusTrap = false,
    focusTrapElement,
    compensateScrollbar = true,
  } = options;

  // 이전 스타일과 상태 저장
  const previousStylesRef = React.useRef<{
    overflow: string;
    paddingRight: string;
    position: string;
  } | null>(null);

  // 스크린 리더 알림 함수
  const announceToScreenReaderFn = React.useCallback(
    (message: string) => {
      if (!announceToScreenReader) return;

      const announcement = document.createElement("div");
      announcement.setAttribute("aria-live", "polite");
      announcement.setAttribute("aria-atomic", "true");
      announcement.style.position = "absolute";
      announcement.style.left = "-10000px";
      announcement.style.width = "1px";
      announcement.style.height = "1px";
      announcement.style.overflow = "hidden";
      announcement.textContent = message;

      document.body.appendChild(announcement);

      setTimeout(() => {
        if (document.body.contains(announcement)) {
          document.body.removeChild(announcement);
        }
      }, 1000);
    },
    [announceToScreenReader]
  );

  // 포커스 트랩 함수
  const handleFocusTrap = React.useCallback(
    (e: KeyboardEvent) => {
      if (!enableFocusTrap || !focusTrapElement) return;

      if (e.key === "Tab") {
        const focusableElements = focusTrapElement.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

        if (e.shiftKey) {
          // Shift + Tab: 역방향
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          // Tab: 순방향
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    },
    [enableFocusTrap, focusTrapElement]
  );

  React.useEffect(() => {
    if (!isActive || !enabled) return;

    // 이전 스타일 저장
    previousStylesRef.current = {
      overflow: document.body.style.overflow,
      paddingRight: document.body.style.paddingRight,
      position: document.body.style.position,
    };

    // 스크롤바 너비 계산
    const scrollbarWidth = compensateScrollbar
      ? window.innerWidth - document.documentElement.clientWidth
      : 0;

    // body 스타일 적용
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    if (addRelativePosition) {
      document.body.style.position = "relative";
    }

    // 스크린 리더 알림
    announceToScreenReaderFn("Page scrolling disabled");

    // 포커스 트랩 이벤트 리스너 추가
    if (enableFocusTrap) {
      document.addEventListener("keydown", handleFocusTrap);
    }

    // cleanup 함수
    return () => {
      const previousStyles = previousStylesRef.current;
      if (previousStyles) {
        document.body.style.overflow = previousStyles.overflow;
        document.body.style.paddingRight = previousStyles.paddingRight;
        document.body.style.position = previousStyles.position;
      }

      // 포커스 트랩 이벤트 리스너 제거
      if (enableFocusTrap) {
        document.removeEventListener("keydown", handleFocusTrap);
      }

      // 스크린 리더 알림
      announceToScreenReaderFn("Page scrolling enabled");
    };
  }, [
    isActive,
    enabled,
    addRelativePosition,
    compensateScrollbar,
    announceToScreenReaderFn,
    enableFocusTrap,
    handleFocusTrap,
  ]);
}
