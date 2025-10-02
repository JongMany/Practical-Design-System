import type { PolymorphicComponentProps } from "../types/polymorphic";

/**
 * Button 컴포넌트의 variant 타입
 */
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive";

/**
 * Button 컴포넌트의 size 타입
 */
export type ButtonSize = "sm" | "md" | "lg";

/**
 * Button 컴포넌트의 기본 props 타입
 */
export type ButtonProps = React.PropsWithChildren<
  {
    /** 버튼의 시각적 스타일 variant */
    variant?: ButtonVariant;
    /** 버튼의 크기 */
    size?: ButtonSize;
    /** 비활성화 상태 */
    disabled?: boolean;
    /** 로딩 상태 */
    loading?: boolean;
    /** 왼쪽 아이콘 */
    leftIcon?: React.ReactNode;
    /** 오른쪽 아이콘 */
    rightIcon?: React.ReactNode;
  } & React.HTMLAttributes<HTMLButtonElement>
>;
