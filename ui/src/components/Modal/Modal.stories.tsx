import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  LuTriangle as AlertCircle,
  LuCheck as CheckCircle,
  LuInfo as Info,
  LuSettings as Settings,
  LuTrash2 as Trash2,
  LuUser as User,
} from "react-icons/lu";
import { cn } from "../../lib/utils";
import { Modal, ModalProps } from "./Modal";
import mdx from "./Modal.mdx";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
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
      description: "The visual style of the modal",
      defaultValue: "primary",
      type: {
        name: "enum",
        value: ["primary", "secondary"],
      },
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg", "xl", "full"],
      description: "The size of the modal",
      defaultValue: "md",
      type: {
        name: "enum",
        value: ["sm", "md", "lg", "xl", "full"],
      },
    },
    rounded: {
      control: { type: "radio" },
      options: ["none", "sm", "md", "lg", "xl"],
      description: "Control the border radius of the modal",
      defaultValue: "lg",
      type: {
        name: "enum",
        value: ["none", "sm", "md", "lg", "xl"],
      },
    },
    animation: {
      control: { type: "boolean" },
      description: "Enable/disable animations",
      defaultValue: true,
      type: { name: "boolean" },
    },
    preventClose: {
      control: { type: "boolean" },
      description: "Prevent closing when clicking outside the modal",
      defaultValue: false,
      type: { name: "boolean" },
    },
    hideCloseButton: {
      control: { type: "boolean" },
      description: "Hide the close button",
      defaultValue: false,
      type: { name: "boolean" },
    },
    title: {
      control: { type: "text" },
      description: "Modal title displayed in the header",
    },
    header: {
      control: false,
      description: "Optional custom header content",
    },
    footer: {
      control: false,
      description: "Optional footer content",
    },
    open: { control: "boolean" },
    onClose: { action: "closed" },
    ariaLabel: { control: "text" },
    ariaLabelledBy: { control: "text" },
    ariaDescribedBy: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper component for stories that need state management
const ModalWrapper = ({
  children,
  buttonText = "Open Modal",
  buttonVariant = "primary",
}: {
  children: (props: { open: boolean; onClose: () => void }) => React.ReactNode;
  buttonText?: string;
  buttonVariant?: "primary" | "secondary";
}) => {
  const [open, setOpen] = useState(false);

  const buttonClasses =
    buttonVariant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
      : "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500";

  return (
    <>
      <button
        className={cn(
          "rounded-md px-4 py-2 text-sm font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none",
          buttonClasses
        )}
        onClick={() => setOpen(true)}
      >
        {buttonText}
      </button>
      {children({ open, onClose: () => setOpen(false) })}
    </>
  );
};

export const Primary: Story = {
  render: () => (
    <ModalWrapper>
      {({ open, onClose }) => (
        <Modal open={open} onClose={onClose} title="Primary Modal" variant="primary">
          <p className="text-gray-600">
            This is a primary modal dialog. It uses the default styling with clean lines and
            professional appearance suitable for most use cases.
          </p>
        </Modal>
      )}
    </ModalWrapper>
  ),
};

export const Secondary: Story = {
  render: () => (
    <ModalWrapper buttonVariant="secondary" buttonText="Open Secondary Modal">
      {({ open, onClose }) => (
        <Modal open={open} onClose={onClose} title="Secondary Modal" variant="secondary">
          <p className="text-gray-600">
            This is a secondary modal with subtle gray styling. Perfect for secondary actions or
            when you need a softer visual presence.
          </p>
        </Modal>
      )}
    </ModalWrapper>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <ModalWrapper buttonText="Modal with Footer">
      {({ open, onClose }) => (
        <Modal
          open={open}
          onClose={onClose}
          title="Confirm Action"
          footer={
            <div className="flex justify-end gap-3">
              <button
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                onClick={onClose}
              >
                Confirm
              </button>
            </div>
          }
        >
          <p className="text-gray-600">
            Are you sure you want to proceed with this action? This cannot be undone.
          </p>
        </Modal>
      )}
    </ModalWrapper>
  ),
};

