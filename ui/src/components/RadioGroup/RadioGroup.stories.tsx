import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  FaApplePay,
  FaCreditCard,
  FaDesktop,
  FaGooglePay,
  FaMobile,
  FaPaypal,
  FaTabletAlt,
} from "react-icons/fa";
import { RadioGroup } from "./RadioGroup";
import mdx from "./RadioGroup.mdx";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
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
      description: "The visual style of the radio group",
      defaultValue: "primary",
      type: {
        name: "enum",
        value: ["primary", "secondary"],
      },
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
      description: "The size of the radio buttons",
      defaultValue: "md",
      type: {
        name: "enum",
        value: ["sm", "md", "lg"],
      },
    },
    orientation: {
      control: { type: "radio" },
      options: ["vertical", "horizontal"],
      description: "Layout direction of radio options",
      defaultValue: "vertical",
      type: {
        name: "enum",
        value: ["vertical", "horizontal"],
      },
    },
    rounded: {
      control: { type: "radio" },
      options: ["none", "sm", "md", "lg", "xl", "full"],
      description: "Control the border radius of radio buttons",
      defaultValue: "full",
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
    error: {
      control: { type: "boolean" },
      description: "Show error state",
      defaultValue: false,
      type: { name: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable the entire radio group",
      defaultValue: false,
      type: { name: "boolean" },
    },
    required: {
      control: { type: "boolean" },
      description: "Whether the radio group is required",
      defaultValue: false,
      type: { name: "boolean" },
    },
    label: {
      control: { type: "text" },
      description: "Optional label for the radio group",
    },
    description: {
      control: { type: "text" },
      description: "Optional helper/description text",
    },
    errorMessage: {
      control: { type: "text" },
      description: "Error message to display",
    },
    options: {
      control: false,
      description: "Array of radio options",
    },
    onValueChange: { action: "valueChanged" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const paymentOptions = [
  {
    value: "credit",
    label: "Credit Card",
    description: "Pay with Visa, Mastercard, or American Express",
    icon: <FaCreditCard />,
  },
  {
    value: "paypal",
    label: "PayPal",
    description: "Pay securely with your PayPal account",
    icon: <FaPaypal />,
  },
  {
    value: "apple",
    label: "Apple Pay",
    description: "Pay with Touch ID or Face ID",
    icon: <FaApplePay />,
  },
  {
    value: "google",
    label: "Google Pay",
    description: "Pay with your Google account",
    icon: <FaGooglePay />,
  },
];

const deviceOptions = [
  {
    value: "mobile",
    label: "Mobile",
    description: "Optimized for phones and small screens",
    icon: <FaMobile />,
  },
  {
    value: "tablet",
    label: "Tablet",
    description: "Optimized for tablets and medium screens",
    icon: <FaTabletAlt />,
  },
  {
    value: "desktop",
    label: "Desktop",
    description: "Optimized for desktop and large screens",
    icon: <FaDesktop />,
  },
];

const planOptions = [
  {
    value: "basic",
    label: "Basic Plan",
    description: "Perfect for individuals and small projects",
  },
  {
    value: "pro",
    label: "Pro Plan",
    description: "Great for growing teams and businesses",
  },
  {
    value: "enterprise",
    label: "Enterprise Plan",
    description: "Advanced features for large organizations",
  },
];

const optionsWithDisabled = [
  { value: "available1", label: "Available Option 1" },
  { value: "available2", label: "Available Option 2" },
  { value: "disabled", label: "Disabled Option", disabled: true },
  { value: "available3", label: "Available Option 3" },
];

export const Primary: Story = {
  args: {
    options: basicOptions,
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    options: basicOptions,
    variant: "secondary",
  },
};

export const WithLabel: Story = {
  args: {
    options: planOptions,
    label: "Choose your plan",
  },
};

export const WithDescription: Story = {
  args: {
    options: basicOptions,
    label: "Select an option",
    description: "Choose the option that best fits your needs",
  },
};

export const WithOptionDescriptions: Story = {
  args: {
    options: paymentOptions,
    label: "Payment method",
  },
};

export const WithIcons: Story = {
  args: {
    options: deviceOptions,
    label: "Target device",
  },
};

export const Horizontal: Story = {
  args: {
    options: basicOptions,
    label: "Horizontal layout",
    orientation: "horizontal",
  },
};

export const ErrorState: Story = {
  args: {
    options: basicOptions,
    label: "Required selection",
    error: true,
    errorMessage: "Please select an option to continue",
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    options: basicOptions,
    label: "Disabled radio group",
    disabled: true,
    defaultValue: "option1",
  },
};

export const WithDisabledOptions: Story = {
  args: {
    options: optionsWithDisabled,
    label: "Some options disabled",
  },
};

export const NoAnimation: Story = {
  args: {
    options: basicOptions,
    label: "No animations",
    animation: false,
  },
};

const ControlledComponent = (args: Partial<React.ComponentProps<typeof RadioGroup>>) => {
  const [value, setValue] = useState("basic");

  return (
    <div className="space-y-4">
      <RadioGroup
        {...args}
        options={planOptions}
        label="Controlled selection"
        value={value}
        onValueChange={setValue}
      />
      <p className="text-sm text-gray-600">
        Selected value: <strong>{value || "None"}</strong>
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => setValue("pro")}
          className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
        >
          Select Pro
        </button>
        <button
          onClick={() => setValue("")}
          className="rounded bg-gray-500 px-3 py-1 text-sm text-white hover:bg-gray-600"
        >
          Clear Selection
        </button>
      </div>
    </div>
  );
};

export const Controlled: Story = {
  render: args => <ControlledComponent {...args} />,
};

const PaymentMethodExampleComponent = (args: Partial<React.ComponentProps<typeof RadioGroup>>) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="w-96 space-y-6 rounded-lg bg-white p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900">Checkout</h3>
      <RadioGroup
        options={paymentOptions}
        label="Payment method"
        description="Choose how you'd like to pay for your order"
        value={paymentMethod}
        onValueChange={value => {
          setPaymentMethod(value);
          setShowDetails(!!value);
        }}
        required
      />
      {showDetails && paymentMethod && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <h4 className="mb-2 font-medium text-blue-900">
            Payment Details - {paymentOptions.find(opt => opt.value === paymentMethod)?.label}
          </h4>
          <p className="text-sm text-blue-700">
            {paymentOptions.find(opt => opt.value === paymentMethod)?.description}
          </p>
        </div>
      )}
      <button
        disabled={!paymentMethod}
        className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Continue to Payment
      </button>
    </div>
  );
};

export const PaymentMethodExample: Story = {
  render: args => <PaymentMethodExampleComponent {...args} />,
};
