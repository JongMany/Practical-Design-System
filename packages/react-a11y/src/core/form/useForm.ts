/**
 * React Form Hook
 * React용 Form 훅
 */

import React from "react";
import {
  createFormA11y,
  type FormA11yOptions,
  type FormA11yState,
} from "@acme/a11y";

export interface UseFormOptions extends FormA11yOptions {
  /** Form 제출 콜백 */
  onSubmit?: (values: Record<string, string>) => void | Promise<void>;
  /** Form 리셋 콜백 */
  onReset?: () => void;
  /** Form 상태 변경 콜백 */
  onFormStateChange?: (formState: FormA11yState["formState"]) => void;
  /** 필드 값 변경 콜백 */
  onFieldChange?: (fieldName: string, value: string) => void;
  /** 필드 터치 콜백 */
  onFieldTouch?: (fieldName: string) => void;
}

// a11y 패키지의 타입을 그대로 사용

export interface UseFormReturn {
  /** Form 데이터 */
  formData: FormA11yState["formData"];
  /** Form 상태 */
  formState: FormA11yState["formState"];
  /** Form이 유효한지 */
  isValid: boolean;
  /** Form이 더티한지 */
  isDirty: boolean;
  /** Form이 터치된지 */
  isTouched: boolean;
  /** Form 값들 */
  values: Record<string, string>;
  /** Form 업데이트 함수 */
  updateField: (fieldName: string, value: string) => void;
  /** Form 필드 터치 함수 */
  touchField: (fieldName: string) => void;
  /** Form 유효성 검사 함수 */
  validateField: (fieldName: string) => void;
  /** 전체 Form 유효성 검사 함수 */
  validateForm: () => void;
  /** Form 리셋 함수 */
  resetForm: () => void;
  /** Form 제출 함수 */
  submitForm: () => void;
  /** Form에 적용할 props */
  getFormProps: FormA11yState["getFormProps"];
  /** 필드에 적용할 props */
  getFieldProps: FormA11yState["getFieldProps"];
  /** 필드 라벨에 적용할 props */
  getFieldLabelProps: FormA11yState["getFieldLabelProps"];
  /** 필드 에러에 적용할 props */
  getFieldErrorProps: FormA11yState["getFieldErrorProps"];
  /** 필드 설명에 적용할 props */
  getFieldDescriptionProps: FormA11yState["getFieldDescriptionProps"];
  /** 필드에 적용할 키보드 이벤트 props */
  getFieldKeyboardProps: FormA11yState["getFieldKeyboardProps"];
  /** 필드에 적용할 포인터 이벤트 props */
  getFieldPointerProps: FormA11yState["getFieldPointerProps"];
}

/**
 * React용 Form 훅
 */
export function useForm(options: UseFormOptions): UseFormReturn {
  const {
    onSubmit,
    onReset,
    onFormStateChange,
    onFieldChange,
    onFieldTouch,
    ...a11yOptions
  } = options;

  // a11y form 상태 생성
  const formState = React.useMemo(() => {
    return createFormA11y(a11yOptions);
  }, [a11yOptions]);

  // Form 상태 변경 감지
  React.useEffect(() => {
    onFormStateChange?.(formState.formState);
  }, [formState.formState, onFormStateChange]);

  // 필드 업데이트 함수 래핑
  const updateField = React.useCallback(
    (fieldName: string, value: string) => {
      formState.updateField(fieldName, value);
      onFieldChange?.(fieldName, value);
    },
    [formState, onFieldChange]
  );

  // 필드 터치 함수 래핑
  const touchField = React.useCallback(
    (fieldName: string) => {
      formState.touchField(fieldName);
      onFieldTouch?.(fieldName);
    },
    [formState, onFieldTouch]
  );

  // Form 리셋 함수 래핑
  const resetForm = React.useCallback(() => {
    formState.resetForm();
    onReset?.();
  }, [formState, onReset]);

  // Form 제출 함수 래핑
  const submitForm = React.useCallback(() => {
    if (onSubmit) {
      formState.submitForm(onSubmit);
    }
  }, [formState, onSubmit]);

  // 키보드 이벤트 핸들러 래핑
  const getFieldKeyboardProps = React.useCallback(
    (fieldName: string) => {
      const originalProps = formState.getFieldKeyboardProps(fieldName);

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
              const nextElement = focusableElements[currentIndex + 1];
              if (
                nextElement &&
                "focus" in nextElement &&
                typeof nextElement.focus === "function"
              ) {
                nextElement.focus();
              }
            }
          }
        }
        const originalOnKeyDown = originalProps.onKeyDown;
        if (typeof originalOnKeyDown === "function") {
          originalOnKeyDown(event);
        }
      };

      return {
        onKeyDown: domOnKeyDown,
      };
    },
    [formState]
  );

  // 포인터 이벤트 핸들러 래핑
  const getFieldPointerProps = React.useCallback(
    (fieldName: string) => {
      const originalProps = formState.getFieldPointerProps(fieldName);

      // DOM 이벤트 핸들러 생성
      const domOnClick = (event: MouseEvent) => {
        touchField(fieldName);
        const originalOnClick = originalProps.onClick;
        if (typeof originalOnClick === "function") {
          originalOnClick(event);
        }
      };

      const domOnTouchEnd = (event: TouchEvent) => {
        touchField(fieldName);
        const originalOnTouchEnd = originalProps.onTouchEnd;
        if (typeof originalOnTouchEnd === "function") {
          originalOnTouchEnd(event);
        }
      };

      return {
        onClick: domOnClick,
        onTouchEnd: domOnTouchEnd,
      };
    },
    [formState, touchField]
  );

  return {
    formData: formState.formData,
    formState: formState.formState,
    isValid: formState.isValid,
    isDirty: formState.isDirty,
    isTouched: formState.isTouched,
    values: formState.values,
    updateField,
    touchField,
    validateField: formState.validateField,
    validateForm: formState.validateForm,
    resetForm,
    submitForm,
    getFormProps: formState.getFormProps,
    getFieldProps: formState.getFieldProps,
    getFieldLabelProps: formState.getFieldLabelProps,
    getFieldErrorProps: formState.getFieldErrorProps,
    getFieldDescriptionProps: formState.getFieldDescriptionProps,
    getFieldKeyboardProps,
    getFieldPointerProps,
  };
}
