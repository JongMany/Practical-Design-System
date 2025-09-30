import type { ButtonSize, ButtonVariant } from "./types";

/**
 * Button 스타일을 생성하는 유틸리티 함수
 */
export function getButtonStyles(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  disabled?: boolean,
  loading?: boolean
): React.CSSProperties {
  // Size별 스타일
  const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
    sm: {
      paddingInline: "var(--ds-space-3, 12px)",
      paddingBlock: "var(--ds-space-2, 8px)",
      fontSize: "var(--ds-text-sm, 14px)",
      minHeight: "var(--ds-size-8, 32px)",
    },
    md: {
      paddingInline: "var(--ds-space-4, 16px)",
      paddingBlock: "var(--ds-space-3, 12px)",
      fontSize: "var(--ds-text-base, 16px)",
      minHeight: "var(--ds-size-10, 40px)",
    },
    lg: {
      paddingInline: "var(--ds-space-5, 20px)",
      paddingBlock: "var(--ds-space-4, 16px)",
      fontSize: "var(--ds-text-lg, 18px)",
      minHeight: "var(--ds-size-12, 48px)",
    },
  };

  // Variant별 스타일
  const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
    primary: {
      background: "var(--ds-color-button-primary-bg, #3b82f6)",
      color: "var(--ds-color-button-primary-fg, #ffffff)",
      border: "1px solid var(--ds-color-button-primary-border, #3b82f6)",
    },
    secondary: {
      background: "var(--ds-color-button-secondary-bg, #f1f5f9)",
      color: "var(--ds-color-button-secondary-fg, #0f172a)",
      border: "1px solid var(--ds-color-button-secondary-border, #e2e8f0)",
    },
    outline: {
      background: "transparent",
      color: "var(--ds-color-button-outline-fg, #3b82f6)",
      border: "1px solid var(--ds-color-button-outline-border, #3b82f6)",
    },
    ghost: {
      background: "transparent",
      color: "var(--ds-color-button-ghost-fg, #3b82f6)",
      border: "1px solid transparent",
    },
    destructive: {
      background: "var(--ds-color-button-destructive-bg, #ef4444)",
      color: "var(--ds-color-button-destructive-fg, #ffffff)",
      border: "1px solid var(--ds-color-button-destructive-border, #ef4444)",
    },
  };

  // 공통 스타일
  const baseStyles: React.CSSProperties = {
    borderRadius: "var(--ds-radius-control, 6px)",
    fontWeight: "var(--ds-font-weight-medium, 500)",
    cursor: disabled || loading ? "not-allowed" : "pointer",
    opacity: disabled || loading ? 0.6 : 1,
    transition: "all 0.2s ease-in-out",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--ds-space-2, 8px)",
    outline: "none",
    border: "none",
    textDecoration: "none",
  };

  return {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
  };
}
