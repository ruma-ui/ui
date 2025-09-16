import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Popover, PopoverTrigger, PopoverContent } from "./Popover";
import { Button, TextInput, Textarea, Form, FormField } from "@/components";
import { useState } from "react";
import mdx from "./Popover.mdx";
import {
    FaInfoCircle,
    FaUser,
    FaCog,
    FaQuestion,
    FaCalendar,
    FaHeart,
    FaShare,
    FaEdit,
    FaSave,
    FaTimes,
} from "react-icons/fa";

const meta: Meta<typeof Popover> = {
    title: "Components/Popover",
    component: Popover,
    decorators: [
        (Story) => (
            <div style={{ minHeight: "400px" }}>
                <Story />
            </div>
        ),
    ],
    subcomponents: {
        PopoverTrigger,
        PopoverContent,
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
        trigger: {
            control: "radio",
            options: ["click", "hover", "focus"],
        },
        onOpenChange: { action: "openChanged" },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Extended type for playground story with PopoverContent props
type PlaygroundStory = StoryObj<{
    // Popover props
    open?: boolean;
    defaultOpen?: boolean;
    trigger?: "click" | "hover" | "focus";
    onOpenChange?: (open: boolean) => void;
    // PopoverContent props
    align?:
        | "bottom-start"
        | "bottom-center"
        | "bottom-end"
        | "top-start"
        | "top-center"
        | "top-end"
        | "left"
        | "right";
    offset?: number;
    closeOnClick?: boolean;
}>;

export const Primary: PlaygroundStory = {
    render: (args) => (
        <Popover
            open={args.open}
            defaultOpen={args.defaultOpen}
            trigger={args.trigger}
            onOpenChange={args.onOpenChange}
        >
            <PopoverTrigger asChild>
                <Button size="sm" variant="outline" endIcon={<FaInfoCircle />}>
                    Show Info
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-80"
                align={args.align}
                offset={args.offset}
                closeOnClick={args.closeOnClick}
            >
                <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">About this feature</h4>
                    <p className="text-sm text-gray-600">
                        This is a popover component that can contain rich content like text, images,
                        forms, and interactive elements. It&apos;s perfect for displaying contextual
                        information without navigating away from the current page.
                    </p>
                    <div className="flex justify-end space-x-2">
                        <Button size="sm" variant="outline">
                            Learn More
                        </Button>
                        <Button size="sm">Got it</Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    ),
    argTypes: {
        // Popover props
        open: { control: "boolean" },
        defaultOpen: { control: "boolean" },
        trigger: {
            control: "radio",
            options: ["click", "hover", "focus"],
        },
        onOpenChange: { action: "openChanged" },
        // PopoverContent props
        align: {
            control: "select",
            options: [
                "bottom-start",
                "bottom-center",
                "bottom-end",
                "top-start",
                "top-center",
                "top-end",
                "left",
                "right",
            ],
            description: "Content alignment relative to trigger",
        },
        offset: {
            control: { type: "number", min: 0, max: 50, step: 1 },
            description: "Offset from trigger element in pixels",
        },
        closeOnClick: {
            control: "boolean",
            description: "Whether clicking inside the popover should close it",
        },
    },
    args: {
        align: "bottom-start",
        offset: 8,
        closeOnClick: false,
        trigger: "click",
    },
};

export const Playground: PlaygroundStory = {
    render: (args) => (
        <Popover
            open={args.open}
            defaultOpen={args.defaultOpen}
            trigger={args.trigger}
            onOpenChange={args.onOpenChange}
        >
            <PopoverTrigger asChild>
                <Button size="sm" variant="outline" endIcon={<FaInfoCircle />}>
                    Playground
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-80"
                align={args.align}
                offset={args.offset}
                closeOnClick={args.closeOnClick}
            >
                <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Playground Popover</h4>
                    <p className="text-sm text-gray-600">
                        Use the controls panel to experiment with different alignment options,
                        offset values, and close behaviors.
                    </p>
                    <div className="flex justify-end space-x-2">
                        <Button size="sm" variant="outline">
                            Test Button
                        </Button>
                        <Button size="sm">Action</Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    ),
    argTypes: {
        // Popover props
        open: { control: "boolean" },
        defaultOpen: { control: "boolean" },
        trigger: {
            control: "radio",
            options: ["click", "hover", "focus"],
        },
        onOpenChange: { action: "openChanged" },
        // PopoverContent props
        align: {
            control: "select",
            options: [
                "bottom-start",
                "bottom-center",
                "bottom-end",
                "top-start",
                "top-center",
                "top-end",
                "left",
                "right",
            ],
            description: "Content alignment relative to trigger",
        },
        offset: {
            control: { type: "number", min: 0, max: 50, step: 1 },
            description: "Offset from trigger element in pixels",
        },
        closeOnClick: {
            control: "boolean",
            description: "Whether clicking inside the popover should close it",
        },
    },
    args: {
        align: "bottom-start",
        offset: 8,
        closeOnClick: false,
        trigger: "click",
    },
};

export const Secondary: Story = {
    render: (args) => (
        <Popover {...args}>
            <PopoverTrigger asChild>
                <Button size="sm" variant="secondary" endIcon={<FaUser />}>
                    Profile
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 p-2">
                <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-2">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                            <FaUser className="text-blue-600" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900">John Doe</h4>
                            <p className="text-sm text-gray-600">john.doe@example.com</p>
                        </div>
                    </div>
                    <div className="border-t pt-3">
                        <button className="flex w-full cursor-pointer items-center space-x-2 rounded p-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                            <FaEdit className="h-4 w-4" />
                            <span>Edit Profile</span>
                        </button>
                        <button className="flex w-full cursor-pointer items-center space-x-2 rounded p-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                            <FaCog className="h-4 w-4" />
                            <span>Settings</span>
                        </button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    ),
};

export const WithLabel: Story = {
    render: (args) => (
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Help Center</label>
            <Popover {...args}>
                <PopoverTrigger asChild>
                    <Button size="sm" variant="outline" endIcon={<FaQuestion />}>
                        Get Help
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                    <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900">Need help?</h4>
                        <p className="text-sm text-gray-600">
                            Find answers to common questions or contact our support team.
                        </p>
                        <div className="space-y-2">
                            <Button size="sm" variant="outline" fullWidth>
                                View FAQ
                            </Button>
                            <Button size="sm" fullWidth>
                                Contact Support
                            </Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    ),
};

export const WithDescription: Story = {
    render: (args) => (
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Quick Actions</label>
            <p className="text-sm text-gray-500">Access frequently used tools and shortcuts</p>
            <Popover {...args}>
                <PopoverTrigger asChild>
                    <Button size="sm" variant="outline" endIcon={<FaCog />}>
                        Quick Actions
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-1">
                    <div>
                        <button className="flex w-full cursor-pointer items-center space-x-2 rounded px-2 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                            <FaSave className="h-4 w-4" />
                            <span>Save Draft</span>
                        </button>
                        <button className="flex w-full cursor-pointer items-center space-x-2 rounded px-2 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                            <FaShare className="h-4 w-4" />
                            <span>Share</span>
                        </button>
                        <button className="flex w-full cursor-pointer items-center space-x-2 rounded px-2 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                            <FaEdit className="h-4 w-4" />
                            <span>Edit</span>
                        </button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    ),
};

export const WithStartIcon: Story = {
    render: (args) => (
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Calendar</label>
            <Popover {...args}>
                <PopoverTrigger asChild>
                    <Button
                        size="sm"
                        variant="outline"
                        startIcon={<FaCalendar />}
                        endIcon={<FaInfoCircle />}
                    >
                        View Events
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900">Upcoming Events</h4>
                        <div className="space-y-2">
                            <div className="rounded border-l-4 border-blue-400 bg-blue-50 p-2">
                                <p className="text-sm font-medium text-blue-900">Team Meeting</p>
                                <p className="text-xs text-blue-700">Today at 2:00 PM</p>
                            </div>
                            <div className="rounded border-l-4 border-green-400 bg-green-50 p-2">
                                <p className="text-sm font-medium text-green-900">Project Review</p>
                                <p className="text-xs text-green-700">Tomorrow at 10:00 AM</p>
                            </div>
                        </div>
                        <Button size="sm" variant="outline" fullWidth>
                            View All Events
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    ),
};

export const ErrorState: Story = {
    render: (args) => (
        <div className="space-y-2">
            <label className="text-sm font-medium text-red-700">Error Information</label>
            <Popover {...args}>
                <PopoverTrigger asChild>
                    <Button
                        size="sm"
                        variant="outline"
                        className="border-red-300 text-red-900 hover:border-red-400"
                    >
                        Show Error Details
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-72">
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                            <FaTimes className="h-5 w-5 text-red-600" />
                            <h4 className="font-semibold text-red-900">Validation Error</h4>
                        </div>
                        <p className="text-sm text-red-700">
                            Please correct the following issues before proceeding:
                        </p>
                        <ul className="space-y-1 text-sm text-red-700">
                            <li>• Email address is required</li>
                            <li>• Password must be at least 8 characters</li>
                            <li>• Phone number format is invalid</li>
                        </ul>
                        <Button size="sm" variant="outline" fullWidth>
                            Dismiss
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
            <p className="text-sm text-red-600">Click to view detailed error information</p>
        </div>
    ),
};

export const Disabled: Story = {
    render: () => (
        <div className="space-y-2">
            <Button size="sm" variant="outline" disabled>
                Show Popover
            </Button>
        </div>
    ),
};

export const FullWidth: Story = {
    render: (args) => (
        <div className="w-full space-y-2">
            <label className="text-sm font-medium text-gray-700">Full Width Popover</label>
            <Popover {...args}>
                <PopoverTrigger asChild>
                    <Button size="sm" variant="outline" fullWidth endIcon={<FaInfoCircle />}>
                        Show Full Width Popover
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full max-w-md">
                    <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900">Newsletter Subscription</h4>
                        <p className="text-sm text-gray-600">
                            Stay updated with our latest news and announcements.
                        </p>
                        <div className="space-y-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            <Button size="sm" fullWidth>
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    ),
    parameters: {
        layout: "padded",
    },
};

export const CustomStyled: Story = {
    render: (args) => (
        <Popover {...args}>
            <PopoverTrigger asChild>
                <Button
                    variant="none"
                    className="rounded border border-purple-300 bg-purple-50 px-4 py-2 text-purple-900 hover:bg-purple-100"
                    endIcon={<FaHeart />}
                >
                    Show Love
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="space-y-3 text-center">
                    <div className="text-4xl">💜</div>
                    <h4 className="font-semibold text-purple-900">Thank You!</h4>
                    <p className="text-sm text-purple-700">
                        Your support means the world to us. We appreciate you being part of our
                        community!
                    </p>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        <FaHeart className="mr-2 inline h-4 w-4" />
                        Share the Love
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    ),
};

export const HoverTrigger: Story = {
    render: (args) => (
        <Popover {...args} trigger="hover">
            <PopoverTrigger asChild>
                <Button size="sm" variant="outline">
                    Hover me
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48">
                <div className="space-y-2 text-center">
                    <h4 className="font-semibold text-gray-900">Hover Tooltip</h4>
                    <p className="text-sm text-gray-600">
                        This popover appears on hover and disappears when you move away.
                    </p>
                </div>
            </PopoverContent>
        </Popover>
    ),
};

export const FocusTrigger: Story = {
    render: (args) => (
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Focus to show help</label>
            <Popover {...args} trigger="focus">
                <PopoverTrigger asChild>
                    <input
                        type="text"
                        placeholder="Focus on this input"
                        className="rounded border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </PopoverTrigger>
                <PopoverContent className="w-64">
                    <div className="space-y-2">
                        <h4 className="font-semibold text-gray-900">Input Guidelines</h4>
                        <p className="text-sm text-gray-600">
                            Enter your username or email address. This field is required and must be
                            unique.
                        </p>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    ),
};

export const Controlled: Story = {
    render: (args) => {
        const [open, setOpen] = useState(false);

        return (
            <div className="w-80 space-y-4">
                <Popover {...args} open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button size="sm" variant="outline" endIcon={<FaInfoCircle />}>
                            Controlled Popover
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72">
                        <div className="space-y-3">
                            <h4 className="font-semibold text-gray-900">Controlled Component</h4>
                            <p className="text-sm text-gray-600">
                                This popover&apos;s state is controlled by the parent component. You
                                can open and close it programmatically.
                            </p>
                            <div className="flex space-x-2">
                                <Button size="sm" variant="outline" onClick={() => setOpen(false)}>
                                    Close
                                </Button>
                                <Button size="sm">Action</Button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
                <div className="space-y-2">
                    <p className="text-sm text-gray-600">Open: {open ? "Yes" : "No"}</p>
                    <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
                            Open Popover
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setOpen(false)}>
                            Close Popover
                        </Button>
                    </div>
                </div>
            </div>
        );
    },
};

export const Alignments: Story = {
    render: (args) => (
        <div className="grid grid-cols-3 gap-8">
            <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Bottom Alignments</h3>
                <div className="flex flex-col space-y-2">
                    <Popover {...args}>
                        <PopoverTrigger asChild>
                            <Button size="sm" variant="outline">
                                Bottom Start
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48" align="bottom-start">
                            <p className="text-sm">Aligned to bottom-start</p>
                        </PopoverContent>
                    </Popover>
                    <Popover {...args}>
                        <PopoverTrigger asChild>
                            <Button size="sm" variant="outline">
                                Bottom Center
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48" align="bottom-center">
                            <p className="text-sm">Perfectly centered below trigger</p>
                        </PopoverContent>
                    </Popover>
                    <Popover {...args}>
                        <PopoverTrigger asChild>
                            <Button size="sm" variant="outline">
                                Bottom End
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48" align="bottom-end">
                            <p className="text-sm">Aligned to bottom-end</p>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Top Alignments</h3>
                <div className="flex flex-col space-y-2">
                    <Popover {...args}>
                        <PopoverTrigger asChild>
                            <Button size="sm" variant="outline">
                                Top Start
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48" align="top-start">
                            <p className="text-sm">Aligned to top-start</p>
                        </PopoverContent>
                    </Popover>
                    <Popover {...args}>
                        <PopoverTrigger asChild>
                            <Button size="sm" variant="outline">
                                Top Center
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48" align="top-center">
                            <p className="text-sm">Perfectly centered above trigger</p>
                        </PopoverContent>
                    </Popover>
                    <Popover {...args}>
                        <PopoverTrigger asChild>
                            <Button size="sm" variant="outline">
                                Top End
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48" align="top-end">
                            <p className="text-sm">Aligned to top-end</p>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Side Alignments</h3>
                <div className="flex flex-col space-y-2">
                    <Popover {...args}>
                        <PopoverTrigger asChild>
                            <Button size="sm" variant="outline">
                                Left
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48" align="left">
                            <p className="text-sm">Positioned to the left</p>
                        </PopoverContent>
                    </Popover>
                    <Popover {...args}>
                        <PopoverTrigger asChild>
                            <Button size="sm" variant="outline">
                                Right
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48" align="right">
                            <p className="text-sm">Positioned to the right</p>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    ),
};

export const CenterAlignment: Story = {
    render: (args) => (
        <div className="flex flex-col items-center space-y-8 pt-16">
            <div className="space-y-4 text-center">
                <h3 className="font-semibold text-gray-900">Center Alignment Showcase</h3>
                <p className="text-sm text-gray-600">
                    Perfect centering for popovers that need visual balance
                </p>
            </div>

            <div className="flex space-x-8">
                <Popover {...args}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" endIcon={<FaInfoCircle />}>
                            Bottom Center
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64" align="bottom-center">
                        <div className="space-y-2 text-center">
                            <h4 className="font-semibold text-gray-900">Perfectly Centered</h4>
                            <p className="text-sm text-gray-600">
                                This popover is perfectly centered below the trigger button,
                                providing optimal visual balance.
                            </p>
                        </div>
                    </PopoverContent>
                </Popover>

                <Popover {...args}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" endIcon={<FaInfoCircle />}>
                            Top Center
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64" align="top-center">
                        <div className="space-y-2 text-center">
                            <h4 className="font-semibold text-gray-900">Centered Above</h4>
                            <p className="text-sm text-gray-600">
                                This popover appears perfectly centered above the trigger, ideal for
                                bottom-positioned elements.
                            </p>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    ),
};

export const TriggerBehaviors: Story = {
    render: (args) => (
        <div className="grid grid-cols-3 gap-8">
            <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Click Trigger</h3>
                <p className="text-sm text-gray-600">
                    Opens on click, closes on outside click or Escape. Isolated from focus events.
                </p>
                <Popover {...args} trigger="click">
                    <PopoverTrigger asChild>
                        <Button size="sm" variant="outline">
                            Click Me
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64">
                        <div className="space-y-2">
                            <h4 className="font-semibold text-gray-900">Click Behavior</h4>
                            <p className="text-sm text-gray-600">
                                This popover only responds to click events. Focus events are
                                ignored.
                            </p>
                            <Button size="sm" variant="outline">
                                Interactive Content
                            </Button>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Hover Trigger</h3>
                <p className="text-sm text-gray-600">
                    Shows on mouse enter, hides on mouse leave. Perfect for tooltips.
                </p>
                <Popover {...args} trigger="hover">
                    <PopoverTrigger asChild>
                        <Button size="sm" variant="outline">
                            Hover Me
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64">
                        <div className="space-y-2">
                            <h4 className="font-semibold text-gray-900">Hover Behavior</h4>
                            <p className="text-sm text-gray-600">
                                This appears on hover and disappears when you move away.
                            </p>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Focus Trigger</h3>
                <p className="text-sm text-gray-600">
                    Opens on focus, stays open when focusing content, smart close behavior.
                </p>
                <Popover {...args} trigger="focus">
                    <PopoverTrigger asChild>
                        <input
                            type="text"
                            placeholder="Focus me"
                            className="rounded border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </PopoverTrigger>
                    <PopoverContent className="w-64">
                        <div className="space-y-2">
                            <h4 className="font-semibold text-gray-900">Focus Behavior</h4>
                            <p className="text-sm text-gray-600">
                                Try focusing on the input, then tab to this content. The popover
                                stays open!
                            </p>
                            <Button size="sm" variant="outline">
                                Focusable Button
                            </Button>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    ),
};

export const CloseOnClick: Story = {
    render: (args) => (
        <Popover {...args}>
            <PopoverTrigger asChild>
                <Button size="sm" variant="outline" endIcon={<FaInfoCircle />}>
                    Auto Close
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64" closeOnClick>
                <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Click Anywhere</h4>
                    <p className="text-sm text-gray-600">
                        This popover will close when you click anywhere inside it. Try clicking on
                        this text or the button below.
                    </p>
                    <Button size="sm" fullWidth>
                        Click Me (Will Close)
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    ),
};

export const WithForm: Story = {
    render: (args) => {
        const [formData, setFormData] = useState({
            name: "",
            email: "",
            message: "",
        });

        const handleSubmit = (event: React.FormEvent) => {
            event.preventDefault();
            console.log("Form submitted:", formData);
            alert(
                `Form submitted!\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`,
            );
        };

        const handleInputChange =
            (field: string) =>
            (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                setFormData((prev) => ({
                    ...prev,
                    [field]: event.target.value,
                }));
            };

        return (
            <Popover {...args}>
                <PopoverTrigger asChild>
                    <Button size="sm" variant="outline" endIcon={<FaEdit />}>
                        Contact Us
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <Form onSubmit={handleSubmit} spacing="md">
                        <FormField label="Name" required>
                            <TextInput
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleInputChange("name")}
                            />
                        </FormField>
                        <FormField label="Email" required>
                            <TextInput
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleInputChange("email")}
                            />
                        </FormField>
                        <FormField label="Message">
                            <Textarea
                                placeholder="Enter your message"
                                rows={3}
                                value={formData.message}
                                onChange={handleInputChange("message")}
                            />
                        </FormField>
                        <div className="flex justify-end space-x-2 pt-2">
                            <Button type="button" size="sm" variant="outline">
                                Cancel
                            </Button>
                            <Button type="submit" size="sm">
                                Send Message
                            </Button>
                        </div>
                    </Form>
                </PopoverContent>
            </Popover>
        );
    },
};
