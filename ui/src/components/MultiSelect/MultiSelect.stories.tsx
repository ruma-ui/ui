import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { FaAndroid, FaApple, FaChrome, FaLinux, FaQuestion, FaWindows } from "react-icons/fa";
import { RiComputerLine } from "react-icons/ri";
import { tw } from "../../lib/utils";
import { MultiSelect, MultiSelectProps } from "./MultiSelect";
import mdx from "./MultiSelect.mdx";

const meta: Meta<typeof MultiSelect> = {
  title: "Components/MultiSelect",
  component: MultiSelect,
  decorators: [
    Story => (
      <div style={{ minHeight: "350px" }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "padded",
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["primary", "secondary"],
      description: "The visual style of the multi-select",
      defaultValue: "primary",
      type: {
        name: "enum",
        value: ["primary", "secondary"],
      },
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
      description: "The size of the multi-select",
      defaultValue: "md",
      type: {
        name: "enum",
        value: ["sm", "md", "lg"],
      },
    },
    rounded: {
      control: { type: "radio" },
      options: ["none", "sm", "md", "lg", "xl", "full"],
      description: "Control the border radius of the multi-select",
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
      description: "Make multi-select take full width of its container",
      defaultValue: false,
      type: { name: "boolean" },
    },
    width: {
      control: { type: "radio" },
      options: ["sm", "md", "lg", "xl"],
      description: "Preset width of the multi-select wrapper",
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
      description: "Disable the multi-select",
      defaultValue: false,
      type: { name: "boolean" },
    },
    showSelectedCount: {
      control: { type: "boolean" },
      description: "Show selected count in trigger",
      defaultValue: true,
      type: { name: "boolean" },
    },
    maxSelections: {
      control: { type: "number" },
      description: "Maximum number of selections allowed",
    },
    label: {
      control: { type: "text" },
      description: "Optional label text displayed above the multi-select",
    },
    description: {
      control: { type: "text" },
      description: "Optional helper/description text displayed below the multi-select",
    },
    errorMessage: {
      control: { type: "text" },
      description: "Error message to display below the multi-select",
    },
    placeholder: {
      control: { type: "text" },
      description: "Placeholder text when no options are selected",
    },
    startIcon: {
      control: false,
      description: "Optional left icon - accepts any React element",
    },
    value: { control: "object" },
    defaultValue: { control: "object" },
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
    placeholder: "Select options...",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    options: defaultOptions,
    placeholder: "Select options...",
    variant: "secondary",
  },
};

export const WithLabel: Story = {
  args: {
    options: countryOptions,
    label: "Countries",
    placeholder: "Select your countries...",
  },
};

export const WithDescription: Story = {
  args: {
    options: categoryOptions,
    label: "Departments",
    description: "Choose your departments from the list",
    placeholder: "Select departments...",
  },
};

export const WithStartIcon: Story = {
  args: {
    options: osOptions,
    label: "Operating Systems",
    startIcon: <RiComputerLine />,
    placeholder: "Select your operating systems...",
  },
};

export const ErrorState: Story = {
  args: {
    options: defaultOptions,
    label: "Required Field",
    error: true,
    errorMessage: "This field is required",
    placeholder: "Select options...",
  },
};

export const Disabled: Story = {
  args: {
    options: defaultOptions,
    label: "Disabled MultiSelect",
    disabled: true,
    placeholder: "This multi-select is disabled...",
  },
};

export const FullWidth: Story = {
  args: {
    options: countryOptions,
    label: "Full Width MultiSelect",
    placeholder: "This multi-select takes full width...",
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
    placeholder: "Custom multi-select...",
    className: tw`border-purple-500 focus-within:border-purple-500 focus-within:ring-purple-200 focus:ring-purple-500`,
  },
};

export const MaxSelections: Story = {
  args: {
    options: countryOptions,
    label: "Max 3 Selections",
    maxSelections: 3,
    placeholder: "Select up to 3 countries...",
  },
};

export const ShowSelectedLabels: Story = {
  args: {
    options: defaultOptions,
    label: "Show Selected Labels",
    showSelectedCount: false,
    placeholder: "Select options to see labels...",
  },
};

const ControlledComponent = (args: Partial<MultiSelectProps>) => {
  const [value, setValue] = useState<string[]>(["option1", "option3"]);

  return (
    <div className='w-80'>
      <MultiSelect
        {...args}
        value={value}
        onValueChange={setValue}
        options={defaultOptions}
        label='Controlled MultiSelect'
        placeholder='Select options...'
      />
      <p className='mt-2 text-sm text-gray-600'>Selected values: {value.join(", ") || "None"}</p>
    </div>
  );
};

export const Controlled: Story = {
  render: args => <ControlledComponent {...args} />,
};

export const WithDisabledOptions: Story = {
  args: {
    options: categoryOptions,
    label: "Departments with Disabled Options",
    placeholder: "Select departments...",
  },
};
