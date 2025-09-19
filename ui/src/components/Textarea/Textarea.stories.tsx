import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Textarea, TextareaProps } from "./Textarea";
import mdx from "./Textarea.mdx";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
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
      description: "The visual style of the textarea",
      defaultValue: "primary",
      type: {
        name: "enum",
        value: ["primary", "secondary"],
      },
    },
    size: {
      control: { type: "radio" },
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "The size of the textarea",
      defaultValue: "md",
      type: {
        name: "enum",
        value: ["xs", "sm", "md", "lg", "xl"],
      },
    },
    rounded: {
      control: { type: "radio" },
      options: ["none", "sm", "md", "lg", "xl", "full"],
      description: "Control the border radius of the textarea",
      defaultValue: "sm",
      type: {
        name: "enum",
        value: ["none", "sm", "md", "lg", "xl", "full"],
      },
    },
    width: {
      control: { type: "radio" },
      options: ["sm", "md", "lg", "xl"],
      description: "Preset width of the textarea wrapper",
      defaultValue: "md",
      type: {
        name: "enum",
        value: ["sm", "md", "lg", "xl"],
      },
    },
    rows: {
      control: { type: "number", min: 1, max: 20 },
      description: "Number of visible text lines",
      defaultValue: 3,
      type: { name: "number" },
    },
    resize: {
      control: { type: "radio" },
      options: ["none", "vertical", "horizontal", "both"],
      description: "Control textarea resize behavior",
      defaultValue: "vertical",
      type: {
        name: "enum",
        value: ["none", "vertical", "horizontal", "both"],
      },
    },
    fullWidth: {
      control: "boolean",
      description: "Make textarea take full width of its container",
      defaultValue: false,
      type: { name: "boolean" },
    },
    label: {
      control: "text",
      description: "Optional label text displayed above the textarea",
    },
    description: {
      control: "text",
      description: "Optional helper/description text displayed below the textarea",
    },
    error: {
      control: "boolean",
      description: "Show error state",
      defaultValue: false,
      type: { name: "boolean" },
    },
    errorMessage: {
      control: "text",
      description: "Error message to display below the textarea",
    },
    disabled: {
      control: "boolean",
      description: "Disable the textarea",
      type: { name: "boolean" },
    },
    placeholder: {
      control: "text",
    },
    value: { control: "text" },
    defaultValue: { control: "text" },
    onChange: { action: "changed" },
  },
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Primary: Story = {
  args: {
    placeholder: "Enter your message...",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    placeholder: "Write your thoughts...",
    variant: "secondary",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Comments",
    placeholder: "Share your feedback",
  },
};

export const WithDescription: Story = {
  args: {
    label: "Bio",
    placeholder: "Tell us about yourself",
    description: "Brief description for your profile.",
    rows: 4,
  },
};

export const ErrorState: Story = {
  args: {
    label: "Feedback",
    placeholder: "Please provide your feedback",
    error: true,
    errorMessage: "This field is required",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "This textarea is disabled",
    disabled: true,
    value: "Disabled content",
  },
};

export const FullWidth: Story = {
  args: {
    placeholder: "This textarea stretches to its container",
    fullWidth: true,
    rows: 5,
  },
  parameters: {
    layout: "padded",
  },
};

export const DifferentRows: Story = {
  render: args => (
    <div className='grid gap-4'>
      <Textarea {...args} rows={2} placeholder='2 rows' />
      <Textarea {...args} rows={4} placeholder='4 rows' />
      <Textarea {...args} rows={6} placeholder='6 rows' />
    </div>
  ),
  args: {
    label: "Multi-line content",
  },
};

export const ResizeOptions: Story = {
  render: args => (
    <div className='grid gap-4'>
      <Textarea {...args} resize='none' placeholder='No resize' />
      <Textarea {...args} resize='vertical' placeholder='Vertical resize only' />
      <Textarea {...args} resize='horizontal' placeholder='Horizontal resize only' />
      <Textarea {...args} resize='both' placeholder='Both directions' />
    </div>
  ),
  args: {
    label: "Resize behavior",
    rows: 3,
  },
};

const CharacterCounterComponent = (args: Partial<TextareaProps>) => {
  const [value, setValue] = useState("");
  const maxLength = 200;

  return (
    <Textarea
      {...args}
      value={value}
      onChange={e => setValue(e.target.value)}
      maxLength={maxLength}
      label={`${args.label ?? "Message"} (${value.length}/${maxLength})`}
      description='Character count is shown in the label'
    />
  );
};

export const CharacterCounter: Story = {
  render: args => <CharacterCounterComponent {...args} />,
  args: {
    placeholder: "Type your message...",
    rows: 4,
  },
};
