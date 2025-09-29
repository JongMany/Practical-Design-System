import React from "react";
import { Slot } from "../utils/Slot";
import { composeEventHandlers } from "../utils/composeEventHandlers";
import { useAriaIds, useAriaPress } from "@acme/react-a11y";
import { createContext } from "../context/createContext";

type CardAction = "none" | "button" | "link";

type PolymorphicProp<C extends React.ElementType> = {
  as?: C;
  asChild?: boolean;
};

type CardBaseProps = {
  /** 카드가 인터랙티브(클릭/키보드 활성)한지 */
  action?: CardAction;
  /** 비활성화 (action !== 'none'일 때만 의미) */
  disabled?: boolean;
  /** 버튼/카드 액션 */
  onPress?: (e: { type: "keyboard" | "click" }) => void;
  /** 선택형 카드(토글)의 상태 표시 (옵션) */
  pressed?: boolean;
  /** 외부 이벤트 핸들러 */
  onClick?: React.MouseEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
  /** a11y 라벨링을 위해 외부에서 title/desc id를 줄 수 있음(선택) */
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  /** 우선순위 제어: true면 외부 핸들러 먼저 실행 */
  externalHandlersFirst?: boolean;
} & React.HTMLAttributes<HTMLElement>;

export type CardProps<C extends React.ElementType = React.ElementType> =
  React.PropsWithChildren<CardBaseProps & PolymorphicProp<C>> &
    Omit<
      React.ComponentPropsWithoutRef<C>,
      keyof CardBaseProps | "children" | "as" | "asChild"
    >;

type CardContextValue = {
  titleId: string;
  descId: string;
};

const [CardProvider, useCardContext] = createContext<CardContextValue>("Card");

export const CardRoot = React.forwardRef<any, CardProps>(
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
    // asChild일 때 자식이 하나인지 검증
    if (asChild) {
      if (!React.isValidElement(children)) {
        throw new Error(
          "Card.Root with asChild must have exactly one valid React element as children"
        );
      }
    }

    const elementType = asChild ? Slot : (as ?? "div");
    const { label: autoTitleId, desc: autoDescId } = useAriaIds("card");
    const titleId = ariaLabelledbyProp || autoTitleId;
    const descId = ariaDescribedbyProp || autoDescId;

    // a11y press (button 모드일 때 키보드/마우스 일원화)
    const press = useAriaPress({
      disabled: disabled || action === "none",
      onPress: onPress ? (t) => onPress(t) : undefined,
    });

    // 역할/ARIA 계산
    const isButton = action === "button";
    const isLink = action === "link";
    const role =
      rest.role ?? (isButton ? "button" : isLink ? "link" : undefined);

    // Card 컴포넌트의 내부 기본 동작
    const internalOnClick =
      isButton || isLink
        ? (e: React.MouseEvent) => {
            // Card의 기본 클릭 동작 (예: 포커스 관리, 애니메이션 등)
          }
        : undefined;

    const internalOnKeyDown =
      isButton || isLink
        ? (e: React.KeyboardEvent) => {
            // Card의 기본 키보드 동작
          }
        : undefined;

    // 외부 onPress를 처리하는 핸들러
    const pressHandlers = useAriaPress({
      disabled: disabled || action === "none",
      onPress: onPress ? (t) => onPress(t) : undefined,
    });

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

    // 네이티브 button 기본 submit 방지
    const typeProp =
      elementType === "button" && isButton ? { type: "button" } : {};

    return (
      <CardProvider titleId={titleId} descId={descId}>
        {React.createElement(
          elementType,
          {
            ...rest,
            ...(isButton || isLink ? press : {}),
            ref,
            ...typeProp,
            role,
            "aria-disabled": disabled || undefined,
            "aria-pressed":
              isButton && typeof pressed === "boolean" ? pressed : undefined,
            "aria-labelledby": titleId,
            "aria-describedby": descId,
            tabIndex:
              rest.tabIndex ??
              (isButton || isLink ? press.tabIndex : undefined),
            onClick: handleClick,
            onKeyDown: handleKeyDown,
            "data-focus-visible": "",
            // asChild일 때는 기본 스타일을 적용하지 않음 (레이아웃 깨짐 방지)
            style: asChild
              ? {
                  display: "block",
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

// 슬롯들: aria-labelledby / describedby에 연결
export const CardHeader = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & PolymorphicProp<any>
>(({ as, asChild, ...rest }, ref) => {
  const Comp: any = asChild ? Slot : (as ?? "div");
  return <Comp ref={ref} {...rest} />;
});
CardHeader.displayName = "Card.Header";

export const CardMedia = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & PolymorphicProp<any>
>(({ as, asChild, ...rest }, ref) => {
  const Comp: any = asChild ? Slot : (as ?? "div");
  return <Comp ref={ref} {...rest} />;
});
CardMedia.displayName = "Card.Media";

export const CardTitle = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & PolymorphicProp<any>
>(({ as, asChild, id, ...rest }, ref) => {
  const { titleId } = useCardContext("Card.Title");
  const Comp: any = asChild ? Slot : (as ?? "h3");
  return <Comp ref={ref} id={id ?? titleId} {...rest} />;
});
CardTitle.displayName = "Card.Title";

export const CardDescription = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & PolymorphicProp<any>
>(({ as, asChild, id, ...rest }, ref) => {
  const { descId } = useCardContext("Card.Description");
  const Comp: any = asChild ? Slot : (as ?? "p");
  return <Comp ref={ref} id={id ?? descId} {...rest} />;
});
CardDescription.displayName = "Card.Description";

export const CardBody = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & PolymorphicProp<any>
>(({ as, asChild, ...rest }, ref) => {
  const Comp: any = asChild ? Slot : (as ?? "div");
  return <Comp ref={ref} {...rest} />;
});
CardBody.displayName = "Card.Body";

export const CardFooter = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & PolymorphicProp<any>
>(({ as, asChild, ...rest }, ref) => {
  const Comp: any = asChild ? Slot : (as ?? "div");
  return <Comp ref={ref} {...rest} />;
});
CardFooter.displayName = "Card.Footer";

// 네임스페이스 export (선호 시)
export const Card = Object.assign(CardRoot, {
  Root: CardRoot,
  Header: CardHeader,
  Media: CardMedia,
  Title: CardTitle,
  Description: CardDescription,
  Body: CardBody,
  Footer: CardFooter,
});
