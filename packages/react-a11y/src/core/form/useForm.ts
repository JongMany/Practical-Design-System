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
import { updateFormField, validateFormField } from "@acme/core";

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
  /** Form 필드 에러 설정 함수 */
  setFieldError: (fieldName: string, error: string | null) => void;
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
  /** Blur 시 유효성 검사 여부 */
  validateOnBlur: boolean;
  /** Change 시 유효성 검사 여부 */
  validateOnChange: boolean;
  /** 필드별 유효성 검사 함수들 */
  validators?: Record<string, (value: string) => string | null>;
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
    validateOnChange,
    validateOnBlur,
    validators: fieldValidators,
    ...a11yOptions
  } = options;

  // React 상태로 formData 관리
  const [formData, setFormData] = React.useState(() => {
    const a11yFormState = createFormA11y(a11yOptions);
    return a11yFormState.formData;
  });

  // a11y form 상태 생성 (formData 변경 시 재생성)
  const formState = React.useMemo(() => {
    const a11yFormState = createFormA11y(a11yOptions);
    // formData를 React 상태로 동기화
    a11yFormState.formData = formData;
    return a11yFormState;
  }, [a11yOptions, formData]);

  // Form 상태 변경 감지
  React.useEffect(() => {
    onFormStateChange?.(formState.formState);
  }, [formState.formState, onFormStateChange]);

  // 필드 업데이트 함수 래핑
  const updateField = React.useCallback(
    (fieldName: string, value: string) => {
      // React 상태만 업데이트 (성능 최적화)
      setFormData((prevFormData) => {
        const newFormData = updateFormField(prevFormData, fieldName, value);

        // validateOnChange가 true일 때만 실시간 유효성 검사
        // validateOnBlur만 true인 경우에는 입력 중에는 검사하지 않음
        if (
          validateOnChange &&
          !validateOnBlur &&
          fieldValidators?.[fieldName]
        ) {
          return validateFormField(
            newFormData,
            fieldName,
            fieldValidators[fieldName]
          );
        }

        return newFormData;
      });

      onFieldChange?.(fieldName, value);
    },
    [onFieldChange, validateOnChange, validateOnBlur, fieldValidators]
  );

  // 필드 터치 함수 래핑
  const touchField = React.useCallback(
    (fieldName: string) => {
      // React 상태만 업데이트 (성능 최적화)
      setFormData((prevFormData) => {
        let newFormData = prevFormData;

        // validateOnBlur가 true일 때 blur 시 유효성 검사
        // validateOnChange가 true인 경우에는 이미 입력 중에 검사했으므로 blur 시에는 검사하지 않음
        if (
          validateOnBlur &&
          !validateOnChange &&
          fieldValidators?.[fieldName]
        ) {
          newFormData = validateFormField(
            newFormData,
            fieldName,
            fieldValidators[fieldName]
          );
        }

        return newFormData;
      });

      onFieldTouch?.(fieldName);
    },
    [onFieldTouch, validateOnBlur, validateOnChange, fieldValidators]
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

  // formData에서 values 추출
  const values = React.useMemo(() => {
    const result: Record<string, string> = {};
    Object.keys(formData).forEach((key) => {
      result[key] = formData[key]?.value || "";
    });
    return result;
  }, [formData]);

  return {
    formData: formState.formData,
    formState: formState.formState,
    isValid: formState.isValid,
    isDirty: formState.isDirty,
    isTouched: formState.isTouched,
    values,
    updateField,
    touchField,
    setFieldError: formState.setFieldError,
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
    validateOnBlur: validateOnBlur ?? false,
    validateOnChange: validateOnChange ?? false,
    validators: fieldValidators,
  };
}
