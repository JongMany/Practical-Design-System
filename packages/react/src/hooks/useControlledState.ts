/**
 * Controlled/Uncontrolled State Hook
 * controlled와 uncontrolled 상태를 통합 관리하는 훅
 */

import { useState, useCallback } from "react";

export interface UseControlledStateOptions<T> {
  /** 외부에서 제어되는 값 */
  value?: T;
  /** 기본값 */
  defaultValue: T;
  /** 값 변경 콜백 */
  onChange?: (value: T) => void;
}

export interface UseControlledStateReturn<T> {
  /** 현재 값 */
  value: T;
  /** 값이 외부에서 제어되는지 여부 */
  isControlled: boolean;
  /** 값 설정 함수 */
  setValue: (value: T) => void;
}

/**
 * controlled/uncontrolled 상태를 통합 관리하는 훅
 */
export function useControlledState<T>(
  options: UseControlledStateOptions<T>
): UseControlledStateReturn<T> {
  const { value: controlledValue, defaultValue, onChange } = options;

  const [internalValue, setInternalValue] = useState(defaultValue);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const setValue = useCallback(
    (newValue: T) => {
      if (isControlled) {
        onChange?.(newValue);
      } else {
        setInternalValue(newValue);
      }
    },
    [isControlled, onChange]
  );

  return {
    value,
    isControlled,
    setValue,
  };
}
