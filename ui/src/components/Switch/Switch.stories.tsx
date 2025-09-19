import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Switch } from "./Switch";
import mdx from "./Switch.mdx";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
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
      description: "The visual style of the switch",
      defaultValue: "primary",
      type: {
        name: "enum",
        value: ["primary", "secondary"],
      },
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
      description: "The size of the switch",
      defaultValue: "md",
      type: {
        name: "enum",
        value: ["sm", "md", "lg"],
      },
    },
    rounded: {
      control: { type: "radio" },
      options: ["none", "sm", "md", "lg", "xl", "full"],
      description: "Control the border radius of the switch",
      defaultValue: "full",
      type: {
        name: "enum",
        value: ["none", "sm", "md", "lg", "xl", "full"],
      },
    },
    animation: {
      control: { type: "boolean" },
      description: "Enable/disable animations",
      defaultValue: true,
      type: { name: "boolean" },
    },
    labelPosition: {
      control: { type: "radio" },
      options: ["left", "right"],
      description: "Position of the label relative to the switch",
      defaultValue: "right",
      type: {
        name: "enum",
        value: ["left", "right"],
      },
    },
    error: {
      control: { type: "boolean" },
      description: "Show error state",
      defaultValue: false,
      type: { name: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable the switch",
      defaultValue: false,
      type: { name: "boolean" },
    },
    checked: {
      control: { type: "boolean" },
      description: "Whether the switch is checked (controlled)",
    },
    defaultChecked: {
      control: { type: "boolean" },
      description: "Default checked state (uncontrolled)",
      defaultValue: false,
    },
    label: {
      control: { type: "text" },
      description: "Optional label text displayed next to the switch",
    },
    description: {
      control: { type: "text" },
      description: "Optional helper/description text displayed below the switch",
    },
    errorMessage: {
      control: { type: "text" },
      description: "Error message to display below the switch",
    },
    onCheckedChange: { action: "checkedChanged" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Enable notifications",
  },
};

export const WithLabelLeft: Story = {
  args: {
    label: "Enable notifications",
    labelPosition: "left",
  },
};

export const WithDescription: Story = {
  args: {
    label: "Email notifications",
    description: "Receive email notifications for important updates",
  },
};

export const ErrorState: Story = {
  args: {
    label: "Required setting",
    error: true,
    errorMessage: "This setting must be enabled to continue",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled switch",
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "Disabled checked switch",
    disabled: true,
    defaultChecked: true,
  },
};

export const NoAnimation: Story = {
  args: {
    label: "No animation",
    animation: false,
  },
};

const ControlledComponent = (args: Partial<React.ComponentProps<typeof Switch>>) => {
  const [checked, setChecked] = useState(false);

  return (
    <div className='space-y-4'>
      <Switch {...args} label='Controlled switch' checked={checked} onCheckedChange={setChecked} />
      <p className='text-sm text-gray-600'>Status: {checked ? "On" : "Off"}</p>
      <button
        onClick={() => setChecked(!checked)}
        className='rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600'
      >
        Toggle from outside
      </button>
    </div>
  );
};

export const Controlled: Story = {
  render: args => <ControlledComponent {...args} />,
};

const SettingsPanelComponent = (args: Partial<React.ComponentProps<typeof Switch>>) => {
  const [settings, setSettings] = useState({
    notifications: true,
    autoSave: false,
    darkMode: true,
    analytics: false,
  });

  const updateSetting = (key: string) => (value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className='w-80 space-y-6 rounded-lg bg-white p-6 shadow-lg'>
      <h3 className='text-lg font-semibold text-gray-900'>Settings</h3>
      <div className='space-y-4'>
        <Switch
          label='Push notifications'
          description='Get notified about important updates'
          checked={settings.notifications}
          onCheckedChange={updateSetting("notifications")}
        />
        <Switch
          label='Auto-save drafts'
          description='Automatically save your work every 30 seconds'
          checked={settings.autoSave}
          onCheckedChange={updateSetting("autoSave")}
        />
        <Switch
          label='Dark mode'
          description='Use dark theme for better low-light viewing'
          checked={settings.darkMode}
          onCheckedChange={updateSetting("darkMode")}
        />
        <Switch
          label='Analytics'
          description='Help us improve by sharing anonymous usage data'
          checked={settings.analytics}
          onCheckedChange={updateSetting("analytics")}
        />
      </div>
      <div className='border-t border-gray-200 pt-4'>
        <pre className='text-xs text-gray-600'>{JSON.stringify(settings, null, 2)}</pre>
      </div>
    </div>
  );
};

export const SettingsPanel: Story = {
  render: args => <SettingsPanelComponent {...args} />,
};
