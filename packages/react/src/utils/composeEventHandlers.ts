import React from "react";

export function composeEventHandlers<E extends React.SyntheticEvent>(
  internal?: (event: E) => void,
  external?: (event: E) => void,
  options?: { externalFirst?: boolean }
) {
  return (event: E) => {
    if (options?.externalFirst) {
      external?.(event);
      if (!event.defaultPrevented) internal?.(event);
    } else {
      internal?.(event);
      if (!event.defaultPrevented) external?.(event);
    }
  };
}
