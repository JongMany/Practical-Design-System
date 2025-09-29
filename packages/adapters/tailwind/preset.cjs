module.exports = {
  theme: {
    extend: {
      colors: {
        brand: "var(--ds-color-accent-brand)",
        surface: "var(--ds-color-bg-surface)",
      },
      borderRadius: { control: "var(--ds-radius-control)" },
      spacing: {
        "control-x": "var(--ds-space-control-padding-x)",
        "control-y": "var(--ds-space-control-padding-y)",
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".ds-btn": {
          paddingInline: "var(--ds-space-control-padding-x)",
          paddingBlock: "var(--ds-space-control-padding-y)",
          borderRadius: "var(--ds-radius-control)",
          background: "var(--ds-color-button-primary-bg)",
          color: "var(--ds-color-button-primary-fg)",
          '&[aria-disabled="true"], &[data-disabled]': {
            opacity: 0.5,
            pointerEvents: "none",
          },
        },
      });
    },
  ],
};
