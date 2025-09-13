import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Slider } from "./Slider";
import { useState } from "react";
import mdx from "./Slider.mdx";

const meta: Meta<typeof Slider> = {
    title: "Components/Slider",
    component: Slider,
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
            description: "The visual style of the slider",
            defaultValue: "primary",
            type: {
                name: "enum",
                value: ["primary", "secondary"],
            },
        },
        size: {
            control: { type: "radio" },
            options: ["sm", "md", "lg"],
            description: "The size of the slider",
            defaultValue: "md",
            type: {
                name: "enum",
                value: ["sm", "md", "lg"],
            },
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
        showValue: {
            control: "boolean",
            description: "Show value label",
            defaultValue: false,
            type: { name: "boolean" },
        },
        disabled: {
            control: "boolean",
            description: "Whether the slider is disabled",
            defaultValue: false,
            type: { name: "boolean" },
        },
        error: {
            control: "boolean",
            description: "Show error state",
            defaultValue: false,
            type: { name: "boolean" },
        },
        value: {
            control: { type: "number" },
            description: "Current value (controlled)",
        },
        defaultValue: {
            control: { type: "number" },
            description: "Default value for uncontrolled slider",
            defaultValue: 0,
        },
        label: {
            control: { type: "text" },
            description: "Optional label text displayed above the slider",
        },
        description: {
            control: { type: "text" },
            description: "Optional helper/description text displayed below the slider",
        },
        errorMessage: {
            control: { type: "text" },
            description: "Error message to display below the slider",
        },
        onChange: { action: "onChange" },
        onChangeEnd: { action: "onChangeEnd" },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        variant: "primary",
    },
};

export const Secondary: Story = {
    args: {
        variant: "secondary",
    },
};

export const WithLabel: Story = {
    args: {
        label: "Volume",
    },
};

export const WithValue: Story = {
    args: {
        label: "Brightness",
        showValue: true,
    },
};

export const WithDescription: Story = {
    args: {
        label: "Font Size",
        description: "Adjust the font size for better readability",
    },
};

export const ErrorState: Story = {
    args: {
        label: "Required setting",
        error: true,
        errorMessage: "This setting must be configured",
    },
};

export const Disabled: Story = {
    args: {
        label: "Disabled slider",
        disabled: true,
    },
};

export const CustomRange: Story = {
    args: {
        label: "Temperature (°C)",
        min: -10,
        max: 40,
        defaultValue: 20,
        showValue: true,
    },
};

export const WithStep: Story = {
    args: {
        label: "Rating",
        min: 1,
        max: 5,
        step: 1,
        defaultValue: 3,
        showValue: true,
    },
};

export const Controlled: Story = {
    render: (args) => {
        const [value, setValue] = useState(50);

        return (
            <div className="space-y-4">
                <Slider
                    {...args}
                    label="Controlled slider"
                    value={value}
                    onChange={setValue}
                    showValue
                />
                <p className="text-sm text-gray-600">Value: {value}</p>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setValue(25)}
                        className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                    >
                        Set to 25
                    </button>
                    <button
                        onClick={() => setValue(75)}
                        className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                    >
                        Set to 75
                    </button>
                </div>
            </div>
        );
    },
};

export const SettingsPanel: Story = {
    render: () => {
        const [settings, setSettings] = useState({
            volume: 70,
            brightness: 80,
            sensitivity: 50,
            quality: 85,
        });

        const updateSetting = (key: string) => (value: number) => {
            setSettings((prev) => ({ ...prev, [key]: value }));
        };

        return (
            <div className="w-96 space-y-6 rounded-lg bg-white p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900">Display Settings</h3>
                <div className="space-y-4">
                    <Slider
                        label="Volume"
                        description="Adjust system volume level"
                        value={settings.volume}
                        onChange={updateSetting("volume")}
                        showValue
                    />
                    <Slider
                        label="Brightness"
                        description="Screen brightness adjustment"
                        value={settings.brightness}
                        onChange={updateSetting("brightness")}
                        showValue
                    />
                    <Slider
                        label="Mouse Sensitivity"
                        description="Adjust pointer speed"
                        value={settings.sensitivity}
                        onChange={updateSetting("sensitivity")}
                        showValue
                    />
                    <Slider
                        label="Quality"
                        description="Rendering quality setting"
                        value={settings.quality}
                        onChange={updateSetting("quality")}
                        showValue
                    />
                </div>
                <div className="border-t border-gray-200 pt-4">
                    <pre className="text-xs text-gray-600">{JSON.stringify(settings, null, 2)}</pre>
                </div>
            </div>
        );
    },
};

export const Sizes: Story = {
    render: () => (
        <div className="grid place-items-center space-y-6">
            <Slider size="sm" label="Small" defaultValue={30} showValue />
            <Slider size="md" label="Medium" defaultValue={50} showValue />
            <Slider size="lg" label="Large" defaultValue={70} showValue />
        </div>
    ),
};

export const Variants: Story = {
    render: () => (
        <div className="space-y-6">
            <Slider variant="primary" label="Primary" defaultValue={40} showValue />
            <Slider variant="secondary" label="Secondary" defaultValue={60} showValue />
        </div>
    ),
};
