import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuGroup,
} from "./NavigationMenu";
import { FaHome, FaUser, FaCog, FaBell, FaSearch, FaHeart } from "react-icons/fa";
import mdx from "./NavigationMenu.mdx";

const meta: Meta<typeof NavigationMenu> = {
  title: "Components/NavigationMenu",
  component: NavigationMenu,
  subcomponents: {
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink,
    NavigationMenuGroup,
  },
  parameters: {
    layout: "centered",
    docs: {
      page: mdx,
    },
  },
  decorators: [
    Story => (
      <div className="min-h-96">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
      description: "The orientation of the navigation menu",
      defaultValue: "horizontal",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "The size of the navigation items",
      defaultValue: "md",
    },
    variant: {
      control: { type: "select" },
      options: ["default", "underline", "pills"],
      description: "The visual style of the navigation menu",
      defaultValue: "default",
    },
    children: {
      control: false,
      description: "Navigation menu content",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default horizontal navigation
export const Default: Story = {
  args: {
    orientation: "horizontal",
    size: "md",
    variant: "default",
  },
  render: args => (
    <NavigationMenu {...args}>
      <NavigationMenuList>
        <NavigationMenuItem value="home">
          <NavigationMenuLink href="#home">Home</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem value="about">
          <NavigationMenuLink href="#about">About</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem value="services">
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuGroup title="Web Development">
              <NavigationMenuLink href="#web-design">Web Design</NavigationMenuLink>
              <NavigationMenuLink href="#frontend">Frontend Development</NavigationMenuLink>
              <NavigationMenuLink href="#backend">Backend Development</NavigationMenuLink>
            </NavigationMenuGroup>
            <NavigationMenuGroup title="Mobile Apps">
              <NavigationMenuLink href="#ios">iOS Development</NavigationMenuLink>
              <NavigationMenuLink href="#android">Android Development</NavigationMenuLink>
            </NavigationMenuGroup>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem value="contact">
          <NavigationMenuLink href="#contact">Contact</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

// Vertical navigation
export const Vertical: Story = {
  args: {
    orientation: "vertical",
    size: "md",
    variant: "default",
  },
  render: args => (
    <div className="w-64">
      <NavigationMenu {...args}>
        <NavigationMenuList>
          <NavigationMenuItem value="dashboard">
            <NavigationMenuLink href="#dashboard">Dashboard</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem value="projects">
            <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuGroup title="Recent">
                <NavigationMenuLink href="#project-1">Project Alpha</NavigationMenuLink>
                <NavigationMenuLink href="#project-2">Project Beta</NavigationMenuLink>
              </NavigationMenuGroup>
              <NavigationMenuGroup title="Archived">
                <NavigationMenuLink href="#archived-1">Old Project 1</NavigationMenuLink>
                <NavigationMenuLink href="#archived-2">Old Project 2</NavigationMenuLink>
              </NavigationMenuGroup>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem value="team">
            <NavigationMenuLink href="#team">Team</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem value="settings">
            <NavigationMenuLink href="#settings">Settings</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  ),
};

// Navigation with icons
export const WithIcons: Story = {
  args: {
    orientation: "horizontal",
    size: "md",
    variant: "default",
  },
  render: args => (
    <NavigationMenu {...args}>
      <NavigationMenuList>
        <NavigationMenuItem value="home">
          <NavigationMenuLink href="#home">
            <FaHome className="mr-2 h-4 w-4" />
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem value="profile">
          <NavigationMenuTrigger>
            <FaUser className="mr-2 h-4 w-4" />
            Profile
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="#view-profile">
              <FaUser className="mr-2 h-4 w-4" />
              View Profile
            </NavigationMenuLink>
            <NavigationMenuLink href="#edit-profile">
              <FaCog className="mr-2 h-4 w-4" />
              Edit Profile
            </NavigationMenuLink>
            <NavigationMenuLink href="#notifications">
              <FaBell className="mr-2 h-4 w-4" />
              Notifications
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem value="search">
          <NavigationMenuLink href="#search">
            <FaSearch className="mr-2 h-4 w-4" />
            Search
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem value="favorites">
          <NavigationMenuLink href="#favorites">
            <FaHeart className="mr-2 h-4 w-4" />
            Favorites
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

// Underline variant
export const UnderlineVariant: Story = {
  args: {
    orientation: "horizontal",
    size: "md",
    variant: "underline",
  },
  render: args => (
    <NavigationMenu {...args}>
      <NavigationMenuList>
        <NavigationMenuItem value="home" active>
          <NavigationMenuLink href="#home">Home</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem value="products">
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuGroup title="Categories">
              <NavigationMenuLink href="#electronics">Electronics</NavigationMenuLink>
              <NavigationMenuLink href="#clothing">Clothing</NavigationMenuLink>
              <NavigationMenuLink href="#books">Books</NavigationMenuLink>
            </NavigationMenuGroup>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem value="about">
          <NavigationMenuLink href="#about">About</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem value="contact">
          <NavigationMenuLink href="#contact">Contact</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

// Pills variant
export const PillsVariant: Story = {
  args: {
    orientation: "horizontal",
    size: "md",
    variant: "pills",
  },
  render: args => (
    <NavigationMenu {...args}>
      <NavigationMenuList>
        <NavigationMenuItem value="overview" active>
          <NavigationMenuLink href="#overview">Overview</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem value="analytics">
          <NavigationMenuLink href="#analytics">Analytics</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem value="reports">
          <NavigationMenuTrigger>Reports</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuGroup title="Report Types">
              <NavigationMenuLink href="#monthly">Monthly Report</NavigationMenuLink>
              <NavigationMenuLink href="#quarterly">Quarterly Report</NavigationMenuLink>
              <NavigationMenuLink href="#annual">Annual Report</NavigationMenuLink>
            </NavigationMenuGroup>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem value="settings">
          <NavigationMenuLink href="#settings">Settings</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

// Custom styled navigation
export const CustomStyled: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <NavigationMenu className="rounded-lg border border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 shadow-sm">
        <NavigationMenuList className="space-x-2">
          <NavigationMenuItem value="dashboard">
            <NavigationMenuLink
              href="#dashboard"
              className="rounded-md bg-white px-4 py-2 font-semibold text-blue-700 shadow-sm hover:bg-blue-50 hover:text-blue-800"
            >
              <FaHome className="mr-2 h-4 w-4" />
              Dashboard
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem value="projects">
            <NavigationMenuTrigger className="rounded-md bg-white px-4 py-2 font-semibold text-blue-700 shadow-sm hover:bg-blue-50 hover:text-blue-800">
              <FaCog className="mr-2 h-4 w-4" />
              Projects
            </NavigationMenuTrigger>
            <NavigationMenuContent className="border-blue-200 bg-white shadow-lg">
              <NavigationMenuGroup title="Active Projects" className="text-blue-800">
                <NavigationMenuLink
                  href="#project-1"
                  className="text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                >
                  E-commerce Platform
                </NavigationMenuLink>
                <NavigationMenuLink
                  href="#project-2"
                  className="text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                >
                  Mobile App Redesign
                </NavigationMenuLink>
                <NavigationMenuLink
                  href="#project-3"
                  className="text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                >
                  Analytics Dashboard
                </NavigationMenuLink>
              </NavigationMenuGroup>
              <NavigationMenuGroup title="Completed" className="text-green-800">
                <NavigationMenuLink
                  href="#completed-1"
                  className="text-green-600 hover:bg-green-50 hover:text-green-700"
                >
                  Website Migration
                </NavigationMenuLink>
                <NavigationMenuLink
                  href="#completed-2"
                  className="text-green-600 hover:bg-green-50 hover:text-green-700"
                >
                  API Integration
                </NavigationMenuLink>
              </NavigationMenuGroup>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem value="team">
            <NavigationMenuLink
              href="#team"
              className="rounded-md bg-white px-4 py-2 font-semibold text-blue-700 shadow-sm hover:bg-blue-50 hover:text-blue-800"
            >
              <FaUser className="mr-2 h-4 w-4" />
              Team
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem value="notifications">
            <NavigationMenuLink
              href="#notifications"
              className="rounded-md bg-white px-4 py-2 font-semibold text-blue-700 shadow-sm hover:bg-blue-50 hover:text-blue-800"
            >
              <FaBell className="mr-2 h-4 w-4" />
              Notifications
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  ),
};
