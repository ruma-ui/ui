import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import { Tabs, TabList, Tab, TabPanel } from "./Tabs";
import { FaHome, FaUser, FaCog, FaBell } from "react-icons/fa";

const meta: Meta<typeof Tabs> = {
    title: "Components/Tabs",
    component: Tabs,
    parameters: {
        layout: "centered",
        docs: {
            toc: true,
        },
    },
    argTypes: {
        variant: {
            control: { type: "radio" },
            options: ["default", "underline", "pills"],
            description: "The visual style of the tabs",
            defaultValue: "default",
            type: {
                name: "enum",
                value: ["default", "underline", "pills"],
            },
        },
        size: {
            control: { type: "radio" },
            options: ["sm", "md", "lg"],
            description: "The size of the tabs",
            defaultValue: "md",
            type: {
                name: "enum",
                value: ["sm", "md", "lg"],
            },
        },
        orientation: {
            control: { type: "radio" },
            options: ["horizontal", "vertical"],
            description: "Orientation of the tabs",
            defaultValue: "horizontal",
            type: {
                name: "enum",
                value: ["horizontal", "vertical"],
            },
        },
        fullWidth: {
            control: "boolean",
            description: "Whether tabs should take full width",
            defaultValue: false,
            type: { name: "boolean" },
        },
        defaultValue: {
            control: "text",
            description: "The default active tab value",
            type: { name: "string" },
        },
        value: {
            control: "text",
            description: "The controlled active tab value",
            type: { name: "string" },
        },
        onValueChange: { action: "valueChanged" },
    },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
    args: {
        defaultValue: "tab1",
    },
    render: (args) => (
        <Tabs {...args}>
            <TabList>
                <Tab value="tab1">Tab 1</Tab>
                <Tab value="tab2">Tab 2</Tab>
                <Tab value="tab3">Tab 3</Tab>
            </TabList>
            <TabPanel value="tab1">
                <div className="rounded-md bg-gray-50 p-4">
                    <h3 className="mb-2 font-semibold">Tab 1 Content</h3>
                    <p>This is the content for the first tab.</p>
                </div>
            </TabPanel>
            <TabPanel value="tab2">
                <div className="rounded-md bg-gray-50 p-4">
                    <h3 className="mb-2 font-semibold">Tab 2 Content</h3>
                    <p>This is the content for the second tab.</p>
                </div>
            </TabPanel>
            <TabPanel value="tab3">
                <div className="rounded-md bg-gray-50 p-4">
                    <h3 className="mb-2 font-semibold">Tab 3 Content</h3>
                    <p>This is the content for the third tab.</p>
                </div>
            </TabPanel>
        </Tabs>
    ),
};

export const Underline: Story = {
    args: {
        variant: "underline",
        defaultValue: "home",
    },
    render: (args) => (
        <Tabs {...args}>
            <TabList>
                <Tab value="home">Home</Tab>
                <Tab value="profile">Profile</Tab>
                <Tab value="settings">Settings</Tab>
            </TabList>
            <TabPanel value="home">
                <div className="p-4">
                    <h3 className="mb-2 font-semibold">Home</h3>
                    <p>Welcome to the home page content.</p>
                </div>
            </TabPanel>
            <TabPanel value="profile">
                <div className="p-4">
                    <h3 className="mb-2 font-semibold">Profile</h3>
                    <p>Your profile information goes here.</p>
                </div>
            </TabPanel>
            <TabPanel value="settings">
                <div className="p-4">
                    <h3 className="mb-2 font-semibold">Settings</h3>
                    <p>Configure your preferences here.</p>
                </div>
            </TabPanel>
        </Tabs>
    ),
};

export const Pills: Story = {
    args: {
        variant: "pills",
        defaultValue: "overview",
    },
    render: (args) => (
        <Tabs {...args}>
            <TabList>
                <Tab value="overview">Overview</Tab>
                <Tab value="analytics">Analytics</Tab>
                <Tab value="reports">Reports</Tab>
            </TabList>
            <TabPanel value="overview">
                <div className="rounded-md bg-blue-50 p-4">
                    <h3 className="mb-2 font-semibold">Overview</h3>
                    <p>Get a high-level view of your data.</p>
                </div>
            </TabPanel>
            <TabPanel value="analytics">
                <div className="rounded-md bg-green-50 p-4">
                    <h3 className="mb-2 font-semibold">Analytics</h3>
                    <p>Detailed analytics and insights.</p>
                </div>
            </TabPanel>
            <TabPanel value="reports">
                <div className="rounded-md bg-purple-50 p-4">
                    <h3 className="mb-2 font-semibold">Reports</h3>
                    <p>Generate and view reports.</p>
                </div>
            </TabPanel>
        </Tabs>
    ),
};

