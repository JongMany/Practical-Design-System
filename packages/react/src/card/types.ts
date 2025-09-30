import React from "react";
import type { PolymorphicProp } from "../types/polymorphic";

/**
 * Card 컴포넌트의 인터랙션 모드를 정의합니다.
 * - "none": 정적 카드 (클릭 불가)
 * - "button": 버튼처럼 동작하는 카드 (키보드/마우스 지원)
 * - "link": 링크처럼 동작하는 카드 (키보드/마우스 지원)
 */
export type CardAction = "none" | "button" | "link";

/**
 * Card 컴포넌트의 기본 props 타입
 * 인터랙션, 접근성, 이벤트 핸들링 관련 속성들을 포함합니다.
 */
export type CardBaseProps = {
  /** 카드가 인터랙티브(클릭/키보드 활성)한지 */
  action?: CardAction;
  /** 비활성화 (action !== 'none'일 때만 의미) */
  disabled?: boolean;
  /** 버튼/카드 액션 */
  onPress?: (e: { type: "keyboard" | "click" }) => void;
  /** 선택형 카드(토글)의 상태 표시 (옵션) */
  pressed?: boolean;
  /** 외부 이벤트 핸들러 */
  onClick?: React.MouseEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
  /** a11y 라벨링을 위해 외부에서 title/desc id를 줄 수 있음(선택) */
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  /** 우선순위 제어: true면 외부 핸들러 먼저 실행 */
  externalHandlersFirst?: boolean;
} & React.HTMLAttributes<HTMLElement>;

/**
 * Card 컴포넌트의 전체 props 타입
 * 다형성 지원과 함께 HTML 속성들을 상속받습니다.
 */
export type CardProps<C extends React.ElementType = React.ElementType> =
  React.PropsWithChildren<CardBaseProps & PolymorphicProp<C>> &
    Omit<
      React.ComponentPropsWithoutRef<C>,
      keyof CardBaseProps | "children" | "as" | "asChild"
    >;

/**
 * Card Context에서 공유되는 값들
 * 접근성을 위한 ID들을 하위 컴포넌트들과 공유합니다.
 */
export type CardContextValue = {
  titleId: string;
  descId: string;
};

/**
 * Card 하위 컴포넌트들의 공통 props 타입
 * 다형성 지원과 HTML 속성을 포함합니다.
 */
export type CardSubComponentProps = React.HTMLAttributes<HTMLElement> &
  PolymorphicProp<React.ElementType>;
