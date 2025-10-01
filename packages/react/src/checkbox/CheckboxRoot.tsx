/**
 * Checkbox Root Component
 */

import React, { CSSProperties } from "react";
import { useCheckbox } from "@acme/react-a11y";
import { CheckboxProvider } from "./context";
import { useControlledState } from "./useControlledState";
import { composeEventHandlers } from "../utils/composeEventHandlers";
import type { CheckboxRootProps } from "./types";

const defaultInputStyle: CSSProperties = {
  position: "absolute",
  opacity: 0,
  pointerEvents: "none",
  width: 0,
  height: 0,
};

const defaultRootStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  position: "relative",
  gap: "8px",
};

/**
 * Checkbox Root 컴포넌트
 * Checkbox의 상태를 관리하고 Context Provider를 통해 하위 컴포넌트에 전달합니다.
 */
export const CheckboxRoot = React.forwardRef<HTMLDivElement, CheckboxRootProps>(
  (
    {
      checked: controlledChecked,
      disabled: controlledDisabled,
      onCheckedChange,
      onDisabledChange,
      defaultChecked = false,
      defaultDisabled = false,
      defaultReadOnly = false,
      defaultRequired = false,
      keyboardPress = {},
      pointerActivation = {},
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      idPrefix = "checkbox",
      id,
      children,
      className,
      style,
      onChange: externalOnChange,
      onClick: externalOnClick,
      ...rest
    },
    ref
  ) => {
    // Controlled/Uncontrolled 상태 관리
    const checkedState = useControlledState({
      value: controlledChecked,
      defaultValue: defaultChecked,
      onChange: onCheckedChange,
    });

    const disabledState = useControlledState({
      value: controlledDisabled,
      defaultValue: defaultDisabled,
      onChange: onDisabledChange,
    });

    const { value: checked } = checkedState;
    const { value: disabled } = disabledState;

    // Checkbox ID 생성
    const checkboxId =
      id || `${idPrefix}-${Math.random().toString(36).substr(2, 9)}`;

    // Checkbox 훅 사용
    const checkboxState = useCheckbox({
      checked,
      disabled,
      readOnly: defaultReadOnly,
      required: defaultRequired,
      onCheckedChange: checkedState.setValue,
      keyboardPress,
      pointerActivation,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      idPrefix,
    });

    // Context 값 생성
    const contextValue = React.useMemo(
      () => ({
        checked: checkboxState.checked,
        disabled: checkboxState.disabled,
        readOnly: checkboxState.readOnly,
        required: checkboxState.required,
        checkboxId,
        handlers: checkboxState.handlers,
        getCheckboxProps: checkboxState.getCheckboxProps,
        getKeyboardProps: checkboxState.getKeyboardProps,
        getPointerProps: checkboxState.getPointerProps,
      }),
      [checkboxState, checkboxId]
    );

    return (
      <CheckboxProvider {...contextValue}>
        <div
          ref={ref}
          className={className}
          style={{
            ...defaultRootStyle,
            ...style,
          }}
          {...rest}
        >
          {/* 실제 input 요소 (숨김 처리) */}
          <input
            type="checkbox"
            id={checkboxId}
            checked={checked}
            disabled={disabled}
            readOnly={checkboxState.readOnly}
            required={checkboxState.required}
            onChange={composeEventHandlers((e) => {
              if (!disabled && !checkboxState.readOnly) {
                checkboxState.handlers.setChecked(e.target.checked);
              }
            }, externalOnChange)}
            onClick={composeEventHandlers((e) => {
              if (disabled) {
                e.preventDefault();
                e.stopPropagation();
              }
            }, externalOnClick)}
            style={{
              ...defaultInputStyle,
            }}
            tabIndex={-1}
          />
          {children}
        </div>
      </CheckboxProvider>
    );
  }
);

CheckboxRoot.displayName = "CheckboxRoot";
