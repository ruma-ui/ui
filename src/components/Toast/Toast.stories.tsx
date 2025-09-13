import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Toast } from "./Toast";
import { useState } from "react";
import { Button } from "../Button/Button";

const meta: Meta<typeof Toast> = {
    title: "Components/Toast",
    component: Toast,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component: "Toast notifications provide brief feedback about actions or events.",
            },
        },
    },
    argTypes: {
        variant: {
            control: { type: "radio" },
            options: ["success", "error", "warning", "info"],
            description: "The type of toast which determines the visual style and icon",
            defaultValue: "info",
            type: {
                name: "enum",
                value: ["success", "error", "warning", "info"],
            },
        },
        position: {
            control: { type: "radio" },
            options: [
                "top-left",
                "top-center",
                "top-right",
                "bottom-left",
                "bottom-center",
                "bottom-right",
            ],
            description: "The position of the toast on screen",
            defaultValue: "top-right",
            type: {
                name: "enum",
                value: [
                    "top-left",
                    "top-center",
                    "top-right",
                    "bottom-left",
                    "bottom-center",
                    "bottom-right",
                ],
            },
        },
        size: {
            control: { type: "radio" },
            options: ["sm", "md", "lg"],
            description: "The size of the toast",
            defaultValue: "md",
            type: {
                name: "enum",
                value: ["sm", "md", "lg"],
            },
        },
        duration: {
            control: { type: "number" },
            description: "Auto-dismiss duration in milliseconds. Set to 0 to disable auto-dismiss",
            defaultValue: 5000,
        },
        showCloseButton: {
            control: "boolean",
            description: "Show close button",
            defaultValue: true,
            type: { name: "boolean" },
        },
        animation: {
            control: "boolean",
            description: "Enable/disable animations",
            defaultValue: true,
            type: { name: "boolean" },
        },
        title: {
            control: "text",
            description: "Toast title",
        },
        description: {
            control: "text",
            description: "Toast description/content",
        },
        open: {
            control: false,
            description: "Whether the toast is visible",
        },
        onClose: {
            action: "closed",
            description: "Callback when toast should close",
        },
    },
};

export default meta;
type Story = StoryObj<typeof Toast>;

// Toast container component for stories
const ToastContainer = ({
    children,
}: {
    children: (props: { open: boolean; onClose: () => void }) => React.ReactNode;
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative min-h-screen bg-gray-50 p-8">
            <Button onClick={() => setIsOpen(true)} className="mb-4">
                Show Toast
            </Button>
            {children({
                open: isOpen,
                onClose: () => setIsOpen(false),
            })}
        </div>
    );
};

export const Success: Story = {
    render: (args) => (
        <ToastContainer>
            {(props: { open: boolean; onClose: () => void }) => <Toast {...args} {...props} />}
        </ToastContainer>
    ),
    args: {
        variant: "success",
        title: "Success!",
        description: "Your changes have been saved successfully.",
    },
};

export const Error: Story = {
    render: (args) => (
        <ToastContainer>
            {(props: { open: boolean; onClose: () => void }) => <Toast {...args} {...props} />}
        </ToastContainer>
    ),
    args: {
        variant: "error",
        title: "Error",
        description: "Something went wrong. Please try again.",
    },
};

export const Warning: Story = {
    render: (args) => (
        <ToastContainer>
            {(props: { open: boolean; onClose: () => void }) => <Toast {...args} {...props} />}
        </ToastContainer>
    ),
    args: {
        variant: "warning",
        title: "Warning",
        description: "This action cannot be undone.",
    },
};

export const Info: Story = {
    render: (args) => (
        <ToastContainer>
            {(props: { open: boolean; onClose: () => void }) => <Toast {...args} {...props} />}
        </ToastContainer>
    ),
    args: {
        variant: "info",
        title: "Information",
        description: "Here's some useful information for you.",
    },
};

export const WithCustomIcon: Story = {
    render: (args) => (
        <ToastContainer>
            {(props: { open: boolean; onClose: () => void }) => <Toast {...args} {...props} />}
        </ToastContainer>
    ),
    args: {
        variant: "info",
        title: "Custom Icon",
        description: "This toast uses a custom icon.",
        icon: (
            <svg
                className="h-5 w-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                />
            </svg>
        ),
    },
};

