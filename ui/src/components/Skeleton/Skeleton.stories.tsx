import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./Skeleton";
import mdx from "./Skeleton.mdx";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["rectangle", "circle", "text"],
      description: "The shape of the skeleton",
      defaultValue: "rectangle",
      type: {
        name: "enum",
        value: ["rectangle", "circle", "text"],
      },
    },
    size: {
      control: { type: "radio" },
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "The size of the skeleton",
      defaultValue: "md",
      type: {
        name: "enum",
        value: ["xs", "sm", "md", "lg", "xl"],
      },
    },
    animation: {
      control: { type: "radio" },
      options: ["shimmer", "wave", "fade", "pulse", "none"],
      description: "Animation type for the skeleton",
      defaultValue: "shimmer",
      type: {
        name: "enum",
        value: ["shimmer", "wave", "fade", "pulse", "none"],
      },
    },
    width: {
      control: { type: "text" },
      description: "The width of the skeleton",
      defaultValue: "auto",
    },
    height: {
      control: { type: "text" },
      description: "The height of the skeleton",
      defaultValue: "auto",
    },
    lines: {
      control: { type: "number", min: 1, max: 10 },
      description: "Number of skeleton lines for text variant",
      defaultValue: 1,
    },
    show: {
      control: "boolean",
      description: "Whether to show the skeleton or not",
      defaultValue: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Rectangle: Story = {
  args: {
    variant: "rectangle",
    width: 200,
    height: 100,
  },
};

export const Circle: Story = {
  args: {
    variant: "circle",
    width: 64,
    height: 64,
  },
};

export const Text: Story = {
  args: {
    variant: "text",
    width: 300,
    lines: 3,
    size: "md",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Skeleton size="xs" width={200} height={20} />
      <Skeleton size="sm" width={200} height={24} />
      <Skeleton size="md" width={200} height={32} />
      <Skeleton size="lg" width={200} height={40} />
      <Skeleton size="xl" width={200} height={48} />
    </div>
  ),
};

export const Animations: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Skeleton animation="shimmer" width={200} height={40} />
      <Skeleton animation="wave" width={200} height={40} />
      <Skeleton animation="fade" width={200} height={40} />
      <Skeleton animation="pulse" width={200} height={40} />
      <Skeleton animation="none" width={200} height={40} />
    </div>
  ),
};

export const CardSkeleton: Story = {
  render: () => (
    <div className="max-w-sm rounded-lg border border-gray-200 p-4 shadow-sm">
      <Skeleton variant="rectangle" width="100%" height={160} className="mb-4" />
      <Skeleton variant="text" width="100%" lines={2} className="mb-2" />
      <Skeleton variant="text" width="60%" lines={1} className="mb-4" />
      <div className="flex items-center gap-2">
        <Skeleton variant="circle" width={32} height={32} />
        <div className="flex-1">
          <Skeleton variant="text" width="80%" lines={1} size="sm" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};

export const ListSkeleton: Story = {
  render: () => (
    <div className="space-y-4">
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton variant="circle" width={48} height={48} />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="100%" lines={1} />
            <Skeleton variant="text" width="60%" lines={1} size="sm" />
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};

export const TableSkeleton: Story = {
  render: () => (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
        <div className="flex gap-4">
          <Skeleton variant="text" width={100} lines={1} size="sm" />
          <Skeleton variant="text" width={120} lines={1} size="sm" />
          <Skeleton variant="text" width={80} lines={1} size="sm" />
          <Skeleton variant="text" width={90} lines={1} size="sm" />
        </div>
      </div>
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className="border-b border-gray-100 px-4 py-3 last:border-b-0">
          <div className="flex gap-4">
            <Skeleton variant="text" width={100} lines={1} size="sm" />
            <Skeleton variant="text" width={120} lines={1} size="sm" />
            <Skeleton variant="text" width={80} lines={1} size="sm" />
            <Skeleton variant="text" width={90} lines={1} size="sm" />
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};

export const TextSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Skeleton variant="text" size="xs" width={250} lines={1} />
      <Skeleton variant="text" size="sm" width={250} lines={1} />
      <Skeleton variant="text" size="md" width={250} lines={1} />
      <Skeleton variant="text" size="lg" width={250} lines={1} />
      <Skeleton variant="text" size="xl" width={250} lines={1} />
    </div>
  ),
};

export const CustomDimensions: Story = {
  args: {
    width: 300,
    height: 150,
    variant: "rectangle",
  },
};
