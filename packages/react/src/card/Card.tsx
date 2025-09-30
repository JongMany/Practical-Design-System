import React from "react";
import { Slot } from "../utils/Slot";
import { composeEventHandlers } from "../utils/composeEventHandlers";
import { useAriaIds, useAriaPress } from "@acme/react-a11y";
import { createContext } from "../context/createContext";
import type {
  CardProps,
  CardContextValue,
  CardSubComponentProps,
} from "./types";

/**
 * Card 컴포넌트의 Context 생성
 * 향상된 createContext 유틸리티를 사용하여 타입 안전성과 성능을 개선합니다.
 */
const [CardProvider, useCardContext] = createContext<CardContextValue>("Card");

/**
 * Card 컴포넌트의 루트 요소
 *
 * 주요 기능:
 * - 다형성 지원 (as, asChild props)
 * - 인터랙션 모드 지원 (none, button, link)
 * - 접근성 자동 처리 (ARIA 속성, 키보드 네비게이션)
 * - 이벤트 핸들러 조합 (내부/외부 핸들러 통합)
 * - Context를 통한 ID 공유
 */
const CardRoot = React.forwardRef<HTMLElement, CardProps>(
  (
    {
      as,
      asChild,
      action = "none",
      disabled,
      onPress,
      pressed,
      children,
      onClick,
      onKeyDown,
      externalHandlersFirst,
      "aria-labelledby": ariaLabelledbyProp,
      "aria-describedby": ariaDescribedbyProp,
      ...rest
    },
    ref
  ) => {
    // asChild 모드일 때 자식 요소 검증
    // Slot 패턴을 사용할 때는 정확히 하나의 React 요소가 필요합니다
    if (asChild) {
      if (!React.isValidElement(children)) {
        throw new Error(
          "Card.Root with asChild must have exactly one valid React element as children"
        );
      }
    }

    // 렌더링할 요소 타입 결정
    // asChild가 true면 Slot 컴포넌트를, 아니면 지정된 요소나 기본 div를 사용
    const elementType = asChild ? Slot : (as ?? "div");

    // 접근성을 위한 고유 ID 생성
    // 외부에서 제공된 ID가 있으면 우선 사용, 없으면 자동 생성
    const { label: autoTitleId, desc: autoDescId } = useAriaIds("card");
    const titleId = ariaLabelledbyProp || autoTitleId;
    const descId = ariaDescribedbyProp || autoDescId;

    // 접근성 지원을 위한 키보드/마우스 이벤트 통합
    // useAriaPress 훅을 사용하여 키보드와 마우스 이벤트를 일관되게 처리
    const press = useAriaPress({
      disabled: disabled || action === "none",
      onPress: onPress ? (t) => onPress(t) : undefined,
    });

    // ARIA 역할 및 인터랙션 상태 계산
    // action prop에 따라 적절한 ARIA 역할을 자동 설정
    const isButton = action === "button";
    const isLink = action === "link";
    const role =
      rest.role ?? (isButton ? "button" : isLink ? "link" : undefined);

    // Card 컴포넌트의 내부 기본 동작 정의
    // 인터랙티브 모드일 때만 내부 핸들러를 생성 (포커스 관리, 애니메이션 등)
    const internalOnClick =
      isButton || isLink
        ? (e: React.MouseEvent) => {
            // Card의 기본 클릭 동작 (예: 포커스 관리, 애니메이션 등)
            // 향후 확장 가능한 내부 로직
          }
        : undefined;

    const internalOnKeyDown =
      isButton || isLink
        ? (e: React.KeyboardEvent) => {
            // Card의 기본 키보드 동작
            // 향후 확장 가능한 내부 로직
          }
        : undefined;

    // 외부 onPress 이벤트를 처리하는 핸들러
    // useAriaPress를 다시 호출하여 외부 핸들러와 내부 핸들러를 분리
    const pressHandlers = useAriaPress({
      disabled: disabled || action === "none",
      onPress: onPress ? (t) => onPress(t) : undefined,
    });

    // 이벤트 핸들러 조합
    // 내부 핸들러와 외부 핸들러를 composeEventHandlers로 통합
    // externalHandlersFirst 옵션으로 실행 순서 제어 가능
    const handleClick = composeEventHandlers(
      internalOnClick,
      pressHandlers.onClick,
      { externalFirst: !!externalHandlersFirst }
    );
    const handleKeyDown = composeEventHandlers(
      internalOnKeyDown,
      pressHandlers.onKeyDown,
      { externalFirst: !!externalHandlersFirst }
    );

    // 네이티브 button 요소의 기본 submit 동작 방지
    // button 요소로 렌더링될 때 type="button"을 명시적으로 설정
    const typeProp =
      elementType === "button" && isButton ? { type: "button" } : {};

    // Context Provider로 ID들을 하위 컴포넌트들과 공유
    // CardTitle, CardDescription 등이 이 ID들을 사용하여 접근성 연결
    return (
      <CardProvider titleId={titleId} descId={descId}>
        {React.createElement(
          elementType,
          {
            // 기본 HTML 속성들 전달
            ...rest,
            // 인터랙티브 모드일 때만 press 관련 속성들 추가
            ...(isButton || isLink ? press : {}),
            ref,
            // button 요소의 기본 submit 방지
            ...typeProp,
            // ARIA 역할 설정
            role,
            // 접근성 속성들
            "aria-disabled": disabled || undefined,
            "aria-pressed":
              isButton && typeof pressed === "boolean" ? pressed : undefined,
            "aria-labelledby": titleId,
            "aria-describedby": descId,
            // 키보드 네비게이션을 위한 tabIndex 설정
            tabIndex:
              rest.tabIndex ??
              (isButton || isLink ? press.tabIndex : undefined),
            // 조합된 이벤트 핸들러들
            onClick: handleClick,
            onKeyDown: handleKeyDown,
            // 포커스 표시를 위한 데이터 속성
            "data-focus-visible": "",
            // 조건부 스타일 적용
            // asChild일 때는 display: block 추가 (레이아웃 깨짐 방지)
            // 일반 모드일 때는 기본 스타일만 적용
            style: asChild
              ? {
                  display: "block", // asChild일 때만 추가
                  outline: "none",
                  borderRadius: "var(--ds-radius-2, 12px)",
                  background: "var(--ds-semantic-color-bg-layer-default)",
                  color: "var(--ds-semantic-color-fg-neutral)",
                  boxShadow: "var(--ds-shadow-card, 0 1px 3px rgba(0,0,0,.06))",
                  padding: "var(--ds-space-5, 20px)",
                  cursor:
                    (isButton || isLink) && !disabled ? "pointer" : "default",
                  ...rest.style,
                }
              : {
                  outline: "none",
                  borderRadius: "var(--ds-radius-2, 12px)",
                  background: "var(--ds-semantic-color-bg-layer-default)",
                  color: "var(--ds-semantic-color-fg-neutral)",
                  boxShadow: "var(--ds-shadow-card, 0 1px 3px rgba(0,0,0,.06))",
                  padding: "var(--ds-space-5, 20px)",
                  cursor:
                    (isButton || isLink) && !disabled ? "pointer" : "default",
                  ...rest.style,
                },
          },
          children
        )}
      </CardProvider>
    );
  }
);
CardRoot.displayName = "Card.Root";

