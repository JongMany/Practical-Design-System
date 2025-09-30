export type ButtonProps = {
  disabled?: boolean;
  onPress?: (e: { type: "click" | "keyboard" }) => void;
};

export type PressHandlers = {
  onKeyDown(e: KeyboardEvent): void;
  onClick(e: MouseEvent): void;
  role: "button";
  tabIndex: number;
  "aria-disabled"?: boolean;
};

export function createButtonHandlers({
  disabled,
  onPress,
}: ButtonProps): PressHandlers {
  return {
    role: "button",
    tabIndex: disabled ? -1 : 0,
    "aria-disabled": disabled || undefined,
    onKeyDown(e) {
      if (disabled) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onPress?.({ type: "keyboard" });
      }
    },
    onClick() {
      if (!disabled) onPress?.({ type: "click" });
    },
  };
}
