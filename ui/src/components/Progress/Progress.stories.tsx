import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { Progress } from "./Progress";
import mdx from "./Progress.mdx";

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100 },
      description: "Current progress value (0-100)",
    },
    max: {
      control: { type: "number", min: 1 },
      description: "Maximum value for progress calculation",
    },
    variant: {
      control: { type: "select" },
      options: ["bar", "circular"],
      description: "Visual style of the progress indicator",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Size of the progress indicator",
    },
    appearance: {
      control: { type: "select" },
      options: ["filled", "outline", "soft"],
      description: "Visual style variant",
    },
    rounded: {
      control: { type: "select" },
      options: ["none", "sm", "md", "lg", "xl", "full"],
      description: "Border radius of the progress bar",
    },
    showValue: {
      control: { type: "boolean" },
      description: "Whether to display the progress percentage",
    },
    label: {
      control: { type: "text" },
      description: "Custom label text to display",
    },
    animated: {
      control: { type: "boolean" },
      description: "Whether the progress bar has smooth transitions",
    },
    striped: {
      control: { type: "boolean" },
      description: "Whether the progress bar has animated stripes",
    },
    indeterminate: {
      control: { type: "boolean" },
      description: "Whether to show indeterminate loading state",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Primary: Story = {
  render: () => (
    <div className="w-80 space-y-6">
      <Progress value={75} variant="bar" size="md" appearance="filled" rounded="full" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="w-80 space-y-6">
      <div>
        <h4 className="mb-2 text-sm font-medium">Bar Variant</h4>
        <Progress value={75} variant="bar" />
      </div>
      <div>
        <h4 className="mb-2 text-sm font-medium">Circular Variant</h4>
        <div className="flex justify-center">
          <Progress value={75} variant="circular" />
        </div>
      </div>
    </div>
  ),
};

export const Appearances: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <div>
        <h4 className="mb-2 text-sm font-medium">Filled Appearance</h4>
        <Progress value={75} appearance="filled" />
      </div>
      <div>
        <h4 className="mb-2 text-sm font-medium">Outline Appearance</h4>
        <Progress value={75} appearance="outline" />
      </div>
      <div>
        <h4 className="mb-2 text-sm font-medium">Soft Appearance</h4>
        <Progress value={75} appearance="soft" />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <div>
        <h4 className="mb-2 text-sm font-medium">Small Size</h4>
        <Progress value={75} size="sm" />
      </div>
      <div>
        <h4 className="mb-2 text-sm font-medium">Medium Size</h4>
        <Progress value={75} size="md" />
      </div>
      <div>
        <h4 className="mb-2 text-sm font-medium">Large Size</h4>
        <Progress value={75} size="lg" />
      </div>
    </div>
  ),
};

export const RoundedVariants: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <div>
        <h4 className="mb-2 text-sm font-medium">No Rounding</h4>
        <Progress value={75} rounded="none" />
      </div>
      <div>
        <h4 className="mb-2 text-sm font-medium">Small Rounding</h4>
        <Progress value={75} rounded="sm" />
      </div>
      <div>
        <h4 className="mb-2 text-sm font-medium">Medium Rounding</h4>
        <Progress value={75} rounded="md" />
      </div>
      <div>
        <h4 className="mb-2 text-sm font-medium">Large Rounding</h4>
        <Progress value={75} rounded="lg" />
      </div>
      <div>
        <h4 className="mb-2 text-sm font-medium">Extra Large Rounding</h4>
        <Progress value={75} rounded="xl" />
      </div>
      <div>
        <h4 className="mb-2 text-sm font-medium">Full Rounding</h4>
        <Progress value={75} rounded="full" />
      </div>
    </div>
  ),
};

export const WithValue: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <Progress value={25} showValue />
      <Progress value={50} showValue />
      <Progress value={75} showValue />
      <Progress value={100} showValue />
    </div>
  ),
};

export const WithLabels: Story = {
  render: () => (
    <div className="w-80 space-y-6">
      <div>
        <h4 className="mb-2 text-sm font-medium">With Label</h4>
        <Progress value={75} label="Upload Progress" />
      </div>
      <div>
        <h4 className="mb-2 text-sm font-medium">With Label and Value</h4>
        <Progress value={45} label="Processing..." showValue />
      </div>
      <div>
        <h4 className="mb-2 text-sm font-medium">Just Value</h4>
        <Progress value={90} showValue />
      </div>
    </div>
  ),
};

