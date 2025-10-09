/**
 * React Form Field Hook
 * React용 Form Field 훅
 */

import React from "react";
import {
  createFormFieldA11y,
  type FormFieldA11yOptions,
  type FormFieldA11yState,
} from "@acme/a11y";

export interface UseFormFieldOptions extends FormFieldA11yOptions {
  /** 필드 값 변경 콜백 */
  onValueChange?: (value: string) => void;
  /** 필드 터치 콜백 */
  onTouch?: () => void;
  /** 필드 유효성 검사 콜백 */
  onValidate?: (isValid: boolean, error?: string) => void;
  /** 필드 리셋 콜백 */
  onReset?: () => void;
  /** 현재 필드 값 */
  value: string;
  /** 현재 필드 상태 */
  state?: FormFieldA11yState["state"];
  /** 현재 필드 에러 */
  error?: string;
  /** 현재 필드가 터치되었는지 */
  touched?: boolean;
  /** 현재 필드가 더티한지 */
  dirty?: boolean;
}

export interface UseFormFieldReturn {
  /** 필드 값 */
  value: string;
  /** 필드 상태 */
  state: FormFieldA11yState["state"];
  /** 필드 에러 */
  error?: string;
  /** 필드가 터치되었는지 */
  touched: boolean;
  /** 필드가 더티한지 */
  dirty: boolean;
  /** 필드 업데이트 함수 */
  updateValue: (value: string) => void;
  /** 필드 터치 함수 */
  touch: () => void;
  /** 필드 유효성 검사 함수 */
  validate: () => void;
  /** 필드 리셋 함수 */
  reset: () => void;
  /** 필드에 적용할 props */
  getFieldProps: () => Record<string, any>;
  /** 필드 라벨에 적용할 props */
  getLabelProps: () => Record<string, any>;
  /** 필드 에러에 적용할 props */
  getErrorProps: () => Record<string, any>;
  /** 필드 설명에 적용할 props */
  getDescriptionProps: () => Record<string, any>;
  /** 필드에 적용할 키보드 이벤트 props */
  getKeyboardProps: () => Record<string, any>;
  /** 필드에 적용할 포인터 이벤트 props */
  getPointerProps: () => Record<string, any>;
}

/**
 * React용 Form Field 훅
 */
export function useFormField(options: UseFormFieldOptions): UseFormFieldReturn {
  const {
    onValueChange,
    onTouch,
    onValidate,
    onReset,
    value,
    state,
    error,
    touched,
    dirty,
    ...a11yOptions
  } = options;

  // a11y form field 상태 생성
  const fieldState = React.useMemo(() => {
    return createFormFieldA11y(value, a11yOptions);
  }, [value, a11yOptions]);

  // 필드 상태 동기화
  React.useEffect(() => {
    if (state !== undefined) {
      fieldState.state = state;
    }
    if (error !== undefined) {
      fieldState.error = error;
    }
    if (touched !== undefined) {
      fieldState.touched = touched;
    }
    if (dirty !== undefined) {
      fieldState.dirty = dirty;
    }
  }, [fieldState, state, error, touched, dirty]);

  // 필드 값 변경 감지
  React.useEffect(() => {
    if (fieldState.value !== value) {
      fieldState.updateValue(value);
    }
  }, [fieldState, value]);

  // 필드 상태 변경 감지
  React.useEffect(() => {
    onValidate?.(fieldState.state === "valid", fieldState.error);
  }, [fieldState.state, fieldState.error, onValidate]);

  // 필드 업데이트 함수 래핑
  const updateValue = React.useCallback(
    (newValue: string) => {
      fieldState.updateValue(newValue);
      onValueChange?.(newValue);
    },
    [fieldState, onValueChange]
  );

  // 필드 터치 함수 래핑
  const touch = React.useCallback(() => {
    fieldState.touch();
    onTouch?.();
  }, [fieldState, onTouch]);

  // 필드 리셋 함수 래핑
  const reset = React.useCallback(() => {
    fieldState.reset();
    onReset?.();
  }, [fieldState, onReset]);

  // 키보드 이벤트 핸들러 래핑
  const getKeyboardProps = React.useCallback(() => {
    const originalProps = fieldState.getKeyboardProps();

    // DOM 이벤트 핸들러 생성
    const domOnKeyDown = (event: KeyboardEvent) => {
      // Enter 키로 다음 필드로 이동
      if (event.key === "Enter") {
        const form = (event.target as Element)?.closest("form");
        if (form) {
          const focusableElements = form.querySelectorAll(
            'input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          );
          const currentIndex = Array.from(focusableElements).indexOf(
            event.target as Element
          );
          if (currentIndex < focusableElements.length - 1) {
            const nextElement = focusableElements[
              currentIndex + 1
            ] as HTMLElement;
            nextElement.focus();
          }
        }
      }
      originalProps.onKeyDown?.(event);
    };

    return {
      onKeyDown: domOnKeyDown,
    };
  }, [fieldState]);

  // 포인터 이벤트 핸들러 래핑
  const getPointerProps = React.useCallback(() => {
    const originalProps = fieldState.getPointerProps();

    // DOM 이벤트 핸들러 생성
    const domOnClick = (event: MouseEvent) => {
      touch();
      originalProps.onClick?.(event);
    };

    const domOnTouchEnd = (event: TouchEvent) => {
      touch();
      originalProps.onTouchEnd?.(event);
    };

    return {
      onClick: domOnClick,
      onTouchEnd: domOnTouchEnd,
    };
  }, [fieldState, touch]);

  return {
    value: fieldState.value,
    state: fieldState.state,
    error: fieldState.error,
    touched: fieldState.touched,
    dirty: fieldState.dirty,
    updateValue,
    touch,
    validate: fieldState.validate,
    reset,
    getFieldProps: fieldState.getFieldProps,
    getLabelProps: fieldState.getLabelProps,
    getErrorProps: fieldState.getErrorProps,
    getDescriptionProps: fieldState.getDescriptionProps,
    getKeyboardProps,
    getPointerProps,
  };
}
