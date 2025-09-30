import React from "react";
import { Slot } from "../utils/Slot";

/**
 * 다형성 컴포넌트를 위한 props 타입
 * - as: 렌더링할 HTML 요소나 React 컴포넌트 지정
 * - asChild: true일 때 자식 요소를 직접 렌더링 (Slot 패턴)
 */
export type PolymorphicProp<C extends React.ElementType = "div"> = {
  as?: C;
  asChild?: boolean;
};

/**
 * 다형성 컴포넌트의 렌더링 요소 타입
 * Slot 컴포넌트와 일반 요소를 구분하여 타입 안전성 확보
 */
export type PolymorphicElementType<C extends React.ElementType> =
  | C
  | typeof Slot
  | React.ElementType;

/**
 * 다형성 컴포넌트의 기본 props 타입
 * 공통 HTML 속성과 다형성 props를 포함합니다.
 */
export type PolymorphicComponentProps<
  C extends React.ElementType = React.ElementType,
> = React.PropsWithChildren<
  PolymorphicProp<C> & React.HTMLAttributes<HTMLElement>
> &
  Omit<
    React.ComponentPropsWithoutRef<C>,
    keyof PolymorphicProp<C> | "children"
  >;
