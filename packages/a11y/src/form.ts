/**
 * Form A11y functionality
 * Extends core form with accessibility features
 */

import {
  createFormData,
  createFormField,
  updateFormField,
  updateFormFieldState,
  setFormFieldError,
  validateFormField,
  validateForm as validateFormCore,
  isFormValid,
  isFormDirty,
  isFormTouched,
  extractFormValues,
  getFormFieldError,
  hasFormFieldError,
  getFormFieldState,
  getFormFieldValue,
  resetForm as resetFormCore,
  resetFormField,
  type FormFieldData,
  type FormFieldValue,
  type FormFieldState,
  type FormState,
  validators,
} from "@acme/core";
import { createAriaIds } from "./createAriaIds";
import { createKeyboardPressA11yHandlers } from "./keyboardPress";
import { createPointerActivationA11yHandlers } from "./pointerActivation";

export interface FormA11yOptions {
  /** Form의 레이블 */
  "aria-label"?: string;
  /** Form의 레이블 ID */
  "aria-labelledby"?: string;
  /** Form의 설명 ID */
  "aria-describedby"?: string;
  /** ID 접두사 */
  idPrefix?: string;
  /** 필드명 목록 */
  fields: string[];
  /** 필드별 초기값 */
  initialValues?: Record<string, string>;
  /** 필드별 유효성 검사기 */
  validators?: Record<string, (value: string) => string | null>;
  /** 실시간 유효성 검사 여부 */
  validateOnChange?: boolean;
  /** 포커스 시 유효성 검사 여부 */
  validateOnBlur?: boolean;
  /** 키보드 활성화 옵션 */
  keyboardPress?: {
    preventKeyRepeat?: boolean;
    keyRepeatDelay?: number;
    keyCombinations?: string[][];
  };
  /** 포인터 활성화 옵션 */
  pointerActivation?: {
    longPress?: boolean;
    longPressDelay?: number;
    preventDoubleActivation?: boolean;
    doubleActivationDelay?: number;
    touchAction?: "auto" | "none" | "pan-x" | "pan-y" | "manipulation";
  };
}

// 타입 안전한 props 인터페이스들 - useForm과 일치
interface FormProps {
  onSubmit?: (event: Event) => void;
  noValidate?: boolean;
  [key: string]: unknown;
}

interface FieldProps {
  id?: string;
  name?: string;
  "aria-invalid"?: boolean;
  "aria-required"?: boolean;
  "aria-describedby"?: string;
  [key: string]: unknown;
}

interface FieldLabelProps {
  htmlFor?: string;
  id?: string;
  [key: string]: unknown;
}

interface FieldErrorProps {
  id?: string;
  role?: "alert";
  "aria-live"?: "polite";
  [key: string]: unknown;
}

interface FieldDescriptionProps {
  id?: string;
  [key: string]: unknown;
}

interface FieldKeyboardProps {
  onKeyDown?: (event: KeyboardEvent) => void;
  [key: string]: unknown;
}

interface FieldPointerProps {
  onClick?: (event: MouseEvent) => void;
  onTouchEnd?: (event: TouchEvent) => void;
  [key: string]: unknown;
}

export interface FormA11yState {
  /** Form 데이터 */
  formData: FormFieldData;
  /** Form 상태 */
  formState: FormState;
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
  submitForm: (
    onSubmit: (values: Record<string, string>) => void | Promise<void>
  ) => void;
  /** Form에 적용할 ARIA 속성 */
  getFormProps: () => FormProps;
  /** 필드에 적용할 ARIA 속성 */
  getFieldProps: (fieldName: string) => FieldProps;
  /** 필드 라벨에 적용할 ARIA 속성 */
  getFieldLabelProps: (fieldName: string) => FieldLabelProps;
  /** 필드 에러에 적용할 ARIA 속성 */
  getFieldErrorProps: (fieldName: string) => FieldErrorProps;
  /** 필드 설명에 적용할 ARIA 속성 */
  getFieldDescriptionProps: (fieldName: string) => FieldDescriptionProps;
  /** 필드에 적용할 키보드 이벤트 핸들러 */
  getFieldKeyboardProps: (fieldName: string) => FieldKeyboardProps;
  /** 필드에 적용할 포인터 이벤트 핸들러 */
  getFieldPointerProps: (fieldName: string) => FieldPointerProps;
}

