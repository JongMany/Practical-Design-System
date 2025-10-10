import { forwardRef, useEffect, useCallback } from "react";
import { Slot } from "../utils/Slot";
import { useFormContext } from "./FormRoot";
import type { FormControlProps } from "./types";
import {
  defaultControlStyles,
  numberInputStyles,
  applyStylesToElement,
  injectNumberSpinnerStyles,
} from "./styles";

export const FormControl = forwardRef<HTMLElement, FormControlProps>(
  ({ asChild, children, className, name, style, ...rest }, ref) => {
    const {
      updateField,
      touchField,
      getFieldProps,
      getFieldKeyboardProps,
      getFieldPointerProps,
      values,
      validateField,
      validateOnBlur,
      validators,
      ...restProps
    } = useFormContext("Form");

    // name은 FormField에서 전달받거나 props로 받을 수 있음
    const fieldProps = name ? getFieldProps(name) : {};
    const fieldKeyboardProps = name ? getFieldKeyboardProps(name) : {};
    const fieldPointerProps = name ? getFieldPointerProps(name) : {};
    const Comp = asChild ? Slot : "input";

    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        if (name) {
          updateField(name, event.target.value);
        }
        rest.onChange?.(event);
      },
      [updateField, name, rest.onChange]
    );

    const handleBlur = useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        if (name) {
          touchField(name);

          // validateOnBlur가 true이고 해당 필드에 validator가 있을 때만 유효성 검사 실행
          if (validateOnBlur && validators && validators[name]) {
            validateField(name);
          }
        }
        rest.onBlur?.(event);
      },
      [touchField, validateField, validateOnBlur, validators, name, rest.onBlur]
    );

    // number input에 대한 추가 스타일
    const currentNumberInputStyles =
      rest.type === "number" ? numberInputStyles : {};

    // asChild일 때 자식 요소에 직접 스타일 적용
    const handleApplyStyles = useCallback(
      (element: HTMLElement) => {
        if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
          // 기본 스타일 적용
          applyStylesToElement(element, defaultControlStyles);

          // number input의 경우 추가 스타일
          const inputType = (element as HTMLInputElement).type;
          if (inputType === "number") {
            applyStylesToElement(element, currentNumberInputStyles);
            // 동적으로 스타일 주입
            injectNumberSpinnerStyles();
          }

          // textarea의 경우 추가 스타일
          if (element.tagName === "TEXTAREA") {
            element.style.setProperty("resize", "none", "important");
          }
        }
      },
      [rest.type, currentNumberInputStyles]
    );

    // ref 처리 - asChild일 때는 함수형 ref이므로 다르게 처리
    const handleRef = useCallback(
      (node: HTMLElement | null) => {
        if (asChild && node) {
          handleApplyStyles(node);
        }

        // 원래 ref 처리
        if (typeof ref === "function") {
          ref(node);
        } else if (ref && typeof ref === "object" && "current" in ref) {
          const mutableRef = ref as React.MutableRefObject<HTMLElement | null>;
          mutableRef.current = node;
        }
      },
      [asChild, handleApplyStyles, ref]
    );

    // fieldKeyboardProps에서 onKeyDown을 제거하고 별도로 처리
    const { onKeyDown: _onKeyDown, ...restKeyboardProps } = fieldKeyboardProps;
    const {
      onClick: _onClick,
      onTouchEnd: _onTouchEnd,
      ...restPointerProps
    } = fieldPointerProps;

    const controlProps = {
      ...rest,
      ...fieldProps,
      ...restKeyboardProps,
      ...restPointerProps,
      ref: handleRef,
      className,
      style: { ...defaultControlStyles, ...currentNumberInputStyles, ...style },
      onChange: handleChange,
      onBlur: handleBlur,
      value: name ? values[name] || "" : "",
    };

    return <Comp {...controlProps}>{children}</Comp>;
  }
);

FormControl.displayName = "FormControl";
