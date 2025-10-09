import { forwardRef, Children, isValidElement, cloneElement } from "react";
import { useFormContext } from "./FormRoot";
import type { FormFieldProps } from "./types";

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ name, children, className, style, ...rest }, ref) => {
    const { formState } = useFormContext("FormField");

    const fieldProps = formState.getFieldProps(name);
    const fieldLabelProps = formState.getFieldLabelProps(name);
    const fieldErrorProps = formState.getFieldErrorProps(name);
    const fieldDescriptionProps = formState.getFieldDescriptionProps(name);
    const fieldKeyboardProps = formState.getFieldKeyboardProps(name);
    const fieldPointerProps = formState.getFieldPointerProps(name);

    return (
      <div
        {...rest}
        ref={ref}
        className={className}
        style={style}
        data-field={name}
        data-invalid={
          formState.formData[name]?.state === "invalid" || undefined
        }
        data-touched={formState.formData[name]?.touched || undefined}
        data-dirty={formState.formData[name]?.dirty || undefined}
      >
        {Children.map(children, (child) => {
          if (isValidElement(child)) {
            // React 컴포넌트인지 확인 (DOM 요소가 아닌 경우)
            if (
              typeof child.type === "function" ||
              typeof child.type === "object"
            ) {
              return cloneElement(child as React.ReactElement<any>, {
                name,
                fieldProps,
                fieldLabelProps,
                fieldErrorProps,
                fieldDescriptionProps,
                fieldKeyboardProps,
                fieldPointerProps,
                formState,
              });
            }
          }
          return child;
        })}
      </div>
    );
  }
);

FormField.displayName = "FormField";
