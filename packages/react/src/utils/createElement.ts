import React from "react";
import { Slot } from "./Slot";

/**
 * 다형성 컴포넌트를 위한 createElement 유틸리티
 * as, asChild props를 처리하여 적절한 요소 타입을 결정합니다.
 */
export function createPolymorphicElement<T extends React.ElementType>(
  as?: T,
  asChild?: boolean
): T | typeof Slot | React.ElementType {
  return asChild ? Slot : (as ?? "div");
}

/**
 * 다형성 컴포넌트의 createElement 래퍼
 * 공통 패턴을 추상화하여 일관된 렌더링을 제공합니다.
 */
export function createPolymorphicComponent<T extends React.ElementType>(
  elementType: T | typeof Slot | React.ElementType,
  props: React.ComponentPropsWithoutRef<T> & { ref?: React.Ref<any> },
  children?: React.ReactNode
): React.ReactElement {
  return React.createElement(elementType, props, children);
}
