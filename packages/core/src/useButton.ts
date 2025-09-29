export type ButtonProps = {
  disabled?: boolean;
  onPress?: (e: { type: "click" | "keyboard" }) => void;
};
export function getButtonHandlers({ disabled, onPress }: ButtonProps) {
  return {
    role: "button" as const,
    "aria-disabled": disabled || undefined,
    tabIndex: disabled ? -1 : 0,
    onKeyDown: (e: KeyboardEvent) => {
      if (disabled) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onPress?.({ type: "keyboard" });
      }
    },
    onClick: () => {
      if (!disabled) onPress?.({ type: "click" });
    },
  };
}
