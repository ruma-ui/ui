import type { Meta, StoryObj } from "@storybook/react-vite";
import { FloatingActionButton } from "./FloatingActionButton";
import { AiOutlinePlus } from "react-icons/ai";
import { FaEdit, FaShare, FaTrash, FaHeart } from "react-icons/fa";
import mdx from "./FloatingActionButton.mdx";

const meta: Meta<typeof FloatingActionButton> = {
  title: "Components/FloatingActionButton",
  component: FloatingActionButton,
  parameters: {
    layout: "padded",
    docs: {
      page: mdx,
    },
  },
  decorators: [
    Story => (
      <div className='relative min-h-24 w-full'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["primary", "secondary", "tertiary", "destructive"],
      description: "The visual style of the floating action button",
      defaultValue: "primary",
      type: {
        name: "enum",
        value: ["primary", "secondary", "tertiary", "destructive"],
      },
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg", "xl"],
      description: "The size of the floating action button",
      defaultValue: "md",
      type: {
        name: "enum",
        value: ["sm", "md", "lg", "xl"],
      },
    },
    position: {
      control: { type: "radio" },
      options: ["bottom-right", "bottom-left", "top-right", "top-left"],
      description: "The position of the floating action button",
      defaultValue: "bottom-right",
      type: {
        name: "enum",
        value: ["bottom-right", "bottom-left", "top-right", "top-left"],
      },
    },
    rounded: {
      control: { type: "radio" },
      options: ["full", "xl", "lg"],
      description: "Control the border radius of the button",
      defaultValue: "full",
      type: {
        name: "enum",
        value: ["full", "xl", "lg"],
      },
    },
    animation: {
      control: { type: "radio" },
      options: ["none", "scale", "glow", "lift", "ripple", "press"],
      description: "Animation effect on user interaction",
      defaultValue: "scale",
      type: {
        name: "enum",
        value: ["none", "scale", "glow", "lift", "ripple", "press"],
      },
    },
    loading: {
      control: "boolean",
      description: "Show a loading spinner and disable the button",
      defaultValue: false,
      type: { name: "boolean" },
    },
    showTooltip: {
      control: "boolean",
      description: "Whether to show the tooltip",
      defaultValue: false,
      type: { name: "boolean" },
    },
    disabled: {
      control: "boolean",
      description: "Disable the button",
      type: { name: "boolean" },
    },
    icon: {
      control: false,
      description: "Icon to display in the button",
    },
    tooltip: {
      control: "text",
      description: "Optional tooltip text for accessibility",
    },
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof FloatingActionButton>;

export const Primary: Story = {
  args: {
    variant: "primary",
    icon: <AiOutlinePlus size={25} />,
    tooltip: "Add new item",
    showTooltip: true,
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    icon: <FaEdit size={20} />,
    tooltip: "Edit item",
    showTooltip: true,
  },
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    icon: <FaShare size={20} />,
    tooltip: "Share item",
    showTooltip: true,
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    icon: <FaTrash size={20} />,
    tooltip: "Delete item",
    showTooltip: true,
  },
};

export const BottomRight: Story = {
  args: {
    position: "bottom-right",
    icon: <AiOutlinePlus size={25} />,
    tooltip: "Add new item",
    showTooltip: true,
  },
};

export const BottomLeft: Story = {
  args: {
    position: "bottom-left",
    icon: <FaEdit size={20} />,
    tooltip: "Edit item",
    showTooltip: true,
  },
};

export const TopRight: Story = {
  args: {
    position: "top-right",
    icon: <FaShare size={20} />,
    tooltip: "Share item",
    showTooltip: true,
  },
};

export const TopLeft: Story = {
  args: {
    position: "top-left",
    icon: <FaTrash size={20} />,
    tooltip: "Delete item",
    showTooltip: true,
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    icon: <AiOutlinePlus size={16} />,
    tooltip: "Add new item",
    showTooltip: true,
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    icon: <AiOutlinePlus size={25} />,
    tooltip: "Add new item",
    showTooltip: true,
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    icon: <AiOutlinePlus size={24} />,
    tooltip: "Add new item",
    showTooltip: true,
  },
};

export const ExtraLarge: Story = {
  args: {
    size: "xl",
    icon: <AiOutlinePlus size={28} />,
    tooltip: "Add new item",
    showTooltip: true,
  },
};

export const WithTooltip: Story = {
  args: {
    icon: <FaHeart size={20} />,
    tooltip: "Like this item",
    showTooltip: true,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    icon: <AiOutlinePlus size={25} />,
    tooltip: "Adding item...",
    showTooltip: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    icon: <AiOutlinePlus size={25} />,
    tooltip: "Action unavailable",
    showTooltip: true,
  },
};

export const ScaleAnimation: Story = {
  args: {
    animation: "scale",
    icon: <AiOutlinePlus size={25} />,
    tooltip: "Scale animation",
    showTooltip: true,
  },
};

export const GlowAnimation: Story = {
  args: {
    animation: "glow",
    icon: <AiOutlinePlus size={25} />,
    tooltip: "Glow animation",
    showTooltip: true,
  },
};

export const LiftAnimation: Story = {
  args: {
    animation: "lift",
    icon: <AiOutlinePlus size={25} />,
    tooltip: "Lift animation",
    showTooltip: true,
  },
};

export const RippleAnimation: Story = {
  args: {
    animation: "ripple",
    icon: <AiOutlinePlus size={25} />,
    tooltip: "Ripple animation",
    showTooltip: true,
  },
};

export const PressAnimation: Story = {
  args: {
    animation: "press",
    icon: <AiOutlinePlus size={25} />,
    tooltip: "Press animation",
    showTooltip: true,
  },
};

export const WithMultipleActions: Story = {
  args: {
    variant: "primary",
    icon: <AiOutlinePlus size={25} />,
    tooltip: "More actions",
    showTooltip: true,
    actions: [
      {
        id: "edit",
        icon: <FaEdit size={20} />,
        tooltip: "Edit item",
        onClick: () => console.log("Edit clicked"),
        variant: "secondary",
      },
      {
        id: "share",
        icon: <FaShare size={20} />,
        tooltip: "Share item",
        onClick: () => console.log("Share clicked"),
        variant: "tertiary",
      },
      {
        id: "delete",
        icon: <FaTrash size={20} />,
        tooltip: "Delete item",
        onClick: () => console.log("Delete clicked"),
        variant: "destructive",
      },
    ],
  },
  decorators: [
    Story => (
      <div className='relative min-h-96 w-full p-4'>
        <Story />
      </div>
    ),
  ],
};
