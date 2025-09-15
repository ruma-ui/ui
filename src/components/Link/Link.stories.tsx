import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Link } from "./Link";
import {
    FaExternalLinkAlt,
    FaArrowRight,
    FaHome,
    FaUser,
    FaEnvelope,
    FaPhone,
} from "react-icons/fa";
import mdx from "./Link.mdx";
import { tw } from "@/utils/tw";

const meta: Meta<typeof Link> = {
    title: "Components/Link",
    component: Link,
    parameters: {
        layout: "centered",
        docs: {
            page: mdx,
        },
    },
    argTypes: {
        variant: {
            control: { type: "radio" },
            options: ["primary", "secondary", "tertiary", "destructive", "none"],
            description: "The visual style of the link",
            defaultValue: "primary",
            type: {
                name: "enum",
                value: ["primary", "secondary", "tertiary", "destructive", "none"],
            },
        },
        size: {
            control: { type: "radio" },
            options: ["xs", "sm", "md", "lg", "xl"],
            description: "The size of the link",
            defaultValue: "md",
            type: {
                name: "enum",
                value: ["xs", "sm", "md", "lg", "xl"],
            },
        },
        underline: {
            control: { type: "radio" },
            options: ["none", "hover", "always", "default"],
            description: "Control the text decoration",
            defaultValue: "default",
            type: {
                name: "enum",
                value: ["none", "hover", "always", "default"],
            },
        },
        rounded: {
            control: { type: "radio" },
            options: ["none", "sm", "md", "lg", "xl", "full"],
            description: "Control the border radius",
            defaultValue: "md",
            type: {
                name: "enum",
                value: ["none", "sm", "md", "lg", "xl", "full"],
            },
        },
        animation: {
            control: { type: "radio" },
            options: ["none", "scale", "glow", "lift", "press"],
            description: "Animation effect on user interaction",
            defaultValue: "none",
            type: {
                name: "enum",
                value: ["none", "scale", "glow", "lift", "press"],
            },
        },
        internal: {
            control: "boolean",
            description: "Whether to use Next.js Link for internal navigation",
            defaultValue: true,
            type: { name: "boolean" },
        },
        external: {
            control: "boolean",
            description: "Whether the link opens in a new tab",
            defaultValue: false,
            type: { name: "boolean" },
        },
        focusRing: {
            control: "boolean",
            description: "Control focus ring visibility",
            defaultValue: true,
            type: { name: "boolean" },
        },
        startIcon: {
            control: false,
            description: "Optional start icon - accepts any React element",
        },
        endIcon: {
            control: false,
            description: "Optional end icon - accepts any React element",
        },
        href: {
            control: { type: "text" },
            description: "URL to navigate to",
        },
        children: {
            description: "Link content (text, elements, etc.)",
            control: { type: "text" },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Primary: Story = {
    args: {
        children: "Primary Link",
        href: "/primary",
        variant: "primary",
    },
};

export const Secondary: Story = {
    args: {
        children: "Secondary Link",
        href: "/secondary",
        variant: "secondary",
    },
};

export const Tertiary: Story = {
    args: {
        children: "Tertiary Link",
        href: "/tertiary",
        variant: "tertiary",
    },
};

export const Destructive: Story = {
    args: {
        children: "Delete Account",
        href: "/delete",
        variant: "destructive",
    },
};

export const None: Story = {
    args: {
        children: "Unstyled Link",
        href: "/none",
        variant: "none",
    },
};

export const WithStartIcon: Story = {
    args: {
        children: "Home Page",
        href: "/home",
        variant: "primary",
        startIcon: <FaHome size={16} />,
    },
};

export const WithEndIcon: Story = {
    args: {
        children: "Continue Reading",
        href: "/article",
        variant: "primary",
        endIcon: <FaArrowRight size={16} />,
    },
};

export const ExternalLink: Story = {
    args: {
        children: "Visit External Site",
        href: "https://example.com",
        variant: "primary",
        endIcon: <FaExternalLinkAlt size={14} />,
        external: true,
    },
};

export const EmailLink: Story = {
    args: {
        children: "Send Email",
        href: "mailto:hello@example.com",
        variant: "secondary",
        startIcon: <FaEnvelope size={16} />,
    },
};

export const PhoneLink: Story = {
    args: {
        children: "Call Us",
        href: "tel:+1234567890",
        variant: "secondary",
        startIcon: <FaPhone size={16} />,
    },
};

export const NoUnderline: Story = {
    args: {
        children: "No Underline",
        href: "/no-underline",
        variant: "primary",
        underline: "none",
    },
};

export const HoverUnderline: Story = {
    args: {
        children: "Hover for Underline",
        href: "/hover-underline",
        variant: "primary",
        underline: "hover",
    },
};

export const AlwaysUnderline: Story = {
    args: {
        children: "Always Underlined",
        href: "/always-underline",
        variant: "primary",
        underline: "always",
    },
};

export const AnimationScale: Story = {
    args: {
        children: "Scale Animation",
        href: "/scale",
        variant: "primary",
        animation: "scale",
    },
};

export const AnimationGlow: Story = {
    args: {
        children: "Glow Animation",
        href: "/glow",
        variant: "primary",
        animation: "glow",
    },
};

export const AnimationLift: Story = {
    args: {
        children: "Lift Animation",
        href: "/lift",
        variant: "secondary",
        animation: "lift",
    },
};

export const CustomStyled: Story = {
    args: {
        children: "Custom Styled Link",
        href: "/custom",
        variant: "primary",
        className: tw`bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent hover:from-purple-600 hover:to-pink-600`,
    },
};

export const Sizes: Story = {
    render: () => (
        <div className="flex flex-col items-start gap-4">
            <Link href="/xs" size="xs">
                Extra Small Link
            </Link>
            <Link href="/sm" size="sm">
                Small Link
            </Link>
            <Link href="/md" size="md">
                Medium Link
            </Link>
            <Link href="/lg" size="lg">
                Large Link
            </Link>
            <Link href="/xl" size="xl">
                Extra Large Link
            </Link>
        </div>
    ),
    parameters: {
        layout: "padded",
    },
};

export const Variants: Story = {
    render: () => (
        <div className="flex flex-col items-start gap-4">
            <Link href="/primary" variant="primary">
                Primary Link
            </Link>
            <Link href="/secondary" variant="secondary">
                Secondary Link
            </Link>
            <Link href="/tertiary" variant="tertiary">
                Tertiary Link
            </Link>
            <Link href="/destructive" variant="destructive">
                Destructive Link
            </Link>
            <Link href="/none" variant="none">
                Unstyled Link
            </Link>
        </div>
    ),
    parameters: {
        layout: "padded",
    },
};

export const NavigationExample: Story = {
    render: () => (
        <nav className="flex gap-6">
            <Link href="/" variant="primary" startIcon={<FaHome size={16} />}>
                Home
            </Link>
            <Link href="/profile" variant="secondary" startIcon={<FaUser size={16} />}>
                Profile
            </Link>
            <Link href="/contact" variant="secondary" startIcon={<FaEnvelope size={16} />}>
                Contact
            </Link>
            <Link
                href="https://github.com"
                variant="tertiary"
                endIcon={<FaExternalLinkAlt size={14} />}
            >
                GitHub
            </Link>
        </nav>
    ),
    parameters: {
        layout: "padded",
    },
};
