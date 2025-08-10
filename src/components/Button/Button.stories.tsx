import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./Button";
import { FaLink, FaArrowRight } from "react-icons/fa";
import mdx from "./Button.mdx";
import { tw } from "@/utils/tw";

const meta: Meta<typeof Button> = {
    title: "Components/Button",
    component: Button,
    parameters: {
        layout: "centered",
        docs: {
            page: mdx,
        },
    },
    argTypes: {
        variant: {
            control: { type: "radio" },
            options: ["primary", "secondary", "outline", "tertiary", "destructive", "none"],
            description: "The visual style of the button",
            defaultValue: "primary",
            type: {
                name: "enum",
                value: ["primary", "secondary", "outline", "tertiary", "destructive", "none"],
            },
        },
        size: {
            control: { type: "radio" },
            options: ["xs", "sm", "md", "lg", "xl"],
            description: "The size of the button",
            defaultValue: "md",
            type: {
                name: "enum",
                value: ["xs", "sm", "md", "lg", "xl"],
            },
        },
        rounded: {
            control: { type: "radio" },
            options: ["none", "sm", "md", "lg", "xl", "full"],
            description: "Control the border radius of the button",
            defaultValue: "xl",
            type: {
                name: "enum",
                value: ["none", "sm", "md", "lg", "xl", "full"],
            },
        },
        animation: {
            control: { type: "radio" },
            options: ["none", "scale", "glow", "lift", "ripple", "press"],
            description: "Animation effect on user interaction",
            defaultValue: "none",
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
        fullWidth: {
            control: "boolean",
            description: "Make button take full width of its container",
            defaultValue: false,
            type: { name: "boolean" },
        },
        disabled: {
            control: "boolean",
            description: "Disable the button",
            type: { name: "boolean" },
        },
        startIcon: {
            control: false,
            description: "Optional left icon - accepts any React element",
        },
        endIcon: {
            control: false,
            description: "Optional right icon - accepts any React element",
        },
        onClick: { action: "clicked" },
        children: {
            description: "Button content (text, elements, etc.)",
            control: { type: "text" },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        children: "Sign Up",
        variant: "primary",
    },
};

export const Secondary: Story = {
    args: {
        children: "Cancel",
        variant: "secondary",
    },
};

export const Tertiary: Story = {
    args: {
        children: "Login",
        variant: "tertiary",
    },
};

export const Outline: Story = {
    args: {
        children: "Copy link",
        variant: "outline",
    },
};

export const Destructive: Story = {
    args: {
        children: "Delete",
        variant: "destructive",
    },
};

export const None: Story = {
    args: {
        children: "No Style",
        variant: "none",
    },
};

export const WithStartIcon: Story = {
    args: {
        children: "Copy link",
        variant: "outline",
        startIcon: <FaLink size={16} />,
    },
};

export const WithEndIcon: Story = {
    args: {
        children: "Forward",
        variant: "primary",
        endIcon: <FaArrowRight size={16} />,
    },
};

export const Loading: Story = {
    args: {
        children: "Loading...",
        loading: true,
    },
};

export const Disabled: Story = {
    args: {
        children: "Disabled",
        disabled: true,
    },
};

export const FullWidthPrimary: Story = {
    args: {
        children: "Full Width Button",
        variant: "primary",
        fullWidth: true,
    },
    parameters: {
        layout: "padded",
    },
};

export const AnimationScale: Story = {
    args: {
        children: "Scale Animation",
        variant: "outline",
        animation: "scale",
    },
};

export const CustomStyled: Story = {
    args: {
        children: "Custom Styled",
        variant: "primary",
        className: tw`bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg hover:from-purple-600 hover:to-pink-600`,
    },
};
