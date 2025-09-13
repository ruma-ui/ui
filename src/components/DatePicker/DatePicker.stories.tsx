import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { DatePicker } from "./DatePicker";
import mdx from "./DatePicker.mdx";

const meta: Meta<typeof DatePicker> = {
    title: "Components/DatePicker",
    component: DatePicker,
    parameters: {
        layout: "centered",
        docs: { page: mdx },
    },
    argTypes: {
        variant: {
            control: { type: "radio" },
            options: ["primary", "secondary"],
            description: "The visual style of the input",
            defaultValue: "primary",
            type: { name: "enum", value: ["primary", "secondary"] },
        },
        size: {
            control: { type: "radio" },
            options: ["xs", "sm", "md", "lg", "xl"],
            description: "The size of the control",
            defaultValue: "md",
            type: { name: "enum", value: ["xs", "sm", "md", "lg", "xl"] },
        },
        rounded: {
            control: { type: "radio" },
            options: ["none", "sm", "md", "lg", "xl", "full"],
            description: "Border radius of the control",
            defaultValue: "sm",
            type: { name: "enum", value: ["none", "sm", "md", "lg", "xl", "full"] },
        },
        width: {
            control: { type: "radio" },
            options: ["sm", "md", "lg", "xl"],
            description: "Preset width of the wrapper",
            defaultValue: "md",
            type: { name: "enum", value: ["sm", "md", "lg", "xl"] },
        },
        fullWidth: {
            control: { type: "boolean" },
            description: "Make control take full width",
            defaultValue: false,
            type: { name: "boolean" },
        },
        withCalendar: {
            control: { type: "boolean" },
            description: "Toggle calendar popover feature",
            defaultValue: true,
            type: { name: "boolean" },
        },
        placeholder: { control: "text" },
        disabled: { control: { type: "boolean" } },
        error: { control: "text" },
        minDate: { control: false },
        maxDate: { control: false },
        value: { control: false },
        onChange: { action: "changed" },
        label: { control: "text" },
        description: { control: "text" },
    },
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Primary: Story = {
    args: {
        placeholder: "MM/DD/YYYY",
        variant: "primary",
        label: "Date",
    },
};

export const Secondary: Story = {
    args: {
        placeholder: "MM/DD/YYYY",
        variant: "secondary",
        label: "Date",
        description: "Enter a date in MM/DD/YYYY format",
    },
};

export const WithMinMax: Story = {
    args: {
        label: "DOB",
        description: "Date must be within the last 100 years and not in the future",
    },
    render: (args) => {
        const today = new Date();
        const min = new Date();
        min.setFullYear(today.getFullYear() - 100);
        return <DatePicker {...args} maxDate={today} minDate={min} />;
    },
};

export const Disabled: Story = {
    args: {
        label: "Disabled",
        disabled: true,
        placeholder: "MM/DD/YYYY",
    },
};

export const ErrorState: Story = {
    args: {
        label: "Date",
        error: "Invalid date",
        placeholder: "MM/DD/YYYY",
    },
};

export const FullWidth: Story = {
    args: {
        label: "Full width",
        placeholder: "MM/DD/YYYY",
        fullWidth: true,
    },
    parameters: { layout: "padded" },
};

export const Controlled: Story = {
    render: (args) => {
        const [date, setDate] = useState<Date | null>(null);
        return (
            <div className="w-80">
                <DatePicker
                    {...args}
                    label="Controlled"
                    value={date}
                    onChange={(d) => setDate(d)}
                    description={`Selected: ${date ? date.toDateString() : "None"}`}
                />
            </div>
        );
    },
    args: {
        withCalendar: true,
    },
};

export const WithoutCalendar: Story = {
    args: {
        label: "Manual only",
        withCalendar: false,
        placeholder: "MM/DD/YYYY",
    },
};

// Back-compat alias for routes or links expecting `controlled-external`
export const ControlledExternal: Story = {
    ...Controlled,
};
