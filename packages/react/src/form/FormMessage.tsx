import { forwardRef, useMemo } from "react";
import { useFormContext } from "./FormRoot";
import type { FormMessageProps } from "./types";

export const FormMessage = forwardRef<HTMLDivElement, FormMessageProps>(
  ({ match, children, name, className, style, ...rest }, ref) => {
    const { getFieldErrorProps, formData } = useFormContext("Form");

    // 만약 props에서 name을 받지 못했다면, DOM에서 data-field 또는 data-name 속성으로 찾기
    const fieldName =
      name ||
      (typeof window !== "undefined"
        ? document.querySelector("[data-field]")?.getAttribute("data-field") ||
          document.querySelector("[data-name]")?.getAttribute("data-name")
        : null);

    const fieldErrorProps = fieldName ? getFieldErrorProps(fieldName) : {};

    // match 조건에 따라 메시지를 표시할지 결정 (useMemo로 formState 변경 시 재계산)
    const shouldShow = useMemo(() => {
      if (!match) {
        return true;
      } else if (fieldName) {
        const field = formData[fieldName];

        if (field) {
          // 에러가 있고 invalid 상태일 때만 표시
          if (field.error && field.state === "invalid") {
            // match가 문자열인 경우
            if (typeof match === "string") {
              // 특정 에러 타입별 매칭 로직
              const result = (() => {
                switch (match) {
                  case "valueMissing":
                    return (
                      field.error.includes("필수") ||
                      field.error.includes("입력")
                    );
                  case "typeMismatch":
                    return (
                      field.error.includes("형식") ||
                      field.error.includes("올바른")
                    );
                  case "required":
                    return field.error.includes("필수");
                  case "email":
                    return field.error.includes("이메일");
                  default:
                    // 기본적으로 에러가 있으면 표시
                    return true;
                }
              })();
              return result;
            } else if (typeof match === "function") {
              // match가 함수인 경우
              return match();
            } else {
              // 기본적으로 에러가 있으면 표시
              return true;
            }
          }
        }
      }
      return false;
    }, [formData, fieldName, match]);

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
