import { forwardRef, useEffect, useCallback } from "react";
import { Slot } from "../utils/Slot";
import type { FormControlProps } from "./types";

export const FormControl = forwardRef<HTMLElement, FormControlProps>(
  ({ asChild, children, className, style, ...rest }, ref) => {
    const Comp = asChild ? Slot : "input";

    // Context에서 field props들을 가져와서 적용
    const fieldProps = (rest as any).fieldProps || {};
    const fieldKeyboardProps = (rest as any).fieldKeyboardProps || {};
    const fieldPointerProps = (rest as any).fieldPointerProps || {};
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

    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        if (formState && name) {
          formState.updateField(name, event.target.value);
        }
        domProps.onChange?.(event);
      },
      [formState, name, domProps.onChange]
    );

    const handleBlur = useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        if (formState && name) {
          formState.touchField(name);
        }
        domProps.onBlur?.(event);
      },
      [formState, name, domProps.onBlur]
    );

    // 기본 스타일 정의
    const defaultStyles = {
      // 기본 padding
      padding: "12px 16px",
      // HTML 기본 validation 에러 스타일 숨기기
      boxShadow: "rgba(102, 126, 234, 0.1) 0px 0px 0px 3px",
      outline: "none",
      // input number의 스피너 버튼 완전히 숨기기
      WebkitAppearance: "none",
      MozAppearance: "textfield",
      appearance: "none",
      // textarea 크기 조절 핸들 완전히 숨기기
      resize: "none",
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
      domProps.type === "number"
        ? {
            // Firefox 브라우저용
            MozAppearance: "textfield",
            // WebKit 브라우저용 (Chrome, Safari, Edge...)
            WebkitAppearance: "none",
            appearance: "none",
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
      [domProps.type, defaultStyles]
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
          (ref as React.MutableRefObject<HTMLElement | null>).current = node;
        }
      },
      [asChild, applyStylesToElement, ref]
    );

    // asChild일 때는 value를 전달하지 않음 (자식 요소가 자체적으로 value를 관리)
    const controlProps = asChild
      ? {
          ...domProps,
          ...fieldProps,
          ...fieldKeyboardProps,
          ...fieldPointerProps,
          ref: handleRef,
          className,
          style: { ...defaultStyles, ...numberInputStyles, ...style },
          onChange: handleChange,
          onBlur: handleBlur,
        }
      : {
          ...domProps,
          ...fieldProps,
          ...fieldKeyboardProps,
          ...fieldPointerProps,
          ref: handleRef,
          className,
          style: { ...defaultStyles, ...numberInputStyles, ...style },
          onChange: handleChange,
          onBlur: handleBlur,
          value: formState?.values[name] || "",
        };

    return <Comp {...controlProps}>{children}</Comp>;
  }
);

FormControl.displayName = "FormControl";
