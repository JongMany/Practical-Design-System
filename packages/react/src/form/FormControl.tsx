import { forwardRef, useEffect, useCallback } from "react";
import { Slot } from "../utils/Slot";
import { useFormContext } from "./FormRoot";
import type { FormControlProps } from "./types";

export const FormControl = forwardRef<HTMLElement, FormControlProps>(
  ({ asChild, children, className, style, ...rest }, ref) => {
    const { formState } = useFormContext("FormControl");

    // name은 FormField에서 전달받거나 props로 받을 수 있음
    const name = (rest as any).name;
    const fieldProps = name ? formState.getFieldProps(name) : {};
    const fieldKeyboardProps = name
      ? formState.getFieldKeyboardProps(name)
      : {};
    const fieldPointerProps = name ? formState.getFieldPointerProps(name) : {};
    const Comp = asChild ? Slot : "input";

    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        if (formState && name) {
          formState.updateField(name, event.target.value);
        }
        rest.onChange?.(event);
      },
      [formState, name, rest.onChange]
    );

    const handleBlur = useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        if (formState && name) {
          formState.touchField(name);
        }
        rest.onBlur?.(event);
      },
      [formState, name, rest.onBlur]
    );

    // 기본 스타일 정의
    const defaultStyles = {
      // 기본 padding
      padding: "12px 16px",
      // HTML 기본 validation 에러 스타일 숨기기
      boxShadow: "rgba(102, 126, 234, 0.1) 0px 0px 0px 3px",
      outline: "none",
      // input number의 스피너 버튼 완전히 숨기기
      WebkitAppearance: "none" as const,
      MozAppearance: "textfield" as const,
      appearance: "none" as const,
      // textarea 크기 조절 핸들 완전히 숨기기
      resize: "none" as const,
      minWidth: "100%",
      maxWidth: "100%",
      // 기본 테두리와 배경
      borderColor: "rgb(102, 126, 234)",
      background: "white",
      // 기본 테두리 스타일
      border: "1px solid rgb(102, 126, 234)",
      borderRadius: "8px",
      fontSize: "14px",
      lineHeight: "1.5",
      color: "#333",
      transition: "all 0.2s ease-in-out",
    };

    // number input에 대한 추가 스타일
    const numberInputStyles =
      rest.type === "number"
        ? {
            // Firefox 브라우저용
            MozAppearance: "textfield" as const,
            // WebKit 브라우저용 (Chrome, Safari, Edge...)
            WebkitAppearance: "none" as const,
            appearance: "none" as const,
          }
        : {};

    // asChild일 때 자식 요소에 직접 스타일 적용
    const applyStylesToElement = useCallback(
      (element: HTMLElement) => {
        if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
          // 기본 스타일 적용
          Object.entries(defaultStyles).forEach(([key, value]) => {
            element.style.setProperty(key, value as string, "important");
          });

          // number input의 경우 추가 스타일
          const inputType = (element as HTMLInputElement).type;
          if (inputType === "number") {
            // Firefox 브라우저용
            element.style.setProperty(
              "-moz-appearance",
              "textfield",
              "important"
            );

            // WebKit 브라우저용 (Chrome, Safari, Edge...)
            element.style.setProperty(
              "-webkit-appearance",
              "none",
              "important"
            );
            element.style.setProperty("appearance", "none", "important");

            // 가상 요소 스타일을 위한 동적 CSS 생성
            const styleId = `form-control-number-${Math.random().toString(36).substr(2, 9)}`;
            element.setAttribute("data-style-id", styleId);

            // 이미 해당 스타일이 있는지 확인
            if (!document.getElementById(styleId)) {
              const style = document.createElement("style");
              style.id = styleId;
              style.textContent = `
              [data-style-id="${styleId}"]::-webkit-inner-spin-button {
                -webkit-appearance: none !important;
                margin: 0 !important;
              }
              [data-style-id="${styleId}"]::-webkit-outer-spin-button {
                -webkit-appearance: none !important;
                margin: 0 !important;
              }
            `;
              document.head.appendChild(style);
            }
          }

          // textarea의 경우 추가 스타일
          if (element.tagName === "TEXTAREA") {
            element.style.setProperty("resize", "none", "important");
          }
        }
      },
      [rest.type, defaultStyles]
    );

    // ref 처리 - asChild일 때는 함수형 ref이므로 다르게 처리
    const handleRef = useCallback(
      (node: HTMLElement | null) => {
        if (asChild && node) {
          applyStylesToElement(node);
        }

        // 원래 ref 처리
        if (typeof ref === "function") {
          ref(node);
        } else if (ref && typeof ref === "object" && "current" in ref) {
          const mutableRef = ref as React.MutableRefObject<HTMLElement | null>;
          mutableRef.current = node;
        }
      },
      [asChild, applyStylesToElement, ref]
    );

    // fieldKeyboardProps에서 onKeyDown을 제거하고 별도로 처리
    const { onKeyDown: _onKeyDown, ...restKeyboardProps } = fieldKeyboardProps;
    const {
      onClick: _onClick,
      onTouchEnd: _onTouchEnd,
      ...restPointerProps
    } = fieldPointerProps;

    // asChild일 때는 value를 전달하지 않음 (자식 요소가 자체적으로 value를 관리)
    const controlProps = asChild
      ? {
          ...rest,
          ...fieldProps,
          ...restKeyboardProps,
          ...restPointerProps,
          ref: handleRef,
          className,
          style: { ...defaultStyles, ...numberInputStyles, ...style },
          onChange: handleChange,
          onBlur: handleBlur,
        }
      : {
          ...rest,
          ...fieldProps,
          ...restKeyboardProps,
          ...restPointerProps,
          ref: handleRef,
          className,
          style: { ...defaultStyles, ...numberInputStyles, ...style },
          onChange: handleChange,
          onBlur: handleBlur,
          value: formState && name ? formState.values[name] || "" : "",
        };

    return <Comp {...controlProps}>{children}</Comp>;
  }
);

FormControl.displayName = "FormControl";
