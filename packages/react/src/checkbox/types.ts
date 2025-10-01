/**
 * Checkbox component types
 */

import type { ReactNode } from "react";

export interface CheckboxBaseProps {
  /** 체크 상태 */
  checked?: boolean;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 읽기 전용 상태 */
  readOnly?: boolean;
  /** 필수 상태 */
  required?: boolean;
  /** 체크 상태 변경 콜백 */
  onCheckedChange?: (checked: boolean) => void;
  /** 비활성화 상태 변경 콜백 */
  onDisabledChange?: (disabled: boolean) => void;
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

export interface CheckboxRootProps extends CheckboxBaseProps {
  /** 자식 요소 */
  children: ReactNode;
  /** CSS 클래스명 */
  className?: string;
  /** 인라인 스타일 */
  style?: React.CSSProperties;
  /** 기본 체크 상태 */
  defaultChecked?: boolean;
  /** 기본 비활성화 상태 */
  defaultDisabled?: boolean;
  /** 기본 읽기 전용 상태 */
  defaultReadOnly?: boolean;
  /** 기본 필수 상태 */
  defaultRequired?: boolean;
  /** HTML ID */
  id?: string;
  /** Change 이벤트 핸들러 */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Click 이벤트 핸들러 */
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
}

export interface CheckboxIndicatorProps {
  /** 자식 요소 */
  children: ReactNode;
  /** CSS 클래스명 */
  className?: string;
  /** 인라인 스타일 */
  style?: React.CSSProperties;
  /** Click 이벤트 핸들러 */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** MouseDown 이벤트 핸들러 */
  onMouseDown?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export interface CheckboxLabelProps {
  /** 자식 요소 */
  children?: ReactNode;
  /** CSS 클래스명 */
  className?: string;
  /** 인라인 스타일 */
  style?: React.CSSProperties;
}

export interface CheckboxContextValue {
  /** 체크 상태 */
  checked: boolean;
  /** 비활성화 상태 */
  disabled: boolean;
  /** 읽기 전용 상태 */
  readOnly: boolean;
  /** 필수 상태 */
  required: boolean;
  /** 체크박스 ID */
  checkboxId: string;
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
  /** 키보드 이벤트 props */
  getKeyboardProps: () => Record<string, any>;
  /** 포인터 이벤트 props */
  getPointerProps: () => Record<string, any>;
}
