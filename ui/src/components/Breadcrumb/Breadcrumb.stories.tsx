import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { FaCog, FaFileAlt, FaFolder, FaHome, FaUser } from "react-icons/fa";
import { Breadcrumb, BreadcrumbProps } from "./Breadcrumb";
import mdx from "./Breadcrumb.mdx";

const meta: Meta<typeof Breadcrumb> = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
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
      description: "The visual style of the breadcrumb",
      defaultValue: "primary",
      type: {
        name: "enum",
        value: ["primary", "secondary"],
      },
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
      description: "The size of the breadcrumb",
      defaultValue: "md",
      type: {
        name: "enum",
        value: ["sm", "md", "lg"],
      },
    },
    rounded: {
      control: { type: "radio" },
      options: ["none", "sm", "md", "lg", "xl", "full"],
      description: "Control the border radius of breadcrumb items",
      defaultValue: "sm",
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
    fullWidth: {
      control: { type: "boolean" },
      description: "Make breadcrumb take full width of its container",
      defaultValue: false,
      type: { name: "boolean" },
    },
    maxItems: {
      control: { type: "number" },
      description: "Maximum number of items to show before collapsing",
    },
    separator: {
      control: false,
      description: "Custom separator between items",
    },
    items: {
      control: false,
      description: "Array of breadcrumb items",
    },
    onItemClick: { action: "itemClicked" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Current Page" },
];

const withIconItems = [
  { label: "Home", href: "/", icon: <FaHome /> },
  { label: "Profile", href: "/profile", icon: <FaUser /> },
  { label: "Settings", icon: <FaCog /> },
];

const longItems = [
  { label: "Home", href: "/" },
  { label: "Category", href: "/category" },
  { label: "Subcategory", href: "/category/sub" },
  { label: "Products", href: "/category/sub/products" },
  { label: "Product Details", href: "/category/sub/products/123" },
  { label: "Reviews" },
];

const fileSystemItems = [
  { label: "Documents", href: "/documents", icon: <FaFolder /> },
  { label: "Projects", href: "/documents/projects", icon: <FaFolder /> },
  { label: "UI Library", href: "/documents/projects/ui", icon: <FaFolder /> },
  { label: "Breadcrumb.tsx", icon: <FaFileAlt /> },
];

export const Primary: Story = {
  args: {
    items: basicItems,
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    items: basicItems,
    variant: "secondary",
  },
};

export const WithIcons: Story = {
  args: {
    items: withIconItems,
  },
};

export const CustomSeparator: Story = {
  args: {
    items: basicItems,
    separator: "→",
  },
};

export const Collapsed: Story = {
  args: {
    items: longItems,
    maxItems: 4,
  },
};

export const FileSystem: Story = {
  args: {
    items: fileSystemItems,
  },
};

export const WithDisabledItem: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Disabled", disabled: true },
      { label: "Current Page" },
    ],
  },
};

export const FullWidth: Story = {
  args: {
    items: basicItems,
    fullWidth: true,
  },
  parameters: {
    layout: "padded",
  },
};

export const NoAnimation: Story = {
  args: {
    items: basicItems,
    animation: false,
  },
};

const InteractiveComponent = (args: Partial<BreadcrumbProps>) => {
  const [currentPath, setCurrentPath] = useState(["Home", "Products"]);

  const items = currentPath.map((path, index) => ({
    label: path,
    onClick: () => {
      setCurrentPath(currentPath.slice(0, index + 1));
    },
  }));

  const addPage = (pageName: string) => {
    setCurrentPath([...currentPath, pageName]);
  };

  return (
    <div className="w-96 space-y-4">
      <Breadcrumb {...args} items={items} />
      <div className="flex gap-2">
        <button
          onClick={() => addPage("Details")}
          className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
        >
          Add Details
        </button>
        <button
          onClick={() => addPage("Settings")}
          className="rounded bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600"
        >
          Add Settings
        </button>
        <button
          onClick={() => setCurrentPath(["Home"])}
          className="rounded bg-gray-500 px-3 py-1 text-sm text-white hover:bg-gray-600"
        >
          Reset
        </button>
      </div>
      <p className="text-sm text-gray-600">Current path: {currentPath.join(" > ")}</p>
    </div>
  );
};

export const Interactive: Story = {
  render: args => <InteractiveComponent {...args} />,
};
