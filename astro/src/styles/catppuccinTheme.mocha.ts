import { createCatppuccinPlugin } from "@catppuccin/daisyui";

// Use Catppuccin Mocha theme with mauve as accent, set as default theme
export default createCatppuccinPlugin(
  "mocha",
  { accent: "mauve" },
  { default: true },
);
