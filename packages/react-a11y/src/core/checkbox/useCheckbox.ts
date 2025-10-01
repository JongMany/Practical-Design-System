/**
 * React Checkbox Hook
 * React용 Checkbox 훅
 */

import React from "react";
import { createCheckboxA11y, type CheckboxA11yOptions } from "@acme/a11y";

export interface UseCheckboxOptions extends CheckboxA11yOptions {
  /** 체크 상태 변경 콜백 */
  onCheckedChange?: (checked: boolean) => void;
}

export interface UseCheckboxReturn {
  /** 현재 체크 상태 */
  checked: boolean;
  /** 현재 비활성화 상태 */
  disabled: boolean;
  /** 현재 읽기 전용 상태 */
  readOnly: boolean;
  /** 현재 필수 상태 */
  required: boolean;
  /** 체크박스 핸들러 */
  handlers: {
    toggle: () => void;
    setChecked: (checked: boolean) => void;
    setDisabled: (disabled: boolean) => void;
    setReadOnly: (readOnly: boolean) => void;
    setRequired: (required: boolean) => void;
  };
  /** 체크박스 props */
  getCheckboxProps: () => Record<string, any>;
  /** 라벨 props */
  getLabelProps: () => Record<string, any>;
  /** 설명 props */
  getDescriptionProps: () => Record<string, any>;
  /** 키보드 이벤트 props */
  getKeyboardProps: () => Record<string, any>;
  /** 포인터 이벤트 props */
  getPointerProps: () => Record<string, any>;
}

/**
 * React용 Checkbox 훅
 */
export function useCheckbox(
  initialChecked: boolean = false,
  options: UseCheckboxOptions = {}
): UseCheckboxReturn {
  const { onCheckedChange, ...a11yOptions } = options;

  // 내부 상태 관리
  const [checked, setChecked] = React.useState(initialChecked);
  const [disabled, setDisabled] = React.useState(
    options.defaultDisabled ?? false
  );
  const [readOnly, setReadOnly] = React.useState(
    options.defaultReadOnly ?? false
  );
  const [required, setRequired] = React.useState(
    options.defaultRequired ?? false
  );

  // a11y checkbox 상태 생성
  const checkboxState = React.useMemo(() => {
    return createCheckboxA11y(checked, {
      ...a11yOptions,
      defaultChecked: checked,
      defaultDisabled: disabled,
      defaultReadOnly: readOnly,
      defaultRequired: required,
    });
  }, [checked, disabled, readOnly, required, a11yOptions]);

  // 핸들러 래핑
  const handlers = React.useMemo(
    () => ({
      toggle: () => {
        if (disabled || readOnly) return;
        const newChecked = !checked;
        setChecked(newChecked);
        onCheckedChange?.(newChecked);
      },
      setChecked: (newChecked: boolean) => {
        if (disabled || readOnly) return;
        setChecked(newChecked);
        onCheckedChange?.(newChecked);
      },
      setDisabled: (newDisabled: boolean) => {
        setDisabled(newDisabled);
      },
      setReadOnly: (newReadOnly: boolean) => {
        setReadOnly(newReadOnly);
      },
      setRequired: (newRequired: boolean) => {
        setRequired(newRequired);
      },
    }),
    [checked, disabled, readOnly, onCheckedChange]
  );

  // 키보드 이벤트 핸들러 래핑
  const keyboardProps = React.useMemo(() => {
    const originalProps = checkboxState.getKeyboardProps();
    return {
      ...originalProps,
      onKeyDown: (event: React.KeyboardEvent) => {
        if (event.key === " " || event.key === "Enter") {
          event.preventDefault();
          handlers.toggle();
        }
        originalProps.onKeyDown?.(event);
      },
    };
  }, [checkboxState, handlers]);

  // 포인터 이벤트 핸들러 래핑
  const pointerProps = React.useMemo(() => {
    const originalProps = checkboxState.getPointerProps();
    return {
      ...originalProps,
      onClick: (event: React.MouseEvent) => {
        handlers.toggle();
        originalProps.onClick?.(event);
      },
    };
  }, [checkboxState, handlers]);

  return {
    checked,
    disabled,
    readOnly,
    required,
    handlers,
    getCheckboxProps: () => {
      const baseProps = checkboxState.getCheckboxProps();
      const combinedProps = {
        ...baseProps,
        ...keyboardProps,
        ...pointerProps,
      };

      // indeterminate 속성을 제거하여 DOM 경고 방지 (안전한 방법)
      if ("indeterminate" in combinedProps) {
        const { indeterminate, ...safeProps } = combinedProps;
        return safeProps;
      }
      return combinedProps;
    },
    getLabelProps: checkboxState.getLabelProps,
    getDescriptionProps: checkboxState.getDescriptionProps,
    getKeyboardProps: () => keyboardProps,
    getPointerProps: () => pointerProps,
  };
}
