import * as React from "react";
import { Slot } from "../utils/Slot";
import type { FormSubmitProps } from "./types";

export const FormSubmit = React.forwardRef<HTMLButtonElement, FormSubmitProps>(
  ({ asChild, children, className, style, ...rest }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        {...rest}
        ref={ref}
        type="submit"
        className={className}
        style={style}
      >
        {children}
      </Comp>
    );
  }
);

FormSubmit.displayName = "FormSubmit";

