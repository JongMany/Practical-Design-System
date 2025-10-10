import { forwardRef, useCallback } from "react";
import { Slot } from "../utils/Slot";
import { useFormContext } from "./FormRoot";
import type { FormControlProps } from "./types";
import {
  defaultControlStyles,
  numberInputStyles,
  applyStylesToElement,
  injectNumberSpinnerStyles,
} from "./styles";

// 스타일 적용 로직을 분리한 훅
function useControlStyles(inputType?: string) {
  const numberStyles = inputType === "number" ? numberInputStyles : {};

  const applyStyles = useCallback(
    (element: HTMLElement) => {
      if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
        // 기본 스타일 적용
        applyStylesToElement(element, defaultControlStyles);

        // number input의 경우 추가 스타일
        const elementType = (element as HTMLInputElement).type;
        if (elementType === "number") {
          applyStylesToElement(element, numberStyles);
          injectNumberSpinnerStyles();
        }

        // textarea의 경우 추가 스타일
        if (element.tagName === "TEXTAREA") {
          element.style.setProperty("resize", "none", "important");
        }
      }
    },
    [numberStyles]
  );

  return { numberStyles, applyStyles };
}

// ref 처리 로직을 분리한 훅
function useControlRef(
  asChild: boolean,
  applyStyles: (element: HTMLElement) => void,
  ref: React.Ref<HTMLElement>
) {
  return useCallback(
    (node: HTMLElement | null) => {
      if (asChild && node) {
        applyStyles(node);
      }

      // 원래 ref 처리
      if (typeof ref === "function") {
        ref(node);
      } else if (ref && typeof ref === "object" && "current" in ref) {
        const mutableRef = ref as React.MutableRefObject<HTMLElement | null>;
        mutableRef.current = node;
      }
    },
    [asChild, applyStyles, ref]
  );
}

// 이벤트 핸들러 로직을 분리한 훅
function useControlHandlers(
  name: string | undefined,
  updateField: (fieldName: string, value: string) => void,
  touchField: (fieldName: string) => void,
  validateField: (fieldName: string) => void,
  validateOnBlur: boolean,
  validators: Record<string, (value: string) => string | null> | undefined,
  originalOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  originalOnBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
) {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (name) {
        updateField(name, event.target.value);
      }
      originalOnChange?.(event);
    },
    [updateField, name, originalOnChange]
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
      originalOnBlur?.(event);
    },
    [
      touchField,
      validateField,
      validateOnBlur,
      validators,
      name,
      originalOnBlur,
    ]
  );

  return { handleChange, handleBlur };
}

// 필드 props를 정리하는 유틸리티 함수
function prepareFieldProps(fieldKeyboardProps: any, fieldPointerProps: any) {
  const { onKeyDown: _onKeyDown, ...restKeyboardProps } = fieldKeyboardProps;
  const {
    onClick: _onClick,
    onTouchEnd: _onTouchEnd,
    ...restPointerProps
  } = fieldPointerProps;

  return { restKeyboardProps, restPointerProps };
}

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
    } = useFormContext("Form");

    // 필드 관련 props 가져오기
    const fieldProps = name ? getFieldProps(name) : {};
    const fieldKeyboardProps = name ? getFieldKeyboardProps(name) : {};
    const fieldPointerProps = name ? getFieldPointerProps(name) : {};

    // 스타일 관련 로직
    const { numberStyles, applyStyles } = useControlStyles(rest.type);

    // ref 처리
    const handleRef = useControlRef(!!asChild, applyStyles, ref);

    // 이벤트 핸들러
    const { handleChange, handleBlur } = useControlHandlers(
      name,
      updateField,
      touchField,
      validateField,
      validateOnBlur,
      validators,
      rest.onChange,
      rest.onBlur
    );

    // 필드 props 정리
    const { restKeyboardProps, restPointerProps } = prepareFieldProps(
      fieldKeyboardProps,
      fieldPointerProps
    );

    // 컴포넌트 결정
    const Comp = asChild ? Slot : "input";

    // 최종 props 구성
    const controlProps = {
      ...rest,
      ...fieldProps,
      ...restKeyboardProps,
      ...restPointerProps,
      ref: handleRef,
      className,
      style: { ...defaultControlStyles, ...numberStyles, ...style },
      onChange: handleChange,
      onBlur: handleBlur,
      value: name ? values[name] || "" : "",
    };

    return <Comp {...controlProps}>{children}</Comp>;
  }
);

FormControl.displayName = "FormControl";