export const WithoutCloseButton: Story = {
    render: (args) => (
        <ToastContainer>
            {(props: { open: boolean; onClose: () => void }) => <Toast {...args} {...props} />}
        </ToastContainer>
    ),
    args: {
        variant: "success",
        title: "Auto-dismiss Only",
        description: "This toast will auto-dismiss after 5 seconds.",
        showCloseButton: false,
        duration: 5000,
    },
};

export const LongContent: Story = {
    render: (args) => (
        <ToastContainer>
            {(props: { open: boolean; onClose: () => void }) => <Toast {...args} {...props} />}
        </ToastContainer>
    ),
    args: {
        variant: "info",
        title: "Long Content Example",
        description:
            "This is a longer description that demonstrates how the toast handles more content. It should wrap properly and maintain readability.",
    },
};

export const SmallSize: Story = {
    render: (args) => (
        <ToastContainer>
            {(props: { open: boolean; onClose: () => void }) => <Toast {...args} {...props} />}
        </ToastContainer>
    ),
    args: {
        variant: "success",
        size: "sm",
        title: "Small Toast",
        description: "This is a small-sized toast.",
    },
};

export const LargeSize: Story = {
    render: (args) => (
        <ToastContainer>
            {(props: { open: boolean; onClose: () => void }) => <Toast {...args} {...props} />}
        </ToastContainer>
    ),
    args: {
        variant: "warning",
        size: "lg",
        title: "Large Toast",
        description: "This is a large-sized toast with more padding.",
    },
};

export const TopLeft: Story = {
    render: (args) => (
        <ToastContainer>
            {(props: { open: boolean; onClose: () => void }) => <Toast {...args} {...props} />}
        </ToastContainer>
    ),
    args: {
        variant: "info",
        position: "top-left",
        title: "Top Left Position",
        description: "This toast appears in the top-left corner.",
    },
};

export const BottomCenter: Story = {
    render: (args) => (
        <ToastContainer>
            {(props: { open: boolean; onClose: () => void }) => <Toast {...args} {...props} />}
        </ToastContainer>
    ),
    args: {
        variant: "success",
        position: "bottom-center",
        title: "Bottom Center Position",
        description: "This toast appears at the bottom center.",
    },
};

export const NoAutoDismiss: Story = {
    render: (args) => (
        <ToastContainer>
            {(props: { open: boolean; onClose: () => void }) => <Toast {...args} {...props} />}
        </ToastContainer>
    ),
    args: {
        variant: "warning",
        title: "Persistent Toast",
        description: "This toast won't auto-dismiss. Click the close button to dismiss it.",
        duration: 0,
    },
};

export const WithChildren: Story = {
    render: (args) => (
        <ToastContainer>
            {(props: { open: boolean; onClose: () => void }) => <Toast {...args} {...props} />}
        </ToastContainer>
    ),
    args: {
        variant: "info",
        children: (
            <div>
                <strong>Custom Content</strong>
                <p className="mt-1">
                    You can pass custom JSX content using the children prop instead of
                    title/description.
                </p>
                <Button size="sm" variant="outline" className="mt-2">
                    Action Button
                </Button>
            </div>
        ),
    },
};

export const MultipleToasts: Story = {
    render: () => {
        const [toasts, setToasts] = useState<
            Array<{
                id: number;
                variant: "success" | "error" | "warning" | "info";
                title: string;
                description: string;
            }>
        >([]);

        const addToast = (
            variant: "success" | "error" | "warning" | "info",
            title: string,
            description: string,
        ) => {
            const id = Date.now();
            setToasts((prev) => [...prev, { id, variant, title, description }]);
        };

        const removeToast = (id: number) => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        };

        return (
            <div className="relative min-h-screen bg-gray-50 p-8">
                <div className="mb-4 flex flex-wrap gap-2">
                    <Button onClick={() => addToast("success", "Success!", "Operation completed.")}>
                        Add Success
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => addToast("error", "Error", "Something went wrong.")}
                    >
                        Add Error
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => addToast("warning", "Warning", "Please check your input.")}
                    >
                        Add Warning
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => addToast("info", "Info", "Here's some information.")}
                    >
                        Add Info
                    </Button>
                </div>

                {toasts.map((toast, index) => (
                    <Toast
                        key={toast.id}
                        open={true}
                        onClose={() => removeToast(toast.id)}
                        variant={toast.variant}
                        position="top-right"
                        title={toast.title}
                        description={toast.description}
                        className={`top-${20 + index * 80}px`}
                    />
                ))}
            </div>
        );
    },
};
