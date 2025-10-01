import React from "react";
import type { PolymorphicProp } from "../types/polymorphic";

/**
 * Dialog Root의 외부 제어 인터페이스
 */
export interface DialogRootRef {
  /** Dialog 열기 */
  open: () => void;
  /** Dialog 닫기 */
  close: () => void;
  /** Dialog 토글 */
  toggle: () => void;
  /** 현재 열림 상태 */
  isOpen: boolean;
  /** Dialog 상태 강제 설정 */
  setOpen: (open: boolean) => void;
}

/**
 * Dialog Root 컴포넌트의 props 타입
 */
export type DialogRootProps = React.PropsWithChildren<{
  /** Dialog가 열려있는지 여부 (제어된 상태) */
  open?: boolean;
  /** Dialog의 기본 열림 상태 (비제어된 상태) */
  defaultOpen?: boolean;
  /** Dialog가 열릴 때 자동으로 포커스할지 여부 */
  autoFocus?: boolean;
  /** Dialog가 닫힐 때 이전 포커스 요소를 복원할지 여부 */
  restoreFocus?: boolean;
  /** Dialog가 열릴 때 body 스크롤을 방지할지 여부 */
  preventScroll?: boolean;
  /** Dialog 외부를 클릭했을 때 닫을지 여부 */
  closeOnOutsideClick?: boolean;
  /** Escape 키를 눌렀을 때 닫을지 여부 */
  closeOnEscape?: boolean;
  /** Dialog 내부에 포커스 트랩을 활성화할지 여부 */
  focusTrap?: boolean;
  /** Dialog의 레이블 */
  "aria-label"?: string;
  /** Dialog의 레이블 ID */
  "aria-labelledby"?: string;
  /** Dialog의 설명 ID */
  "aria-describedby"?: string;
  /** ID 접두사 */
  idPrefix?: string;
  /** Dialog의 열림 상태 변경 시 호출되는 콜백 */
  onOpenChange?: (isOpen: boolean) => void;
}>;

/**
 * Dialog Context에서 공유되는 값들
 */
export type DialogContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  dialogRef: React.RefObject<HTMLElement | null>;
  overlayRef: React.RefObject<HTMLElement | null>;
  getDialogProps: () => {
    role: "dialog";
    tabIndex: number;
    "aria-modal": true;
    "aria-labelledby"?: string;
    "aria-describedby"?: string;
  };
  getOverlayProps: () => {
    onClick: (e: MouseEvent) => void;
  };
  getTitleProps: () => {
    id: string;
  };
  getDescriptionProps: () => {
    id: string;
  };
};

/**
 * Dialog Trigger 컴포넌트의 props 타입
 */
export type DialogTriggerProps = React.PropsWithChildren<
  {
    /** 자식 요소를 래핑할지 여부 */
    asChild?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  } & PolymorphicProp<React.ElementType>
>;

/**
 * Dialog Portal 컴포넌트의 props 타입
 */
export type DialogPortalProps = React.PropsWithChildren<{
  /** Portal이 렌더링될 DOM 노드 */
  container?: Element;
}>;

/**
 * Dialog Overlay 컴포넌트의 props 타입
 */
export type DialogOverlayProps = React.PropsWithChildren<
  {
    /** 자식 요소를 래핑할지 여부 */
    asChild?: boolean;
    /** 스타일 */
    style?: React.CSSProperties;
  } & PolymorphicProp<React.ElementType>
>;

/**
 * Dialog Content 컴포넌트의 props 타입
 */
export type DialogContentProps = React.PropsWithChildren<
  {
    /** 자식 요소를 래핑할지 여부 */
    asChild?: boolean;
    /** 스타일 */
    style?: React.CSSProperties;
  } & PolymorphicProp<React.ElementType>
>;

/**
 * Dialog Close 컴포넌트의 props 타입
 */
export type DialogCloseProps = React.PropsWithChildren<
  {
    /** 자식 요소를 래핑할지 여부 */
    asChild?: boolean;
    /** 스타일 */
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  } & PolymorphicProp<React.ElementType>
>;

/**
 * Dialog Title 컴포넌트의 props 타입
 */
export type DialogTitleProps = React.PropsWithChildren<
  {
    /** 자식 요소를 래핑할지 여부 */
    asChild?: boolean;
    /** 스타일 */
    style?: React.CSSProperties;
  } & PolymorphicProp<React.ElementType>
>;

/**
 * Dialog Description 컴포넌트의 props 타입
 */
export type DialogDescriptionProps = React.PropsWithChildren<
  {
    /** 자식 요소를 래핑할지 여부 */
    asChild?: boolean;
    /** 스타일 */
    style?: React.CSSProperties;
  } & PolymorphicProp<React.ElementType>
>;