/**
 * Form의 접근성 기능을 통합하는 함수
 */
export function createFormA11y(options: FormA11yOptions): FormA11yState {
  const {
    fields,
    initialValues = {},
    validators: fieldValidators = {},
    validateOnChange = true,
    validateOnBlur = true,
    keyboardPress = {},
    pointerActivation = {},
    idPrefix = "form",
    ...ariaOptions
  } = options;

  // Form 데이터 초기화
  let formData = createFormData(fields);

  // 초기값 설정
  for (const [fieldName, value] of Object.entries(initialValues)) {
    if (fields.includes(fieldName)) {
      formData = updateFormField(formData, fieldName, value);
    }
  }

  let formState: FormState = "idle";

  // ID 생성
  const { label: formLabelId, desc: formDescId } = createAriaIds(idPrefix);
  const fieldIds: Record<
    string,
    { input: string; label: string; error: string; desc: string }
  > = {};

  // 각 필드별 ID 생성
  for (const fieldName of fields) {
    const { label, desc } = createAriaIds(`${idPrefix}-${fieldName}`);
    fieldIds[fieldName] = {
      input: `${idPrefix}-${fieldName}-input`,
      label,
      error: `${idPrefix}-${fieldName}-error`,
      desc,
    };
  }

  // 상태 업데이트 함수
  const setFormFieldData = (newFormFieldData: FormFieldData) => {
    formData = newFormFieldData;
  };

  const setFormState = (newFormState: FormState) => {
    formState = newFormState;
  };

  // 필드 업데이트 함수
  const updateField = (fieldName: string, value: string) => {
    if (!fields.includes(fieldName)) return;

    let newFormFieldData = updateFormField(formData, fieldName, value);

    // 실시간 유효성 검사
    if (validateOnChange && fieldValidators[fieldName]) {
      newFormFieldData = validateFormField(
        newFormFieldData,
        fieldName,
        fieldValidators[fieldName]
      );
    }

    setFormFieldData(newFormFieldData);
  };

  // 필드 터치 함수
  const touchField = (fieldName: string) => {
    if (!fields.includes(fieldName)) return;

    let newFormFieldData = formData;

    // 포커스 시 유효성 검사
    if (validateOnBlur && fieldValidators[fieldName]) {
      newFormFieldData = validateFormField(
        newFormFieldData,
        fieldName,
        fieldValidators[fieldName]
      );
    }

    setFormFieldData(newFormFieldData);
  };

  // 필드 에러 설정 함수
  const setFieldError = (fieldName: string, error: string | null) => {
    if (!fields.includes(fieldName)) return;

    const newFormFieldData = setFormFieldError(formData, fieldName, error);
    setFormFieldData(newFormFieldData);
  };

  // 필드 유효성 검사 함수
  const validateField = (fieldName: string) => {
    if (!fields.includes(fieldName) || !fieldValidators[fieldName]) return;

    const newFormFieldData = validateFormField(
      formData,
      fieldName,
      fieldValidators[fieldName]
    );
    setFormFieldData(newFormFieldData);
  };

  // 전체 Form 유효성 검사 함수
  const validateForm = () => {
    const newFormFieldData = validateFormCore(formData, fieldValidators);
    setFormFieldData(newFormFieldData);
  };

  // Form 리셋 함수
  const resetForm = () => {
    let newFormFieldData = createFormData(fields);

    // 초기값 복원
    for (const [fieldName, value] of Object.entries(initialValues)) {
      if (fields.includes(fieldName)) {
        newFormFieldData = updateFormField(newFormFieldData, fieldName, value);
      }
    }

    setFormFieldData(newFormFieldData);
    setFormState("idle");
  };

  // Form 제출 함수
  const submitForm = async (
    onSubmit: (values: Record<string, string>) => void | Promise<void>
  ) => {
    // 전체 유효성 검사
    validateForm();

    if (!isFormValid(formData)) {
      setFormState("error");
      return;
    }

    setFormState("submitting");

    try {
      const values = extractFormValues(formData);

      await onSubmit(values);
      setFormState("success");
    } catch (error) {
      setFormState("error");
      throw error;
    }
  };

  // Form ARIA 속성 생성
  const getFormProps = (): FormProps => ({
    onSubmit: (event: Event) => {
      event.preventDefault();
      // Form 제출 로직은 submitForm에서 처리
    },
    noValidate: true,
    role: "form",
    "aria-label": ariaOptions["aria-label"],
    "aria-labelledby": ariaOptions["aria-labelledby"] || formLabelId,
    "aria-describedby": ariaOptions["aria-describedby"] || formDescId,
    "aria-invalid": !isFormValid(formData) || undefined,
  });

  // 필드 ARIA 속성 생성
  const getFieldProps = (fieldName: string): FieldProps => {
    if (!fields.includes(fieldName)) {
      return {
        id: "",
        name: "",
        "aria-invalid": false,
        "aria-required": false,
        "aria-describedby": "",
      };
    }

    const field = formData[fieldName];
    const fieldId = fieldIds[fieldName];
    if (!fieldId) {
      return {
        id: "",
        name: "",
        "aria-invalid": false,
        "aria-required": false,
        "aria-describedby": "",
      };
    }

    const hasError = hasFormFieldError(formData, fieldName);
    const errorId = hasError ? fieldId.error : undefined;

    return {
      id: fieldId.input,
      name: fieldName,
      "aria-invalid": hasError || false,
      "aria-describedby":
        [errorId, fieldId.desc].filter(Boolean).join(" ") || "",
      "aria-required":
        fieldValidators[fieldName] === validators.required || false,
    };
  };

  // 필드 라벨 ARIA 속성 생성
  const getFieldLabelProps = (fieldName: string): FieldLabelProps => {
    if (!fields.includes(fieldName)) {
      return {
        htmlFor: "",
        id: "",
      };
    }

    const fieldId = fieldIds[fieldName];
    if (!fieldId) {
      return {
        htmlFor: "",
        id: "",
      };
    }

    return {
      id: fieldId.label,
      htmlFor: fieldId.input,
    };
  };

  // 필드 에러 ARIA 속성 생성
  const getFieldErrorProps = (fieldName: string): FieldErrorProps => {
    if (!fields.includes(fieldName)) {
      return {
        id: "",
        role: "alert",
        "aria-live": "polite",
      };
    }

    const fieldId = fieldIds[fieldName];
    if (!fieldId) {
      return {
        id: "",
        role: "alert",
        "aria-live": "polite",
      };
    }

    const hasError = hasFormFieldError(formData, fieldName);

    return {
      id: fieldId.error,
      role: "alert",
      "aria-live": "polite",
      style: hasError ? {} : { display: "none" },
    };
  };

  // 필드 설명 ARIA 속성 생성
  const getFieldDescriptionProps = (
    fieldName: string
  ): FieldDescriptionProps => {
    if (!fields.includes(fieldName)) {
      return {
        id: "",
      };
    }

    const fieldId = fieldIds[fieldName];
    if (!fieldId) {
      return {
        id: "",
      };
    }

    return {
      id: fieldId.desc,
    };
  };

  // 필드 키보드 이벤트 핸들러 생성
  const getFieldKeyboardProps = (fieldName: string): FieldKeyboardProps => {
    if (!fields.includes(fieldName)) {
      return {
        onKeyDown: () => {},
      };
    }

    const field = formData[fieldName];
    const fieldId = fieldIds[fieldName];
    if (!fieldId) {
      return {
        onKeyDown: () => {},
      };
    }

    const keyboardHandlers = createKeyboardPressA11yHandlers({
      disabled: false, // Form 필드는 일반적으로 비활성화되지 않음
      onKeyDown: (event) => {
        // Enter 키로 다음 필드로 이동
        if (event.key === "Enter" && event.target instanceof HTMLElement) {
          const currentIndex = fields.indexOf(fieldName);
          if (currentIndex >= 0 && currentIndex < fields.length - 1) {
            const nextFieldName = fields[currentIndex + 1];
            const nextFieldId = nextFieldName
              ? fieldIds[nextFieldName]?.input
              : undefined;
            if (nextFieldId) {
              const nextField = document.getElementById(nextFieldId);
              if (nextField) {
                nextField.focus();
              }
            }
          }
        }
      },
      preventKeyRepeat: keyboardPress.preventKeyRepeat ?? true,
      keyRepeatDelay: keyboardPress.keyRepeatDelay ?? 100,
      keyCombinations: keyboardPress.keyCombinations,
    });

    return {
      onKeyDown: keyboardHandlers.onKeyDown || (() => {}),
    };
  };

  // 필드 포인터 이벤트 핸들러 생성
  const getFieldPointerProps = (fieldName: string): FieldPointerProps => {
    if (!fields.includes(fieldName)) {
      return {
        onClick: () => {},
        onTouchEnd: () => {},
      };
    }

    const pointerHandlers = createPointerActivationA11yHandlers({
      disabled: false,
      onClick: (event) => {
        // 클릭 시 필드 터치
        touchField(fieldName);
      },
      onTouchEnd: (event) => {
        // 터치 종료 시 필드 터치
        touchField(fieldName);
      },
      longPress: pointerActivation.longPress ?? false,
      longPressDelay: pointerActivation.longPressDelay ?? 500,
      preventDoubleActivation:
        pointerActivation.preventDoubleActivation ?? true,
      doubleActivationDelay: pointerActivation.doubleActivationDelay ?? 300,
      touchAction: pointerActivation.touchAction ?? "manipulation",
    });

    return {
      onClick: pointerHandlers.onClick || (() => {}),
      onTouchEnd: pointerHandlers.onTouchEnd || (() => {}),
    };
  };

  return {
    formData,
    formState,
    isValid: isFormValid(formData),
    isDirty: isFormDirty(formData),
    isTouched: isFormTouched(formData),
    values: extractFormValues(formData),
    updateField,
    touchField,
    setFieldError,
    validateField,
    validateForm,
    resetForm,
    submitForm,
    getFormProps,
    getFieldProps,
    getFieldLabelProps,
    getFieldErrorProps,
    getFieldDescriptionProps,
    getFieldKeyboardProps,
    getFieldPointerProps,
  };
}

