import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { InputOTP, InputOTPProps } from "./InputOTP";
import mdx from "./InputOTP.mdx";

const meta: Meta<typeof InputOTP> = {
  title: "Components/InputOTP",
  component: InputOTP,
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
      description: "The visual style of the OTP input",
      defaultValue: "primary",
      type: {
        name: "enum",
        value: ["primary", "secondary"],
      },
    },
    size: {
      control: { type: "radio" },
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "The size of the OTP input",
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
    length: {
      control: { type: "number", min: 1, max: 12 },
      description: "Number of OTP digits/characters",
      defaultValue: 6,
      type: { name: "number" },
    },
    gap: {
      control: { type: "radio" },
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Gap between input slots",
      defaultValue: "sm",
      type: {
        name: "enum",
        value: ["xs", "sm", "md", "lg", "xl"],
      },
    },
    type: {
      control: { type: "radio" },
      options: ["text", "number"],
      description: "Type of input (text for alphanumeric, number for numeric only)",
      defaultValue: "number",
      type: {
        name: "enum",
        value: ["text", "number"],
      },
    },
    mask: {
      control: "boolean",
      description: "Whether to mask the input (like password)",
      defaultValue: false,
      type: { name: "boolean" },
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
      defaultValue: false,
      type: { name: "boolean" },
    },
    error: {
      control: "boolean",
      description: "Show error state",
      defaultValue: false,
      type: { name: "boolean" },
    },
    autoFocus: {
      control: "boolean",
      description: "Auto focus the first input on mount",
      defaultValue: false,
      type: { name: "boolean" },
    },
    allowPaste: {
      control: "boolean",
      description: "Allow paste functionality",
      defaultValue: true,
      type: { name: "boolean" },
    },
    fullWidth: {
      control: "boolean",
      description: "Make input take full width of its container",
      defaultValue: false,
      type: { name: "boolean" },
    },
    label: {
      control: "text",
      description: "Optional label text displayed above the input",
    },
    description: {
      control: "text",
      description: "Optional helper/description text displayed below the input",
    },
    errorMessage: {
      control: "text",
      description: "Error message to display below the input",
    },
    placeholder: {
      control: "text",
      description: "Placeholder character for empty slots",
    },
    value: { control: "text" },
    defaultValue: { control: "text" },
    onChange: { action: "changed" },
    onComplete: { action: "completed" },
  },
};

export default meta;

type Story = StoryObj<typeof InputOTP>;

export const Primary: Story = {
  args: {
    variant: "primary",
    length: 6,
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    length: 6,
  },
};

export const WithLabel: Story = {
  args: {
    label: "Enter verification code",
    description: "We sent a 6-digit code to your email",
    length: 6,
  },
};

export const WithDescription: Story = {
  args: {
    label: "Two-Factor Authentication",
    description: "Please enter the 6-digit code from your authenticator app",
    length: 6,
  },
};

export const ErrorState: Story = {
  args: {
    label: "Verification Code",
    error: true,
    errorMessage: "Invalid code. Please try again.",
    length: 6,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "123456",
    length: 6,
  },
};

export const Masked: Story = {
  args: {
    label: "Security PIN",
    mask: true,
    length: 4,
    description: "Enter your 4-digit security PIN",
  },
};

export const Alphanumeric: Story = {
  args: {
    label: "Product Key",
    type: "text",
    length: 8,
    description: "Enter the 8-character product key",
  },
};

export const CustomLength: Story = {
  args: {
    label: "SMS Code",
    length: 4,
    description: "Enter the 4-digit SMS code",
  },
};

export const LargeGap: Story = {
  args: {
    gap: "lg",
    length: 6,
    size: "lg",
  },
};

export const FullWidth: Story = {
  args: {
    label: "Enter Code",
    fullWidth: true,
    length: 6,
  },
  parameters: {
    layout: "padded",
  },
};

const ControlledComponent = (args: Partial<InputOTPProps>) => {
  const [value, setValue] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    setIsComplete(false);
  };

  const handleComplete = (completeValue: string) => {
    setIsComplete(true);
    console.log("OTP Complete:", completeValue);
  };

  return (
    <div className="space-y-4">
      <InputOTP
        {...args}
        value={value}
        onChange={handleChange}
        onComplete={handleComplete}
        label="Enter Verification Code"
        description={isComplete ? "✅ Code verified successfully!" : "Enter the 6-digit code"}
        error={isComplete ? false : args.error}
      />
      <div className="text-center">
        <p className="text-sm text-gray-600">Current value: {value || "Empty"}</p>
        <p className="text-sm text-gray-600">Complete: {isComplete ? "Yes" : "No"}</p>
      </div>
    </div>
  );
};

export const Controlled: Story = {
  render: args => <ControlledComponent {...args} />,
  args: {
    length: 6,
  },
};

export const SizeVariations: Story = {
  render: args => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Extra Small (xs)</h3>
        <InputOTP {...args} size="xs" />
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Small (sm)</h3>
        <InputOTP {...args} size="sm" />
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Medium (md)</h3>
        <InputOTP {...args} size="md" />
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Large (lg)</h3>
        <InputOTP {...args} size="lg" />
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Extra Large (xl)</h3>
        <InputOTP {...args} size="xl" />
      </div>
    </div>
  ),
  args: {
    length: 6,
  },
  parameters: {
    layout: "padded",
  },
};

export const RoundedVariations: Story = {
  render: args => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">None</h3>
        <InputOTP {...args} rounded="none" />
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Small</h3>
        <InputOTP {...args} rounded="sm" />
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Medium</h3>
        <InputOTP {...args} rounded="md" />
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Large</h3>
        <InputOTP {...args} rounded="lg" />
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Extra Large</h3>
        <InputOTP {...args} rounded="xl" />
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Full</h3>
        <InputOTP {...args} rounded="full" />
      </div>
    </div>
  ),
  args: {
    length: 6,
    size: "lg",
  },
  parameters: {
    layout: "padded",
  },
};

export const UseCases: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Email Verification</h3>
        <InputOTP
          label="Email Verification"
          description="Enter the 6-digit code sent to your email"
          length={6}
          autoFocus
        />
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">SMS Authentication</h3>
        <InputOTP
          label="SMS Code"
          description="Enter the 4-digit code sent to your phone"
          length={4}
          variant="secondary"
        />
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Secure PIN Entry</h3>
        <InputOTP
          label="Security PIN"
          description="Enter your 6-digit security PIN"
          length={6}
          mask={true}
          size="lg"
          rounded="lg"
        />
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Product License</h3>
        <InputOTP
          label="License Key"
          description="Enter the 12-character license key"
          length={12}
          type="text"
          gap="xs"
          size="sm"
        />
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};
