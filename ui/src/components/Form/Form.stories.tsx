import type { Meta, StoryObj } from "@storybook/react-vite";
import { Form, FormField, FormSection } from "./Form";
import { TextInput } from "../TextInput/TextInput";
import { Textarea } from "../Textarea/Textarea";
import { Checkbox } from "../Checkbox/Checkbox";
import { Button } from "../Button/Button";
import { Select } from "../Select/Select";
import { DatePicker } from "../DatePicker/DatePicker";
import mdx from "./Form.mdx";

const meta: Meta<typeof Form> = {
  title: "Components/Form",
  component: Form,
  subcomponents: { FormField, FormSection },
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
      description: "The visual style of the form",
      defaultValue: "primary",
      type: {
        name: "enum",
        value: ["primary", "secondary"],
      },
    },
    size: {
      control: { type: "radio" },
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "The size of the form elements",
      defaultValue: "md",
      type: {
        name: "enum",
        value: ["xs", "sm", "md", "lg", "xl"],
      },
    },
    direction: {
      control: { type: "radio" },
      options: ["vertical", "horizontal"],
      description: "Layout direction for form fields",
      defaultValue: "vertical",
      type: {
        name: "enum",
        value: ["vertical", "horizontal"],
      },
    },
    spacing: {
      control: { type: "radio" },
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Spacing between form fields",
      defaultValue: "md",
      type: {
        name: "enum",
        value: ["xs", "sm", "md", "lg", "xl"],
      },
    },
    fullWidth: {
      control: "boolean",
      description: "Make form take full width of its container",
      defaultValue: false,
      type: { name: "boolean" },
    },
    card: {
      control: "boolean",
      description: "Show form in a card-like container",
      defaultValue: false,
      type: { name: "boolean" },
    },
    loading: {
      control: "boolean",
      description: "Show loading state for the form",
      defaultValue: false,
      type: { name: "boolean" },
    },
    disabled: {
      control: "boolean",
      description: "Disable all form elements",
      defaultValue: false,
      type: { name: "boolean" },
    },
    error: {
      control: "boolean",
      description: "Show error state for the entire form",
      defaultValue: false,
      type: { name: "boolean" },
    },
    onSubmit: { action: "submitted" },
    onError: { action: "error" },
  },
};

export default meta;
type Story = StoryObj<typeof Form>;

export const Basic: Story = {
  args: {
    title: "Contact Information",
    description: "Please fill out your contact details below.",
    children: (
      <>
        <FormField label="First Name" required>
          <TextInput fullWidth placeholder="Enter your first name" />
        </FormField>
        <FormField label="Last Name" required>
          <TextInput fullWidth placeholder="Enter your last name" />
        </FormField>
        <FormField label="Email" required>
          <TextInput fullWidth type="email" placeholder="Enter your email" />
        </FormField>
        <FormField label="Phone" description="Optional contact number">
          <TextInput fullWidth type="tel" placeholder="Enter your phone number" />
        </FormField>
        <div className="flex gap-3 pt-4">
          <Button type="submit" variant="primary">
            Submit
          </Button>
          <Button type="button" variant="secondary">
            Cancel
          </Button>
        </div>
      </>
    ),
  },
};

export const WithSections: Story = {
  args: {
    title: "User Registration",
    description: "Create your account to get started.",
    children: (
      <>
        <FormSection title="Personal Information" description="Tell us about yourself" bordered>
          <FormField label="First Name" required>
            <TextInput fullWidth placeholder="Enter your first name" />
          </FormField>
          <FormField label="Last Name" required>
            <TextInput fullWidth placeholder="Enter your last name" />
          </FormField>
          <FormField label="Date of Birth">
            <DatePicker fullWidth />
          </FormField>
        </FormSection>

        <FormSection title="Account Details" description="Set up your login credentials" bordered>
          <FormField label="Email Address" required>
            <TextInput fullWidth type="email" placeholder="Enter your email" />
          </FormField>
          <FormField label="Password" required>
            <TextInput fullWidth type="password" placeholder="Create a password" />
          </FormField>
          <FormField label="Confirm Password" required>
            <TextInput fullWidth type="password" placeholder="Confirm your password" />
          </FormField>
        </FormSection>

        <FormSection title="Preferences" description="Customize your experience" bordered>
          <FormField>
            <Checkbox label="Subscribe to newsletter" />
          </FormField>
          <FormField>
            <Checkbox label="Receive promotional emails" />
          </FormField>
        </FormSection>

        <div className="flex gap-3 pt-4">
          <Button type="submit" variant="primary">
            Create Account
          </Button>
          <Button type="button" variant="secondary">
            Cancel
          </Button>
        </div>
      </>
    ),
  },
};

