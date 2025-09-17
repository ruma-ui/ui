import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "./Alert";
import { useState } from "react";
import mdx from "./Alert.mdx";
import {
    LuInfo as InfoIcon,
    LuCheck as CheckCircle,
    LuTriangleAlert as AlertTriangle,
    LuX as XCircle,
    LuUser as User,
    LuShield as Shield,
    LuClock as Clock,
    LuBell as Bell,
    LuDownload as Download,
    LuSettings as Settings,
} from "react-icons/lu";

const meta: Meta<typeof Alert> = {
    title: "Components/Alert",
    component: Alert,
    parameters: {
        layout: "centered",
        docs: {
            page: mdx,
        },
    },
    argTypes: {
        variant: {
            control: { type: "radio" },
            options: ["info", "success", "warning", "error"],
            description: "The visual style of the alert",
            defaultValue: "info",
            type: {
                name: "enum",
                value: ["info", "success", "warning", "error"],
            },
        },
        size: {
            control: { type: "radio" },
            options: ["sm", "md", "lg"],
            description: "The size of the alert",
            defaultValue: "md",
            type: {
                name: "enum",
                value: ["sm", "md", "lg"],
            },
        },
        rounded: {
            control: { type: "radio" },
            options: ["none", "sm", "md", "lg", "xl"],
            description: "Control the border radius of the alert",
            defaultValue: "md",
            type: {
                name: "enum",
                value: ["none", "sm", "md", "lg", "xl"],
            },
        },
        style: {
            control: { type: "radio" },
            options: ["filled", "outline", "soft"],
            description: "Alert content style",
            defaultValue: "filled",
            type: {
                name: "enum",
                value: ["filled", "outline", "soft"],
            },
        },
        dismissible: {
            control: { type: "boolean" },
            description: "Whether the alert can be dismissed",
            defaultValue: false,
            type: { name: "boolean" },
        },
        title: {
            control: { type: "text" },
            description: "Alert title (optional)",
            type: { name: "string" },
        },
        startIcon: {
            control: false,
            description: "Optional left icon - accepts any React element",
        },
        endIcon: {
            control: false,
            description: "Optional right icon or custom action element",
        },
        dismissIcon: {
            control: false,
            description: "Custom dismiss icon",
        },
        onDismiss: { action: "dismissed" },
        children: {
            description: "Alert content",
            control: { type: "text" },
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
    args: {
        children: "This is an info alert. It provides helpful information to users.",
        variant: "info",
    },
};

export const Success: Story = {
    args: {
        children: "Success! Your operation completed successfully.",
        variant: "success",
    },
};

export const Warning: Story = {
    args: {
        children: "Warning: Please review your settings before proceeding.",
        variant: "warning",
    },
};

export const Error: Story = {
    args: {
        children: "Error: Something went wrong. Please try again.",
        variant: "error",
    },
};

export const Variants: Story = {
    render: () => (
        <div className="w-full max-w-md space-y-4">
            <Alert variant="info">This is an info alert with useful information.</Alert>
            <Alert variant="success">Success! Operation completed successfully.</Alert>
            <Alert variant="warning">Warning: Please check your configuration.</Alert>
            <Alert variant="error">Error: Something went wrong, please try again.</Alert>
        </div>
    ),
    parameters: {
        layout: "padded",
    },
};

export const Styles: Story = {
    render: () => (
        <div className="w-full max-w-md space-y-6">
            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-600">Filled Style</h3>
                <Alert style="filled" variant="info">
                    Info alert with filled style
                </Alert>
                <Alert style="filled" variant="success">
                    Success alert with filled style
                </Alert>
                <Alert style="filled" variant="warning">
                    Warning alert with filled style
                </Alert>
                <Alert style="filled" variant="error">
                    Error alert with filled style
                </Alert>
            </div>
            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-600">Outline Style</h3>
                <Alert style="outline" variant="info">
                    Info alert with outline style
                </Alert>
                <Alert style="outline" variant="success">
                    Success alert with outline style
                </Alert>
                <Alert style="outline" variant="warning">
                    Warning alert with outline style
                </Alert>
                <Alert style="outline" variant="error">
                    Error alert with outline style
                </Alert>
            </div>
            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-600">Soft Style</h3>
                <Alert style="soft" variant="info">
                    Info alert with soft style
                </Alert>
                <Alert style="soft" variant="success">
                    Success alert with soft style
                </Alert>
                <Alert style="soft" variant="warning">
                    Warning alert with soft style
                </Alert>
                <Alert style="soft" variant="error">
                    Error alert with soft style
                </Alert>
            </div>
        </div>
    ),
    parameters: {
        layout: "padded",
    },
};

export const Sizes: Story = {
    render: () => (
        <div className="w-full max-w-md space-y-4">
            <Alert size="sm" variant="info">
                Small alert with concise information
            </Alert>
            <Alert size="md" variant="success">
                Medium alert with standard information
            </Alert>
            <Alert size="lg" variant="warning">
                Large alert with comprehensive details and extended content
            </Alert>
        </div>
    ),
    parameters: {
        layout: "padded",
    },
};

export const RoundedVariants: Story = {
    render: () => (
        <div className="w-full max-w-md space-y-4">
            <Alert rounded="none" variant="info">
                Alert with no border radius
            </Alert>
            <Alert rounded="sm" variant="success">
                Alert with small border radius
            </Alert>
            <Alert rounded="md" variant="warning">
                Alert with medium border radius
            </Alert>
            <Alert rounded="lg" variant="error">
                Alert with large border radius
            </Alert>
            <Alert rounded="xl" variant="info">
                Alert with extra large border radius
            </Alert>
        </div>
    ),
    parameters: {
        layout: "padded",
    },
};

export const WithTitle: Story = {
    render: () => (
        <div className="w-full max-w-md space-y-4">
            <Alert variant="info" title="Information">
                This alert includes a title to provide additional context and hierarchy.
            </Alert>
            <Alert variant="success" title="Success!">
                Your changes have been saved successfully.
            </Alert>
            <Alert variant="warning" title="Warning">
                Please review the following items before continuing.
            </Alert>
            <Alert variant="error" title="Error Occurred">
                An unexpected error has occurred. Please contact support if this continues.
            </Alert>
        </div>
    ),
    parameters: {
        layout: "padded",
    },
};

export const WithIcons: Story = {
    render: () => (
        <div className="w-full max-w-md space-y-4">
            <Alert variant="info" startIcon={<User className="h-5 w-5" />}>
                User profile has been updated with new information.
            </Alert>
            <Alert variant="success" startIcon={<Shield className="h-5 w-5" />}>
                Security settings have been successfully configured.
            </Alert>
            <Alert variant="warning" startIcon={<Clock className="h-5 w-5" />}>
                Session will expire in 5 minutes. Please save your work.
            </Alert>
            <Alert variant="error" startIcon={<Bell className="h-5 w-5" />}>
                Failed to send notification. Please check your connection.
            </Alert>
        </div>
    ),
    parameters: {
        layout: "padded",
    },
};

export const WithEndIcon: Story = {
    render: () => (
        <div className="w-full max-w-md space-y-4">
            <Alert variant="info" endIcon={<Download className="h-5 w-5" />}>
                New update available for download
            </Alert>
            <Alert variant="success" endIcon={<Settings className="h-5 w-5" />}>
                Configuration saved successfully
            </Alert>
        </div>
    ),
    parameters: {
        layout: "padded",
    },
};

export const Dismissible: Story = {
    render: () => {
        const [alerts, setAlerts] = useState([
            { id: "1", variant: "info" as const, message: "This is a dismissible info alert." },
            {
                id: "2",
                variant: "success" as const,
                message: "This is a dismissible success alert.",
            },
            {
                id: "3",
                variant: "warning" as const,
                message: "This is a dismissible warning alert.",
            },
            { id: "4", variant: "error" as const, message: "This is a dismissible error alert." },
        ]);

        const handleDismiss = (id: string) => {
            setAlerts(alerts.filter((alert) => alert.id !== id));
        };

        return (
            <div className="w-full max-w-md space-y-4">
                {alerts.map((alert) => (
                    <Alert
                        key={alert.id}
                        variant={alert.variant}
                        dismissible
                        onDismiss={() => handleDismiss(alert.id)}
                    >
                        {alert.message}
                    </Alert>
                ))}
                {alerts.length === 0 && (
                    <div className="p-4 text-center">
                        <p className="mb-4 text-gray-500">All alerts have been dismissed!</p>
                        <button
                            className="text-blue-600 underline hover:text-blue-700"
                            onClick={() =>
                                setAlerts([
                                    {
                                        id: "1",
                                        variant: "info",
                                        message: "This is a dismissible info alert.",
                                    },
                                    {
                                        id: "2",
                                        variant: "success",
                                        message: "This is a dismissible success alert.",
                                    },
                                    {
                                        id: "3",
                                        variant: "warning",
                                        message: "This is a dismissible warning alert.",
                                    },
                                    {
                                        id: "4",
                                        variant: "error",
                                        message: "This is a dismissible error alert.",
                                    },
                                ])
                            }
                        >
                            Reset alerts
                        </button>
                    </div>
                )}
            </div>
        );
    },
    parameters: {
        layout: "padded",
    },
};

export const DismissibleWithTitle: Story = {
    render: () => {
        const [show, setShow] = useState(true);

        if (!show) {
            return (
                <div className="p-4 text-center">
                    <p className="mb-4 text-gray-500">Alert has been dismissed!</p>
                    <button
                        className="text-blue-600 underline hover:text-blue-700"
                        onClick={() => setShow(true)}
                    >
                        Show alert again
                    </button>
                </div>
            );
        }

        return (
            <div className="w-full max-w-md">
                <Alert
                    variant="warning"
                    title="Important Notice"
                    dismissible
                    onDismiss={() => setShow(false)}
                    startIcon={<AlertTriangle className="h-5 w-5" />}
                >
                    Please update your password within the next 7 days to maintain account security.
                </Alert>
            </div>
        );
    },
    parameters: {
        layout: "padded",
    },
};

export const CustomContent: Story = {
    render: () => (
        <div className="w-full max-w-md space-y-4">
            <Alert variant="info" title="Software Update">
                <div className="space-y-2">
                    <p>A new version is available with the following improvements:</p>
                    <ul className="list-inside list-disc space-y-1 text-sm">
                        <li>Enhanced performance and stability</li>
                        <li>New user interface components</li>
                        <li>Bug fixes and security updates</li>
                    </ul>
                    <div className="mt-3 flex gap-2">
                        <button className="rounded border border-blue-200 bg-white px-3 py-1 text-sm text-blue-600 hover:bg-blue-50">
                            Download Now
                        </button>
                        <button className="text-sm text-blue-100 underline hover:text-white">
                            Learn More
                        </button>
                    </div>
                </div>
            </Alert>

            <Alert variant="error" title="Payment Failed" style="soft">
                <div className="space-y-2">
                    <p>Your payment could not be processed. Please:</p>
                    <ol className="list-inside list-decimal space-y-1 text-sm">
                        <li>Check your card details</li>
                        <li>Ensure sufficient funds</li>
                        <li>Contact your bank if issues persist</li>
                    </ol>
                    <div className="mt-3 flex gap-2">
                        <button className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700">
                            Try Again
                        </button>
                        <button className="text-sm text-red-600 underline hover:text-red-800">
                            Contact Support
                        </button>
                    </div>
                </div>
            </Alert>
        </div>
    ),
    parameters: {
        layout: "padded",
    },
};

export const NotificationAlerts: Story = {
    render: () => (
        <div className="w-full max-w-md space-y-4">
            <Alert variant="success" style="soft" startIcon={<CheckCircle className="h-5 w-5" />}>
                Email verification completed successfully.
            </Alert>

            <Alert variant="info" style="outline" startIcon={<InfoIcon className="h-5 w-5" />}>
                Your trial period ends in 3 days. Upgrade to continue using premium features.
            </Alert>

            <Alert
                variant="warning"
                style="filled"
                startIcon={<AlertTriangle className="h-5 w-5" />}
            >
                Unusual login activity detected from a new device.
            </Alert>

            <Alert variant="error" style="soft" startIcon={<XCircle className="h-5 w-5" />}>
                Unable to sync data. Check your internet connection.
            </Alert>
        </div>
    ),
    parameters: {
        layout: "padded",
    },
};

export const SystemAlerts: Story = {
    render: () => (
        <div className="w-full max-w-lg space-y-4">
            <Alert
                variant="info"
                title="Scheduled Maintenance"
                style="outline"
                startIcon={<Clock className="h-5 w-5" />}
            >
                System maintenance is scheduled for tonight from 2:00 AM to 4:00 AM EST. Some
                services may be temporarily unavailable during this time.
            </Alert>

            <Alert
                variant="success"
                title="Backup Completed"
                style="soft"
                startIcon={<Shield className="h-5 w-5" />}
            >
                Your data has been successfully backed up to secure cloud storage. Last backup:
                Today at 12:30 PM
            </Alert>

            <Alert
                variant="warning"
                title="Storage Almost Full"
                style="filled"
                startIcon={<AlertTriangle className="h-5 w-5" />}
            >
                You&apos;re using 95% of your storage quota. Consider upgrading your plan or
                removing unused files to avoid service interruption.
            </Alert>
        </div>
    ),
    parameters: {
        layout: "padded",
    },
};
