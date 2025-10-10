import React, { Children, cloneElement, isValidElement } from "react";

/**
 * 자식 요소들에게 특정 props를 재귀적으로 전달하는 유틸리티 함수
 *
 * @param children - React 자식 요소들
 * @param props - 전달할 props 객체
 * @param options - 옵션 설정
 * @returns props가 추가된 자식 요소들
 */
export const cloneChildren = <T extends Record<string, any>>(
  children: React.ReactNode,
  props: T,
  options: {
    /** React 컴포넌트에만 props를 전달할지 여부 (기본값: false) */
    onlyReactComponents?: boolean;
    /** DOM 요소에도 props를 전달할지 여부 (기본값: true) */
    includeDOMElements?: boolean;
    /** 특정 prop 이름으로 DOM 요소에 전달할지 여부 (예: 'data-name') */
    domElementPropName?: string;
    /** props를 덮어쓸지 여부 (기본값: false) */
    overwriteProps?: boolean;
  } = {}
): React.ReactNode => {
  const {
    onlyReactComponents = false,
    includeDOMElements = true,
    domElementPropName,
    overwriteProps = false,
  } = options;

  return Children.map(children, (child) => {
    if (isValidElement(child)) {
      const childElement = child as React.ReactElement<any>;
      const isReactComponent =
        typeof childElement.type === "function" ||
        typeof childElement.type === "object";

      // React 컴포넌트인 경우
      if (isReactComponent) {
        const newProps = overwriteProps
          ? { ...props }
          : { ...childElement.props, ...props };

        return cloneElement(childElement, {
          ...newProps,
          children: childElement.props.children
            ? cloneChildren(childElement.props.children, props, options)
            : childElement.props.children,
        });
      }
      // DOM 요소인 경우
      else if (includeDOMElements && !onlyReactComponents) {
        const newProps = overwriteProps
          ? { ...props }
          : { ...childElement.props, ...props };

        // domElementPropName이 지정된 경우 해당 이름으로 props 전달
        if (domElementPropName) {
          const { [domElementPropName]: domProp, ...restProps } = props;
          const finalProps = overwriteProps
            ? { ...childElement.props, [domElementPropName]: domProp }
            : { ...childElement.props, [domElementPropName]: domProp };

          return cloneElement(childElement, {
            ...finalProps,
            children: childElement.props.children
              ? cloneChildren(childElement.props.children, props, options)
              : childElement.props.children,
          });
        }

        return cloneElement(childElement, {
          ...newProps,
          children: childElement.props.children
            ? cloneChildren(childElement.props.children, props, options)
            : childElement.props.children,
        });
      }
    }
    return child;
  });
};

/**
 * 자식 요소들에게 name prop을 전달하는 특화된 함수
 *
 * @param children - React 자식 요소들
 * @param name - 전달할 name 값
 * @returns name prop이 추가된 자식 요소들
 */
export const addNameToChildren = (
  children: React.ReactNode,
  name: string
): React.ReactNode => {
  return cloneChildren(
    children,
    { name },
    {
      onlyReactComponents: false,
      includeDOMElements: true,
      domElementPropName: "data-name",
      overwriteProps: false,
    }
  );
};

/**
 * 자식 요소들에게 className을 전달하는 특화된 함수
 *
 * @param children - React 자식 요소들
 * @param className - 전달할 className 값
 * @returns className prop이 추가된 자식 요소들
 */
export const addClassNameToChildren = (
  children: React.ReactNode,
  className: string
): React.ReactNode => {
  return cloneChildren(
    children,
    { className },
    {
      onlyReactComponents: false,
      includeDOMElements: true,
      overwriteProps: false,
    }
  );
};

/**
 * 자식 요소들에게 style을 전달하는 특화된 함수
 *
 * @param children - React 자식 요소들
 * @param style - 전달할 style 객체
 * @returns style prop이 추가된 자식 요소들
 */
export const addStyleToChildren = (
  children: React.ReactNode,
  style: React.CSSProperties
): React.ReactNode => {
  return cloneChildren(
    children,
    { style },
    {
      onlyReactComponents: false,
      includeDOMElements: true,
      overwriteProps: false,
    }
  );
};

/**
 * 자식 요소들에게 data 속성을 전달하는 특화된 함수
 *
 * @param children - React 자식 요소들
 * @param dataProps - 전달할 data 속성들
 * @returns data 속성이 추가된 자식 요소들
 */
export const addDataPropsToChildren = (
  children: React.ReactNode,
  dataProps: Record<string, string | number | boolean>
): React.ReactNode => {
  const props = Object.entries(dataProps).reduce(
    (acc, [key, value]) => {
      acc[`data-${key}`] = value;
      return acc;
    },
    {} as Record<string, any>
  );

  return cloneChildren(children, props, {
    onlyReactComponents: false,
    includeDOMElements: true,
    overwriteProps: false,
  });
};
