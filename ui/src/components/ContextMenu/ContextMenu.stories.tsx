import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { FaCog, FaCopy, FaCut, FaPaste, FaSignOutAlt, FaTrash, FaUser } from "react-icons/fa";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuProps,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "./ContextMenu";
import mdx from "./ContextMenu.mdx";

const meta: Meta<typeof ContextMenu> = {
  title: "Components/ContextMenu",
  component: ContextMenu,
  subcomponents: {
    ContextMenuTrigger,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuSeparator,
    ContextMenuGroup,
  },
  parameters: {
    layout: "centered",
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    open: { control: "boolean" },
    defaultOpen: { control: "boolean" },
    onOpenChange: { action: "openChanged" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: args => (
    <div className='flex h-64 w-96 items-center justify-center border-2 border-dashed border-gray-300'>
      <ContextMenu {...args}>
        <ContextMenuTrigger>
          <div className='text-center'>
            <p className='mb-2 text-gray-600'>Right-click anywhere in this area</p>
            <div className='rounded-lg bg-gray-100 p-8'>
              <p className='text-lg font-medium'>Context Menu Area</p>
            </div>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className='w-56'>
          <ContextMenuLabel>Actions</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuItem>
              <FaCopy className='mr-2 h-4 w-4' />
              <span>Copy</span>
            </ContextMenuItem>
            <ContextMenuItem>
              <FaPaste className='mr-2 h-4 w-4' />
              <span>Paste</span>
            </ContextMenuItem>
            <ContextMenuItem>
              <FaCut className='mr-2 h-4 w-4' />
              <span>Cut</span>
            </ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuItem>
            <FaTrash className='mr-2 h-4 w-4' />
            <span>Delete</span>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  ),
};

export const WithIcons: Story = {
  render: args => (
    <div className='flex h-48 w-80 items-center justify-center border-2 border-dashed border-gray-300'>
      <ContextMenu {...args}>
        <ContextMenuTrigger>
          <div className='rounded-lg bg-blue-50 p-6 text-center'>
            <FaUser className='mx-auto mb-2 h-8 w-8 text-blue-600' />
            <p className='font-medium text-blue-800'>User Profile</p>
            <p className='text-sm text-blue-600'>Right-click for options</p>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className='w-56'>
          <ContextMenuLabel>My Account</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuItem>
              <FaUser className='mr-2 h-4 w-4' />
              <span>Profile</span>
            </ContextMenuItem>
            <ContextMenuItem>
              <FaCog className='mr-2 h-4 w-4' />
              <span>Settings</span>
            </ContextMenuItem>
            <ContextMenuItem>
              <FaSignOutAlt className='mr-2 h-4 w-4' />
              <span>Sign Out</span>
            </ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  ),
};

export const TextSelection: Story = {
  render: args => (
    <div className='h-64 w-96 border-2 border-dashed border-gray-300 p-6'>
      <ContextMenu {...args}>
        <ContextMenuTrigger>
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-gray-800'>Sample Text</h3>
            <p className='leading-relaxed text-gray-600'>
              This is a sample paragraph of text. You can right-click anywhere on this text to see
              the context menu with text-related actions. Try selecting some text and right-clicking
              to see the available options.
            </p>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className='w-56'>
          <ContextMenuLabel>Text Actions</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuItem>
              <FaCopy className='mr-2 h-4 w-4' />
              <span>Copy</span>
            </ContextMenuItem>
            <ContextMenuItem>
              <FaCut className='mr-2 h-4 w-4' />
              <span>Cut</span>
            </ContextMenuItem>
            <ContextMenuItem>
              <FaPaste className='mr-2 h-4 w-4' />
              <span>Paste</span>
            </ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuItem>
            <FaTrash className='mr-2 h-4 w-4' />
            <span>Delete</span>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  ),
};

export const ImageContext: Story = {
  render: args => (
    <div className='flex h-64 w-96 items-center justify-center border-2 border-dashed border-gray-300'>
      <ContextMenu {...args}>
        <ContextMenuTrigger>
          <div className='text-center'>
            <div className='mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-lg bg-gray-200'>
              <span className='text-sm text-gray-500'>Image</span>
            </div>
            <p className='text-gray-600'>Right-click on the image for options</p>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className='w-56'>
          <ContextMenuLabel>Image Actions</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuItem>
              <FaCopy className='mr-2 h-4 w-4' />
              <span>Copy Image</span>
            </ContextMenuItem>
            <ContextMenuItem>
              <FaUser className='mr-2 h-4 w-4' />
              <span>View Details</span>
            </ContextMenuItem>
            <ContextMenuItem>
              <FaCog className='mr-2 h-4 w-4' />
              <span>Edit</span>
            </ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuItem>
            <FaTrash className='mr-2 h-4 w-4' />
            <span>Delete</span>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  ),
};

export const NestedGroups: Story = {
  render: args => (
    <div className='flex h-64 w-96 items-center justify-center border-2 border-dashed border-gray-300'>
      <ContextMenu {...args}>
        <ContextMenuTrigger>
          <div className='rounded-lg bg-green-50 p-8 text-center'>
            <p className='text-lg font-medium text-green-800'>File Explorer</p>
            <p className='mt-2 text-sm text-green-600'>Right-click for file actions</p>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className='w-64'>
          <ContextMenuLabel>File Operations</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuItem>
              <FaCopy className='mr-2 h-4 w-4' />
              <span>Copy</span>
            </ContextMenuItem>
            <ContextMenuItem>
              <FaCut className='mr-2 h-4 w-4' />
              <span>Cut</span>
            </ContextMenuItem>
            <ContextMenuItem>
              <FaPaste className='mr-2 h-4 w-4' />
              <span>Paste</span>
            </ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuLabel>View Options</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuItem>
              <FaUser className='mr-2 h-4 w-4' />
              <span>Large Icons</span>
            </ContextMenuItem>
            <ContextMenuItem>
              <FaCog className='mr-2 h-4 w-4' />
              <span>Details</span>
            </ContextMenuItem>
            <ContextMenuItem>
              <FaSignOutAlt className='mr-2 h-4 w-4' />
              <span>List</span>
            </ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuItem>
            <FaTrash className='mr-2 h-4 w-4' />
            <span>Delete</span>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  ),
};

export const Disabled: Story = {
  render: args => (
    <div className='flex h-64 w-96 items-center justify-center border-2 border-dashed border-gray-300'>
      <ContextMenu {...args}>
        <ContextMenuTrigger disabled>
          <div className='rounded-lg bg-red-50 p-8 text-center opacity-50'>
            <p className='text-lg font-medium text-red-800'>Disabled Area</p>
            <p className='mt-2 text-sm text-red-600'>Context menu is disabled</p>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className='w-56'>
          <ContextMenuLabel>Actions</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuItem>
              <FaCopy className='mr-2 h-4 w-4' />
              <span>Copy</span>
            </ContextMenuItem>
            <ContextMenuItem>
              <FaPaste className='mr-2 h-4 w-4' />
              <span>Paste</span>
            </ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  ),
};

const ControlledComponent = (args: Partial<ContextMenuProps>) => {
  const [open, setOpen] = useState(false);

  return (
    <div className='w-96'>
      <div className='mb-4 flex h-48 items-center justify-center border-2 border-dashed border-gray-300'>
        <ContextMenu {...args} open={open} onOpenChange={setOpen}>
          <ContextMenuTrigger>
            <div className='rounded-lg bg-purple-50 p-6 text-center'>
              <p className='font-medium text-purple-800'>Controlled Context Menu</p>
              <p className='mt-1 text-sm text-purple-600'>Right-click here</p>
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent className='w-56'>
            <ContextMenuLabel>Actions</ContextMenuLabel>
            <ContextMenuSeparator />
            <ContextMenuGroup>
              <ContextMenuItem>
                <FaCopy className='mr-2 h-4 w-4' />
                <span>Copy</span>
              </ContextMenuItem>
              <ContextMenuItem>
                <FaPaste className='mr-2 h-4 w-4' />
                <span>Paste</span>
              </ContextMenuItem>
              <ContextMenuItem>
                <FaCut className='mr-2 h-4 w-4' />
                <span>Cut</span>
              </ContextMenuItem>
            </ContextMenuGroup>
          </ContextMenuContent>
        </ContextMenu>
      </div>
      <p className='text-sm text-gray-600'>Open: {open ? "Yes" : "No"}</p>
    </div>
  );
};

export const Controlled: Story = {
  render: args => <ControlledComponent {...args} />,
};
