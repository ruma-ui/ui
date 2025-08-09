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
        },
        color: {
            control: { type: "color" },
        },
        size: {
            control: { type: "radio" },
            options: ["xs", "sm", "md", "lg", "xl"],
        },
        type: {
            control: { type: "radio" },
            options: ["spinner", "dots", "pulse", "wave", "bars", "ring"],
        },
        speed: {
            control: { type: "radio" },
            options: ["slow", "normal", "fast"],
        },
        fullSize: { control: "boolean" },
        label: { control: "text" },
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
