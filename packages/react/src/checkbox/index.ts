/**
 * Checkbox component exports
 */

import { CheckboxRoot } from "./CheckboxRoot";
import { CheckboxIndicator } from "./CheckboxIndicator";

export { CheckboxRoot, CheckboxIndicator };

// Combine into a single Checkbox object
export const Checkbox = {
  Root: CheckboxRoot,
  Indicator: CheckboxIndicator,
} as const;

// Export types
export type {
  CheckboxRootProps,
  CheckboxIndicatorProps,
  CheckboxBaseProps,
  CheckboxContextValue,
} from "./types";
