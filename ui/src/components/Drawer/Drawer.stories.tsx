import { cn } from "@ruma-ui/utils";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  LuTriangle as AlertCircle,
  LuInfo as Info,
  LuMenu as Menu,
  LuSettings as Settings,
  LuTrash2 as Trash2,
  LuUser as User,
} from "react-icons/lu";
import { Drawer, DrawerProps } from "./Drawer";
import mdx from "./Drawer.mdx";

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    position: {
      control: { type: "radio" },
      options: ["left", "right", "top", "bottom"],
      description: "The position of the drawer",
      defaultValue: "right",
      type: {
        name: "enum",
        value: ["left", "right", "top", "bottom"],
      },
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg", "xl", "full"],
      description: "The size of the drawer",
      defaultValue: "md",
      type: {
        name: "enum",
        value: ["sm", "md", "lg", "xl", "full"],
      },
    },
    variant: {
      control: { type: "radio" },
      options: ["primary", "secondary"],
      description: "The visual style of the drawer",
      defaultValue: "primary",
      type: {
        name: "enum",
        value: ["primary", "secondary"],
      },
    },
    rounded: {
      control: { type: "radio" },
      options: ["none", "sm", "md", "lg", "xl"],
      description: "Control the border radius of the drawer",
      defaultValue: "none",
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
      description: "Prevent closing when clicking outside the drawer",
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
      description: "Drawer title displayed in the header",
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
const DrawerWrapper = ({
  children,
  buttonText = "Open Drawer",
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

export const RightDrawer: Story = {
  render: () => (
    <DrawerWrapper>
      {({ open, onClose }) => (
        <Drawer open={open} onClose={onClose} title='Right Drawer' position='right'>
          <p className='text-gray-600'>
            This is a right-positioned drawer that slides in from the right side. It&apos;s perfect
            for navigation menus, settings panels, or secondary content.
          </p>
        </Drawer>
      )}
    </DrawerWrapper>
  ),
};

export const LeftDrawer: Story = {
  render: () => (
    <DrawerWrapper buttonText='Open Left Drawer'>
      {({ open, onClose }) => (
        <Drawer open={open} onClose={onClose} title='Left Drawer' position='left'>
          <p className='text-gray-600'>
            This is a left-positioned drawer that slides in from the left side. Commonly used for
            main navigation or sidebar content.
          </p>
        </Drawer>
      )}
    </DrawerWrapper>
  ),
};

export const TopDrawer: Story = {
  render: () => (
    <DrawerWrapper buttonText='Open Top Drawer'>
      {({ open, onClose }) => (
        <Drawer open={open} onClose={onClose} title='Top Drawer' position='top'>
          <p className='text-gray-600'>
            This is a top-positioned drawer that slides down from the top. Useful for notifications,
            alerts, or dropdown-style interfaces.
          </p>
        </Drawer>
      )}
    </DrawerWrapper>
  ),
};

export const BottomDrawer: Story = {
  render: () => (
    <DrawerWrapper buttonText='Open Bottom Drawer'>
      {({ open, onClose }) => (
        <Drawer open={open} onClose={onClose} title='Bottom Drawer' position='bottom'>
          <p className='text-gray-600'>
            This is a bottom-positioned drawer that slides up from the bottom. Great for
            mobile-style interfaces or action sheets.
          </p>
        </Drawer>
      )}
    </DrawerWrapper>
  ),
};

export const PrimaryVariant: Story = {
  render: () => (
    <DrawerWrapper>
      {({ open, onClose }) => (
        <Drawer open={open} onClose={onClose} title='Primary Drawer' variant='primary'>
          <p className='text-gray-600'>
            This is a primary drawer with clean white background and standard border styling. Use
            this for most drawer dialogs and primary content overlays.
          </p>
        </Drawer>
      )}
    </DrawerWrapper>
  ),
};

export const SecondaryVariant: Story = {
  render: () => (
    <DrawerWrapper buttonVariant='secondary' buttonText='Open Secondary Drawer'>
      {({ open, onClose }) => (
        <Drawer open={open} onClose={onClose} title='Secondary Drawer' variant='secondary'>
          <p className='text-gray-600'>
            This is a secondary drawer with subtle gray styling. Perfect for secondary contexts and
            when you need a softer visual presence.
          </p>
        </Drawer>
      )}
    </DrawerWrapper>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <DrawerWrapper buttonText='Drawer with Footer'>
      {({ open, onClose }) => (
        <Drawer
          open={open}
          onClose={onClose}
          title='Confirm Action'
          footer={
            <div className='flex justify-end gap-3'>
              <button
                className='rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className='rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
                onClick={onClose}
              >
                Confirm
              </button>
            </div>
          }
        >
          <p className='text-gray-600'>
            Are you sure you want to proceed with this action? This cannot be undone.
          </p>
        </Drawer>
      )}
    </DrawerWrapper>
  ),
};

export const CustomHeader: Story = {
  render: () => (
    <DrawerWrapper buttonText='Custom Header'>
      {({ open, onClose }) => (
        <Drawer
          open={open}
          onClose={onClose}
          header={
            <div className='flex items-center gap-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-100'>
                <User className='h-5 w-5 text-blue-600' />
              </div>
              <div>
                <h2 className='text-lg font-semibold text-gray-900'>User Profile</h2>
                <p className='text-sm text-gray-500'>Manage your account settings</p>
              </div>
            </div>
          }
        >
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Name</label>
              <input
                type='text'
                className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
                defaultValue='John Doe'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Email</label>
              <input
                type='email'
                className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
                defaultValue='john@example.com'
              />
            </div>
          </div>
        </Drawer>
      )}
    </DrawerWrapper>
  ),
};

export const SmallSize: Story = {
  render: () => (
    <DrawerWrapper buttonText='Small Drawer'>
      {({ open, onClose }) => (
        <Drawer open={open} onClose={onClose} size='sm' title='Small Drawer'>
          <p className='text-gray-600'>
            This is a small drawer perfect for simple confirmations or narrow content.
          </p>
        </Drawer>
      )}
    </DrawerWrapper>
  ),
};

export const LargeSize: Story = {
  render: () => (
    <DrawerWrapper buttonText='Large Drawer'>
      {({ open, onClose }) => (
        <Drawer open={open} onClose={onClose} size='lg' title='Large Drawer'>
          <div className='space-y-4'>
            <p className='text-gray-600'>
              This is a large drawer that provides more space for complex forms, detailed content,
              or interactions that need additional room.
            </p>
            <div className='rounded-lg bg-gray-50 p-4'>
              <h3 className='font-medium text-gray-900'>Additional Content</h3>
              <p className='mt-2 text-sm text-gray-600'>
                Large drawers can accommodate more complex layouts and content while maintaining
                good usability and readability.
              </p>
            </div>
          </div>
        </Drawer>
      )}
    </DrawerWrapper>
  ),
};

export const FullSize: Story = {
  render: () => (
    <DrawerWrapper buttonText='Full Size Drawer'>
      {({ open, onClose }) => (
        <Drawer open={open} onClose={onClose} size='full' title='Full Size Drawer'>
          <div className='space-y-6'>
            <p className='text-gray-600'>
              This is a full-size drawer that takes up the entire side of the screen. Perfect for
              complex interfaces or when you need maximum space.
            </p>
            <div className='grid gap-4 md:grid-cols-2'>
              <div className='rounded-lg bg-blue-50 p-4'>
                <h3 className='font-medium text-blue-900'>Section 1</h3>
                <p className='mt-2 text-sm text-blue-700'>
                  Full-size drawers can contain complex layouts with multiple sections.
                </p>
              </div>
              <div className='rounded-lg bg-green-50 p-4'>
                <h3 className='font-medium text-green-900'>Section 2</h3>
                <p className='mt-2 text-sm text-green-700'>
                  They work well for admin panels, detailed forms, and data tables.
                </p>
              </div>
            </div>
          </div>
        </Drawer>
      )}
    </DrawerWrapper>
  ),
};

export const NoAnimation: Story = {
  render: () => (
    <DrawerWrapper buttonText='No Animation'>
      {({ open, onClose }) => (
        <Drawer open={open} onClose={onClose} title='No Animation' animation={false}>
          <p className='text-gray-600'>
            This drawer has animations disabled, which is useful for users who prefer reduced motion
            or in performance-critical scenarios.
          </p>
        </Drawer>
      )}
    </DrawerWrapper>
  ),
};

export const PreventClose: Story = {
  render: () => (
    <DrawerWrapper buttonText='Prevent Close Drawer'>
      {({ open, onClose }) => (
        <Drawer
          open={open}
          onClose={onClose}
          title='Important Notice'
          preventClose={true}
          footer={
            <div className='flex justify-end'>
              <button
                className='rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
                onClick={onClose}
              >
                I Understand
              </button>
            </div>
          }
        >
          <div className='flex items-start gap-3'>
            <AlertCircle className='mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500' />
            <p className='text-gray-600'>
              This drawer cannot be closed by clicking outside or pressing Escape. You must click
              the &quot;I Understand&quot; button to proceed.
            </p>
          </div>
        </Drawer>
      )}
    </DrawerWrapper>
  ),
};

export const NoCloseButton: Story = {
  render: () => (
    <DrawerWrapper buttonText='No Close Button'>
      {({ open, onClose }) => (
        <Drawer
          open={open}
          onClose={onClose}
          title='Custom Close'
          hideCloseButton={true}
          footer={
            <div className='flex justify-between'>
              <button
                className='flex items-center gap-2 rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none'
                onClick={onClose}
              >
                <Trash2 className='h-4 w-4' />
                Delete
              </button>
              <button
                className='rounded-md bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none'
                onClick={onClose}
              >
                Close
              </button>
            </div>
          }
        >
          <p className='text-gray-600'>
            This drawer hides the default close button in favor of custom action buttons in the
            footer.
          </p>
        </Drawer>
      )}
    </DrawerWrapper>
  ),
};

export const NavigationDrawer: Story = {
  render: () => (
    <DrawerWrapper buttonText='Open Navigation'>
      {({ open, onClose }) => (
        <Drawer
          open={open}
          onClose={onClose}
          position='left'
          size='sm'
          header={
            <div className='flex items-center gap-3'>
              <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100'>
                <Menu className='h-4 w-4 text-blue-600' />
              </div>
              <h2 className='text-lg font-semibold text-gray-900'>Navigation</h2>
            </div>
          }
        >
          <nav className='space-y-2'>
            <a
              href='#'
              className='flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            >
              <User className='h-4 w-4' />
              Profile
            </a>
            <a
              href='#'
              className='flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            >
              <Settings className='h-4 w-4' />
              Settings
            </a>
            <a
              href='#'
              className='flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            >
              <Info className='h-4 w-4' />
              Help
            </a>
          </nav>
        </Drawer>
      )}
    </DrawerWrapper>
  ),
};

export const FilterDrawer: Story = {
  render: () => (
    <DrawerWrapper buttonText='Open Filters'>
      {({ open, onClose }) => (
        <Drawer
          open={open}
          onClose={onClose}
          position='right'
          title='Filters'
          footer={
            <div className='flex justify-between'>
              <button
                className='rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
                onClick={onClose}
              >
                Clear All
              </button>
              <div className='flex gap-3'>
                <button
                  className='rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  className='rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
                  onClick={onClose}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          }
        >
          <div className='space-y-6'>
            <div>
              <h3 className='font-medium text-gray-900'>Category</h3>
              <div className='mt-3 space-y-2'>
                <label className='flex items-center'>
                  <input type='checkbox' className='rounded' defaultChecked />
                  <span className='ml-2 text-sm text-gray-700'>Web Development</span>
                </label>
                <label className='flex items-center'>
                  <input type='checkbox' className='rounded' />
                  <span className='ml-2 text-sm text-gray-700'>Mobile Apps</span>
                </label>
                <label className='flex items-center'>
                  <input type='checkbox' className='rounded' />
                  <span className='ml-2 text-sm text-gray-700'>Design</span>
                </label>
              </div>
            </div>
            <div>
              <h3 className='font-medium text-gray-900'>Price Range</h3>
              <div className='mt-3 space-y-2'>
                <label className='flex items-center'>
                  <input type='radio' name='price' className='text-blue-600' />
                  <span className='ml-2 text-sm text-gray-700'>Under $50</span>
                </label>
                <label className='flex items-center'>
                  <input type='radio' name='price' className='text-blue-600' />
                  <span className='ml-2 text-sm text-gray-700'>$50 - $100</span>
                </label>
                <label className='flex items-center'>
                  <input type='radio' name='price' className='text-blue-600' />
                  <span className='ml-2 text-sm text-gray-700'>Over $100</span>
                </label>
              </div>
            </div>
          </div>
        </Drawer>
      )}
    </DrawerWrapper>
  ),
};

export const CustomStyled: Story = {
  render: () => (
    <DrawerWrapper buttonText='Custom Styled'>
      {({ open, onClose }) => (
        <Drawer
          open={open}
          onClose={onClose}
          title='Custom Drawer'
          className='border-purple-200 bg-gradient-to-b from-purple-50 to-pink-50'
          overlayClassName='bg-purple-900/50'
          footer={
            <div className='flex justify-end'>
              <button
                className='rounded-md bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-sm font-medium text-white hover:from-purple-700 hover:to-pink-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:outline-none'
                onClick={onClose}
              >
                Got it!
              </button>
            </div>
          }
        >
          <p className='text-gray-600'>
            This drawer demonstrates custom styling with a gradient background and purple theme to
            match your brand colors.
          </p>
        </Drawer>
      )}
    </DrawerWrapper>
  ),
};

const ControlledComponent = (args: Partial<DrawerProps>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='space-y-4'>
      <div className='flex gap-3'>
        <button
          className='rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
          onClick={() => setIsOpen(true)}
        >
          Open Drawer
        </button>
        <button
          className='rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
          onClick={() => setIsOpen(false)}
        >
          Close Drawer
        </button>
      </div>
      <p className='text-sm text-gray-600'>Drawer state: {isOpen ? "Open" : "Closed"}</p>

      <Drawer {...args} open={isOpen} onClose={() => setIsOpen(false)} title='Controlled Drawer'>
        <p className='text-gray-600'>
          This drawer&apos;s open state is controlled by the parent component. You can open and
          close it using external buttons.
        </p>
      </Drawer>
    </div>
  );
};

export const Controlled: Story = {
  render: args => <ControlledComponent {...args} />,
};
