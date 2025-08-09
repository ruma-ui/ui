import type { Meta, StoryObj } from "@storybook/react";
import { Loader } from "./Loader";
import mdx from "./Loader.mdx";

const meta: Meta<typeof Loader> = {
    title: "Components/Loader",
    component: Loader,
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
            description: "The visual style of the loader",
            defaultValue: "primary",
            type: {
                name: "enum",
                value: ["primary", "secondary"],
            },
        },
        color: {
            control: { type: "color" },
            description: "Custom color for the loader (overrides variant)",
            type: { name: "string" },
        },
        size: {
            control: { type: "radio" },
            options: ["xs", "sm", "md", "lg", "xl"],
            description: "The size of the loader",
            defaultValue: "md",
            type: {
                name: "enum",
                value: ["xs", "sm", "md", "lg", "xl"],
            },
        },
        type: {
            control: { type: "radio" },
            options: ["spinner", "dots", "pulse", "wave", "bars", "ring"],
            description: "The type of loader animation",
            defaultValue: "spinner",
            type: {
                name: "enum",
                value: ["spinner", "dots", "pulse", "wave", "bars", "ring"],
            },
        },
        speed: {
            control: { type: "radio" },
            options: ["slow", "normal", "fast"],
            description: "Animation speed of the loader",
            defaultValue: "normal",
            type: {
                name: "enum",
                value: ["slow", "normal", "fast"],
            },
        },
        fullSize: {
            control: "boolean",
            description: "Make loader take full width and height of its container",
            defaultValue: false,
            type: { name: "boolean" },
        },
        label: {
            control: "text",
            description: "Optional text label displayed below the loader",
            type: { name: "string" },
        },
        strokeWidth: {
            control: { type: "radio" },
            options: ["thin", "normal", "thick"],
            description: "Controls the stroke width for spinner and ring loaders",
            defaultValue: "normal",
            type: {
                name: "enum",
                value: ["thin", "normal", "thick"],
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const Primary: Story = {
    args: {
        variant: "primary",
        type: "spinner",
    },
};

export const Secondary: Story = {
    args: {
        variant: "secondary",
        type: "spinner",
    },
};

export const CustomColor: Story = {
    args: {
        color: "#10b981",
        type: "spinner",
    },
};

export const WithLabel: Story = {
    args: {
        variant: "primary",
        type: "spinner",
        label: "Loading...",
    },
};

export const Dots: Story = {
    args: {
        variant: "primary",
        type: "dots",
    },
};

export const Pulse: Story = {
    args: {
        variant: "primary",
        type: "pulse",
    },
};

export const Wave: Story = {
    args: {
        variant: "primary",
        type: "wave",
    },
};

export const Bars: Story = {
    args: {
        variant: "primary",
        type: "bars",
    },
};

export const Ring: Story = {
    args: {
        variant: "primary",
        type: "ring",
    },
};

export const FullSize: Story = {
    args: {
        variant: "primary",
        type: "spinner",
        fullSize: true,
        label: "Loading content...",
    },
    decorators: [
        (Story) => (
            <div className="h-full min-h-full border border-gray-200 py-10">
                <Story />
            </div>
        ),
    ],
    parameters: {
        layout: "padded",
    },
};

export const CustomStyled: Story = {
    args: {
        color: "#6b46c1", // Darker purple for better contrast
        type: "spinner",
        className: "bg-white p-4 rounded-lg shadow-sm border border-gray-200",
        label: "Custom styled loader",
    },
};