/**
 * 개별 Form 필드의 접근성 기능을 제공하는 함수
 */
export interface FormFieldA11yOptions {
  /** 필드명 */
  fieldName: string;
  /** 필드 타입 */
  fieldType?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "tel"
    | "url"
    | "search";
  /** 필드 레이블 */
  "aria-label"?: string;
  /** 필드 레이블 ID */
  "aria-labelledby"?: string;
  /** 필드 설명 ID */
  "aria-describedby"?: string;
  /** ID 접두사 */
  idPrefix?: string;
  /** 필수 필드 여부 */
  required?: boolean;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 읽기 전용 여부 */
  readOnly?: boolean;
  /** 자동완성 */
  autoComplete?: string;
  /** 자동포커스 */
  autoFocus?: boolean;
  /** 플레이스홀더 */
  placeholder?: string;
  /** 최소값 (number 타입) */
  min?: number;
  /** 최대값 (number 타입) */
  max?: number;
  /** 최소 길이 */
  minLength?: number;
  /** 최대 길이 */
  maxLength?: number;
  /** 패턴 */
  pattern?: string;
  /** 유효성 검사기 */
  validator?: (value: string) => string | null;
  /** 키보드 활성화 옵션 */
  keyboardPress?: {
    preventKeyRepeat?: boolean;
    keyRepeatDelay?: number;
    keyCombinations?: string[][];
  };
  /** 포인터 활성화 옵션 */
  pointerActivation?: {
    longPress?: boolean;
    longPressDelay?: number;
    preventDoubleActivation?: boolean;
    doubleActivationDelay?: number;
    touchAction?: "auto" | "none" | "pan-x" | "pan-y" | "manipulation";
  };
}

