import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  LuTriangleAlert as AlertTriangle,
  LuAward as Award,
  LuCheck as CheckCircle,
  LuHeart as Heart,
  LuInfo as Info,
  LuShield as Shield,
  LuStar as Star,
  LuX as XCircle,
  LuZap as Zap,
} from "react-icons/lu";
import { Badge } from "./Badge";
import mdx from "./Badge.mdx";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["primary", "secondary", "success", "warning", "error", "info"],
      description: "The visual style of the badge",
      defaultValue: "primary",
      type: {
        name: "enum",
        value: ["primary", "secondary", "success", "warning", "error", "info"],
      },
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
      description: "The size of the badge",
      defaultValue: "md",
      type: {
        name: "enum",
        value: ["sm", "md", "lg"],
      },
    },
    rounded: {
      control: { type: "radio" },
      options: ["none", "sm", "md", "lg", "xl", "full"],
      description: "Control the border radius of the badge",
      defaultValue: "full",
      type: {
        name: "enum",
        value: ["none", "sm", "md", "lg", "xl", "full"],
      },
    },
    style: {
      control: { type: "radio" },
      options: ["filled", "outline", "soft"],
      description: "Badge content style",
      defaultValue: "filled",
      type: {
        name: "enum",
        value: ["filled", "outline", "soft"],
      },
    },
    clickable: {
      control: { type: "boolean" },
      description: "Whether the badge is clickable",
      defaultValue: false,
      type: { name: "boolean" },
    },
    dismissible: {
      control: { type: "boolean" },
      description: "Whether the badge can be dismissed",
      defaultValue: false,
      type: { name: "boolean" },
    },
    startIcon: {
      control: false,
      description: "Optional left icon - accepts any React element",
    },
    endIcon: {
      control: false,
      description: "Optional right icon - accepts any React element",
    },
    onClick: { action: "clicked" },
    onDismiss: { action: "dismissed" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Primary",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

export const Variants: Story = {
  render: () => (
    <div className='flex flex-wrap items-center gap-2'>
      <Badge variant='primary'>Primary</Badge>
      <Badge variant='secondary'>Secondary</Badge>
      <Badge variant='success'>Success</Badge>
      <Badge variant='warning'>Warning</Badge>
      <Badge variant='error'>Error</Badge>
      <Badge variant='info'>Info</Badge>
    </div>
  ),
};

export const Styles: Story = {
  render: () => (
    <div className='space-y-4'>
      <div className='flex flex-wrap items-center gap-2'>
        <Badge style='filled' variant='primary'>
          Filled
        </Badge>
        <Badge style='filled' variant='success'>
          Success
        </Badge>
        <Badge style='filled' variant='error'>
          Error
        </Badge>
      </div>
      <div className='flex flex-wrap items-center gap-2'>
        <Badge style='outline' variant='primary'>
          Outline
        </Badge>
        <Badge style='outline' variant='success'>
          Success
        </Badge>
        <Badge style='outline' variant='error'>
          Error
        </Badge>
      </div>
      <div className='flex flex-wrap items-center gap-2'>
        <Badge style='soft' variant='primary'>
          Soft
        </Badge>
        <Badge style='soft' variant='success'>
          Success
        </Badge>
        <Badge style='soft' variant='error'>
          Error
        </Badge>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className='flex items-center gap-3'>
      <Badge size='sm'>Small</Badge>
      <Badge size='md'>Medium</Badge>
      <Badge size='lg'>Large</Badge>
    </div>
  ),
};

export const RoundedVariants: Story = {
  render: () => (
    <div className='flex flex-wrap items-center gap-2'>
      <Badge rounded='none'>None</Badge>
      <Badge rounded='sm'>Small</Badge>
      <Badge rounded='md'>Medium</Badge>
      <Badge rounded='lg'>Large</Badge>
      <Badge rounded='xl'>XL</Badge>
      <Badge rounded='full'>Full</Badge>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className='flex flex-wrap items-center gap-2'>
      <Badge startIcon={<Star className='h-3 w-3' />} variant='primary'>
        Featured
      </Badge>
      <Badge startIcon={<CheckCircle className='h-3 w-3' />} variant='success'>
        Verified
      </Badge>
      <Badge endIcon={<Heart className='h-3 w-3' />} variant='error'>
        Favorite
      </Badge>
      <Badge
        startIcon={<Zap className='h-3 w-3' />}
        endIcon={<Award className='h-3 w-3' />}
        variant='warning'
      >
        Premium
      </Badge>
    </div>
  ),
};

export const StatusBadges: Story = {
  render: () => (
    <div className='space-y-3'>
      <div className='flex flex-wrap items-center gap-2'>
        <Badge variant='success' startIcon={<CheckCircle className='h-3 w-3' />}>
          Active
        </Badge>
        <Badge variant='warning' startIcon={<AlertTriangle className='h-3 w-3' />}>
          Pending
        </Badge>
        <Badge variant='error' startIcon={<XCircle className='h-3 w-3' />}>
          Inactive
        </Badge>
        <Badge variant='info' startIcon={<Info className='h-3 w-3' />}>
          Draft
        </Badge>
      </div>
      <div className='flex flex-wrap items-center gap-2'>
        <Badge variant='success' style='soft' startIcon={<Shield className='h-3 w-3' />}>
          Secure
        </Badge>
        <Badge variant='primary' style='outline' startIcon={<Star className='h-3 w-3' />}>
          Featured
        </Badge>
      </div>
    </div>
  ),
};

const ClickableComponent = () => {
  const [clicked, setClicked] = useState<string | null>(null);

  return (
    <div className='space-y-3'>
      <div className='flex flex-wrap items-center gap-2'>
        <Badge clickable onClick={() => setClicked("primary")} variant='primary'>
          Click me
        </Badge>
        <Badge
          clickable
          onClick={() => setClicked("success")}
          variant='success'
          startIcon={<CheckCircle className='h-3 w-3' />}
        >
          Action
        </Badge>
        <Badge clickable onClick={() => setClicked("outline")} variant='info' style='outline'>
          Outline
        </Badge>
      </div>
      {clicked && <p className='text-sm text-gray-600'>Last clicked: {clicked}</p>}
    </div>
  );
};

export const Clickable: Story = {
  render: () => <ClickableComponent />,
};

const DismissibleComponent = () => {
  const [badges, setBadges] = useState([
    { id: "1", text: "Dismissible", variant: "primary" as const },
    {
      id: "2",
      text: "With Icon",
      variant: "success" as const,
      icon: <Star className='h-3 w-3' />,
    },
    {
      id: "3",
      text: "Outline",
      variant: "info" as const,
      style: "outline" as const,
    },
  ]);

  const handleDismiss = (id: string) => {
    setBadges(badges.filter(badge => badge.id !== id));
  };

  return (
    <div className='space-y-3'>
      <div className='flex flex-wrap items-center gap-2'>
        {badges.map(badge => (
          <Badge
            key={badge.id}
            variant={badge.variant}
            style={badge.style}
            startIcon={badge.icon}
            dismissible
            onDismiss={() => handleDismiss(badge.id)}
          >
            {badge.text}
          </Badge>
        ))}
      </div>
      <button
        className='text-sm text-blue-600 hover:text-blue-700'
        onClick={() =>
          setBadges([
            {
              id: "1",
              text: "Dismissible",
              variant: "primary",
            },
            {
              id: "2",
              text: "With Icon",
              variant: "success",
              icon: <Star className='h-3 w-3' />,
            },
            {
              id: "3",
              text: "Outline",
              variant: "info",
              style: "outline",
            },
          ])
        }
      >
        Reset badges
      </button>
    </div>
  );
};

export const Dismissible: Story = {
  render: () => <DismissibleComponent />,
};

export const NotificationBadges: Story = {
  render: () => (
    <div className='flex flex-wrap items-center gap-4'>
      <div className='relative'>
        <button className='rounded-lg bg-gray-100 p-3 hover:bg-gray-200'>
          <Heart className='h-5 w-5 text-gray-600' />
        </button>
        <Badge className='absolute -top-1 -right-1' variant='error' size='sm'>
          3
        </Badge>
      </div>
      <div className='relative'>
        <button className='rounded-lg bg-gray-100 p-3 hover:bg-gray-200'>
          <Star className='h-5 w-5 text-gray-600' />
        </button>
        <Badge className='absolute -top-1 -right-1' variant='primary' size='sm'>
          12
        </Badge>
      </div>
      <div className='relative'>
        <button className='rounded-lg bg-gray-100 p-3 hover:bg-gray-200'>
          <Info className='h-5 w-5 text-gray-600' />
        </button>
        <Badge className='absolute -top-1 -right-1' variant='warning' size='sm'>
          99+
        </Badge>
      </div>
    </div>
  ),
};

export const TagBadges: Story = {
  render: () => (
    <div className='space-y-3'>
      <div className='flex flex-wrap items-center gap-2'>
        <Badge variant='primary' style='soft'>
          React
        </Badge>
        <Badge variant='secondary' style='soft'>
          TypeScript
        </Badge>
        <Badge variant='success' style='soft'>
          Tailwind
        </Badge>
        <Badge variant='info' style='soft'>
          Vite
        </Badge>
      </div>
      <div className='flex flex-wrap items-center gap-2'>
        <Badge variant='primary' style='outline' dismissible>
          Frontend
        </Badge>
        <Badge variant='success' style='outline' dismissible>
          Backend
        </Badge>
        <Badge variant='warning' style='outline' dismissible>
          Design
        </Badge>
      </div>
    </div>
  ),
};
