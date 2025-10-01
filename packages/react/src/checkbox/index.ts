/**
 * Checkbox component exports
 */

import { CheckboxRoot } from "./CheckboxRoot";
import { CheckboxIndicator } from "./CheckboxIndicator";
import { CheckboxLabel } from "./CheckboxLabel";

export { CheckboxRoot, CheckboxIndicator, CheckboxLabel };

// Combine into a single Checkbox object
export const Checkbox = {
  Root: CheckboxRoot,
  Indicator: CheckboxIndicator,
  Label: CheckboxLabel,
} as const;

// Export types
export type {
  CheckboxRootProps,
  CheckboxIndicatorProps,
  CheckboxLabelProps,
  CheckboxBaseProps,
  CheckboxContextValue,
} from "./types";
