import * as React from "react";
import { useForm, type UseFormReturn } from "@acme/react-a11y";
import { createContext } from "../context/createContext";
import type { FormRootProps } from "./types";

interface FormContextValue extends UseFormReturn {}

const [FormProvider, useFormContext] = createContext<FormContextValue>("Form");

export { useFormContext };

export const FormRoot = React.forwardRef<HTMLFormElement, FormRootProps>(
  (
    {
      fields,
      initialValues,
      validators,
      validateOnChange = false,
      validateOnBlur = true,
      onSubmit,
      onReset,
      onFormStateChange,
      onFieldChange,
      onFieldTouch,
      children,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const formState = useForm({
      fields,
      initialValues,
      validators,
      validateOnChange,
      validateOnBlur,
      onSubmit,
      onReset,
      onFormStateChange,
      onFieldChange,
      onFieldTouch,
      "aria-label": rest["aria-label"],
      "aria-labelledby": rest["aria-labelledby"],
      "aria-describedby": rest["aria-describedby"],
      idPrefix: rest.idPrefix,
    });

    const handleSubmit = React.useCallback(
      (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        formState.submitForm();
      },
      [formState]
    );

    const formProps = formState.getFormProps();

    return (
      <FormProvider {...formState}>
        <form
          {...rest}
          {...formProps}
          ref={ref}
          onSubmit={handleSubmit}
          className={className}
          style={style}
        >
          {children}
        </form>
      </FormProvider>
    );
  }
);

FormRoot.displayName = "FormRoot";