export const WithIcons: Story = {
    args: {
        defaultValue: "home",
    },
    render: (args) => (
        <Tabs {...args}>
            <TabList>
                <Tab value="home">
                    <FaHome className="mr-2" size={16} />
                    Home
                </Tab>
                <Tab value="profile">
                    <FaUser className="mr-2" size={16} />
                    Profile
                </Tab>
                <Tab value="settings">
                    <FaCog className="mr-2" size={16} />
                    Settings
                </Tab>
                <Tab value="notifications">
                    <FaBell className="mr-2" size={16} />
                    Notifications
                </Tab>
            </TabList>
            <TabPanel value="home">
                <div className="p-4">
                    <h3 className="mb-2 font-semibold">Home</h3>
                    <p>Welcome to your dashboard.</p>
                </div>
            </TabPanel>
            <TabPanel value="profile">
                <div className="p-4">
                    <h3 className="mb-2 font-semibold">Profile</h3>
                    <p>Manage your profile settings.</p>
                </div>
            </TabPanel>
            <TabPanel value="settings">
                <div className="p-4">
                    <h3 className="mb-2 font-semibold">Settings</h3>
                    <p>Configure application settings.</p>
                </div>
            </TabPanel>
            <TabPanel value="notifications">
                <div className="p-4">
                    <h3 className="mb-2 font-semibold">Notifications</h3>
                    <p>Manage your notification preferences.</p>
                </div>
            </TabPanel>
        </Tabs>
    ),
};

export const Vertical: Story = {
    args: {
        orientation: "vertical",
        defaultValue: "tab1",
    },
    render: (args) => (
        <Tabs {...args}>
            <TabList>
                <Tab value="tab1">Tab 1</Tab>
                <Tab value="tab2">Tab 2</Tab>
                <Tab value="tab3">Tab 3</Tab>
            </TabList>
            <TabPanel value="tab1">
                <div className="rounded-md bg-gray-50 p-4">
                    <h3 className="mb-2 font-semibold">Tab 1 Content</h3>
                    <p>This is the content for the first tab in vertical layout.</p>
                </div>
            </TabPanel>
            <TabPanel value="tab2">
                <div className="rounded-md bg-gray-50 p-4">
                    <h3 className="mb-2 font-semibold">Tab 2 Content</h3>
                    <p>This is the content for the second tab in vertical layout.</p>
                </div>
            </TabPanel>
            <TabPanel value="tab3">
                <div className="rounded-md bg-gray-50 p-4">
                    <h3 className="mb-2 font-semibold">Tab 3 Content</h3>
                    <p>This is the content for the third tab in vertical layout.</p>
                </div>
            </TabPanel>
        </Tabs>
    ),
};

export const FullWidth: Story = {
    args: {
        fullWidth: true,
        defaultValue: "tab1",
    },
    render: (args) => (
        <Tabs {...args}>
            <TabList>
                <Tab value="tab1">Tab 1</Tab>
                <Tab value="tab2">Tab 2</Tab>
                <Tab value="tab3">Tab 3</Tab>
            </TabList>
            <TabPanel value="tab1">
                <div className="rounded-md bg-gray-50 p-4">
                    <h3 className="mb-2 font-semibold">Tab 1 Content</h3>
                    <p>This tab takes full width of its container.</p>
                </div>
            </TabPanel>
            <TabPanel value="tab2">
                <div className="rounded-md bg-gray-50 p-4">
                    <h3 className="mb-2 font-semibold">Tab 2 Content</h3>
                    <p>This tab also takes full width of its container.</p>
                </div>
            </TabPanel>
            <TabPanel value="tab3">
                <div className="rounded-md bg-gray-50 p-4">
                    <h3 className="mb-2 font-semibold">Tab 3 Content</h3>
                    <p>This tab takes full width of its container as well.</p>
                </div>
            </TabPanel>
        </Tabs>
    ),
    parameters: {
        layout: "padded",
    },
};

