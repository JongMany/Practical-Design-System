import * as React from "react";
import { FormRoot } from "./FormRoot";
import { FormField } from "./FormField";
import { FormLabel } from "./FormLabel";
import { FormControl } from "./FormControl";
import { FormMessage } from "./FormMessage";
import { FormSubmit } from "./FormSubmit";

export const Form = {
  Root: FormRoot,
  Field: FormField,
  Label: FormLabel,
  Control: FormControl,
  Message: FormMessage,
  Submit: FormSubmit,
};

export type {
  FormRootProps,
  FormFieldProps,
  FormLabelProps,
  FormControlProps,
  FormMessageProps,
  FormSubmitProps,
} from "./types";

