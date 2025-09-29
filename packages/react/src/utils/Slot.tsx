import React, { forwardRef } from "react";
import { mergeRefs } from "./mergeRefs";

export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactElement;
}

export const Slot = forwardRef<HTMLElement, SlotProps>(
  ({ children, ...props }, ref) => {
    const childProps = {
      ...props,
      ref: mergeRefs(ref, (children as any).ref),
    };

    return React.cloneElement(children, childProps);
  }
);

Slot.displayName = "Slot";
