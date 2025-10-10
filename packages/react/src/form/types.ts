import * as React from "react";
import type { UseFormOptions, UseFormReturn } from "@acme/react-a11y";

// a11y 패키지의 타입들을 import
type FormProps = ReturnType<UseFormReturn["getFormProps"]>;
type FieldProps = ReturnType<UseFormReturn["getFieldProps"]>;
type FieldLabelProps = ReturnType<UseFormReturn["getFieldLabelProps"]>;
type FieldErrorProps = ReturnType<UseFormReturn["getFieldErrorProps"]>;
type FieldDescriptionProps = ReturnType<
  UseFormReturn["getFieldDescriptionProps"]
>;
type FieldKeyboardProps = ReturnType<UseFormReturn["getFieldKeyboardProps"]>;
type FieldPointerProps = ReturnType<UseFormReturn["getFieldPointerProps"]>;

export interface FormRootProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  fields: string[];
  initialValues?: Record<string, string>;
  validators?: Record<string, (value: string) => string | null>;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  onSubmit?: (values: Record<string, string>) => void | Promise<void>;
  onReset?: () => void;
  onFormStateChange?: (formState: any) => void;
  onFieldChange?: (fieldName: string, value: string) => void;
  onFieldTouch?: (fieldName: string) => void;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  idPrefix?: string;
}

export interface FormFieldProps {
  name: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// Context를 사용하므로 props로 전달받을 필요가 없음
export interface FormLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export interface FormControlProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  asChild?: boolean;
  children?: React.ReactNode;
}

export interface FormMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  /** 터치된 상태일 때만 표시 */
  touched?: boolean;
  /** 더티 상태일 때만 표시 */
  dirty?: boolean;
  /** 유효하지 않은 상태일 때만 표시 */
  invalid?: boolean;
  /** 에러가 있을 때만 표시 */
  hasError?: boolean;
  /** 항상 표시 (기본값: true) */
  always?: boolean;
}

export interface FormSubmitProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  children: React.ReactNode;
}

// Context types - 타입 안전하게 정의
export interface FormFieldContextValue {
  name: string;
  fieldProps: FieldProps;
  fieldLabelProps: FieldLabelProps;
  fieldErrorProps: FieldErrorProps;
  fieldDescriptionProps: FieldDescriptionProps;
  fieldKeyboardProps: FieldKeyboardProps;
  fieldPointerProps: FieldPointerProps;
  formState: UseFormReturn;
}
