import type { Meta, StoryObj } from "@storybook/react-vite";
import { Clipboard } from "./Clipboard";
import mdx from "./Clipboard.mdx";

const meta: Meta<typeof Clipboard> = {
  title: "Components/Clipboard",
  component: Clipboard,
  parameters: {
    layout: "centered",
    docs: {
      page: mdx,
    },
  },
  decorators: [
    Story => (
      <div className="flex items-center justify-center p-8">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["primary", "secondary", "outline", "ghost"],
      description: "The visual style of the clipboard trigger",
      defaultValue: "primary",
      type: {
        name: "enum",
        value: ["primary", "secondary", "outline", "ghost"],
      },
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
      description: "The size of the clipboard trigger",
      defaultValue: "md",
      type: {
        name: "enum",
        value: ["sm", "md", "lg"],
      },
    },
    rounded: {
      control: { type: "radio" },
      options: ["none", "sm", "md", "lg", "xl", "full"],
      description: "Control the border radius of the clipboard trigger",
      defaultValue: "md",
      type: {
        name: "enum",
        value: ["none", "sm", "md", "lg", "xl", "full"],
      },
    },
    iconOnly: {
      control: "boolean",
      description: "Show only the icon without text",
      defaultValue: true,
      type: { name: "boolean" },
    },
    tooltip: {
      control: "text",
      description: "Tooltip content to show on hover",
      defaultValue: "Copy to clipboard",
      type: { name: "string" },
    },
    showFeedback: {
      control: "boolean",
      description: "Show visual feedback when text is copied",
      defaultValue: true,
      type: { name: "boolean" },
    },
    feedbackText: {
      control: "text",
      description: "Custom feedback text to display",
      defaultValue: "Copied!",
      type: { name: "string" },
    },
    feedbackDuration: {
      control: { type: "number", min: 500, max: 10000, step: 500 },
      description: "Duration in milliseconds to show feedback",
      defaultValue: 2000,
      type: { name: "number" },
    },
    disabled: {
      control: "boolean",
      description: "Disable the clipboard functionality",
      type: { name: "boolean" },
    },
    animation: {
      control: { type: "radio" },
      options: ["none", "scale", "glow", "press"],
      description: "Animation effect on user interaction",
      defaultValue: "none",
      type: {
        name: "enum",
        value: ["none", "scale", "glow", "press"],
      },
    },
    value: {
      control: "text",
      description: "The text content to copy to clipboard",
      type: { name: "string" },
    },
    onCopy: { action: "copied" },
    onError: { action: "error" },
  },
};

export default meta;
type Story = StoryObj<typeof Clipboard>;

export const Default: Story = {
  args: {
    value: "https://example.com",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    value: "npm install @ruma-ui/ui",
    variant: "secondary",
  },
};

export const Outline: Story = {
  args: {
    value: "Outline clipboard",
    variant: "outline",
  },
};

export const Ghost: Story = {
  args: {
    value: "Ghost clipboard",
    variant: "ghost",
  },
};

export const WithAnimation: Story = {
  args: {
    value: "Animated clipboard",
    variant: "primary",
    animation: "scale",
  },
};

export const ScaleAnimation: Story = {
  args: {
    value: "Scale animation",
    variant: "primary",
    animation: "scale",
  },
};

export const GlowAnimation: Story = {
  args: {
    value: "Glow animation",
    variant: "primary",
    animation: "glow",
  },
};

export const PressAnimation: Story = {
  args: {
    value: "Press animation",
    variant: "primary",
    animation: "press",
  },
};

export const NoAnimation: Story = {
  args: {
    value: "No animation",
    variant: "primary",
    animation: "none",
  },
};

export const WithTooltip: Story = {
  args: {
    value: "Copy this text",
    tooltip: "Click to copy to clipboard",
    variant: "primary",
  },
  parameters: {
    docs: {
      description: {
        story:
          'The tooltip changes to "Copied!" when the content is successfully copied to the clipboard.',
      },
    },
  },
};

export const IconOnly: Story = {
  args: {
    value: "Icon only example",
    iconOnly: true,
    tooltip: "Copy to clipboard",
    variant: "secondary",
  },
};

export const CustomFeedback: Story = {
  args: {
    value: "Custom feedback example",
    feedbackText: "✅ Copied to clipboard!",
    feedbackDuration: 3000,
    variant: "primary",
  },
};

export const NoFeedback: Story = {
  args: {
    value: "No feedback shown",
    showFeedback: false,
    variant: "secondary",
  },
};

export const Disabled: Story = {
  args: {
    value: "This won't copy",
    disabled: true,
    variant: "primary",
  },
};

export const SmallSize: Story = {
  args: {
    value: "Small clipboard",
    size: "sm",
    variant: "primary",
  },
};

export const LargeSize: Story = {
  args: {
    value: "Large clipboard",
    size: "lg",
    variant: "secondary",
  },
};

export const WithText: Story = {
  args: {
    value: "Text is visible now",
    iconOnly: false,
    variant: "primary",
    tooltip: "Copy with text",
  },
};

export const WithTextSecondary: Story = {
  args: {
    value: "Secondary variant with text",
    iconOnly: false,
    variant: "secondary",
    tooltip: "Copy with text",
  },
};

export const WithTextOutline: Story = {
  args: {
    value: "Outline variant with text",
    iconOnly: false,
    variant: "outline",
    tooltip: "Copy with text",
  },
};

export const WithTextGhost: Story = {
  args: {
    value: "Ghost variant with text",
    iconOnly: false,
    variant: "ghost",
    tooltip: "Copy with text",
  },
};
