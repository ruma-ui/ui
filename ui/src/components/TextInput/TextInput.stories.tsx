import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FaLock, FaSearch } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { TextInput, TextInputProps } from "./TextInput";
import mdx from "./TextInput.mdx";

const meta: Meta<typeof TextInput> = {
  title: "Components/TextInput",
  component: TextInput,
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

type Story = StoryObj<typeof TextInput>;

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

const WithIconsComponent = (args: Partial<TextInputProps>) => {
  const [show, setShow] = useState(false);
  return (
    <TextInput
      {...args}
      label={args.label ?? "Password"}
      placeholder={args.placeholder ?? "Enter your password"}
      type={show ? "text" : "password"}
      startIcon={<FaLock size={14} />}
      endIcon={
        <button
          type="button"
          aria-label={show ? "Hide password" : "Show password"}
          onClick={() => setShow(s => !s)}
          className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-inherit transition-colors duration-200 hover:bg-gray-100 hover:text-gray-700"
        >
          {show ? <BsEyeSlash size={18} /> : <BsEye size={18} />}
        </button>
      }
    />
  );
};

export const WithIcons: Story = {
  render: args => <WithIconsComponent {...args} />,
  args: {
    variant: "primary",
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

const SearchWithIconComponent = (args: Partial<TextInputProps>) => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <TextInput
      {...args}
      value={searchValue}
      onChange={e => setSearchValue(e.target.value)}
      placeholder={args.placeholder ?? "Search documentation..."}
      variant="secondary"
      startIcon={<FaSearch size={14} />}
      endIcon={
        searchValue ? (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => setSearchValue("")}
            className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-inherit transition-colors duration-200 hover:bg-gray-100 hover:text-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 focus:outline-none active:bg-gray-200"
          >
            <RxCross1 size={16} />
          </button>
        ) : null
      }
      rounded="full"
      size="lg"
      width="xl"
    />
  );
};

export const SearchWithIcon: Story = {
  render: args => <SearchWithIconComponent {...args} />,
  args: {},
};