export const CustomHeader: Story = {
  render: () => (
    <ModalWrapper buttonText="Custom Header">
      {({ open, onClose }) => (
        <Modal
          open={open}
          onClose={onClose}
          header={
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">User Profile</h2>
                <p className="text-sm text-gray-500">Manage your account settings</p>
              </div>
            </div>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                defaultValue="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                defaultValue="john@example.com"
              />
            </div>
          </div>
        </Modal>
      )}
    </ModalWrapper>
  ),
};

export const SmallSize: Story = {
  render: () => (
    <ModalWrapper buttonText="Small Modal">
      {({ open, onClose }) => (
        <Modal open={open} onClose={onClose} size="sm" title="Small Modal">
          <p className="text-gray-600">
            This is a small modal perfect for simple confirmations or alerts.
          </p>
        </Modal>
      )}
    </ModalWrapper>
  ),
};

export const LargeSize: Story = {
  render: () => (
    <ModalWrapper buttonText="Large Modal">
      {({ open, onClose }) => (
        <Modal open={open} onClose={onClose} size="lg" title="Large Modal">
          <div className="space-y-4">
            <p className="text-gray-600">
              This is a large modal suitable for forms, detailed content, or complex interactions
              that need more space.
            </p>
            <div className="rounded-lg bg-gray-50 p-4">
              <h3 className="font-medium text-gray-900">Additional Content</h3>
              <p className="mt-2 text-sm text-gray-600">
                Large modals can accommodate more complex layouts and content while maintaining good
                usability and readability.
              </p>
            </div>
          </div>
        </Modal>
      )}
    </ModalWrapper>
  ),
};

export const FullSize: Story = {
  render: () => (
    <ModalWrapper buttonText="Full Size Modal">
      {({ open, onClose }) => (
        <Modal open={open} onClose={onClose} size="full" title="Full Size Modal">
          <div className="space-y-6">
            <p className="text-gray-600">
              This is a full-size modal that adapts to the viewport with responsive margins. Perfect
              for forms, dashboards, or content-heavy interfaces.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-blue-50 p-4">
                <h3 className="font-medium text-blue-900">Section 1</h3>
                <p className="mt-2 text-sm text-blue-700">
                  Full-size modals can contain complex layouts with multiple sections.
                </p>
              </div>
              <div className="rounded-lg bg-green-50 p-4">
                <h3 className="font-medium text-green-900">Section 2</h3>
                <p className="mt-2 text-sm text-green-700">
                  They work well for admin panels, detailed forms, and data tables.
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </ModalWrapper>
  ),
};

export const NoAnimation: Story = {
  render: () => (
    <ModalWrapper buttonText="No Animation">
      {({ open, onClose }) => (
        <Modal open={open} onClose={onClose} title="No Animation" animation={false}>
          <p className="text-gray-600">
            This modal has animations disabled, which is useful for users who prefer reduced motion
            or in performance-critical scenarios.
          </p>
        </Modal>
      )}
    </ModalWrapper>
  ),
};

export const PreventClose: Story = {
  render: () => (
    <ModalWrapper buttonText="Prevent Close Modal">
      {({ open, onClose }) => (
        <Modal
          open={open}
          onClose={onClose}
          title="Important Notice"
          preventClose={true}
          footer={
            <div className="flex justify-end">
              <button
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                onClick={onClose}
              >
                I Understand
              </button>
            </div>
          }
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
            <p className="text-gray-600">
              This modal cannot be closed by clicking outside or pressing Escape. You must click the
              &ldquo;I Understand&quot; button to proceed.
            </p>
          </div>
        </Modal>
      )}
    </ModalWrapper>
  ),
};

export const NoCloseButton: Story = {
  render: () => (
    <ModalWrapper buttonText="No Close Button">
      {({ open, onClose }) => (
        <Modal
          open={open}
          onClose={onClose}
          title="Custom Close"
          hideCloseButton={true}
          footer={
            <div className="flex justify-between">
              <button
                className="flex items-center gap-2 rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
                onClick={onClose}
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
              <button
                className="rounded-md bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          }
        >
          <p className="text-gray-600">
            This modal hides the default close button in favor of custom action buttons in the
            footer.
          </p>
        </Modal>
      )}
    </ModalWrapper>
  ),
};

export const ConfirmationModal: Story = {
  render: () => (
    <ModalWrapper buttonText="Delete Item">
      {({ open, onClose }) => (
        <Modal
          open={open}
          onClose={onClose}
          size="sm"
          header={
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                <Trash2 className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Delete Item</h2>
              </div>
            </div>
          }
          footer={
            <div className="flex justify-end gap-3">
              <button
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
                onClick={onClose}
              >
                Delete
              </button>
            </div>
          }
        >
          <p className="text-gray-600">
            Are you sure you want to delete this item? This action cannot be undone.
          </p>
        </Modal>
      )}
    </ModalWrapper>
  ),
};

export const SuccessModal: Story = {
  render: () => (
    <ModalWrapper buttonText="Show Success" buttonVariant="secondary">
      {({ open, onClose }) => (
        <Modal
          open={open}
          onClose={onClose}
          size="sm"
          variant="secondary"
          header={
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Success!</h2>
              </div>
            </div>
          }
          footer={
            <div className="flex justify-end">
              <button
                className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
                onClick={onClose}
              >
                Continue
              </button>
            </div>
          }
        >
          <p className="text-gray-600">
            Your action has been completed successfully. You can continue with your workflow.
          </p>
        </Modal>
      )}
    </ModalWrapper>
  ),
};

export const FormModal: Story = {
  render: () => (
    <ModalWrapper buttonText="Open Form">
      {({ open, onClose }) => (
        <Modal
          open={open}
          onClose={onClose}
          title="Create New Project"
          size="lg"
          footer={
            <div className="flex justify-end gap-3">
              <button
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                onClick={onClose}
              >
                Create Project
              </button>
            </div>
          }
        >
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Project Name</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter project name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                rows={3}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                placeholder="Project description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none">
                <option>Web Development</option>
                <option>Mobile App</option>
                <option>Desktop App</option>
              </select>
            </div>
          </form>
        </Modal>
      )}
    </ModalWrapper>
  ),
};

export const InfoModal: Story = {
  render: () => (
    <ModalWrapper buttonText="Show Info">
      {({ open, onClose }) => (
        <Modal
          open={open}
          onClose={onClose}
          size="md"
          header={
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Info className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Information</h2>
              </div>
            </div>
          }
        >
          <div className="space-y-3">
            <p className="text-gray-600">
              Here&#39;s some important information about the feature you&#39;re using.
            </p>
            <div className="rounded-md bg-blue-50 p-3">
              <h4 className="font-medium text-blue-900">Pro Tip</h4>
              <p className="mt-1 text-sm text-blue-700">
                You can customize the modal&apos;s appearance using the variant, size, and rounded
                props to match your design system.
              </p>
            </div>
          </div>
        </Modal>
      )}
    </ModalWrapper>
  ),
};

export const SettingsModal: Story = {
  render: () => (
    <ModalWrapper buttonText="Open Settings">
      {({ open, onClose }) => (
        <Modal
          open={open}
          onClose={onClose}
          size="xl"
          header={
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                <Settings className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
                <p className="text-sm text-gray-500">Manage your preferences</p>
              </div>
            </div>
          }
          footer={
            <div className="flex justify-between">
              <button
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                onClick={onClose}
              >
                Reset to Defaults
              </button>
              <div className="flex gap-3">
                <button
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                  onClick={onClose}
                >
                  Save Changes
                </button>
              </div>
            </div>
          }
        >
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Appearance</h3>
                <div className="space-y-3">
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Dark mode</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded" />
                      <span className="ml-2 text-sm text-gray-700">Compact layout</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Notifications</h3>
                <div className="space-y-3">
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Email notifications</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Push notifications</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </ModalWrapper>
  ),
};

export const CustomStyled: Story = {
  render: () => (
    <ModalWrapper buttonText="Custom Styled">
      {({ open, onClose }) => (
        <Modal
          open={open}
          onClose={onClose}
          title="Custom Modal"
          className="border-purple-200 bg-linear-to-br from-purple-50 to-pink-50"
          overlayClassName="bg-purple-900/50"
          footer={
            <div className="flex justify-end">
              <button
                className="rounded-md bg-linear-to-r from-purple-600 to-pink-600 px-4 py-2 text-sm font-medium text-white hover:from-purple-700 hover:to-pink-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:outline-none"
                onClick={onClose}
              >
                Got it!
              </button>
            </div>
          }
        >
          <p className="text-gray-600">
            This modal demonstrates custom styling with a gradient background and purple theme to
            match your brand colors.
          </p>
        </Modal>
      )}
    </ModalWrapper>
  ),
};

const ControlledComponent = (args: Partial<ModalProps>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <button
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          onClick={() => setIsOpen(true)}
        >
          Open Modal
        </button>
        <button
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          onClick={() => setIsOpen(false)}
        >
          Close Modal
        </button>
      </div>
      <p className="text-sm text-gray-600">Modal state: {isOpen ? "Open" : "Closed"}</p>

      <Modal {...args} open={isOpen} onClose={() => setIsOpen(false)} title="Controlled Modal">
        <p className="text-gray-600">
          This modal&apos;s open state is controlled by the parent component. You can open and close
          it using external buttons.
        </p>
      </Modal>
    </div>
  );
};

export const Controlled: Story = {
  render: args => <ControlledComponent {...args} />,
};
