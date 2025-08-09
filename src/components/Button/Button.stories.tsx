import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { Link, ArrowRight } from "lucide-react";
import mdx from "./Button.mdx";

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
            options: ["primary", "secondary", "outline", "ghost", "destructive", "none"],
        },
        size: {
            control: { type: "radio" },
            options: ["xs", "sm", "md", "lg", "xl"],
        },
        rounded: {
            control: { type: "radio" },
            options: ["none", "sm", "md", "lg", "full"],
        },
        animation: {
            control: { type: "radio" },
            options: ["none", "scale", "fade", "slide", "glow", "lift", "ripple", "press"],
        },
        loading: { control: "boolean" },
        fullWidth: { control: "boolean" },
        disabled: { control: "boolean" },
        startIcon: { control: false },
        endIcon: { control: false },
        onClick: { action: "clicked" },
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

export const Outline: Story = {
    args: {
        children: "Copy link",
        variant: "outline",
    },
};

export const Ghost: Story = {
    args: {
        children: "Login",
        variant: "ghost",
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
        startIcon: <Link size={16} />,
    },
};

export const WithEndIcon: Story = {
    args: {
        children: "Forward",
        variant: "primary",
        endIcon: <ArrowRight size={16} />,
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

export const WithCustomClassName: Story = {
    args: {
        children: "Custom Styled",
        variant: "primary",
        className:
            "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg",
    },
};
