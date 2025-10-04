import { create } from "@storybook/theming";
import { addons } from "storybook/manager-api";

const rumaTheme = create({
  base: "light",
  brandTitle: "Ruma UI",
  brandUrl: "https://github.com/ruma-ui/ui",
});

addons.setConfig({
  theme: rumaTheme,
});
