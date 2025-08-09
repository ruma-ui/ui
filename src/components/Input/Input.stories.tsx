import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";
import mdx from "./Input.mdx";
import { FaSearch, FaEye, FaEyeSlash } from "react-icons/fa";

const meta: Meta<typeof Input> = {
    title: "Components/Input",
    component: Input,
    parameters: {
        layout: "centered",
        docs: {
            page: mdx,
        },
    },
    argTypes: {
        variant: {
            control: { type: "radio" },
            options: ["primary", "secondary"],
            description: "The visual style of the input",
            defaultValue: "primary",
            type: {
                name: "enum",
                value: ["primary", "secondary"],
            },
        },
        size: {
            control: { type: "radio" },
            options: ["xs", "sm", "md", "lg", "xl"],
            description: "The size of the input",
            defaultValue: "md",
            type: {
                name: "enum",
                value: ["xs", "sm", "md", "lg", "xl"],
            },
        },
        rounded: {
            control: { type: "radio" },
            options: ["none", "sm", "md", "lg", "xl", "full"],
            description: "Control the border radius of the input",
            defaultValue: "sm",
            type: {
                name: "enum",
                value: ["none", "sm", "md", "lg", "xl", "full"],
            },
        },
        width: {
            control: { type: "radio" },
            options: ["sm", "md", "lg", "xl"],
            description: "Preset width of the input wrapper",
            defaultValue: "md",
            type: {
                name: "enum",
                value: ["sm", "md", "lg", "xl"],
            },
        },
        fullWidth: {
            control: "boolean",
            description: "Make input take full width of its container",
            defaultValue: false,
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
        label: {
            control: "text",
            description: "Optional label text displayed above the input",
        },
        description: {
            control: "text",
            description: "Optional helper/description text displayed below the input",
        },
        error: {
            control: "boolean",
            description: "Show error state",
            defaultValue: false,
            type: { name: "boolean" },
        },
        errorMessage: {
            control: "text",
            description: "Error message to display below the input",
        },
        disabled: {
            control: "boolean",
            description: "Disable the input",
            type: { name: "boolean" },
        },
        placeholder: {
            control: "text",
        },
        type: {
            control: { type: "radio" },
            options: ["text", "email", "password", "search", "number"],
        },
        value: { control: "text" },
        defaultValue: { control: "text" },
        onChange: { action: "changed" },
    },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Primary: Story = {
    args: {
        placeholder: "Enter your name",
        variant: "primary",
    },
};

export const Secondary: Story = {
    args: {
        placeholder: "Search...",
        variant: "secondary",
    },
};

export const WithLabel: Story = {
    args: {
        label: "Full name",
        placeholder: "John Doe",
    },
};

export const WithDescription: Story = {
    args: {
        label: "Email",
        placeholder: "you@example.com",
        description: "We will never share your email.",
        type: "email",
    },
};

export const WithIcons: Story = {
    args: {
        placeholder: "Search docs",
        startIcon: <FaSearch size={14} />,
        endIcon: <FaEye size={14} />,
        type: "search",
    },
};

export const ErrorState: Story = {
    args: {
        label: "Username",
        placeholder: "Pick a username",
        error: true,
        errorMessage: "Username is required",
    },
};

export const Disabled: Story = {
    args: {
        placeholder: "Disabled",
        disabled: true,
    },
};

export const FullWidth: Story = {
    args: {
        placeholder: "This input stretches to its container",
        fullWidth: true,
    },
    parameters: {
        layout: "padded",
    },
};
