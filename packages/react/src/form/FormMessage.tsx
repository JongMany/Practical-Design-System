import { forwardRef, useMemo } from "react";
import { useFormContext } from "./FormRoot";
import type { FormMessageProps } from "./types";

export const FormMessage = forwardRef<HTMLDivElement, FormMessageProps>(
  ({ match, children, className, style, ...rest }, ref) => {
    const { formState } = useFormContext("FormMessage");

    // name은 FormField에서 전달받거나 props로 받을 수 있음
    const name = (rest as any).name;
    const fieldErrorProps = name ? formState.getFieldErrorProps(name) : {};

    // match 조건에 따라 메시지를 표시할지 결정
    const shouldShow = useMemo(() => {
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
        {...rest}
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
