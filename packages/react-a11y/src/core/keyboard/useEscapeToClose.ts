import { useEffect, useCallback } from "react";
import { createEscapeToClose } from "@acme/a11y";

/**
 * Escape 키로 닫기 옵션
 */
export interface UseEscapeToCloseOptions {
  /** Escape 키 처리 활성화 여부 */
  enabled?: boolean;
  /** 닫기 전에 실행할 추가 검증 함수 */
  onBeforeClose?: () => boolean;
  /** 접근성: 스크린 리더에게 닫기 알림 여부 */
  announceToScreenReader?: boolean;
  /** 접근성: 포커스 복원 여부 */
  restoreFocus?: boolean;
  /** 이전에 포커스된 요소 (포커스 복원용) */
  previousFocusedElement?: HTMLElement | null;
}

/**
 * Escape 키로 닫기 훅 (접근성 고려)
 *
 * @param onClose - 닫기 함수
 * @param options - Escape 키 처리 옵션
 */
export function useEscapeToClose(
  onClose: () => void,
  options: UseEscapeToCloseOptions = {}
) {
  const {
    enabled = true,
    onBeforeClose,
    announceToScreenReader = false,
    restoreFocus = false,
    previousFocusedElement,
  } = options;

  // 안정적인 onClose 함수 생성
  const stableOnClose = useCallback(() => {
    // 추가 검증이 있으면 실행
    if (onBeforeClose && !onBeforeClose()) {
      return;
    }

    // 포커스 복원
    if (restoreFocus && previousFocusedElement) {
      previousFocusedElement.focus();
    }

    // 스크린 리더 알림
    if (announceToScreenReader) {
      // ARIA live region을 통한 알림
      const announcement = document.createElement("div");
      announcement.setAttribute("aria-live", "polite");
      announcement.setAttribute("aria-atomic", "true");
      announcement.style.position = "absolute";
      announcement.style.left = "-10000px";
      announcement.style.width = "1px";
      announcement.style.height = "1px";
      announcement.style.overflow = "hidden";
      announcement.textContent = "Dialog closed";

      document.body.appendChild(announcement);

      // 잠시 후 제거
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    }

    onClose();
  }, [
    onClose,
    onBeforeClose,
    restoreFocus,
    previousFocusedElement,
    announceToScreenReader,
  ]);

  useEffect(() => {
    if (!enabled) return;

    const handler = createEscapeToClose(stableOnClose);
    document.addEventListener("keydown", handler);

    return () => document.removeEventListener("keydown", handler);
  }, [enabled, stableOnClose]);
}
