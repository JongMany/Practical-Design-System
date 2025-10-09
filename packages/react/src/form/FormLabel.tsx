import { forwardRef } from "react";
import { useFormContext } from "./FormRoot";
import type { FormLabelProps } from "./types";

export const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ children, className, style, ...rest }, ref) => {
    const { formState } = useFormContext("Form");

    // name은 FormField에서 전달받거나 props로 받을 수 있음
    const name = (rest as any).name;
    const fieldLabelProps = name ? formState.getFieldLabelProps(name) : {};

    return (
      <label
        {...rest}
        {...fieldLabelProps}
        ref={ref}
        className={className}
        style={style}
      >
        {children}
      </label>
    );
  }
);

FormLabel.displayName = "FormLabel";
