import * as React from "react";
import { FormRoot } from "./FormRoot";
import { FormField } from "./FormField";
import { FormLabel } from "./FormLabel";
import { FormControl } from "./FormControl";
import { FormMessage } from "./FormMessage";
import { FormSubmit } from "./FormSubmit";

export const Form = Object.assign(
  {},
  {
    Root: FormRoot,
    Field: FormField,
    Label: FormLabel,
    Control: FormControl,
    Message: FormMessage,
    Submit: FormSubmit,
  }
);
