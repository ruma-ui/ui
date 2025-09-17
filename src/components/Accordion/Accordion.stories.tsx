import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./Accordion";
import { Button } from "@/components";
import { FaWindows, FaUbuntu, FaRedhat } from "react-icons/fa";
import { MdArchive } from "react-icons/md";
import mdx from "./Accordion.mdx";

const meta: Meta<typeof Accordion> = {
    title: "Components/Accordion",
    component: Accordion,
    subcomponents: { AccordionItem, AccordionTrigger, AccordionContent },
    parameters: {
        layout: "centered",
        docs: {
            page: mdx,
        },
    },
    argTypes: {
        multiple: {
            control: { type: "boolean" },
            description: "Allow multiple items to be expanded at once",
            defaultValue: false,
        },
        children: {
            control: false,
            description: "Accordion content (AccordionItem components)",
        },
        className: {
            control: "text",
            description: "Additional CSS classes",
        },
    },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
    args: {
        multiple: false,
    },
    render: (args) => (
        <div className="w-96">
            <Accordion {...args}>
                <AccordionItem value="item-1">
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern and uses semantic HTML
                        elements.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Is it styled?</AccordionTrigger>
                    <AccordionContent>
                        Yes. It comes with clean, minimal styles that work perfectly in modern
                        interfaces.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Is it animated?</AccordionTrigger>
                    <AccordionContent>
                        Yes. It includes smooth expand/collapse animations that are performant and
                        accessible.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    ),
};

// Multiple expanded items
export const Multiple: Story = {
    args: {
        multiple: true,
    },
    render: (args) => (
        <div className="w-96">
            <Accordion {...args}>
                <AccordionItem value="item-1">
                    <AccordionTrigger>First Item</AccordionTrigger>
                    <AccordionContent>
                        Multiple items can be expanded at the same time when multiple prop is true.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Second Item</AccordionTrigger>
                    <AccordionContent>
                        This item can be expanded independently of other items.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Third Item</AccordionTrigger>
                    <AccordionContent>
                        Try expanding all items to see them open simultaneously.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    ),
};

// Disabled items
export const WithDisabledItems: Story = {
    render: () => (
        <div className="w-96">
            <Accordion>
                <AccordionItem value="item-1">
                    <AccordionTrigger>Enabled Item</AccordionTrigger>
                    <AccordionContent>This is a normal, enabled accordion item.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" disabled>
                    <AccordionTrigger>Disabled Item</AccordionTrigger>
                    <AccordionContent>
                        This content cannot be accessed because the item is disabled.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Another Enabled Item</AccordionTrigger>
                    <AccordionContent>
                        This is another normal, enabled accordion item.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    ),
};

// Custom styled accordion inspired by download options
export const CustomStyled: Story = {
    render: () => {
        const downloadOptions = [
            {
                id: "windows",
                icon: FaWindows,
                iconBg: "bg-blue-500",
                title: "Windows",
                description: "Requires Windows 10 or later.",
                status: { label: "Beta", color: "bg-orange-100 text-orange-700" },
                downloads: [
                    { label: "Download for x64", variant: "primary" as const },
                    { label: "Download for ARM64", variant: "outline" as const },
                    { label: "Download for x86", variant: "outline" as const },
                ],
                details: [
                    "System Requirements: Windows 10 version 1903 or higher",
                    "File size: ~95 MB",
                ],
            },
            {
                id: "linux-debian",
                icon: FaUbuntu,
                iconBg: "bg-orange-500",
                title: "Linux - Debian-based",
                description: "Ubuntu, Mint, Pop!_OS",
                status: { label: "Alpha", color: "bg-green-100 text-green-700" },
                downloads: [
                    { label: "Download", variant: "secondary" as const },
                    { label: "arm64 (.deb)", variant: "outline" as const },
                    { label: "AMD64 (.deb)", variant: "outline" as const },
                ],
                details: [
                    "Compatible with: Ubuntu 20.04+, Debian 11+, Linux Mint 20+",
                    "Installation: sudo dpkg -i filename.deb",
                ],
            },
            {
                id: "linux-rpm",
                icon: FaRedhat,
                iconBg: "bg-red-500",
                title: "Linux - RPM-based",
                description: "RHEL, Fedora, CentOS",
                status: { label: "Alpha", color: "bg-green-100 text-green-700" },
                downloads: [
                    { label: "Download", variant: "secondary" as const },
                    { label: "arm64 (.rpm)", variant: "outline" as const },
                    { label: "AMD64 (.rpm)", variant: "outline" as const },
                ],
                details: [
                    "Compatible with: RHEL 8+, Fedora 35+, CentOS Stream 8+",
                    "Installation: sudo rpm -i filename.rpm",
                ],
            },
            {
                id: "appimage",
                icon: MdArchive,
                iconBg: "bg-purple-500",
                title: "Linux - AppImage",
                description: "Portable application format",
                status: { label: "Alpha", color: "bg-green-100 text-green-700" },
                downloads: [
                    { label: "Download", variant: "secondary" as const },
                    { label: "arm64 (AppImage)", variant: "outline" as const },
                    { label: "AMD64 (AppImage)", variant: "outline" as const },
                ],
                details: [
                    "No installation required - just download, make executable, and run",
                    "chmod +x filename.AppImage && ./filename.AppImage",
                ],
            },
        ];

        return (
            <div className="w-full max-w-lg">
                <Accordion className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    {downloadOptions.map((option, index) => (
                        <AccordionItem key={option.id} value={option.id}>
                            <AccordionTrigger
                                className={`px-4 py-4 hover:bg-gray-50 ${
                                    index > 0 ? "border-t border-gray-100" : ""
                                }`}
                            >
                                <div className="flex w-full items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div
                                            className={`flex h-8 w-8 items-center justify-center rounded-lg ${option.iconBg}`}
                                        >
                                            <option.icon className="h-4 w-4 text-white" />
                                        </div>
                                        <div className="text-left">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium text-gray-900">
                                                    {option.title}
                                                </span>
                                                <span
                                                    className={`rounded px-1.5 py-0.5 text-xs font-medium ${option.status.color}`}
                                                >
                                                    {option.status.label}
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {option.description}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4">
                                <div className="space-y-3">
                                    <div className="text-sm text-gray-600">
                                        <p className="mb-2">
                                            {option.downloads.length > 1
                                                ? "Choose your option:"
                                                : "Download:"}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {option.downloads.map((download, downloadIndex) => (
                                                <Button
                                                    key={downloadIndex}
                                                    size="sm"
                                                    variant={download.variant}
                                                >
                                                    {download.label}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {option.details.map((detail, detailIndex) => (
                                            <p key={detailIndex}>{detail}</p>
                                        ))}
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        );
    },
};
