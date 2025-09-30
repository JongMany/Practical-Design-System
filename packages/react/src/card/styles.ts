import type { CSSProperties } from "react";

/**
 * Card 컴포넌트의 스타일 관련 타입 정의
 */
export type CardStyleProps = {
  asChild?: boolean;
  isButton?: boolean;
  isLink?: boolean;
  disabled?: boolean;
};

/**
 * Card Root의 기본 스타일을 생성하는 함수
 *
 * @param props - 스타일을 결정하는 props
 * @param externalStyle - 외부에서 전달된 추가 스타일
 * @returns CSS 스타일 객체
 */
export function getCardRootStyles(
  props: CardStyleProps,
  externalStyle?: CSSProperties
): CSSProperties {
  const { asChild, isButton, isLink, disabled } = props;

  const baseStyles: CSSProperties = {
    outline: "none",
    borderRadius: "var(--ds-radius-2, 12px)",
    background: "var(--ds-semantic-color-bg-layer-default)",
    color: "var(--ds-semantic-color-fg-neutral)",
    boxShadow: "var(--ds-shadow-card, 0 1px 3px rgba(0,0,0,.06))",
    padding: "var(--ds-space-5, 20px)",
    cursor: (isButton || isLink) && !disabled ? "pointer" : "default",
  };

  // asChild 모드일 때는 display: block 추가 (레이아웃 깨짐 방지)
  const asChildStyles: CSSProperties = asChild ? { display: "block" } : {};

  return {
    ...baseStyles,
    ...asChildStyles,
    ...externalStyle,
  };
}

/**
 * Card Header의 기본 스타일을 생성하는 함수
 *
 * @param externalStyle - 외부에서 전달된 추가 스타일
 * @returns CSS 스타일 객체
 */
export function getCardHeaderStyles(
  externalStyle?: CSSProperties
): CSSProperties {
  return {
    marginBottom: "var(--ds-space-3, 12px)",
    ...externalStyle,
  };
}

/**
 * Card Media의 기본 스타일을 생성하는 함수
 *
 * @param externalStyle - 외부에서 전달된 추가 스타일
 * @returns CSS 스타일 객체
 */
export function getCardMediaStyles(
  externalStyle?: CSSProperties
): CSSProperties {
  return {
    width: "100%",
    borderRadius: "var(--ds-radius-1, 8px)",
    marginBottom: "var(--ds-space-3, 12px)",
    ...externalStyle,
  };
}

/**
 * Card Title의 기본 스타일을 생성하는 함수
 *
 * @param externalStyle - 외부에서 전달된 추가 스타일
 * @returns CSS 스타일 객체
 */
export function getCardTitleStyles(
  externalStyle?: CSSProperties
): CSSProperties {
  return {
    fontSize: "var(--ds-font-size-lg, 1.125rem)",
    fontWeight: "var(--ds-font-weight-semibold, 600)",
    lineHeight: "var(--ds-line-height-tight, 1.25)",
    color: "var(--ds-semantic-color-fg-neutral)",
    margin: 0,
    ...externalStyle,
  };
}

/**
 * Card Description의 기본 스타일을 생성하는 함수
 *
 * @param externalStyle - 외부에서 전달된 추가 스타일
 * @returns CSS 스타일 객체
 */
export function getCardDescriptionStyles(
  externalStyle?: CSSProperties
): CSSProperties {
  return {
    fontSize: "var(--ds-font-size-sm, 0.875rem)",
    lineHeight: "var(--ds-line-height-relaxed, 1.5)",
    color: "var(--ds-semantic-color-fg-subtle)",
    margin: 0,
    ...externalStyle,
  };
}

/**
 * Card Body의 기본 스타일을 생성하는 함수
 *
 * @param externalStyle - 외부에서 전달된 추가 스타일
 * @returns CSS 스타일 객체
 */
export function getCardBodyStyles(
  externalStyle?: CSSProperties
): CSSProperties {
  return {
    flex: 1,
    ...externalStyle,
  };
}

/**
 * Card Footer의 기본 스타일을 생성하는 함수
 *
 * @param externalStyle - 외부에서 전달된 추가 스타일
 * @returns CSS 스타일 객체
 */
export function getCardFooterStyles(
  externalStyle?: CSSProperties
): CSSProperties {
  return {
    marginTop: "var(--ds-space-3, 12px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "var(--ds-space-2, 8px)",
    ...externalStyle,
  };
}
