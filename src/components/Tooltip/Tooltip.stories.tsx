import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tooltip } from "./Tooltip";
import { Button } from "../Button/Button";
import { Badge } from "../Badge/Badge";
import { useState } from "react";
import {
    LuInfo as Info,
    LuCircleHelp as HelpCircle,
    LuTriangle as AlertTriangle,
    LuCheck as CheckCircle,
    LuStar as Star,
    LuHeart as Heart,
    LuZap as Zap,
    LuAward as Award,
} from "react-icons/lu";
import mdx from "./Tooltip.mdx";

const meta: Meta<typeof Tooltip> = {
    title: "Components/Tooltip",
    component: Tooltip,
    parameters: {
        layout: "centered",
        docs: {
            page: mdx,
        },
    },
    decorators: [
        (Story) => (
            <div className="flex items-center justify-center p-8">
                <Story />
            </div>
        ),
    ],
    argTypes: {
        position: {
            control: { type: "radio" },
            options: ["auto", "top", "bottom", "left", "right"],
            description: "The position of the tooltip relative to the trigger",
            defaultValue: "auto",
            type: {
                name: "enum",
                value: ["auto", "top", "bottom", "left", "right"],
            },
        },
        variant: {
            control: { type: "radio" },
            options: ["dark", "light", "primary", "success", "warning", "error"],
            description: "The visual style of the tooltip",
            defaultValue: "dark",
            type: {
                name: "enum",
                value: ["dark", "light", "primary", "success", "warning", "error"],
            },
        },
        size: {
            control: { type: "radio" },
            options: ["sm", "md", "lg"],
            description: "The size of the tooltip",
            defaultValue: "md",
            type: {
                name: "enum",
                value: ["sm", "md", "lg"],
            },
        },
        rounded: {
            control: { type: "radio" },
            options: ["none", "sm", "md", "lg", "xl", "full"],
            description: "Control the border radius of the tooltip",
            defaultValue: "md",
            type: {
                name: "enum",
                value: ["none", "sm", "md", "lg", "xl", "full"],
            },
        },
        delay: {
            control: { type: "number" },
            description: "Delay in milliseconds before showing the tooltip",
            defaultValue: 300,
        },
        disabled: {
            control: { type: "boolean" },
            description: "Whether the tooltip is disabled",
            defaultValue: false,
            type: { name: "boolean" },
        },
        showArrow: {
            control: { type: "boolean" },
            description: "Whether to show an arrow pointing to the trigger",
            defaultValue: true,
            type: { name: "boolean" },
        },
        maxWidth: {
            control: { type: "radio" },
            options: ["xs", "sm", "md", "lg", "xl", "none"],
            description: "Maximum width of the tooltip",
            defaultValue: "none",
            type: {
                name: "enum",
                value: ["xs", "sm", "md", "lg", "xl", "none"],
            },
        },
        content: {
            control: false,
            description: "The content to display inside the tooltip",
        },
        children: {
            control: false,
            description: "The trigger element that shows the tooltip",
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        content: "This is a basic tooltip",
        children: <Button>Hover me</Button>,
    },
};

export const Positions: Story = {
    render: () => (
        <div className="flex flex-wrap items-center justify-center gap-8 p-8">
            <Tooltip content="Tooltip on top" position="top">
                <Button variant="outline">Top</Button>
            </Tooltip>
            <Tooltip content="Tooltip on bottom" position="bottom">
                <Button variant="outline">Bottom</Button>
            </Tooltip>
            <Tooltip content="Tooltip on left" position="left">
                <Button variant="outline">Left</Button>
            </Tooltip>
            <Tooltip content="Tooltip on right" position="right">
                <Button variant="outline">Right</Button>
            </Tooltip>
        </div>
    ),
};

export const AutoPosition: Story = {
    render: () => (
        <div className="flex flex-wrap items-center justify-center gap-8 p-8">
            <Tooltip
                content="This tooltip will automatically choose the best position, prioritizing top, then left, right, bottom"
                position="auto"
            >
                <Button variant="outline">Auto Position</Button>
            </Tooltip>
        </div>
    ),
};

export const Variants: Story = {
    render: () => (
        <div className="flex flex-wrap items-center gap-4">
            <Tooltip content="Dark tooltip" variant="dark">
                <Button variant="secondary">Dark</Button>
            </Tooltip>
            <Tooltip content="Light tooltip" variant="light">
                <Button variant="secondary">Light</Button>
            </Tooltip>
            <Tooltip content="Primary tooltip" variant="primary">
                <Button variant="secondary">Primary</Button>
            </Tooltip>
            <Tooltip content="Success tooltip" variant="success">
                <Button variant="secondary">Success</Button>
            </Tooltip>
            <Tooltip content="Warning tooltip" variant="warning">
                <Button variant="secondary">Warning</Button>
            </Tooltip>
            <Tooltip content="Error tooltip" variant="error">
                <Button variant="secondary">Error</Button>
            </Tooltip>
        </div>
    ),
};

export const Sizes: Story = {
    render: () => (
        <div className="flex items-center gap-4">
            <Tooltip content="Small tooltip" size="sm">
                <Button variant="outline" size="sm">
                    SM
                </Button>
            </Tooltip>
            <Tooltip content="Medium tooltip" size="md">
                <Button variant="outline" size="md">
                    MD
                </Button>
            </Tooltip>
            <Tooltip content="Large tooltip" size="lg">
                <Button variant="outline" size="lg">
                    LG
                </Button>
            </Tooltip>
        </div>
    ),
};

export const MaxWidth: Story = {
    render: () => (
        <div className="flex flex-wrap items-center gap-4">
            <Tooltip content="Small max width tooltip" maxWidth="xs">
                <Button variant="outline">XS</Button>
            </Tooltip>
            <Tooltip content="Medium max width tooltip" maxWidth="sm">
                <Button variant="outline">SM</Button>
            </Tooltip>
            <Tooltip content="Large max width tooltip" maxWidth="md">
                <Button variant="outline">MD</Button>
            </Tooltip>
            <Tooltip content="Extra large max width tooltip" maxWidth="lg">
                <Button variant="outline">LG</Button>
            </Tooltip>
            <Tooltip content="No max width tooltip" maxWidth="none">
                <Button variant="outline">None</Button>
            </Tooltip>
        </div>
    ),
};

export const Multiline: Story = {
    render: () => (
        <div className="flex flex-wrap items-center gap-4">
            <Tooltip content="This tooltip has no max width and won't wrap" maxWidth="none">
                <Button variant="outline">No Max Width</Button>
            </Tooltip>
            <Tooltip
                content="This tooltip has a small max width and will wrap long content to fit within the width constraint"
                maxWidth="sm"
            >
                <Button variant="outline">Wrapped Content</Button>
            </Tooltip>
            <Tooltip
                content={
                    <div>
                        <div className="font-semibold">Rich Wrapped Content</div>
                        <div className="mt-1 text-xs">
                            This tooltip contains rich content with multiple lines that will wrap
                            naturally within the medium max width constraint.
                        </div>
                    </div>
                }
                maxWidth="md"
            >
                <Button variant="outline">Rich Content</Button>
            </Tooltip>
        </div>
    ),
};

export const WithIcons: Story = {
    render: () => (
        <div className="flex flex-wrap items-center gap-4">
            <Tooltip content="Information tooltip">
                <Button variant="outline" startIcon={<Info className="h-4 w-4" />}>
                    Info
                </Button>
            </Tooltip>
            <Tooltip content="Help tooltip">
                <Button variant="outline" startIcon={<HelpCircle className="h-4 w-4" />}>
                    Help
                </Button>
            </Tooltip>
            <Tooltip content="Warning tooltip" variant="warning">
                <Button variant="outline" startIcon={<AlertTriangle className="h-4 w-4" />}>
                    Warning
                </Button>
            </Tooltip>
            <Tooltip content="Success tooltip" variant="success">
                <Button variant="outline" startIcon={<CheckCircle className="h-4 w-4" />}>
                    Success
                </Button>
            </Tooltip>
        </div>
    ),
};

export const WithBadges: Story = {
    render: () => (
        <div className="flex flex-wrap items-center gap-4">
            <Tooltip content="Premium feature">
                <Badge variant="primary" startIcon={<Star className="h-3 w-3" />}>
                    Premium
                </Badge>
            </Tooltip>
            <Tooltip content="Favorite item">
                <Badge variant="error" startIcon={<Heart className="h-3 w-3" />}>
                    Favorite
                </Badge>
            </Tooltip>
            <Tooltip content="High priority">
                <Badge variant="warning" startIcon={<Zap className="h-3 w-3" />}>
                    Priority
                </Badge>
            </Tooltip>
            <Tooltip content="Award winner">
                <Badge variant="success" startIcon={<Award className="h-3 w-3" />}>
                    Award
                </Badge>
            </Tooltip>
        </div>
    ),
};

export const LongContent: Story = {
    render: () => (
        <div className="flex items-center gap-4">
            <Tooltip
                content="This is a longer tooltip with more detailed information that explains what this button does in the interface."
                position="top"
            >
                <Button variant="primary">Long Tooltip</Button>
            </Tooltip>
            <Tooltip
                content={
                    <div className="max-w-xs">
                        <div className="mb-1 font-semibold">Advanced Settings</div>
                        <div className="text-xs">
                            Configure advanced options for this feature including timeout settings,
                            retry logic, and error handling preferences.
                        </div>
                    </div>
                }
                position="bottom"
            >
                <Button variant="secondary">Rich Content</Button>
            </Tooltip>
        </div>
    ),
};

export const CustomDelay: Story = {
    render: () => (
        <div className="flex items-center gap-4">
            <Tooltip content="Quick tooltip (100ms)" delay={100}>
                <Button variant="outline">Quick</Button>
            </Tooltip>
            <Tooltip content="Normal tooltip (300ms)" delay={300}>
                <Button variant="outline">Normal</Button>
            </Tooltip>
            <Tooltip content="Slow tooltip (1000ms)" delay={1000}>
                <Button variant="outline">Slow</Button>
            </Tooltip>
        </div>
    ),
};

export const WithoutArrow: Story = {
    render: () => (
        <div className="flex items-center gap-4">
            <Tooltip content="Tooltip with arrow" showArrow={true}>
                <Button variant="outline">With Arrow</Button>
            </Tooltip>
            <Tooltip content="Tooltip without arrow" showArrow={false}>
                <Button variant="outline">Without Arrow</Button>
            </Tooltip>
        </div>
    ),
};

export const Disabled: Story = {
    render: () => (
        <div className="flex items-center gap-4">
            <Tooltip content="This tooltip is enabled">
                <Button variant="outline">Enabled</Button>
            </Tooltip>
            <Tooltip content="This tooltip is disabled" disabled={true}>
                <Button variant="outline" disabled>
                    Disabled
                </Button>
            </Tooltip>
        </div>
    ),
};

export const InteractiveElements: Story = {
    render: () => {
        const [count, setCount] = useState(0);

        return (
            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <Tooltip content="Click to increment counter">
                        <Button onClick={() => setCount(count + 1)} variant="primary">
                            Count: {count}
                        </Button>
                    </Tooltip>
                    <Tooltip content="Reset counter">
                        <Button onClick={() => setCount(0)} variant="secondary">
                            Reset
                        </Button>
                    </Tooltip>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Tooltip content="Primary action">
                        <Button variant="primary" size="sm">
                            Primary
                        </Button>
                    </Tooltip>
                    <Tooltip content="Secondary action">
                        <Button variant="secondary" size="sm">
                            Secondary
                        </Button>
                    </Tooltip>
                    <Tooltip content="Outline action">
                        <Button variant="outline" size="sm">
                            Outline
                        </Button>
                    </Tooltip>
                    <Tooltip content="Destructive action" variant="error">
                        <Button variant="destructive" size="sm">
                            Delete
                        </Button>
                    </Tooltip>
                </div>
            </div>
        );
    },
};
