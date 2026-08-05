import type { Meta, StoryObj } from "@storybook/react-vite";
import { tw } from "../../lib/utils";
import { Resizable } from "./Resizable";
import mdx from "./Resizable.mdx";

const meta: Meta<typeof Resizable> = {
  title: "Components/Resizable",
  component: Resizable,
  parameters: {
    layout: "centered",
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    direction: {
      control: { type: "radio" },
      options: ["horizontal", "vertical", "both"],
      description: "Direction of resize handles",
      defaultValue: "both",
      type: {
        name: "enum",
        value: ["horizontal", "vertical", "both"],
      },
    },
    defaultWidth: {
      control: { type: "number" },
      description: "Initial width of the resizable container",
      defaultValue: 300,
      type: { name: "number" },
    },
    defaultHeight: {
      control: { type: "number" },
      description: "Initial height of the resizable container",
      defaultValue: 200,
      type: { name: "number" },
    },
    minWidth: {
      control: { type: "number" },
      description: "Minimum width constraint",
      defaultValue: 100,
      type: { name: "number" },
    },
    maxWidth: {
      control: { type: "number" },
      description: "Maximum width constraint",
      defaultValue: 800,
      type: { name: "number" },
    },
    minHeight: {
      control: { type: "number" },
      description: "Minimum height constraint",
      defaultValue: 100,
      type: { name: "number" },
    },
    maxHeight: {
      control: { type: "number" },
      description: "Maximum height constraint",
      defaultValue: 600,
      type: { name: "number" },
    },
    resizable: {
      control: "boolean",
      description: "Enable/disable resize functionality",
      defaultValue: true,
      type: { name: "boolean" },
    },
    showHandles: {
      control: "boolean",
      description: "Show resize handles",
      defaultValue: true,
      type: { name: "boolean" },
    },
    handleSize: {
      control: { type: "number" },
      description: "Handle size in pixels",
      defaultValue: 2,
      type: { name: "number" },
    },
    handleColor: {
      control: { type: "radio" },
      options: ["default", "primary", "secondary"],
      description: "Handle color theme",
      defaultValue: "default",
      type: {
        name: "enum",
        value: ["default", "primary", "secondary"],
      },
    },
    showCornerHandle: {
      control: "boolean",
      description: "Show corner handle for resizing both dimensions",
      defaultValue: true,
      type: { name: "boolean" },
    },
    cornerHandleSize: {
      control: { type: "number" },
      description: "Corner handle size in pixels (uses handleSize if not specified)",
      defaultValue: 8,
      type: { name: "number" },
    },
    onResize: { action: "resized" },
    onResizeStart: { action: "resize started" },
    onResizeEnd: { action: "resize ended" },
    children: {
      description: "Content to be made resizable",
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Resizable>;

const SampleContent = () => (
  <div className="flex h-full items-center justify-center rounded-lg bg-linear-to-br from-blue-50 to-indigo-100 p-4">
    <div className="text-center">
      <h3 className="mb-2 text-lg font-semibold text-gray-800">Resizable Content</h3>
      <p className="text-sm text-gray-600">Drag the edges to resize this container</p>
    </div>
  </div>
);

export const Default: Story = {
  args: {
    children: <SampleContent />,
  },
};

export const HorizontalOnly: Story = {
  args: {
    children: <SampleContent />,
    direction: "horizontal",
    defaultWidth: 400,
    defaultHeight: 250,
  },
};

export const VerticalOnly: Story = {
  args: {
    children: <SampleContent />,
    direction: "vertical",
    defaultWidth: 350,
    defaultHeight: 300,
  },
};

export const BothDirections: Story = {
  args: {
    children: <SampleContent />,
    direction: "both",
    defaultWidth: 350,
    defaultHeight: 250,
  },
};

export const WithConstraints: Story = {
  args: {
    children: <SampleContent />,
    minWidth: 200,
    maxWidth: 500,
    minHeight: 150,
    maxHeight: 400,
    defaultWidth: 300,
    defaultHeight: 200,
  },
};

export const LargeHandle: Story = {
  args: {
    children: <SampleContent />,
    handleSize: 8,
    handleColor: "primary",
  },
};

export const CustomStyled: Story = {
  args: {
    children: (
      <div className="flex h-full items-center justify-center rounded-xl bg-linear-to-r from-purple-400 via-pink-500 to-red-500 p-6 shadow-lg">
        <div className="text-center text-white">
          <h3 className="mb-2 text-xl font-bold">Custom Styled</h3>
          <p className="text-sm opacity-90">Beautiful resizable container</p>
        </div>
      </div>
    ),
    className: tw`rounded-lg border-2 border-gray-300 shadow-md`,
    handleColor: "secondary",
    handleSize: 6,
  },
};

export const CodeEditor: Story = {
  args: {
    children: (
      <div className="h-full overflow-auto bg-gray-900 p-4 font-mono text-sm text-green-400">
        <div className="mb-2 text-gray-400">{"// Resizable Code Editor"}</div>
        <div>{"function hello() {"}</div>
        <div className="ml-4">{"console.log('Hello, World!');"}</div>
        <div>{"}"}</div>
        <div className="mt-4 text-gray-400">{"// Drag the edges to resize"}</div>
      </div>
    ),
    defaultWidth: 500,
    defaultHeight: 300,
    minWidth: 300,
    minHeight: 200,
    handleColor: "primary",
  },
};

export const ImageViewer: Story = {
  args: {
    children: (
      <div className="flex h-full items-center justify-center bg-gray-100 p-4">
        <div className="max-h-full max-w-full rounded-lg bg-white p-4 shadow-md">
          <div className="flex h-48 w-full items-center justify-center rounded bg-linear-to-br from-blue-200 to-purple-300">
            <span className="text-sm text-gray-600">Sample Image</span>
          </div>
          <p className="mt-2 text-center text-sm text-gray-600">Sample Image Placeholder</p>
        </div>
      </div>
    ),
    defaultWidth: 450,
    defaultHeight: 350,
    handleColor: "secondary",
  },
};

export const Disabled: Story = {
  args: {
    children: <SampleContent />,
    resizable: false,
  },
};

export const HiddenHandles: Story = {
  args: {
    children: <SampleContent />,
    showHandles: false,
  },
};

export const CornerHandleHidden: Story = {
  args: {
    children: <SampleContent />,
    direction: "both",
    showCornerHandle: false,
    defaultWidth: 350,
    defaultHeight: 250,
  },
};

export const LargeCornerHandle: Story = {
  args: {
    children: <SampleContent />,
    direction: "both",
    cornerHandleSize: 12,
    handleSize: 4,
    defaultWidth: 350,
    defaultHeight: 250,
  },
};

export const CustomCornerSize: Story = {
  args: {
    children: <SampleContent />,
    direction: "both",
    handleSize: 2,
    cornerHandleSize: 8,
    handleColor: "primary",
    defaultWidth: 350,
    defaultHeight: 250,
  },
};

export const SmallContainer: Story = {
  args: {
    children: (
      <div className="flex h-full items-center justify-center rounded bg-blue-50 p-2">
        <span className="text-xs text-blue-600">Small resizable area</span>
      </div>
    ),
    defaultWidth: 150,
    defaultHeight: 100,
    minWidth: 100,
    minHeight: 80,
    handleSize: 3,
  },
};
