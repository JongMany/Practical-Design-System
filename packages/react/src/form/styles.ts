import { CSSProperties } from "react";

/**
 * Form Control 기본 스타일
 */
export const defaultControlStyles: CSSProperties = {
  // 기본 padding
  padding: "12px 16px",
  // HTML 기본 validation 에러 스타일 숨기기
  boxShadow: "rgba(102, 126, 234, 0.1) 0px 0px 0px 3px",
  outline: "none",
  // input number의 스피너 버튼 완전히 숨기기
  WebkitAppearance: "none",
  MozAppearance: "textfield",
  appearance: "none",
  // textarea 크기 조절 핸들 완전히 숨기기
  resize: "none",
  minWidth: "100%",
  maxWidth: "100%",
  // 기본 테두리와 배경
  borderColor: "rgb(102, 126, 234)",
  background: "white",
  // 기본 테두리 스타일
  border: "1px solid rgb(102, 126, 234)",
  borderRadius: "8px",
  fontSize: "14px",
  lineHeight: "1.5",
  color: "#333",
  transition: "all 0.2s ease-in-out",
};

/**
 * Number Input 전용 스타일
 */
export const numberInputStyles: CSSProperties = {
  // Firefox 브라우저용
  MozAppearance: "textfield",
  // WebKit 브라우저용 (Chrome, Safari, Edge...)
  WebkitAppearance: "none",
  appearance: "none",
};

/**
 * Form Submit 버튼 기본 스타일
 */
export const defaultButtonStyles: CSSProperties = {
  padding: "14px 28px",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "white",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  fontSize: "1rem",
  fontWeight: "600",
  transition: "all 0.2s ease",
  boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
  outline: "none",
  minHeight: "48px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  userSelect: "none",
  WebkitUserSelect: "none",
  MozUserSelect: "none",
  msUserSelect: "none",
};

/**
 * Number input spinner 버튼을 숨기기 위한 CSS 스타일
 */
export const hideNumberSpinnerStyles = `
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none !important;
    margin: 0 !important;
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
    position: absolute !important;
    left: -9999px !important;
    width: 0 !important;
    height: 0 !important;
  }
  
  input[type="number"] {
    -moz-appearance: textfield !important;
  }
  
  [data-field] input[type="number"]::-webkit-inner-spin-button,
  [data-field] input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none !important;
    margin: 0 !important;
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
    position: absolute !important;
    left: -9999px !important;
    width: 0 !important;
    height: 0 !important;
  }
  
  form input[type="number"]::-webkit-inner-spin-button,
  form input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none !important;
    margin: 0 !important;
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
    position: absolute !important;
    left: -9999px !important;
    width: 0 !important;
    height: 0 !important;
  }
`;

/**
 * 스타일을 DOM 요소에 적용하는 유틸리티 함수
 */
export const applyStylesToElement = (
  element: HTMLElement,
  styles: CSSProperties
): void => {
  Object.entries(styles).forEach(([key, value]) => {
    element.style.setProperty(key, value, "important");
  });
};

/**
 * Number input spinner를 숨기기 위한 스타일을 동적으로 주입하는 함수
 */
export const injectNumberSpinnerStyles = (): void => {
  // 이미 주입된 스타일이 있는지 확인
  if (document.getElementById("hide-number-spinner-styles")) {
    return;
  }

  const style = document.createElement("style");
  style.id = "hide-number-spinner-styles";
  style.textContent = hideNumberSpinnerStyles;
  document.head.appendChild(style);
};