/* -------------------------------------------------------------------------------------------------
 * Card 하위 컴포넌트들
 * -----------------------------------------------------------------------------------------------*/

/**
 * Card의 헤더 영역
 * 다형성 지원으로 다양한 요소로 렌더링 가능
 *
 * forwardRef: ref를 자식 컴포넌트로 전달하기 위한 고차 컴포넌트 (HOC)
 * - 첫 번째 제네릭(RefType): ref로 전달받을 요소의 타입
 * - 두 번째 제네릭(PropsType): 컴포넌트가 받을 props의 타입
 */
const CardHeader = React.forwardRef<HTMLElement, CardSubComponentProps>(
  ({ as, asChild, ...rest }, ref) => {
    const Comp = asChild ? Slot : (as ?? "div");
    return React.createElement(Comp, { ref, ...rest });
  }
);
CardHeader.displayName = "Card.Header";

/**
 * Card의 미디어 영역 (이미지, 비디오 등)
 * 다형성 지원으로 다양한 요소로 렌더링 가능
 */
const CardMedia = React.forwardRef<HTMLElement, CardSubComponentProps>(
  ({ as, asChild, ...rest }, ref) => {
    const Comp = asChild ? Slot : (as ?? "div");
    return React.createElement(Comp, { ref, ...rest });
  }
);
CardMedia.displayName = "Card.Media";

/**
 * Card의 제목
 * Context에서 제공되는 titleId를 자동으로 연결하여 접근성 지원
 * Card.Root의 aria-labelledby와 자동 연결됨
 */
const CardTitle = React.forwardRef<HTMLElement, CardSubComponentProps>(
  ({ as, asChild, id, ...rest }, ref) => {
    const { titleId } = useCardContext("Card.Title");
    const Comp = asChild ? Slot : (as ?? "h3");
    return React.createElement(Comp, { ref, id: id ?? titleId, ...rest });
  }
);
CardTitle.displayName = "Card.Title";

/**
 * Card의 설명
 * Context에서 제공되는 descId를 자동으로 연결하여 접근성 지원
 * Card.Root의 aria-describedby와 자동 연결됨
 */
const CardDescription = React.forwardRef<HTMLElement, CardSubComponentProps>(
  ({ as, asChild, id, ...rest }, ref) => {
    const { descId } = useCardContext("Card.Description");
    const Comp = asChild ? Slot : (as ?? "p");
    return React.createElement(Comp, { ref, id: id ?? descId, ...rest });
  }
);
CardDescription.displayName = "Card.Description";

/**
 * Card의 본문 영역
 * 다형성 지원으로 다양한 요소로 렌더링 가능
 */
const CardBody = React.forwardRef<HTMLElement, CardSubComponentProps>(
  ({ as, asChild, ...rest }, ref) => {
    const Comp = asChild ? Slot : (as ?? "div");
    return React.createElement(Comp, { ref, ...rest });
  }
);
CardBody.displayName = "Card.Body";

/**
 * Card의 푸터 영역
 * 다형성 지원으로 다양한 요소로 렌더링 가능
 */
const CardFooter = React.forwardRef<HTMLElement, CardSubComponentProps>(
  ({ as, asChild, ...rest }, ref) => {
    const Comp = asChild ? Slot : (as ?? "div");
    return React.createElement(Comp, { ref, ...rest });
  }
);
CardFooter.displayName = "Card.Footer";

/* -------------------------------------------------------------------------------------------------
 * 네임스페이스 export
 * -----------------------------------------------------------------------------------------------*/
export const Card = Object.assign(CardRoot, {
  Root: CardRoot,
  Header: CardHeader,
  Media: CardMedia,
  Title: CardTitle,
  Description: CardDescription,
  Body: CardBody,
  Footer: CardFooter,
});
