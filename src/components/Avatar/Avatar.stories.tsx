import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "./Avatar";
import { useState } from "react";
import mdx from "./Avatar.mdx";
import { Heart } from "lucide-react";

const meta: Meta<typeof Avatar> = {
    title: "Components/Avatar",
    component: Avatar,
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
            description: "The visual style of the avatar",
            defaultValue: "primary",
            type: {
                name: "enum",
                value: ["primary", "secondary"],
            },
        },
        size: {
            control: { type: "radio" },
            options: ["xs", "sm", "md", "lg", "xl", "2xl"],
            description: "The size of the avatar",
            defaultValue: "md",
            type: {
                name: "enum",
                value: ["xs", "sm", "md", "lg", "xl", "2xl"],
            },
        },
        rounded: {
            control: { type: "radio" },
            options: ["none", "sm", "md", "lg", "xl", "full"],
            description: "Control the border radius of the avatar",
            defaultValue: "full",
            type: {
                name: "enum",
                value: ["none", "sm", "md", "lg", "xl", "full"],
            },
        },
        clickable: {
            control: { type: "boolean" },
            description: "Whether the avatar is clickable",
            defaultValue: false,
            type: { name: "boolean" },
        },
        showStatus: {
            control: { type: "boolean" },
            description: "Show online status indicator",
            defaultValue: false,
            type: { name: "boolean" },
        },
        status: {
            control: { type: "radio" },
            options: ["online", "offline", "away", "busy"],
            description: "Status indicator type",
            defaultValue: "online",
            type: {
                name: "enum",
                value: ["online", "offline", "away", "busy"],
            },
        },
        src: {
            control: { type: "text" },
            description: "Source URL for the avatar image",
        },
        alt: {
            control: { type: "text" },
            description: "Alt text for the avatar image",
        },
        initials: {
            control: { type: "text" },
            description: "Fallback initials when no image is provided",
        },
        onClick: { action: "clicked" },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        src: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
        alt: "User avatar",
        variant: "primary",
    },
};

export const Secondary: Story = {
    args: {
        src: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
        alt: "User avatar",
        variant: "secondary",
    },
};

export const WithInitials: Story = {
    args: {
        initials: "JD",
        variant: "primary",
    },
};

export const WithStatus: Story = {
    args: {
        src: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
        alt: "User avatar",
        showStatus: true,
        status: "online",
    },
};

export const StatusVariants: Story = {
    render: () => (
        <div className="flex items-center gap-4">
            <div className="text-center">
                <Avatar
                    src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
                    showStatus
                    status="online"
                />
                <p className="mt-2 text-xs text-gray-600">Online</p>
            </div>
            <div className="text-center">
                <Avatar
                    src="https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=400"
                    showStatus
                    status="away"
                />
                <p className="mt-2 text-xs text-gray-600">Away</p>
            </div>
            <div className="text-center">
                <Avatar
                    src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400"
                    showStatus
                    status="busy"
                />
                <p className="mt-2 text-xs text-gray-600">Busy</p>
            </div>
            <div className="text-center">
                <Avatar
                    src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400"
                    showStatus
                    status="offline"
                />
                <p className="mt-2 text-xs text-gray-600">Offline</p>
            </div>
        </div>
    ),
};

export const Sizes: Story = {
    render: () => (
        <div className="flex items-end gap-4">
            <div className="text-center">
                <Avatar
                    src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
                    size="xs"
                />
                <p className="mt-2 text-xs text-gray-600">XS</p>
            </div>
            <div className="text-center">
                <Avatar
                    src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
                    size="sm"
                />
                <p className="mt-2 text-xs text-gray-600">SM</p>
            </div>
            <div className="text-center">
                <Avatar
                    src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
                    size="md"
                />
                <p className="mt-2 text-xs text-gray-600">MD</p>
            </div>
            <div className="text-center">
                <Avatar
                    src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
                    size="lg"
                />
                <p className="mt-2 text-xs text-gray-600">LG</p>
            </div>
            <div className="text-center">
                <Avatar
                    src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
                    size="xl"
                />
                <p className="mt-2 text-xs text-gray-600">XL</p>
            </div>
            <div className="text-center">
                <Avatar
                    src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
                    size="2xl"
                />
                <p className="mt-2 text-xs text-gray-600">2XL</p>
            </div>
        </div>
    ),
};

export const RoundedVariants: Story = {
    render: () => (
        <div className="flex items-center gap-4">
            <div className="text-center">
                <Avatar
                    src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
                    rounded="none"
                />
                <p className="mt-2 text-xs text-gray-600">None</p>
            </div>
            <div className="text-center">
                <Avatar
                    src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
                    rounded="sm"
                />
                <p className="mt-2 text-xs text-gray-600">SM</p>
            </div>
            <div className="text-center">
                <Avatar
                    src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
                    rounded="md"
                />
                <p className="mt-2 text-xs text-gray-600">MD</p>
            </div>
            <div className="text-center">
                <Avatar
                    src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
                    rounded="lg"
                />
                <p className="mt-2 text-xs text-gray-600">LG</p>
            </div>
            <div className="text-center">
                <Avatar
                    src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
                    rounded="xl"
                />
                <p className="mt-2 text-xs text-gray-600">XL</p>
            </div>
            <div className="text-center">
                <Avatar
                    src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
                    rounded="full"
                />
                <p className="mt-2 text-xs text-gray-600">Full</p>
            </div>
        </div>
    ),
};

export const Clickable: Story = {
    render: () => {
        const [clicked, setClicked] = useState(false);

        return (
            <div className="text-center">
                <Avatar
                    src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
                    clickable
                    onClick={() => setClicked(!clicked)}
                />
                <p className="mt-2 text-sm text-gray-600">
                    {clicked ? "Clicked!" : "Click the avatar"}
                </p>
            </div>
        );
    },
};

export const CustomFallback: Story = {
    args: {
        fallback: <Heart className="h-6 w-6 text-red-500" />,
        variant: "primary",
    },
};

export const AvatarGroup: Story = {
    render: () => (
        <div className="flex -space-x-2">
            <Avatar
                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="User 1"
                className="ring-2 ring-white"
            />
            <Avatar
                src="https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="User 2"
                className="ring-2 ring-white"
            />
            <Avatar
                src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="User 3"
                className="ring-2 ring-white"
            />
            <Avatar initials="+3" className="bg-gray-200 text-gray-600 ring-2 ring-white" />
        </div>
    ),
};

export const WithBadge: Story = {
    render: () => (
        <div className="relative inline-block">
            <Avatar
                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
                size="lg"
            />
            <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                3
            </span>
        </div>
    ),
};
