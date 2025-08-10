import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox, CheckboxGroup } from "./Checkbox";
import mdx from "./Checkbox.mdx";

const meta: Meta<typeof Checkbox> = {
    title: "Components/Checkbox",
    component: Checkbox,
    subcomponents: { CheckboxGroup },
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
            description: "The visual style of the checkbox",
            defaultValue: "primary",
            type: {
                name: "enum",
                value: ["primary", "secondary"],
            },
        },
        size: {
            control: { type: "radio" },
            options: ["xs", "sm", "md", "lg", "xl"],
            description: "The size of the checkbox",
            defaultValue: "md",
            type: {
                name: "enum",
                value: ["xs", "sm", "md", "lg", "xl"],
            },
        },
        rounded: {
            control: { type: "radio" },
            options: ["none", "sm", "md", "lg", "xl", "full"],
            description: "Control the border radius of the checkbox",
            defaultValue: "md",
            type: {
                name: "enum",
                value: ["none", "sm", "md", "lg", "xl", "full"],
            },
        },
        animation: {
            control: "boolean",
            description: "Smooth scale animation for icon transitions",
            defaultValue: false,
            type: { name: "boolean" },
        },
        labelPosition: {
            control: { type: "radio" },
            options: ["left", "right"],
            description: "Position of the label relative to checkbox",
            defaultValue: "right",
            type: {
                name: "enum",
                value: ["left", "right"],
            },
        },
        checked: {
            control: "boolean",
            description: "Whether the checkbox is checked",
            type: { name: "boolean" },
        },
        indeterminate: {
            control: "boolean",
            description: "Indeterminate state for partial selection",
            defaultValue: false,
            type: { name: "boolean" },
        },
        disabled: {
            control: "boolean",
            description: "Whether the checkbox is disabled",
            type: { name: "boolean" },
        },
        error: {
            control: "boolean",
            description: "Show error state",
            defaultValue: false,
            type: { name: "boolean" },
        },
        required: {
            control: "boolean",
            description: "Make checkbox required",
            defaultValue: false,
            type: { name: "boolean" },
        },
        color: {
            control: "color",
            description: "Custom color for the checkbox",
        },
        label: {
            control: "text",
            description: "Optional label text",
        },
        description: {
            control: "text",
            description: "Optional description text",
        },
        errorMessage: {
            control: "text",
            description: "Error message to display",
        },
        onChange: { action: "changed" },
    },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Primary: Story = {
    args: {
        label: "Primary checkbox",
        variant: "primary",
    },
};

export const Secondary: Story = {
    args: {
        label: "Secondary checkbox",
        variant: "secondary",
    },
};

export const Checked: Story = {
    args: {
        label: "Checked checkbox",
        checked: true,
    },
};

export const Indeterminate: Story = {
    args: {
        label: "Indeterminate checkbox",
        indeterminate: true,
    },
};

export const Disabled: Story = {
    args: {
        label: "Disabled checkbox",
        disabled: true,
    },
};

export const WithDescription: Story = {
    args: {
        label: "Accept terms and conditions",
        description: "By checking this box, you agree to our terms of service and privacy policy.",
    },
};

export const Required: Story = {
    args: {
        label: "Required checkbox",
        required: true,
        description: "This field is required to continue.",
    },
};

export const WithError: Story = {
    args: {
        label: "Checkbox with error",
        error: true,
        errorMessage: "You must accept the terms to continue.",
        color: "#ff0000",
    },
};

export const WithAnimation: Story = {
    args: {
        label: "Checkbox with animation",
        animation: true,
    },
};

export const CustomColor: Story = {
    args: {
        label: "Custom color checkbox",
        color: "#10b981",
        checked: true,
    },
};

type CheckboxGroupStory = StoryObj<typeof CheckboxGroup>;

export const BasicGroup: CheckboxGroupStory = {
    render: () => (
        <CheckboxGroup
            label="Select your interests"
            description="Choose all that apply"
            options={[
                { value: "sports", label: "Sports" },
                { value: "music", label: "Music" },
                { value: "technology", label: "Technology" },
                { value: "art", label: "Art" },
            ]}
        />
    ),
};

export const WithSelectAll: CheckboxGroupStory = {
    render: () => (
        <CheckboxGroup
            label="Select features"
            enableSelectAll
            selectAllLabel="Enable all features"
            options={[
                { value: "notifications", label: "Push notifications" },
                { value: "analytics", label: "Analytics tracking" },
                { value: "marketing", label: "Marketing emails" },
                { value: "updates", label: "Product updates" },
            ]}
        />
    ),
};

export const HorizontalGroup: CheckboxGroupStory = {
    render: () => (
        <CheckboxGroup
            label="Horizontal layout"
            direction="horizontal"
            options={[
                { value: "small", label: "Small" },
                { value: "medium", label: "Medium" },
                { value: "large", label: "Large" },
            ]}
        />
    ),
};
