import { forwardRef, Children, isValidElement, cloneElement } from "react";
import { useFormContext } from "./FormRoot";
import type { FormFieldProps } from "./types";

// 재귀적으로 모든 자식에게 name을 전달하는 함수
const addNameToChildren = (
  children: React.ReactNode,
  name: string
): React.ReactNode => {
  return Children.map(children, (child) => {
    if (isValidElement(child)) {
      const childElement = child as React.ReactElement<any>;
      // React 컴포넌트인 경우 name을 전달
      if (typeof child.type === "function" || typeof child.type === "object") {
        return cloneElement(childElement, {
          name,
          children: childElement.props.children
            ? addNameToChildren(childElement.props.children, name)
            : childElement.props.children,
        });
      }
      // DOM 요소인 경우에도 자식이 있다면 재귀적으로 처리
      else if (childElement.props.children) {
        return cloneElement(childElement, {
          ...childElement.props,
          children: addNameToChildren(childElement.props.children, name),
        });
      }
    }
    return child;
  });
};

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ name, children, className, style, ...rest }, ref) => {
    const { formData } = useFormContext("Form");

    return (
      <div
        {...rest}
        ref={ref}
        className={className}
        style={style}
        data-field={name}
        data-invalid={formData[name]?.state === "invalid" || undefined}
        data-touched={formData[name]?.touched || undefined}
        data-dirty={formData[name]?.dirty || undefined}
      >
        {addNameToChildren(children, name)}
      </div>
    );
  }
);

FormField.displayName = "FormField";
