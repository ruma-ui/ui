import type { Meta, StoryObj } from "@storybook/react-vite";
import { FileUpload } from "./FileUpload";
import { useState } from "react";

const meta: Meta<typeof FileUpload> = {
  title: "Components/FileUpload",
  component: FileUpload,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A flexible file upload component with drag-and-drop support, file validation, and preview capabilities.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["primary", "secondary", "dashed"],
      description: "The visual style of the file upload",
      defaultValue: "primary",
      type: {
        name: "enum",
        value: ["primary", "secondary", "dashed"],
      },
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
      description: "The size of the file upload area",
      defaultValue: "md",
      type: {
        name: "enum",
        value: ["sm", "md", "lg"],
      },
    },
    rounded: {
      control: { type: "radio" },
      options: ["none", "sm", "md", "lg", "xl", "full"],
      description: "Control the border radius of the file upload",
      defaultValue: "md",
      type: {
        name: "enum",
        value: ["none", "sm", "md", "lg", "xl", "full"],
      },
    },
    multiple: {
      control: "boolean",
      description: "Allow multiple file selection",
      defaultValue: false,
      type: { name: "boolean" },
    },
    disabled: {
      control: "boolean",
      description: "Disable the file upload",
      defaultValue: false,
      type: { name: "boolean" },
    },
    dragAndDrop: {
      control: "boolean",
      description: "Show drag and drop area",
      defaultValue: true,
      type: { name: "boolean" },
    },
    fullWidth: {
      control: "boolean",
      description: "Make file upload take full width of its container",
      defaultValue: false,
      type: { name: "boolean" },
    },
    showFileList: {
      control: "boolean",
      description: "Show file list",
      defaultValue: true,
      type: { name: "boolean" },
    },
    icon: {
      control: false,
      description: "Custom upload icon - accepts any React element",
    },
    accept: {
      control: "text",
      description: "Accepted file types (e.g., 'image/*', '.pdf', '.doc,.docx')",
      type: { name: "string" },
    },
    maxSize: {
      control: "number",
      description: "Maximum file size in bytes",
      type: { name: "number" },
    },
    maxFiles: {
      control: "number",
      description: "Maximum number of files allowed",
      type: { name: "number" },
    },
    placeholder: {
      control: "text",
      description: "Custom placeholder text",
      defaultValue: "Click to upload or drag and drop",
      type: { name: "string" },
    },
    description: {
      control: "text",
      description: "Custom description text below the button",
      type: { name: "string" },
    },
    onFilesSelected: { action: "filesSelected" },
    onFileRemoved: { action: "fileRemoved" },
    onError: { action: "error" },
  },
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

// Wrapper component for state management in stories
const FileUploadWithState = (args: React.ComponentProps<typeof FileUpload>) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    args.onFilesSelected?.(selectedFiles);
  };

  const handleFileRemoved = (file: File, index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    args.onFileRemoved?.(file, index);
  };

  return (
    <FileUpload
      {...args}
      value={files}
      onFilesSelected={handleFilesSelected}
      onFileRemoved={handleFileRemoved}
    />
  );
};

export const Primary: Story = {
  render: args => <FileUploadWithState {...args} />,
  args: {
    variant: "primary",
  },
};

export const Secondary: Story = {
  render: args => <FileUploadWithState {...args} />,
  args: {
    variant: "secondary",
  },
};

export const Dashed: Story = {
  render: args => <FileUploadWithState {...args} />,
  args: {
    variant: "dashed",
  },
};

export const Small: Story = {
  render: args => <FileUploadWithState {...args} />,
  args: {
    size: "sm",
  },
};

export const Large: Story = {
  render: args => <FileUploadWithState {...args} />,
  args: {
    size: "lg",
  },
};

export const MultipleFiles: Story = {
  render: args => <FileUploadWithState {...args} />,
  args: {
    multiple: true,
    placeholder: "Select multiple files",
  },
};

export const WithFileTypes: Story = {
  render: args => <FileUploadWithState {...args} />,
  args: {
    accept: "image/*,.pdf",
    placeholder: "Upload images or PDF files",
  },
};

export const WithSizeLimit: Story = {
  render: args => <FileUploadWithState {...args} />,
  args: {
    maxSize: 1024 * 1024, // 1MB
    placeholder: "Upload files up to 1MB",
  },
};

export const WithMaxFiles: Story = {
  render: args => <FileUploadWithState {...args} />,
  args: {
    multiple: true,
    maxFiles: 3,
    placeholder: "Upload up to 3 files",
  },
};

export const Disabled: Story = {
  render: args => <FileUploadWithState {...args} />,
  args: {
    disabled: true,
    placeholder: "Upload disabled",
  },
};

export const NoDragAndDrop: Story = {
  render: args => <FileUploadWithState {...args} />,
  args: {
    dragAndDrop: false,
    placeholder: "Click to select files only",
  },
};

export const FullWidth: Story = {
  render: args => <FileUploadWithState {...args} />,
  args: {
    fullWidth: true,
  },
  parameters: {
    layout: "padded",
  },
};

export const CustomStyling: Story = {
  render: args => <FileUploadWithState {...args} />,
  args: {
    variant: "primary",
    placeholder: "Upload your documents",
    buttonText: "Select Documents",
    className: "border-2 border-blue-500 bg-blue-50",
  },
};

export const RoundedCorners: Story = {
  render: args => <FileUploadWithState {...args} />,
  args: {
    rounded: "full",
    placeholder: "Upload with rounded corners",
  },
};

export const WithDescription: Story = {
  render: args => <FileUploadWithState {...args} />,
  args: {
    description: "Upload your documents in PDF or Word format. Maximum file size is 10MB.",
    accept: ".pdf,.doc,.docx",
    maxSize: 10 * 1024 * 1024, // 10MB
    placeholder: "Select your documents",
  },
};