export interface FormFieldA11yState {
  /** 필드 값 */
  value: string;
  /** 필드 상태 */
  state: FormFieldState;
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
  /** 필드에 적용할 ARIA 속성 */
  getFieldProps: () => FieldProps;
  /** 필드 라벨에 적용할 ARIA 속성 */
  getLabelProps: () => FieldLabelProps;
  /** 필드 에러에 적용할 ARIA 속성 */
  getErrorProps: () => FieldErrorProps;
  /** 필드 설명에 적용할 ARIA 속성 */
  getDescriptionProps: () => FieldDescriptionProps;
  /** 필드에 적용할 키보드 이벤트 핸들러 */
  getKeyboardProps: () => FieldKeyboardProps;
  /** 필드에 적용할 포인터 이벤트 핸들러 */
  getPointerProps: () => FieldPointerProps;
}

export function createFormFieldA11y(
  initialValue: string = "",
  options: FormFieldA11yOptions
): FormFieldA11yState {
  const {
    fieldName,
    fieldType = "text",
    keyboardPress = {},
    pointerActivation = {},
    idPrefix = "field",
    ...fieldOptions
  } = options;

  // 필드 상태 초기화
  let field = createFormField(initialValue);

  // ID 생성
  const { label, desc } = createAriaIds(`${idPrefix}-${fieldName}`);
  const fieldId = `${idPrefix}-${fieldName}-input`;
  const errorId = `${idPrefix}-${fieldName}-error`;

  // 상태 업데이트 함수
  const setField = (newField: FormFieldValue) => {
    field = newField;
  };

  // 필드 업데이트 함수
  const updateValue = (value: string) => {
    const newField: FormFieldValue = {
      ...field,
      value,
      dirty: field.value !== value,
      touched: true,
    };

    // 유효성 검사
    if (options.validator) {
      const error = options.validator(value);
      newField.state = error
        ? ("invalid" as FormFieldState)
        : ("valid" as FormFieldState);
      newField.error = error || undefined;
    }

    setField(newField);
  };

  // 필드 터치 함수
  const touch = () => {
    const newField: FormFieldValue = { ...field, touched: true };

    // 유효성 검사
    if (options.validator) {
      const error = options.validator(field.value);
      newField.state = error
        ? ("invalid" as FormFieldState)
        : ("valid" as FormFieldState);
      newField.error = error || undefined;
    }

    setField(newField);
  };

  // 필드 유효성 검사 함수
  const validate = () => {
    if (!options.validator) return;

    const error = options.validator(field.value);
    const newField: FormFieldValue = {
      ...field,
      state: error
        ? ("invalid" as FormFieldState)
        : ("valid" as FormFieldState),
      error: error || undefined,
    };

    setField(newField);
  };

  // 필드 리셋 함수
  const reset = () => {
    setField(createFormField(initialValue));
  };

  // 필드 ARIA 속성 생성
  const getFieldProps = (): FieldProps => {
    const hasError = field.state === "invalid" && !!field.error;
    const fieldErrorId = hasError ? errorId : undefined;

    return {
      id: fieldId,
      name: fieldName,
      type: fieldType,
      value: field.value,
      "aria-invalid": hasError || undefined,
      "aria-describedby":
        [fieldErrorId, desc].filter(Boolean).join(" ") || undefined,
      "aria-required": fieldOptions.required || undefined,
      "aria-disabled": fieldOptions.disabled || undefined,
      "aria-readonly": fieldOptions.readOnly || undefined,
      autoComplete: fieldOptions.autoComplete,
      autoFocus: fieldOptions.autoFocus,
      placeholder: fieldOptions.placeholder,
      min: fieldOptions.min,
      max: fieldOptions.max,
      minLength: fieldOptions.minLength,
      maxLength: fieldOptions.maxLength,
      pattern: fieldOptions.pattern,
      disabled: fieldOptions.disabled,
      readOnly: fieldOptions.readOnly,
    };
  };

  // 필드 라벨 ARIA 속성 생성
  const getLabelProps = (): FieldLabelProps => ({
    id: label,
    htmlFor: fieldId,
  });

  // 필드 에러 ARIA 속성 생성
  const getErrorProps = (): FieldErrorProps => {
    const hasError = field.state === "invalid" && !!field.error;

    return {
      id: errorId,
      role: "alert",
      "aria-live": "polite",
      style: hasError ? {} : { display: "none" },
    };
  };

  // 필드 설명 ARIA 속성 생성
  const getDescriptionProps = (): FieldDescriptionProps => ({
    id: desc,
  });

  // 필드 키보드 이벤트 핸들러 생성
  const getKeyboardProps = (): FieldKeyboardProps => {
    const keyboardHandlers = createKeyboardPressA11yHandlers({
      disabled: fieldOptions.disabled || false,
      onKeyDown: (event) => {
        // Enter 키로 다음 필드로 이동
        if (event.key === "Enter" && event.target instanceof HTMLElement) {
          const form = event.target.closest("form");
          if (form) {
            const focusableElements = form.querySelectorAll(
              'input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            );
            const currentIndex = Array.from(focusableElements).indexOf(
              event.target
            );
            if (currentIndex < focusableElements.length - 1) {
              const nextElement = focusableElements[
                currentIndex + 1
              ] as HTMLElement;
              nextElement.focus();
            }
          }
        }
      },
      preventKeyRepeat: keyboardPress.preventKeyRepeat ?? true,
      keyRepeatDelay: keyboardPress.keyRepeatDelay ?? 100,
      keyCombinations: keyboardPress.keyCombinations,
    });

    return {
      onKeyDown: keyboardHandlers.onKeyDown || (() => {}),
    };
  };

  // 필드 포인터 이벤트 핸들러 생성
  const getPointerProps = (): FieldPointerProps => {
    const pointerHandlers = createPointerActivationA11yHandlers({
      disabled: fieldOptions.disabled || false,
      onClick: (event) => {
        touch();
      },
      onTouchEnd: (event) => {
        touch();
      },
      longPress: pointerActivation.longPress ?? false,
      longPressDelay: pointerActivation.longPressDelay ?? 500,
      preventDoubleActivation:
        pointerActivation.preventDoubleActivation ?? true,
      doubleActivationDelay: pointerActivation.doubleActivationDelay ?? 300,
      touchAction: pointerActivation.touchAction ?? "manipulation",
    });

    return {
      onClick: pointerHandlers.onClick || (() => {}),
      onTouchEnd: pointerHandlers.onTouchEnd || (() => {}),
    };
  };

  return {
    value: field.value,
    state: field.state,
    error: field.error,
    touched: field.touched,
    dirty: field.dirty,
    updateValue,
    touch,
    validate,
    reset,
    getFieldProps,
    getLabelProps,
    getErrorProps,
    getDescriptionProps,
    getKeyboardProps,
    getPointerProps,
  };
}
