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

export interface FormRootProps extends UseFormOptions {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
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
  asChild?: boolean;
  children?: React.ReactNode;
}

export interface FormMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  match?: string | (() => boolean);
  children: React.ReactNode;
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
