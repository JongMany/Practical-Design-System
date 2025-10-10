import { useForm, type UseFormReturn } from "@acme/react-a11y";
import { createContext } from "../context/createContext";
import type { FormRootProps, BaseFormRootProps } from "./types";
import type { FormFieldValue } from "@acme/core";
import { useCallback } from "react";

interface FormContextValue extends UseFormReturn {}

const [FormProvider, useFormContext] = createContext<FormContextValue>("Form");

export { useFormContext };

export const FormRoot = <T extends Record<string, any>>(
  props: FormRootProps<T> & { ref?: React.Ref<HTMLFormElement> }
) => {
  const { ref, ...restProps } = props;
  const {
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
  } = restProps;
  const formState = useForm<T>({
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

  const handleSubmit = useCallback(
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
};

FormRoot.displayName = "FormRoot";
