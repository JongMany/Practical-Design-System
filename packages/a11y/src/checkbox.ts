/**
 * A11y Checkbox functionality
 * Extends core checkbox with accessibility features
 */

import {
  createCheckboxState,
  createCheckboxHandlers,
  type CheckboxState,
  type CheckboxOptions,
  type CheckboxHandlers,
} from "@acme/core";
import { createKeyboardPressA11yHandlers } from "./keyboardPress";
import { createPointerActivationA11yHandlers } from "./pointerActivation";
import { createAriaIds } from "./createAriaIds";

export interface CheckboxA11yOptions extends CheckboxOptions {
  /** ARIA 라벨 */
  "aria-label"?: string;
  /** ARIA 라벨 ID */
  "aria-labelledby"?: string;
  /** ARIA 설명 ID */
  "aria-describedby"?: string;
  /** ID 접두사 */
  idPrefix?: string;
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

export interface CheckboxA11yState extends CheckboxState {
  /** 체크박스 핸들러 */
  handlers: CheckboxHandlers;
  /** 체크박스 ARIA 속성 */
  getCheckboxProps: () => Record<string, any>;
  /** 라벨 ARIA 속성 */
  getLabelProps: () => Record<string, any>;
  /** 설명 ARIA 속성 */
  getDescriptionProps: () => Record<string, any>;
  /** 키보드 이벤트 핸들러 */
  getKeyboardProps: () => Record<string, any>;
  /** 포인터 이벤트 핸들러 */
  getPointerProps: () => Record<string, any>;
}

/**
 * Checkbox의 접근성 기능을 통합하는 함수
 */
export function createCheckboxA11y(
  initialChecked: boolean = false,
  options: CheckboxA11yOptions = {}
): CheckboxA11yState {
  const {
    keyboardPress = {},
    pointerActivation = {},
    idPrefix = "checkbox",
    ...checkboxOptions
  } = options;

  // 기본 상태 생성 (core 사용)
  const baseState = createCheckboxState(initialChecked, checkboxOptions);

  // 상태 업데이트 함수 (실제 구현에서는 React의 setState와 유사하게 동작)
  let currentState = baseState;
  const setState = (newState: CheckboxState) => {
    currentState = newState;
  };

  // 핸들러 생성 (core 사용)
  const handlers = createCheckboxHandlers(currentState, setState);

  // ID 생성 (a11y 기능)
  const { label: labelId, desc: descId } = createAriaIds(idPrefix);
  const checkboxId = `${idPrefix}-${Math.random().toString(36).substr(2, 9)}`;

  // 키보드 활성화 핸들러 생성 (기존 a11y 기능 재사용)
  const keyboardHandlers = createKeyboardPressA11yHandlers({
    disabled: currentState.disabled,
    onKeyDown: (event) => {
      // 키보드 이벤트는 실제 DOM 이벤트에서 처리
      handlers.toggle();
    },
    preventKeyRepeat: keyboardPress.preventKeyRepeat ?? true,
    keyRepeatDelay: keyboardPress.keyRepeatDelay ?? 100,
    keyCombinations: keyboardPress.keyCombinations,
  });

  // 포인터 활성화 핸들러 생성 (기존 a11y 기능 재사용)
  const pointerHandlers = createPointerActivationA11yHandlers({
    disabled: currentState.disabled,
    onClick: (event) => {
      handlers.toggle();
    },
    onTouchEnd: (event) => {
      handlers.toggle();
    },
    longPress: pointerActivation.longPress ?? false,
    longPressDelay: pointerActivation.longPressDelay ?? 500,
    preventDoubleActivation: pointerActivation.preventDoubleActivation ?? true,
    doubleActivationDelay: pointerActivation.doubleActivationDelay ?? 300,
    touchAction: pointerActivation.touchAction ?? "manipulation",
  });

  return {
    ...currentState,
    handlers,
    getCheckboxProps: () => ({
      role: "checkbox",
      "aria-checked": currentState.checked,
      "aria-disabled": currentState.disabled || undefined,
      "aria-readonly": currentState.readOnly || undefined,
      "aria-required": currentState.required || undefined,
      id: checkboxId,
      tabIndex: currentState.disabled ? -1 : 0,
      "aria-label": options["aria-label"],
      "aria-labelledby": options["aria-labelledby"] || labelId,
      "aria-describedby": options["aria-describedby"] || descId,
    }),
    getLabelProps: () => ({
      id: labelId,
      htmlFor: checkboxId,
    }),
    getDescriptionProps: () => ({
      id: descId,
    }),
    getKeyboardProps: () => keyboardHandlers,
    getPointerProps: () => pointerHandlers,
  };
}
