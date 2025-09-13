import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Card, CardHeader, CardBody, CardFooter } from "./Card";
import { Button } from "../Button/Button";
import { FaUser, FaCalendar, FaMapMarker } from "react-icons/fa";
import mdx from "./Card.mdx";
import { tw } from "@/utils/tw";

const meta: Meta<typeof Card> = {
    title: "Components/Card",
    component: Card,
    parameters: {
        layout: "centered",
        docs: {
            page: mdx,
        },
    },
    argTypes: {
        variant: {
            control: { type: "radio" },
            options: ["default", "outlined", "elevated", "filled"],
            description: "The visual style of the card",
            defaultValue: "default",
            type: {
                name: "enum",
                value: ["default", "outlined", "elevated", "filled"],
            },
        },
        padding: {
            control: { type: "radio" },
            options: ["none", "sm", "md", "lg", "xl"],
            description: "The padding size inside the card",
            defaultValue: "md",
            type: {
                name: "enum",
                value: ["none", "sm", "md", "lg", "xl"],
            },
        },
        rounded: {
            control: { type: "radio" },
            options: ["none", "sm", "md", "lg", "xl", "full"],
            description: "Control the border radius of the card",
            defaultValue: "lg",
            type: {
                name: "enum",
                value: ["none", "sm", "md", "lg", "xl", "full"],
            },
        },
        shadow: {
            control: { type: "radio" },
            options: ["none", "sm", "md", "lg", "xl"],
            description: "Shadow elevation level",
            defaultValue: "sm",
            type: {
                name: "enum",
                value: ["none", "sm", "md", "lg", "xl"],
            },
        },
        clickable: {
            control: "boolean",
            description: "Whether the card is clickable",
            defaultValue: false,
            type: { name: "boolean" },
        },
        disabled: {
            control: "boolean",
            description: "Whether the card is disabled",
            defaultValue: false,
            type: { name: "boolean" },
        },
        onClick: { action: "clicked" },
        children: {
            description: "Card content",
            control: { type: "text" },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
    args: {
        children: (
            <div>
                <h3 className="mb-2 text-lg font-semibold">Card Title</h3>
                <p className="text-gray-600">
                    This is a basic card component with default styling. It provides a clean,
                    contained space for your content.
                </p>
            </div>
        ),
    },
};

export const Outlined: Story = {
    args: {
        variant: "outlined",
        children: (
            <div>
                <h3 className="mb-2 text-lg font-semibold">Outlined Card</h3>
                <p className="text-gray-600">
                    This card has a prominent border outline for better visual separation.
                </p>
            </div>
        ),
    },
};

export const Elevated: Story = {
    args: {
        variant: "elevated",
        shadow: "lg",
        children: (
            <div>
                <h3 className="mb-2 text-lg font-semibold">Elevated Card</h3>
                <p className="text-gray-600">
                    This card appears to float above the page with enhanced shadow.
                </p>
            </div>
        ),
    },
};

export const Filled: Story = {
    args: {
        variant: "filled",
        children: (
            <div>
                <h3 className="mb-2 text-lg font-semibold">Filled Card</h3>
                <p className="text-gray-600">
                    This card has a subtle background fill for visual hierarchy.
                </p>
            </div>
        ),
    },
};

export const WithHeaderBodyFooter: Story = {
    args: {
        children: (
            <>
                <CardHeader>
                    <h3 className="text-lg font-semibold">Event Details</h3>
                </CardHeader>
                <CardBody>
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <FaCalendar className="text-blue-500" />
                            <span>March 15, 2024</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaMapMarker className="text-red-500" />
                            <span>San Francisco, CA</span>
                        </div>
                        <p className="mt-3 text-gray-600">
                            Join us for an exciting tech conference featuring industry leaders and
                            innovative workshops.
                        </p>
                    </div>
                </CardBody>
                <CardFooter>
                    <div className="flex gap-2">
                        <Button size="sm">Learn More</Button>
                        <Button variant="outline" size="sm">
                            Register
                        </Button>
                    </div>
                </CardFooter>
            </>
        ),
    },
};

export const Clickable: Story = {
    args: {
        clickable: true,
        variant: "elevated",
        shadow: "md",
        children: (
            <div className="text-center">
                <FaUser className="mx-auto mb-2 text-2xl text-blue-500" />
                <h3 className="mb-2 text-lg font-semibold">User Profile</h3>
                <p className="text-gray-600">Click to view full profile</p>
            </div>
        ),
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        clickable: true,
        children: (
            <div>
                <h3 className="mb-2 text-lg font-semibold">Disabled Card</h3>
                <p className="text-gray-600">
                    This card is disabled and cannot be interacted with.
                </p>
            </div>
        ),
    },
};

export const CustomPadding: Story = {
    args: {
        padding: "lg",
        children: (
            <div>
                <h3 className="mb-4 text-lg font-semibold">Large Padding</h3>
                <p className="mb-4 text-gray-600">
                    This card has extra large padding for more breathing room around the content.
                </p>
                <Button>Action Button</Button>
            </div>
        ),
    },
};

export const NoPadding: Story = {
    args: {
        padding: "none",
        children: (
            <div className="p-6">
                <h3 className="mb-2 text-lg font-semibold">Custom Content</h3>
                <p className="text-gray-600">
                    This card has no default padding, allowing for custom spacing.
                </p>
            </div>
        ),
    },
};

export const ProductCard: Story = {
    args: {
        variant: "elevated",
        shadow: "md",
        clickable: true,
        children: (
            <>
                <div className="mb-4 aspect-video rounded-t-lg bg-gradient-to-br from-blue-400 to-purple-500"></div>
                <CardBody>
                    <h3 className="mb-2 text-lg font-semibold">Premium Plan</h3>
                    <p className="mb-3 text-gray-600">
                        Get access to all premium features with unlimited usage.
                    </p>
                    <div className="mb-4 text-2xl font-bold text-blue-600">$29/month</div>
                </CardBody>
                <CardFooter>
                    <Button fullWidth>Choose Plan</Button>
                </CardFooter>
            </>
        ),
    },
    parameters: {
        layout: "padded",
    },
};

export const StatsCard: Story = {
    args: {
        variant: "outlined",
        children: (
            <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-blue-600">1,234</div>
                <div className="text-sm tracking-wide text-gray-500 uppercase">Total Users</div>
                <div className="mt-1 text-xs text-green-600">+12% from last month</div>
            </div>
        ),
    },
};

export const CustomStyled: Story = {
    args: {
        variant: "default",
        className: tw`border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50`,
        children: (
            <div>
                <h3 className="mb-2 text-lg font-semibold text-purple-800">Custom Styled Card</h3>
                <p className="text-gray-700">
                    This card demonstrates custom styling with gradients and custom colors.
                </p>
            </div>
        ),
    },
};
