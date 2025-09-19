import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stepper, Step } from "./Stepper";
import { FaUser, FaCreditCard, FaCheckCircle, FaTruck, FaBox } from "react-icons/fa";
import mdx from "./Stepper.mdx";
import { tw } from "@ruma-ui/utils";

const meta: Meta<typeof Stepper> = {
  title: "Components/Stepper",
  component: Stepper,
  parameters: {
    layout: "centered",
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["default", "numbered", "minimal"],
      description: "The visual style of the stepper",
      defaultValue: "default",
      type: {
        name: "enum",
        value: ["default", "numbered", "minimal"],
      },
    },
    orientation: {
      control: { type: "radio" },
      options: ["horizontal", "vertical"],
      description: "The orientation of the stepper",
      defaultValue: "horizontal",
      type: {
        name: "enum",
        value: ["horizontal", "vertical"],
      },
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
      description: "The size of the stepper",
      defaultValue: "md",
      type: {
        name: "enum",
        value: ["sm", "md", "lg"],
      },
    },
    activeStep: {
      control: { type: "number", min: 0, max: 4 },
      description: "The current active step index (0-based)",
      defaultValue: 1,
      type: { name: "number" },
    },
    clickable: {
      control: "boolean",
      description: "Whether steps are clickable for navigation",
      defaultValue: false,
      type: { name: "boolean" },
    },
    showConnector: {
      control: "boolean",
      description: "Whether to show step connectors",
      defaultValue: true,
      type: { name: "boolean" },
    },
    showDescription: {
      control: "boolean",
      description: "Whether to show step descriptions",
      defaultValue: true,
      type: { name: "boolean" },
    },
    steps: {
      control: false,
      description: "Array of steps to display",
    },
    onStepClick: { action: "step clicked" },
    onChange: { action: "step changed" },
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

// Sample steps data
const sampleSteps: Step[] = [
  {
    id: "personal-info",
    title: "Personal Information",
    description: "Enter your personal details",
    icon: <FaUser size={16} />,
  },
  {
    id: "payment",
    title: "Payment Details",
    description: "Provide payment information",
    icon: <FaCreditCard size={16} />,
  },
  {
    id: "review",
    title: "Review Order",
    description: "Review your order before submitting",
    icon: <FaCheckCircle size={16} />,
  },
  {
    id: "shipping",
    title: "Shipping",
    description: "Choose shipping method",
    icon: <FaTruck size={16} />,
  },
  {
    id: "confirmation",
    title: "Confirmation",
    description: "Order confirmation",
    icon: <FaBox size={16} />,
  },
];

const sampleStepsNoIcons: Step[] = [
  {
    id: "step-1",
    title: "Account Setup",
    description: "Create your account",
  },
  {
    id: "step-2",
    title: "Profile Details",
    description: "Fill in your profile information",
  },
  {
    id: "step-3",
    title: "Verification",
    description: "Verify your email address",
  },
  {
    id: "step-4",
    title: "Complete",
    description: "Setup is complete",
  },
];

export const Default: Story = {
  args: {
    steps: sampleSteps,
    activeStep: 1,
    variant: "default",
  },
};

export const Numbered: Story = {
  args: {
    steps: sampleStepsNoIcons,
    activeStep: 2,
    variant: "numbered",
  },
};

export const Minimal: Story = {
  args: {
    steps: sampleStepsNoIcons,
    activeStep: 1,
    variant: "minimal",
  },
};

export const HorizontalSmall: Story = {
  args: {
    steps: sampleSteps,
    activeStep: 1,
    size: "sm",
    orientation: "horizontal",
  },
};

export const HorizontalLarge: Story = {
  args: {
    steps: sampleSteps,
    activeStep: 2,
    size: "lg",
    orientation: "horizontal",
  },
};

export const VerticalDefault: Story = {
  args: {
    steps: sampleSteps,
    activeStep: 1,
    orientation: "vertical",
  },
  parameters: {
    layout: "padded",
  },
};

export const VerticalNumbered: Story = {
  args: {
    steps: sampleStepsNoIcons,
    activeStep: 2,
    variant: "numbered",
    orientation: "vertical",
  },
  parameters: {
    layout: "padded",
  },
};

export const Clickable: Story = {
  args: {
    steps: sampleSteps,
    activeStep: 1,
    clickable: true,
    variant: "default",
  },
};

export const NoDescriptions: Story = {
  args: {
    steps: sampleSteps.map(step => ({ ...step, description: undefined })),
    activeStep: 1,
    showDescription: false,
  },
};

export const NoConnectors: Story = {
  args: {
    steps: sampleSteps,
    activeStep: 1,
    showConnector: false,
  },
};

export const FirstStep: Story = {
  args: {
    steps: sampleSteps,
    activeStep: 0,
  },
};

export const LastStep: Story = {
  args: {
    steps: sampleSteps,
    activeStep: 4,
  },
};

export const WithDisabledSteps: Story = {
  args: {
    steps: sampleSteps.map((step, index) => ({
      ...step,
      disabled: index > 2,
    })),
    activeStep: 1,
    clickable: true,
  },
};

export const CustomStyled: Story = {
  args: {
    steps: sampleSteps,
    activeStep: 1,
    className: tw`rounded-lg bg-gray-50 p-6`,
  },
  parameters: {
    layout: "padded",
  },
};
