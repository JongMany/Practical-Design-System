/**
 * Checkbox Context
 */

import React from "react";
import type { CheckboxContextValue } from "./types";

export const CHECKBOX_CONTEXT_NAME = "CheckboxContext";

export const CheckboxContext = React.createContext<CheckboxContextValue | null>(
  null
);

export const CheckboxProvider = React.forwardRef<
  HTMLDivElement,
  CheckboxContextValue & { children: React.ReactNode }
>(({ children, ...value }, ref) => {
  return (
    <CheckboxContext.Provider value={value}>
      {children}
    </CheckboxContext.Provider>
  );
});

CheckboxProvider.displayName = "CheckboxProvider";

export function useCheckboxContext(): CheckboxContextValue {
  const context = React.useContext(CheckboxContext);
  if (!context) {
    throw new Error(
      "useCheckboxContext must be used within a CheckboxProvider"
    );
  }
  return context;
}
