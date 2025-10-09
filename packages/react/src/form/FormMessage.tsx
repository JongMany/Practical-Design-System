import * as React from "react";
import type { FormMessageProps } from "./types";

export const FormMessage = React.forwardRef<HTMLDivElement, FormMessageProps>(
  ({ match, children, className, style, ...rest }, ref) => {
    // Context에서 field 정보를 가져옴
    const fieldErrorProps = (rest as any).fieldErrorProps || {};
    const formState = (rest as any).formState;
    const name = (rest as any).name;

    // DOM에 전달하면 안 되는 props들을 제거
    const {
      fieldProps: _fieldProps,
      fieldKeyboardProps: _fieldKeyboardProps,
      fieldPointerProps: _fieldPointerProps,
      fieldLabelProps: _fieldLabelProps,
      fieldErrorProps: _fieldErrorProps,
      fieldDescriptionProps: _fieldDescriptionProps,
      formState: _formState,
      name: _name,
      ...domProps
    } = rest as any;

    // match 조건에 따라 메시지를 표시할지 결정
    const shouldShow = React.useMemo(() => {
      if (!match) return true;

      // match가 문자열인 경우 (예: "valueMissing", "typeMismatch")
      if (typeof match === "string") {
        if (formState && name) {
          const field = formState.formData[name];
          if (!field) return false;

          // 에러가 있고 match 조건과 일치하는지 확인
          if (field.error && field.state === "invalid") {
            // 간단한 매칭 로직 (실제로는 더 정교한 validation 필요)
            return field.error.toLowerCase().includes(match.toLowerCase());
          }
        }
        return false;
      }

      // match가 함수인 경우
      if (typeof match === "function") {
        return match();
      }

      return false;
    }, [match, formState, name]);

    if (!shouldShow) {
      return null;
    }

    return (
      <div
        {...domProps}
        {...fieldErrorProps}
        ref={ref}
        className={className}
        style={style}
        role="alert"
        aria-live="polite"
      >
        {children}
      </div>
    );
  }
);

FormMessage.displayName = "FormMessage";
