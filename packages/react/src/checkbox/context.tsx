/**
 * Checkbox Context
 */

import { createContext } from "../context/createContext";
import type { CheckboxContextValue } from "./types";

export const CHECKBOX_CONTEXT_NAME = "CheckboxContext";

export const [CheckboxProvider, useCheckboxContext] =
  createContext<CheckboxContextValue>(CHECKBOX_CONTEXT_NAME);