export const WithCustomLabel: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <Progress value={75} label="Uploading..." />
      <Progress value={45} label="Processing..." />
      <Progress value={90} label="Complete!" />
    </div>
  ),
};

const AnimatedComponent = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 10));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-80 space-y-4">
      <Progress value={progress} animated showValue />
      <p className="text-sm text-gray-600">Progress: {progress}%</p>
    </div>
  );
};

export const Animated: Story = {
  render: () => <AnimatedComponent />,
};

export const Striped: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <Progress value={75} striped showValue />
      <Progress value={60} striped showValue />
      <Progress value={85} striped showValue />
    </div>
  ),
};

export const Indeterminate: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <Progress indeterminate />
      <Progress indeterminate variant="circular" />
    </div>
  ),
};

const LoadingStatesComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setIsLoading(false);
          return 100;
        }
        return prev + 5;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <div className="w-80 space-y-4">
      <Progress
        value={isLoading ? progress : 100}
        indeterminate={isLoading}
        animated={!isLoading}
        showValue
        label={isLoading ? "Loading..." : "Complete!"}
      />
      <button
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        onClick={() => {
          setIsLoading(true);
          setProgress(0);
        }}
      >
        Restart
      </button>
    </div>
  );
};

export const LoadingStates: Story = {
  render: () => <LoadingStatesComponent />,
};

const FileUploadComponent = () => {
  const [files, setFiles] = useState([
    { name: "document.pdf", progress: 100, status: "complete" },
    { name: "image.jpg", progress: 75, status: "uploading" },
    { name: "video.mp4", progress: 30, status: "uploading" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFiles(prev =>
        prev.map(file => {
          if (file.status === "uploading" && file.progress < 100) {
            return {
              ...file,
              progress: Math.min(file.progress + 5, 100),
            };
          }
          return file;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-96 space-y-4">
      {files.map((file, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{file.name}</span>
            <span className="text-xs text-gray-500">{file.progress}%</span>
          </div>
          <Progress value={file.progress} size="sm" animated={file.status === "uploading"} />
        </div>
      ))}
    </div>
  );
};

export const FileUpload: Story = {
  render: () => <FileUploadComponent />,
};

export const Circular: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="flex justify-center">
        <Progress value={75} variant="circular" showValue />
      </div>
      <div className="flex justify-center">
        <Progress value={45} variant="circular" size="sm" showValue />
      </div>
      <div className="flex justify-center">
        <Progress value={90} variant="circular" size="lg" showValue />
      </div>
      <div className="flex justify-center">
        <Progress indeterminate variant="circular" />
      </div>
    </div>
  ),
};

export const CircularAppearances: Story = {
  render: () => (
    <div className="flex justify-center space-x-8">
      <div className="text-center">
        <h4 className="mb-2 text-sm font-medium">Filled</h4>
        <Progress value={75} variant="circular" appearance="filled" showValue />
      </div>
      <div className="text-center">
        <h4 className="mb-2 text-sm font-medium">Outline</h4>
        <Progress value={75} variant="circular" appearance="outline" showValue />
      </div>
      <div className="text-center">
        <h4 className="mb-2 text-sm font-medium">Soft</h4>
        <Progress value={75} variant="circular" appearance="soft" showValue />
      </div>
    </div>
  ),
};

export const ZeroAndFull: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <div>
        <Progress label="Zero Progress" value={0} showValue />
      </div>
      <div>
        <Progress label="Full Progress" value={100} showValue />
      </div>
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <div>
        <h4 className="mb-2 text-sm font-medium">Custom Track Color</h4>
        <Progress
          value={75}
          trackClassName="bg-purple-100"
          fillClassName="bg-purple-600"
          showValue
        />
      </div>
      <div>
        <h4 className="mb-2 text-sm font-medium">Custom Container</h4>
        <Progress value={60} className="rounded-lg bg-gray-50 p-4" showValue />
      </div>
    </div>
  ),
};
