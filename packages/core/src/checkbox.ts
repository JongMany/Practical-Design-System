/**
 * Core Checkbox functionality
 * Framework-agnostic checkbox state management
 */

export interface CheckboxState {
  /** 현재 체크 상태 */
  checked: boolean;
  /** 비활성화 상태 */
  disabled: boolean;
  /** 읽기 전용 상태 */
  readOnly: boolean;
  /** 필수 상태 */
  required: boolean;
}

export interface CheckboxOptions {
  /** 초기 체크 상태 */
  defaultChecked?: boolean;
  /** 초기 비활성화 상태 */
  defaultDisabled?: boolean;
  /** 초기 읽기 전용 상태 */
  defaultReadOnly?: boolean;
  /** 초기 필수 상태 */
  defaultRequired?: boolean;
}

export interface CheckboxHandlers {
  /** 체크 상태 토글 */
  toggle: () => void;
  /** 체크 상태 설정 */
  setChecked: (checked: boolean) => void;
  /** 비활성화 상태 설정 */
  setDisabled: (disabled: boolean) => void;
  /** 읽기 전용 상태 설정 */
  setReadOnly: (readOnly: boolean) => void;
  /** 필수 상태 설정 */
  setRequired: (required: boolean) => void;
}

/**
 * Checkbox 상태 생성
 */
export function createCheckboxState(
  initialChecked: boolean = false,
  options: CheckboxOptions = {}
): CheckboxState {
  return {
    checked: initialChecked,
    disabled: options.defaultDisabled ?? false,
    readOnly: options.defaultReadOnly ?? false,
    required: options.defaultRequired ?? false,
  };
}

/**
 * Checkbox 핸들러 생성
 */
export function createCheckboxHandlers(
  state: CheckboxState,
  setState: (newState: CheckboxState) => void
): CheckboxHandlers {
  return {
    toggle: () => {
      if (state.disabled || state.readOnly) return;
      setState({
        ...state,
        checked: !state.checked,
      });
    },
    setChecked: (checked: boolean) => {
      if (state.disabled || state.readOnly) return;
      setState({
        ...state,
        checked,
      });
    },
    setDisabled: (disabled: boolean) => {
      setState({ ...state, disabled });
    },
    setReadOnly: (readOnly: boolean) => {
      setState({ ...state, readOnly });
    },
    setRequired: (required: boolean) => {
      setState({ ...state, required });
    },
  };
}
