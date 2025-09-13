import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import { RangeInput } from "./RangeInput";

const meta: Meta<typeof RangeInput> = {
    title: "Components/RangeInput",
    component: RangeInput,
    parameters: {
        layout: "centered",
        docs: {
            page: null, // We'll create a separate MDX file
        },
    },
    argTypes: {
        value: {
            control: { type: "object" },
            description: "The current range values as [min, max]",
        },
        defaultValue: {
            control: { type: "object" },
            description: "Default range values for uncontrolled component",
            defaultValue: [0, 100],
        },
        min: {
            control: { type: "number" },
            description: "Minimum value",
            defaultValue: 0,
        },
        max: {
            control: { type: "number" },
            description: "Maximum value",
            defaultValue: 100,
        },
        step: {
            control: { type: "number" },
            description: "Step increment",
            defaultValue: 1,
        },
        disabled: {
            control: "boolean",
            description: "Whether the range input is disabled",
            defaultValue: false,
        },
        variant: {
            control: { type: "radio" },
            options: ["primary", "secondary"],
            description: "The visual style of the range input",
            defaultValue: "primary",
        },
        size: {
            control: { type: "radio" },
            options: ["sm", "md", "lg"],
            description: "The size of the range input",
            defaultValue: "md",
        },
        showValue: {
            control: "boolean",
            description: "Show value labels",
            defaultValue: false,
        },
        label: {
            control: "text",
            description: "Optional label text displayed above the range input",
        },
        description: {
            control: "text",
            description: "Optional helper/description text displayed below the range input",
        },
        error: {
            control: "boolean",
            description: "Show error state",
            defaultValue: false,
        },
        errorMessage: {
            control: "text",
            description: "Error message to display below the range input",
        },
        onChange: { action: "rangeChanged" },
        onChangeEnd: { action: "rangeChangeEnd" },
    },
};

export default meta;
type Story = StoryObj<typeof RangeInput>;

export const Default: Story = {
    args: {
        defaultValue: [20, 80],
    },
};

export const WithLabel: Story = {
    args: {
        label: "Price Range",
        defaultValue: [50, 200],
        min: 0,
        max: 500,
        showValue: true,
        description: "Select your preferred price range",
    },
};

export const Small: Story = {
    args: {
        size: "sm",
        defaultValue: [10, 90],
    },
};

export const Large: Story = {
    args: {
        size: "lg",
        defaultValue: [25, 75],
    },
};

export const Secondary: Story = {
    args: {
        variant: "secondary",
        defaultValue: [30, 70],
    },
};

export const WithSteps: Story = {
    args: {
        defaultValue: [0, 50],
        step: 5,
        showValue: true,
        label: "Volume (5% steps)",
    },
};

export const Error: Story = {
    args: {
        error: true,
        errorMessage: "Please select a valid range",
        defaultValue: [40, 60],
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        defaultValue: [20, 80],
    },
};

export const Controlled: Story = {
    args: {
        value: [15, 85],
        min: 0,
        max: 100,
    },
    render: (args) => {
        const [range, setRange] = React.useState(args.value);
        return (
            <div className="space-y-4">
                <RangeInput {...args} value={range} onChange={setRange} />
                <div className="text-sm text-gray-600">
                    Selected range:{" "}
                    <span className="font-mono">
                        {range?.[0]} - {range?.[1]}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-4 flex-1 rounded bg-gray-200">
                        <div
                            className="h-full rounded bg-blue-600"
                            style={{
                                marginLeft: `${((range?.[0] || 0) / 100) * 100}%`,
                                width: `${(((range?.[1] || 100) - (range?.[0] || 0)) / 100) * 100}%`,
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    },
};

export const TemperatureRange: Story = {
    args: {
        label: "Temperature Range (°C)",
        defaultValue: [15, 25],
        min: -10,
        max: 40,
        showValue: true,
        valueFormatter: (value) => `${value}°C`,
        description: "Select comfortable temperature range",
    },
};

export const FileSizeRange: Story = {
    args: {
        label: "File Size",
        defaultValue: [1, 10],
        min: 0.1,
        max: 100,
        step: 0.1,
        showValue: true,
        valueFormatter: (value) => `${value.toFixed(2)} MB`,
    },
};
