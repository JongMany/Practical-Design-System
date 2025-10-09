import * as React from "react";
import type { UseFormOptions } from "@acme/react-a11y";

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

// Context types
export interface FormFieldContextValue {
  name: string;
  fieldProps: Record<string, any>;
  fieldLabelProps: Record<string, any>;
  fieldErrorProps: Record<string, any>;
  fieldDescriptionProps: Record<string, any>;
  fieldKeyboardProps: Record<string, any>;
  fieldPointerProps: Record<string, any>;
  formState: ReturnType<typeof import("@acme/react-a11y").useForm>;
}

