import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";
import { useState } from "react";
import mdx from "./Select.mdx";
import { tw } from "@/utils/tw";
import { FaApple, FaWindows, FaLinux, FaAndroid, FaChrome, FaQuestion } from "react-icons/fa";
import { RiComputerLine } from "react-icons/ri";

const meta: Meta<typeof Select> = {
    title: "Components/Select",
    component: Select,
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
            description: "The visual style of the select",
            defaultValue: "primary",
            type: {
                name: "enum",
                value: ["primary", "secondary"],
            },
        },
        size: {
            control: { type: "radio" },
            options: ["sm", "md", "lg"],
            description: "The size of the select",
            defaultValue: "md",
            type: {
                name: "enum",
                value: ["sm", "md", "lg"],
            },
        },
        rounded: {
            control: { type: "radio" },
            options: ["none", "sm", "md", "lg", "xl", "full"],
            description: "Control the border radius of the select",
            defaultValue: "sm",
            type: {
                name: "enum",
                value: ["none", "sm", "md", "lg", "xl", "full"],
            },
        },
        animation: {
            control: { type: "boolean" },
            description: "Enable/disable animations",
            defaultValue: true,
            type: { name: "boolean" },
        },
        fullWidth: {
            control: { type: "boolean" },
            description: "Make select take full width of its container",
            defaultValue: false,
            type: { name: "boolean" },
        },
        width: {
            control: { type: "radio" },
            options: ["sm", "md", "lg", "xl"],
            description: "Preset width of the select wrapper",
            defaultValue: "md",
            type: {
                name: "enum",
                value: ["sm", "md", "lg", "xl"],
            },
        },
        error: {
            control: { type: "boolean" },
            description: "Show error state",
            defaultValue: false,
            type: { name: "boolean" },
        },
        disabled: {
            control: { type: "boolean" },
            description: "Disable the select",
            defaultValue: false,
            type: { name: "boolean" },
        },
        label: {
            control: { type: "text" },
            description: "Optional label text displayed above the select",
        },
        description: {
            control: { type: "text" },
            description: "Optional helper/description text displayed below the select",
        },
        errorMessage: {
            control: { type: "text" },
            description: "Error message to display below the select",
        },
        placeholder: {
            control: { type: "text" },
            description: "Placeholder text when no option is selected",
        },
        startIcon: {
            control: false,
            description: "Optional left icon - accepts any React element",
        },
        value: { control: "text" },
        defaultValue: { control: "text" },
        onValueChange: { action: "valueChanged" },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "option4", label: "Option 4" },
];

const countryOptions = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
    { value: "jp", label: "Japan" },
    { value: "au", label: "Australia" },
];

const osOptions = [
    { value: "macos", label: "macOS", icon: <FaApple /> },
    { value: "windows", label: "Windows", icon: <FaWindows /> },
    { value: "linux", label: "Linux", icon: <FaLinux /> },
    { value: "android", label: "Android", icon: <FaAndroid /> },
    { value: "chromeos", label: "Chrome OS", icon: <FaChrome /> },
    { value: "other", label: "Other", icon: <FaQuestion /> },
];

const categoryOptions = [
    { value: "tech", label: "Technology" },
    { value: "design", label: "Design" },
    { value: "marketing", label: "Marketing" },
    { value: "sales", label: "Sales" },
    { value: "support", label: "Support", disabled: true },
    { value: "hr", label: "Human Resources" },
];

export const Primary: Story = {
    args: {
        options: defaultOptions,
        placeholder: "Select an option...",
        variant: "primary",
    },
};

export const Secondary: Story = {
    args: {
        options: defaultOptions,
        placeholder: "Select an option...",
        variant: "secondary",
    },
};

export const WithLabel: Story = {
    args: {
        options: countryOptions,
        label: "Country",
        placeholder: "Select your country...",
    },
};

export const WithDescription: Story = {
    args: {
        options: categoryOptions,
        label: "Department",
        description: "Choose your department from the list",
        placeholder: "Select department...",
    },
};

export const WithStartIcon: Story = {
    args: {
        options: osOptions,
        label: "Operating System",
        startIcon: <RiComputerLine />,
        placeholder: "Select your operating system...",
    },
};

export const ErrorState: Story = {
    args: {
        options: defaultOptions,
        label: "Required Field",
        error: true,
        errorMessage: "This field is required",
        placeholder: "Select an option...",
    },
};

export const Disabled: Story = {
    args: {
        options: defaultOptions,
        label: "Disabled Select",
        disabled: true,
        placeholder: "This select is disabled...",
    },
};

export const FullWidth: Story = {
    args: {
        options: countryOptions,
        label: "Full Width Select",
        placeholder: "This select takes full width...",
        fullWidth: true,
    },
    parameters: {
        layout: "padded",
    },
};

export const NoAnimation: Story = {
    args: {
        options: defaultOptions,
        label: "No Animation",
        animation: false,
        placeholder: "Select without animations...",
    },
};

export const CustomStyled: Story = {
    args: {
        options: countryOptions,
        label: "Custom Styled",
        placeholder: "Custom select...",
        className: tw`border-purple-500 focus-within:border-purple-500 focus-within:ring-purple-200 focus:ring-purple-500`,
    },
};

export const Controlled: Story = {
    render: (args) => {
        const [value, setValue] = useState("");

        return (
            <div className="w-80">
                <Select
                    {...args}
                    value={value}
                    onValueChange={setValue}
                    options={countryOptions}
                    label="Controlled Select"
                    placeholder="Select your country..."
                />
                <p className="mt-2 text-sm text-gray-600">Selected value: {value || "None"}</p>
            </div>
        );
    },
};
