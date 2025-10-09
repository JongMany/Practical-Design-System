import * as React from "react";
import type { FormLabelProps } from "./types";

export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ children, className, style, ...rest }, ref) => {
    // Context에서 fieldLabelProps를 가져와서 적용
    const fieldLabelProps = (rest as any).fieldLabelProps || {};

    // DOM에 전달하면 안 되는 props들을 제거
    const {
      fieldProps: _fieldProps,
      fieldKeyboardProps: _fieldKeyboardProps,
      fieldPointerProps: _fieldPointerProps,
      fieldLabelProps: _fieldLabelProps,
      fieldErrorProps: _fieldErrorProps,
      fieldDescriptionProps: _fieldDescriptionProps,
      formState: _formState,
      name: _name,
      ...domProps
    } = rest as any;

    return (
      <label
        {...domProps}
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
