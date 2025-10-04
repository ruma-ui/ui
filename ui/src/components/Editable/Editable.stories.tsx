import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Editable, EditableProps } from "./Editable";
import mdx from "./Editable.mdx";

const meta: Meta<typeof Editable> = {
  title: "Components/Editable",
  component: Editable,
  parameters: {
    layout: "padded",
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    value: {
      control: "text",
      description: "The current value of the editable text (controlled)",
    },
    defaultValue: {
      control: "text",
      description: "Default value when component is uncontrolled",
      defaultValue: "",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text shown when value is empty",
      defaultValue: "Click to edit...",
    },
    size: {
      control: { type: "radio" },
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "The size of the editable component",
      defaultValue: "md",
      type: {
        name: "enum",
        value: ["xs", "sm", "md", "lg", "xl"],
      },
    },
    rounded: {
      control: { type: "radio" },
      options: ["none", "sm", "md", "lg", "xl", "full"],
      description: "Control the border radius",
      defaultValue: "sm",
      type: {
        name: "enum",
        value: ["none", "sm", "md", "lg", "xl", "full"],
      },
    },
    fullWidth: {
      control: "boolean",
      description: "Make component take full width of its container",
      defaultValue: false,
      type: { name: "boolean" },
    },
    disabled: {
      control: "boolean",
      description: "Whether the component is disabled",
      defaultValue: false,
      type: { name: "boolean" },
    },
    readOnly: {
      control: "boolean",
      description: "Whether the component is in read-only mode",
      defaultValue: false,
      type: { name: "boolean" },
    },
    showButtons: {
      control: "boolean",
      description: "Whether to show save/cancel buttons when editing",
      defaultValue: false,
      type: { name: "boolean" },
    },
    saveText: {
      control: "text",
      description: "Custom save button text",
      defaultValue: "Save",
    },
    cancelText: {
      control: "text",
      description: "Custom cancel button text",
      defaultValue: "Cancel",
    },
    saveOnEnter: {
      control: "boolean",
      description: "Whether to save on Enter key press",
      defaultValue: true,
      type: { name: "boolean" },
    },
    cancelOnEscape: {
      control: "boolean",
      description: "Whether to cancel on Escape key press",
      defaultValue: true,
      type: { name: "boolean" },
    },
    trigger: {
      control: { type: "radio" },
      options: ["click", "doubleClick"],
      description: "Trigger mode for starting edit",
      defaultValue: "click",
      type: {
        name: "enum",
        value: ["click", "doubleClick"],
      },
    },
    maxLength: {
      control: "number",
      description: "Maximum length of the text",
    },
    minLength: {
      control: "number",
      description: "Minimum length of the text",
    },
    onChange: { action: "changed" },
    onEditStart: { action: "editStarted" },
    onEditEnd: { action: "editEnded" },
    onSave: { action: "saved" },
    onCancel: { action: "cancelled" },
    children: {
      control: false,
      description: "Content to display when not editing (can be used for custom rendering)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Editable>;

export const Default: Story = {
  args: {
    defaultValue: "Click to edit this text",
  },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: "Enter your name...",
  },
};

const ControlledComponent = (args: Partial<EditableProps>) => {
  const [value, setValue] = useState("Controlled value");
  return <Editable {...args} value={value} onChange={setValue} />;
};

export const Controlled: Story = {
  render: args => <ControlledComponent {...args} />,
};

export const WithButtons: Story = {
  args: {
    defaultValue: "Edit with buttons",
    showButtons: true,
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: "Disabled editable",
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    defaultValue: "Read-only text",
    readOnly: true,
  },
};

export const DoubleClickTrigger: Story = {
  args: {
    defaultValue: "Double-click to edit",
    trigger: "doubleClick",
  },
};

export const WithMaxLength: Story = {
  args: {
    defaultValue: "Max 20 chars",
    maxLength: 20,
    placeholder: "Type up to 20 characters...",
  },
};

export const FullWidth: Story = {
  args: {
    defaultValue: "Full width editable",
    fullWidth: true,
  },
  parameters: {
    layout: "padded",
  },
};

export const CustomChildren: Story = {
  args: {
    children: <span style={{ color: "blue", fontWeight: "bold" }}>Custom display text</span>,
  },
};

const EmailValidationComponent = (args: Partial<EditableProps>) => {
  const [value, setValue] = useState("user@example.com");
  const [error, setError] = useState("");

  const handleSave = (newValue: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newValue)) {
      setError("Invalid email format");
      return;
    }
    setError("");
    setValue(newValue);
  };

  return (
    <div>
      <Editable {...args} value={value} onSave={handleSave} placeholder="Enter email..." />
      {error && <p style={{ color: "red", fontSize: "12px" }}>{error}</p>}
    </div>
  );
};

export const EmailValidation: Story = {
  render: args => <EmailValidationComponent {...args} />,
};
