/**
 * Form 관련 상태 관리 및 유틸리티 함수들
 */

export type FormFieldState = "valid" | "invalid" | "pending" | "pristine";

export type FormState = "idle" | "submitting" | "success" | "error";

export interface FormFieldValue {
  value: string;
  state: FormFieldState;
  error?: string;
  touched: boolean;
  dirty: boolean;
}

export interface FormData {
  [key: string]: FormFieldValue;
}

/**
 * Form 필드의 초기값을 생성
 */
export function createFormField(initialValue: string = ""): FormFieldValue {
  return {
    value: initialValue,
    state: "pristine",
    touched: false,
    dirty: false,
  };
}

/**
 * Form 데이터의 초기값을 생성
 */
export function createFormData(fields: string[]): FormData {
  return fields.reduce((acc, field) => {
    acc[field] = createFormField();
    return acc;
  }, {} as FormData);
}

/**
 * Form 필드 값을 업데이트
 */
export function updateFormField(
  formData: FormData,
  fieldName: string,
  value: string
): FormData {
  const field = formData[fieldName];
  if (!field) return formData;

  return {
    ...formData,
    [fieldName]: {
      ...field,
      value,
      dirty: field.value !== value,
      touched: true,
    },
  };
}

/**
 * Form 필드 상태를 업데이트
 */
export function updateFormFieldState(
  formData: FormData,
  fieldName: string,
  state: FormFieldState,
  error?: string
): FormData {
  const field = formData[fieldName];
  if (!field) return formData;

  return {
    ...formData,
    [fieldName]: {
      ...field,
      state,
      error,
    },
  };
}

/**
 * Form 필드를 터치 상태로 설정
 */
export function touchFormField(
  formData: FormData,
  fieldName: string
): FormData {
  const field = formData[fieldName];
  if (!field) return formData;

  return {
    ...formData,
    [fieldName]: {
      ...field,
      touched: true,
    },
  };
}

/**
 * Form 필드의 유효성을 검사
 */
export function validateFormField(
  formData: FormData,
  fieldName: string,
  validator: (value: string) => string | null
): FormData {
  const field = formData[fieldName];
  if (!field) return formData;

  const error = validator(field.value);
  const state: FormFieldState = error ? "invalid" : "valid";

  return updateFormFieldState(formData, fieldName, state, error || undefined);
}

/**
 * 전체 Form의 유효성을 검사
 */
export function validateForm(
  formData: FormData,
  validators: Record<string, (value: string) => string | null>
): FormData {
  let result = formData;

  for (const [fieldName, validator] of Object.entries(validators)) {
    result = validateFormField(result, fieldName, validator);
  }

  return result;
}

/**
 * Form이 유효한지 확인
 */
export function isFormValid(formData: FormData): boolean {
  return Object.values(formData).every(
    (field) => field.state === "valid" || field.state === "pristine"
  );
}

/**
 * Form이 더티 상태인지 확인 (값이 변경되었는지)
 */
export function isFormDirty(formData: FormData): boolean {
  return Object.values(formData).some((field) => field.dirty);
}

/**
 * Form이 터치된 상태인지 확인
 */
export function isFormTouched(formData: FormData): boolean {
  return Object.values(formData).some((field) => field.touched);
}

/**
 * Form 데이터에서 실제 값들만 추출
 */
export function extractFormValues(formData: FormData): Record<string, string> {
  return Object.entries(formData).reduce(
    (acc, [key, field]) => {
      acc[key] = field.value;
      return acc;
    },
    {} as Record<string, string>
  );
}

/**
 * Form 필드의 에러 메시지를 가져오기
 */
export function getFormFieldError(
  formData: FormData,
  fieldName: string
): string | undefined {
  const field = formData[fieldName];
  return field?.error;
}

/**
 * Form 필드가 에러 상태인지 확인
 */
export function hasFormFieldError(
  formData: FormData,
  fieldName: string
): boolean {
  const field = formData[fieldName];
  return field?.state === "invalid" && !!field?.error;
}

/**
 * Form 필드의 상태를 가져오기
 */
export function getFormFieldState(
  formData: FormData,
  fieldName: string
): FormFieldState | undefined {
  return formData[fieldName]?.state;
}

/**
 * Form 필드의 값을 가져오기
 */
export function getFormFieldValue(
  formData: FormData,
  fieldName: string
): string {
  return formData[fieldName]?.value || "";
}

/**
 * Form을 리셋
 */
export function resetForm(formData: FormData): FormData {
  return Object.entries(formData).reduce((acc, [key, field]) => {
    acc[key] = createFormField(field.value);
    return acc;
  }, {} as FormData);
}

/**
 * Form 필드를 리셋
 */
export function resetFormField(
  formData: FormData,
  fieldName: string,
  initialValue: string = ""
): FormData {
  return {
    ...formData,
    [fieldName]: createFormField(initialValue),
  };
}

/**
 * 일반적인 유효성 검사 함수들
 */
export const validators = {
  required: (value: string): string | null => {
    return value.trim() === "" ? "필수 입력 항목입니다." : null;
  },

  email: (value: string): string | null => {
    if (value.trim() === "") return null; // 빈 값은 required로 처리
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(value) ? null : "올바른 이메일 형식이 아닙니다.";
  },

  minLength:
    (min: number) =>
    (value: string): string | null => {
      if (value.trim() === "") return null; // 빈 값은 required로 처리
      return value.length < min ? `최소 ${min}자 이상 입력해주세요.` : null;
    },

  maxLength:
    (max: number) =>
    (value: string): string | null => {
      return value.length > max ? `최대 ${max}자까지 입력 가능합니다.` : null;
    },

  pattern:
    (regex: RegExp, message: string) =>
    (value: string): string | null => {
      if (value.trim() === "") return null; // 빈 값은 required로 처리
      return regex.test(value) ? null : message;
    },

  phone: (value: string): string | null => {
    if (value.trim() === "") return null; // 빈 값은 required로 처리
    const phoneRegex = /^[0-9-+\s()]+$/;
    return phoneRegex.test(value) ? null : "올바른 전화번호 형식이 아닙니다.";
  },

  url: (value: string): string | null => {
    if (value.trim() === "") return null; // 빈 값은 required로 처리
    try {
      new URL(value);
      return null;
    } catch {
      return "올바른 URL 형식이 아닙니다.";
    }
  },
};