export const Sizes: Story = {
    args: {
        defaultValue: "small",
    },
    render: (args) => (
        <div className="space-y-8">
            <div>
                <h4 className="mb-4 font-semibold">Small Tabs</h4>
                <Tabs {...args} size="sm">
                    <TabList>
                        <Tab value="small">Small</Tab>
                        <Tab value="tabs">Tabs</Tab>
                    </TabList>
                    <TabPanel value="small">
                        <div className="rounded bg-gray-50 p-2">Small tab content</div>
                    </TabPanel>
                    <TabPanel value="tabs">
                        <div className="rounded bg-gray-50 p-2">Small tabs content</div>
                    </TabPanel>
                </Tabs>
            </div>

            <div>
                <h4 className="mb-4 font-semibold">Medium Tabs (Default)</h4>
                <Tabs {...args} size="md">
                    <TabList>
                        <Tab value="medium">Medium</Tab>
                        <Tab value="tabs">Tabs</Tab>
                    </TabList>
                    <TabPanel value="medium">
                        <div className="rounded bg-gray-50 p-4">Medium tab content</div>
                    </TabPanel>
                    <TabPanel value="tabs">
                        <div className="rounded bg-gray-50 p-4">Medium tabs content</div>
                    </TabPanel>
                </Tabs>
            </div>

            <div>
                <h4 className="mb-4 font-semibold">Large Tabs</h4>
                <Tabs {...args} size="lg">
                    <TabList>
                        <Tab value="large">Large</Tab>
                        <Tab value="tabs">Tabs</Tab>
                    </TabList>
                    <TabPanel value="large">
                        <div className="rounded bg-gray-50 p-4">Large tab content</div>
                    </TabPanel>
                    <TabPanel value="tabs">
                        <div className="rounded bg-gray-50 p-4">Large tabs content</div>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    ),
};

export const Controlled: Story = {
    args: {
        value: "tab1",
    },
    render: (args) => {
        const [activeTab, setActiveTab] = React.useState("tab1");

        return (
            <div>
                <div className="mb-4 rounded-md bg-blue-50 p-4">
                    <p className="text-sm text-blue-800">
                        <strong>Active Tab:</strong> {activeTab}
                    </p>
                    <div className="mt-2 space-x-2">
                        <button
                            onClick={() => setActiveTab("tab1")}
                            className="rounded bg-blue-600 px-3 py-1 text-sm text-white"
                        >
                            Set Tab 1
                        </button>
                        <button
                            onClick={() => setActiveTab("tab2")}
                            className="rounded bg-blue-600 px-3 py-1 text-sm text-white"
                        >
                            Set Tab 2
                        </button>
                        <button
                            onClick={() => setActiveTab("tab3")}
                            className="rounded bg-blue-600 px-3 py-1 text-sm text-white"
                        >
                            Set Tab 3
                        </button>
                    </div>
                </div>

                <Tabs {...args} value={activeTab} onValueChange={setActiveTab}>
                    <TabList>
                        <Tab value="tab1">Controlled Tab 1</Tab>
                        <Tab value="tab2">Controlled Tab 2</Tab>
                        <Tab value="tab3">Controlled Tab 3</Tab>
                    </TabList>
                    <TabPanel value="tab1">
                        <div className="rounded-md bg-gray-50 p-4">
                            <h3 className="mb-2 font-semibold">Controlled Tab 1</h3>
                            <p>This tab is controlled by external state.</p>
                        </div>
                    </TabPanel>
                    <TabPanel value="tab2">
                        <div className="rounded-md bg-gray-50 p-4">
                            <h3 className="mb-2 font-semibold">Controlled Tab 2</h3>
                            <p>This tab is also controlled by external state.</p>
                        </div>
                    </TabPanel>
                    <TabPanel value="tab3">
                        <div className="rounded-md bg-gray-50 p-4">
                            <h3 className="mb-2 font-semibold">Controlled Tab 3</h3>
                            <p>This tab is controlled by external state as well.</p>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        );
    },
};

export const Disabled: Story = {
    args: {
        defaultValue: "enabled1",
    },
    render: (args) => (
        <Tabs {...args}>
            <TabList>
                <Tab value="enabled1">Enabled Tab 1</Tab>
                <Tab value="disabled1" disabled>
                    Disabled Tab 1
                </Tab>
                <Tab value="enabled2">Enabled Tab 2</Tab>
                <Tab value="disabled2" disabled>
                    Disabled Tab 2
                </Tab>
            </TabList>
            <TabPanel value="enabled1">
                <div className="rounded-md bg-gray-50 p-4">
                    <h3 className="mb-2 font-semibold">Enabled Tab 1</h3>
                    <p>This tab is enabled and clickable.</p>
                </div>
            </TabPanel>
            <TabPanel value="disabled1">
                <div className="rounded-md bg-red-50 p-4">
                    <h3 className="mb-2 font-semibold">Disabled Tab 1</h3>
                    <p>This tab is disabled and cannot be selected.</p>
                </div>
            </TabPanel>
            <TabPanel value="enabled2">
                <div className="rounded-md bg-gray-50 p-4">
                    <h3 className="mb-2 font-semibold">Enabled Tab 2</h3>
                    <p>This tab is also enabled and clickable.</p>
                </div>
            </TabPanel>
            <TabPanel value="disabled2">
                <div className="rounded-md bg-red-50 p-4">
                    <h3 className="mb-2 font-semibold">Disabled Tab 2</h3>
                    <p>This tab is disabled and cannot be selected.</p>
                </div>
            </TabPanel>
        </Tabs>
    ),
};