export const CardLayout: Story = {
  args: {
    title: "Feedback Form",
    description: "We'd love to hear your thoughts!",
    card: true,
    children: (
      <>
        <FormField label="Subject" required>
          <TextInput fullWidth placeholder="What's this about?" />
        </FormField>
        <FormField label="Message" required description="Please provide as much detail as possible">
          <Textarea fullWidth placeholder="Tell us more..." rows={4} />
        </FormField>
        <FormField label="Priority">
          <Select
            fullWidth
            options={[
              { value: "low", label: "Low" },
              { value: "medium", label: "Medium" },
              { value: "high", label: "High" },
            ]}
            placeholder="Select priority"
          />
        </FormField>
        <div className="flex gap-3 pt-4">
          <Button type="submit" variant="primary">
            Send Feedback
          </Button>
          <Button type="button" variant="secondary">
            Cancel
          </Button>
        </div>
      </>
    ),
  },
};

export const HorizontalLayout: Story = {
  args: {
    title: "Quick Contact",
    direction: "horizontal",
    spacing: "lg",
    children: (
      <>
        <FormField label="Name" required direction="horizontal">
          <TextInput fullWidth placeholder="Your name" />
        </FormField>
        <FormField label="Email" required direction="horizontal">
          <TextInput fullWidth type="email" placeholder="your@email.com" />
        </FormField>
        <FormField label="Message" required direction="horizontal">
          <Textarea fullWidth placeholder="Your message..." rows={3} />
        </FormField>
        <div className="flex gap-3 pt-4">
          <Button type="submit" variant="primary">
            Send
          </Button>
        </div>
      </>
    ),
  },
  parameters: {
    layout: "padded",
  },
};

export const WithErrors: Story = {
  args: {
    title: "Login Form",
    description: "Please sign in to continue.",
    error: true,
    errorMessage: "Please check the errors below and try again.",
    children: (
      <>
        <FormField label="Email" required error errorMessage="Please enter a valid email address">
          <TextInput fullWidth type="email" defaultValue="invalid-email" />
        </FormField>
        <FormField
          label="Password"
          required
          error
          errorMessage="Password must be at least 8 characters"
        >
          <TextInput fullWidth type="password" defaultValue="123" />
        </FormField>
        <div className="flex gap-3 pt-4">
          <Button type="submit" variant="primary">
            Sign In
          </Button>
          <Button type="button" variant="secondary">
            Forgot Password?
          </Button>
        </div>
      </>
    ),
  },
};

export const LoadingState: Story = {
  args: {
    title: "Processing Form",
    description: "Please wait while we process your information.",
    loading: true,
    loadingMessage: "Validating your information...",
    children: (
      <>
        <FormField label="Username" required>
          <TextInput fullWidth defaultValue="johndoe" disabled />
        </FormField>
        <FormField label="Email" required>
          <TextInput fullWidth type="email" defaultValue="john@example.com" disabled />
        </FormField>
        <div className="flex gap-3 pt-4">
          <Button type="submit" variant="primary" disabled>
            Processing...
          </Button>
        </div>
      </>
    ),
  },
};

export const CompactSize: Story = {
  args: {
    title: "Quick Settings",
    size: "sm",
    spacing: "sm",
    children: (
      <>
        <FormField label="Display Name" required size="sm">
          <TextInput fullWidth placeholder="Your display name" size="sm" />
        </FormField>
        <FormField label="Timezone" size="sm">
          <Select
            fullWidth
            size="sm"
            options={[
              { value: "utc", label: "UTC" },
              { value: "est", label: "EST" },
              { value: "pst", label: "PST" },
            ]}
            placeholder="Select timezone"
          />
        </FormField>
        <FormField size="sm">
          <Checkbox label="Enable notifications" size="sm" />
        </FormField>
        <div className="flex gap-3 pt-4">
          <Button type="submit" variant="primary" size="sm">
            Save
          </Button>
          <Button type="button" variant="secondary" size="sm">
            Cancel
          </Button>
        </div>
      </>
    ),
  },
};

export const LargeSize: Story = {
  args: {
    title: "Detailed Survey",
    size: "lg",
    spacing: "lg",
    children: (
      <>
        <FormField label="Full Name" required size="lg">
          <TextInput fullWidth placeholder="Enter your full name" size="lg" />
        </FormField>
        <FormField
          label="Tell us about yourself"
          description="Share your background, interests, and what brings you here"
          size="lg"
        >
          <Textarea fullWidth placeholder="Your story..." rows={5} size="lg" />
        </FormField>
        <FormField size="lg">
          <Checkbox label="I agree to the terms and conditions" size="lg" />
        </FormField>
        <div className="flex gap-3 pt-4">
          <Button type="submit" variant="primary" size="lg">
            Submit Survey
          </Button>
          <Button type="button" variant="secondary" size="lg">
            Skip
          </Button>
        </div>
      </>
    ),
  },
};
