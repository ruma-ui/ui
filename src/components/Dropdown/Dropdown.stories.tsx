import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuGroup,
} from "./Dropdown";
import { Button } from "@/components";
import { useState } from "react";
import mdx from "./Dropdown.mdx";
import { FaUser, FaCog, FaSignOutAlt, FaChevronDown } from "react-icons/fa";
import { RiComputerLine } from "react-icons/ri";

const meta: Meta<typeof DropdownMenu> = {
    title: "Components/Dropdown",
    component: DropdownMenu,
    subcomponents: {
        DropdownMenuTrigger,
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenuLabel,
        DropdownMenuSeparator,
        DropdownMenuGroup,
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
        onOpenChange: { action: "openChanged" },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: (args) => (
        <DropdownMenu {...args}>
            <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline" endIcon={<FaChevronDown />}>
                    Open Menu
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <FaUser className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <FaCog className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <FaSignOutAlt className="mr-2 h-4 w-4" />
                        <span>Sign Out</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    ),
};

export const Secondary: Story = {
    render: (args) => (
        <DropdownMenu {...args}>
            <DropdownMenuTrigger asChild>
                <Button size="sm" variant="secondary" endIcon={<FaChevronDown />}>
                    Open Menu
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <FaUser className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <FaCog className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <FaSignOutAlt className="mr-2 h-4 w-4" />
                        <span>Sign Out</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    ),
};

export const WithLabel: Story = {
    render: (args) => (
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">User Menu</label>
            <DropdownMenu {...args}>
                <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline" endIcon={<FaChevronDown />}>
                        Open Menu
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <FaUser className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <FaCog className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <FaSignOutAlt className="mr-2 h-4 w-4" />
                            <span>Sign Out</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    ),
};

export const WithDescription: Story = {
    render: (args) => (
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Account</label>
            <p className="text-sm text-gray-500">Manage your account settings</p>
            <DropdownMenu {...args}>
                <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline" endIcon={<FaChevronDown />}>
                        Open Menu
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <FaUser className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <FaCog className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <FaSignOutAlt className="mr-2 h-4 w-4" />
                            <span>Sign Out</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    ),
};

export const WithStartIcon: Story = {
    render: (args) => (
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Menu</label>
            <DropdownMenu {...args}>
                <DropdownMenuTrigger asChild>
                    <Button
                        size="sm"
                        variant="outline"
                        startIcon={<RiComputerLine />}
                        endIcon={<FaChevronDown />}
                    >
                        Open Menu
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <FaUser className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <FaCog className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <FaSignOutAlt className="mr-2 h-4 w-4" />
                            <span>Sign Out</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    ),
};

export const ErrorState: Story = {
    render: (args) => (
        <div className="space-y-2">
            <label className="text-sm font-medium text-red-700">Required Menu</label>
            <DropdownMenu {...args}>
                <DropdownMenuTrigger asChild>
                    <Button
                        size="sm"
                        variant="outline"
                        className="border-red-300 text-red-900 hover:border-red-400"
                    >
                        Open Menu
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <FaUser className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <FaCog className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <FaSignOutAlt className="mr-2 h-4 w-4" />
                            <span>Sign Out</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <p className="text-sm text-red-600">This menu is required</p>
        </div>
    ),
};

export const Disabled: Story = {
    render: () => (
        <div className="space-y-2">
            <Button size="sm" variant="outline" disabled>
                Open Menu
            </Button>
        </div>
    ),
};

export const FullWidth: Story = {
    render: (args) => (
        <div className="w-full space-y-2">
            <label className="text-sm font-medium text-gray-700">Full Width Menu</label>
            <DropdownMenu {...args}>
                <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline" fullWidth endIcon={<FaChevronDown />}>
                        Open Menu
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <FaUser className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <FaCog className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <FaSignOutAlt className="mr-2 h-4 w-4" />
                            <span>Sign Out</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    ),
    parameters: {
        layout: "padded",
    },
};

export const CustomStyled: Story = {
    render: (args) => (
        <DropdownMenu {...args}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="none"
                    className="border-purple-300 bg-purple-50 text-purple-900 hover:bg-purple-100"
                    endIcon={<FaChevronDown />}
                >
                    Open Menu
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <FaUser className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <FaCog className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <FaSignOutAlt className="mr-2 h-4 w-4" />
                        <span>Sign Out</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    ),
};

export const Controlled: Story = {
    render: (args) => {
        const [open, setOpen] = useState(false);

        return (
            <div className="w-80">
                <DropdownMenu {...args} open={open} onOpenChange={setOpen}>
                    <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="outline" endIcon={<FaChevronDown />}>
                            Controlled Menu
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <FaUser className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <FaCog className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <FaSignOutAlt className="mr-2 h-4 w-4" />
                                <span>Sign Out</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                <p className="mt-2 text-sm text-gray-600">Open: {open ? "Yes" : "No"}</p>
            </div>
        );
    },
};

export const Alignments: Story = {
    render: (args) => (
        <div className="flex flex-wrap gap-4">
            <DropdownMenu {...args}>
                <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline" endIcon={<FaChevronDown />}>
                        Bottom Start
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="bottom-start">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <FaUser className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <FaCog className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <FaSignOutAlt className="mr-2 h-4 w-4" />
                            <span>Sign Out</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu {...args}>
                <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline" endIcon={<FaChevronDown />}>
                        Bottom End
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="bottom-end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <FaUser className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <FaCog className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <FaSignOutAlt className="mr-2 h-4 w-4" />
                            <span>Sign Out</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu {...args}>
                <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline" endIcon={<FaChevronDown />}>
                        Top Start
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="top-start">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <FaUser className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <FaCog className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <FaSignOutAlt className="mr-2 h-4 w-4" />
                            <span>Sign Out</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu {...args}>
                <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline" endIcon={<FaChevronDown />}>
                        Top End
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="top-end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <FaUser className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <FaCog className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <FaSignOutAlt className="mr-2 h-4 w-4" />
                            <span>Sign Out</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    ),
};
