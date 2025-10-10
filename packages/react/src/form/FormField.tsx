import { forwardRef } from "react";
import { useFormContext } from "./FormRoot";
import type { FormFieldProps } from "./types";
import { addNameToChildren } from "../utils/cloneChildren";

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
