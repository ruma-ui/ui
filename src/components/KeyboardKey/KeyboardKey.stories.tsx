import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { KeyboardKey } from "./KeyboardKey";
import mdx from "./KeyboardKey.mdx";
import { tw } from "@/utils/tw";
import { FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const meta: Meta<typeof KeyboardKey> = {
    title: "Components/KeyboardKey",
    component: KeyboardKey,
    parameters: {
        layout: "centered",
        docs: {
            page: mdx,
        },
    },
    argTypes: {
        variant: {
            control: { type: "radio" },
            options: ["default", "flat", "outlined", "minimal"],
            description: "The visual style of the keyboard key",
            defaultValue: "default",
            type: {
                name: "enum",
                value: ["default", "flat", "outlined", "minimal"],
            },
        },
        size: {
            control: { type: "radio" },
            options: ["xs", "sm", "md", "lg", "xl"],
            description: "The size of the keyboard key",
            defaultValue: "md",
            type: {
                name: "enum",
                value: ["xs", "sm", "md", "lg", "xl"],
            },
        },
        pressed: {
            control: "boolean",
            description: "Additional styling to make the key appear pressed/active",
            defaultValue: false,
            type: { name: "boolean" },
        },
        disabled: {
            control: "boolean",
            description: "Whether the key is disabled/inactive",
            defaultValue: false,
            type: { name: "boolean" },
        },
        clickable: {
            control: "boolean",
            description: "Make the key render as a clickable element",
            defaultValue: false,
            type: { name: "boolean" },
        },
        as: {
            control: { type: "radio" },
            options: ["kbd", "span", "button", "div"],
            description: "The HTML element to render as",
            defaultValue: "kbd",
            type: {
                name: "enum",
                value: ["kbd", "span", "button", "div"],
            },
        },
        onClick: { action: "clicked" },
        children: {
            description: "The key being displayed",
            control: { type: "text" },
        },
    },
};

export default meta;
type Story = StoryObj<typeof KeyboardKey>;

export const Default: Story = {
    args: {
        children: "Ctrl",
        variant: "default",
    },
};

export const Flat: Story = {
    args: {
        children: "Alt",
        variant: "flat",
    },
};

export const Outlined: Story = {
    args: {
        children: "Shift",
        variant: "outlined",
    },
};

export const Minimal: Story = {
    args: {
        children: "Tab",
        variant: "minimal",
    },
};

export const Pressed: Story = {
    args: {
        children: "Space",
        pressed: true,
    },
};

export const Disabled: Story = {
    args: {
        children: "F1",
        disabled: true,
    },
};

export const Clickable: Story = {
    args: {
        children: "Enter",
        clickable: true,
        variant: "default",
    },
};

export const SingleKeys: Story = {
    render: () => (
        <div className="flex flex-wrap gap-2">
            <KeyboardKey>A</KeyboardKey>
            <KeyboardKey>S</KeyboardKey>
            <KeyboardKey>D</KeyboardKey>
            <KeyboardKey>F</KeyboardKey>
        </div>
    ),
};

export const ModifierKeys: Story = {
    render: () => (
        <div className="flex flex-wrap gap-2">
            <KeyboardKey>Ctrl</KeyboardKey>
            <KeyboardKey>Alt</KeyboardKey>
            <KeyboardKey>Shift</KeyboardKey>
            <KeyboardKey>Cmd</KeyboardKey>
        </div>
    ),
};

export const FunctionKeys: Story = {
    render: () => (
        <div className="flex flex-wrap gap-2">
            <KeyboardKey size="sm">F1</KeyboardKey>
            <KeyboardKey size="sm">F2</KeyboardKey>
            <KeyboardKey size="sm">F3</KeyboardKey>
            <KeyboardKey size="sm">F4</KeyboardKey>
            <KeyboardKey size="sm">F5</KeyboardKey>
            <KeyboardKey size="sm">F6</KeyboardKey>
        </div>
    ),
};

export const ArrowKeys: Story = {
    render: () => (
        <div className="grid w-fit grid-cols-3 gap-1">
            <div></div>
            <KeyboardKey>
                <FaArrowUp />
            </KeyboardKey>
            <div></div>
            <KeyboardKey>
                <FaArrowLeft />
            </KeyboardKey>
            <KeyboardKey>
                <FaArrowDown />
            </KeyboardKey>
            <KeyboardKey>
                <FaArrowRight />
            </KeyboardKey>
        </div>
    ),
};

export const KeyboardShortcut: Story = {
    render: () => (
        <div className="flex items-center gap-1">
            <KeyboardKey size="sm">Ctrl</KeyboardKey>
            <span className="text-gray-500">+</span>
            <KeyboardKey size="sm">C</KeyboardKey>
        </div>
    ),
};

export const ComplexShortcut: Story = {
    render: () => (
        <div className="flex items-center gap-1">
            <KeyboardKey size="sm" variant="outlined">
                Ctrl
            </KeyboardKey>
            <span className="text-gray-500">+</span>
            <KeyboardKey size="sm" variant="outlined">
                Shift
            </KeyboardKey>
            <span className="text-gray-500">+</span>
            <KeyboardKey size="sm" variant="outlined">
                P
            </KeyboardKey>
        </div>
    ),
};

export const SizeVariations: Story = {
    render: () => (
        <div className="flex items-center gap-2">
            <KeyboardKey size="xs">Ctrl</KeyboardKey>
            <KeyboardKey size="sm">Alt</KeyboardKey>
            <KeyboardKey size="md">Shift</KeyboardKey>
            <KeyboardKey size="lg">Tab</KeyboardKey>
            <KeyboardKey size="xl">Space</KeyboardKey>
        </div>
    ),
};

export const VariantComparison: Story = {
    render: () => (
        <div className="flex flex-wrap gap-2">
            <KeyboardKey variant="default">Default</KeyboardKey>
            <KeyboardKey variant="flat">Flat</KeyboardKey>
            <KeyboardKey variant="outlined">Outlined</KeyboardKey>
            <KeyboardKey variant="minimal">Minimal</KeyboardKey>
        </div>
    ),
};

export const PressedStates: Story = {
    render: () => (
        <div className="flex flex-wrap gap-2">
            <KeyboardKey>Normal</KeyboardKey>
            <KeyboardKey pressed>Pressed</KeyboardKey>
            <KeyboardKey disabled>Disabled</KeyboardKey>
        </div>
    ),
};

export const SpecialKeys: Story = {
    render: () => (
        <div className="flex flex-wrap gap-2">
            <KeyboardKey>Esc</KeyboardKey>
            <KeyboardKey>Delete</KeyboardKey>
            <KeyboardKey>Backspace</KeyboardKey>
            <KeyboardKey>Enter</KeyboardKey>
            <KeyboardKey>Home</KeyboardKey>
            <KeyboardKey>End</KeyboardKey>
        </div>
    ),
};

export const CustomStyled: Story = {
    args: {
        children: "Custom",
        className: tw`border-purple-600 bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg`,
    },
};
