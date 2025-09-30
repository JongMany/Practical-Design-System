import React from "react";
import { DIALOG_CONTEXT_NAME, useDialogContext } from "./context";
import { Slot } from "../utils/Slot";
import type { DialogTitleProps } from "./types";

/**
 * Dialog Title 컴포넌트
 * Dialog의 제목을 표시하는 요소입니다.
 */
export const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  DialogTitleProps
>(({ asChild = false, children, style, ...rest }, ref) => {
  const { getTitleProps } = useDialogContext(DIALOG_CONTEXT_NAME);

  const titleStyles: React.CSSProperties = {
    margin: "0 0 10px 0",
    fontSize: "1.5rem",
    fontWeight: "bold",
    ...style,
  };

  if (asChild) {
    return (
      <Slot ref={ref} {...getTitleProps()} style={titleStyles} {...rest}>
        {children}
      </Slot>
    );
  }

  return (
    <h2 ref={ref} {...getTitleProps()} style={titleStyles} {...rest}>
      {children}
    </h2>
  );
});

DialogTitle.displayName = "Dialog.Title";
