import { forwardRef, useMemo } from "react";
import { useFormContext } from "./FormRoot";
import type { FormMessageProps } from "./types";

export const FormMessage = forwardRef<HTMLDivElement, FormMessageProps>(
  (
    {
      touched,
      dirty,
      invalid,
      hasError,
      always = true,
      name,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const { getFieldErrorProps, formData } = useFormContext("Form");

    // fieldName이 없으면 DOM에서 찾기 (fallback)
    const fieldName = useMemo(() => {
      if (name) return name;

      // SSR 환경에서는 DOM 접근 불가
      if (typeof window === "undefined") return null;

      // data-field 또는 data-name 속성으로 찾기
      const fieldElement =
        document.querySelector("[data-field]") ||
        document.querySelector("[data-name]");
      return (
        fieldElement?.getAttribute("data-field") ||
        fieldElement?.getAttribute("data-name") ||
        null
      );
    }, [name]);

    const fieldErrorProps = fieldName ? getFieldErrorProps(fieldName) : {};

    // 메시지 표시 여부 결정
    const shouldShow = useMemo(() => {
      // fieldName이 없으면 표시하지 않음
      if (!fieldName) return false;

      const field = formData[fieldName];
      if (!field) return false;

      // always가 false이면 표시하지 않음
      if (always === false) return false;

      // 각 조건별 체크
      if (touched !== undefined && field.touched !== touched) return false;
      if (dirty !== undefined && field.dirty !== dirty) return false;
      if (invalid !== undefined && (field.state === "invalid") !== invalid)
        return false;
      if (hasError !== undefined && !!field.error !== hasError) return false;

      // 기본적으로 에러가 있을 때만 표시
      return !!field.error;
    }, [formData, fieldName, touched, dirty, invalid, hasError, always]);

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
        {fieldName ? formData[fieldName]?.error : null}
      </div>
    );
  }
);

FormMessage.displayName = "FormMessage";
