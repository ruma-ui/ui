import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Toast, ToastProvider, useToast } from "./Toast";
import mdx from "./Toast.mdx";

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["success", "error", "warning", "info"],
      description: "The type of toast which determines the visual style and icon",
      defaultValue: "info",
      type: {
        name: "enum",
        value: ["success", "error", "warning", "info"],
      },
    },
    position: {
      control: { type: "radio" },
      options: [
        "top-left",
        "top-center",
        "top-right",
        "bottom-left",
        "bottom-center",
        "bottom-right",
      ],
      description: "The position of the toast on screen",
      defaultValue: "top-right",
      type: {
        name: "enum",
        value: [
          "top-left",
          "top-center",
          "top-right",
          "bottom-left",
          "bottom-center",
          "bottom-right",
        ],
      },
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
      description: "The size of the toast",
      defaultValue: "md",
      type: {
        name: "enum",
        value: ["sm", "md", "lg"],
      },
    },
    duration: {
      control: { type: "number" },
      description: "Auto-dismiss duration in milliseconds. Set to 0 to disable auto-dismiss",
      defaultValue: 5000,
      type: { name: "number" },
    },
    icon: {
      control: false,
      description: "Custom icon to display instead of default variant icon",
    },
    title: {
      control: { type: "text" },
      description: "Toast title",
      type: { name: "string" },
    },
    description: {
      control: { type: "text" },
      description: "Toast description/content",
      type: { name: "string" },
    },
    showCloseButton: {
      control: { type: "boolean" },
      description: "Show close button",
      defaultValue: true,
      type: { name: "boolean" },
    },
    animation: {
      control: { type: "boolean" },
      description: "Enable/disable animations",
      defaultValue: true,
      type: { name: "boolean" },
    },
    open: {
      control: { type: "boolean" },
      description: "Whether the toast is visible",
      defaultValue: false,
      type: { name: "boolean" },
    },
    onClose: { action: "closed" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const SuccessComponent = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className='space-y-4'>
      <button
        className='rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600'
        onClick={() => setOpen(true)}
      >
        Show Success Toast
      </button>
      <Toast
        open={open}
        variant='success'
        title='Success!'
        description='Your action was completed successfully.'
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export const Success: Story = {
  render: () => <SuccessComponent />,
};

const ErrorComponent = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className='space-y-4'>
      <button
        className='rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600'
        onClick={() => setOpen(true)}
      >
        Show Error Toast
      </button>
      <Toast
        open={open}
        variant='error'
        title='Error'
        description='Something went wrong. Please try again.'
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export const Error: Story = {
  render: () => <ErrorComponent />,
};

const WarningComponent = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className='space-y-4'>
      <button
        className='rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600'
        onClick={() => setOpen(true)}
      >
        Show Warning Toast
      </button>
      <Toast
        open={open}
        variant='warning'
        title='Warning'
        description='Please review your input before proceeding.'
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export const Warning: Story = {
  render: () => <WarningComponent />,
};

const InfoComponent = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className='space-y-4'>
      <button
        className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
        onClick={() => setOpen(true)}
      >
        Show Info Toast
      </button>
      <Toast
        open={open}
        variant='info'
        title='Information'
        description="Here's some important information for you."
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export const Info: Story = {
  render: () => <InfoComponent />,
};

const VariantsComponent = () => {
  const [toasts, setToasts] = React.useState({
    success: false,
    error: false,
    warning: false,
    info: false,
  });

  const showToast = (variant: keyof typeof toasts) => {
    setToasts(prev => ({ ...prev, [variant]: true }));
  };

  const closeToast = (variant: keyof typeof toasts) => {
    setToasts(prev => ({ ...prev, [variant]: false }));
  };

  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap gap-2'>
        <button
          className='rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600'
          onClick={() => showToast("success")}
        >
          Show Success
        </button>
        <button
          className='rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600'
          onClick={() => showToast("error")}
        >
          Show Error
        </button>
        <button
          className='rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600'
          onClick={() => showToast("warning")}
        >
          Show Warning
        </button>
        <button
          className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
          onClick={() => showToast("info")}
        >
          Show Info
        </button>
      </div>
      <Toast
        open={toasts.success}
        variant='success'
        title='Success!'
        description='Your action was completed successfully.'
        position='top-right'
        onClose={() => closeToast("success")}
      />
      <Toast
        open={toasts.error}
        variant='error'
        title='Error'
        description='Something went wrong. Please try again.'
        position='top-right'
        onClose={() => closeToast("error")}
      />
      <Toast
        open={toasts.warning}
        variant='warning'
        title='Warning'
        description='Please review your input before proceeding.'
        position='top-right'
        onClose={() => closeToast("warning")}
      />
      <Toast
        open={toasts.info}
        variant='info'
        title='Information'
        description="Here's some important information for you."
        position='top-right'
        onClose={() => closeToast("info")}
      />
    </div>
  );
};

export const Variants: Story = {
  render: () => <VariantsComponent />,
};

const PositionsComponent = () => {
  const [toasts, setToasts] = React.useState({
    "top-left": false,
    "top-center": false,
    "top-right": false,
    "bottom-left": false,
    "bottom-center": false,
    "bottom-right": false,
  });

  const showToast = (position: keyof typeof toasts) => {
    setToasts(prev => ({ ...prev, [position]: true }));
  };

  const closeToast = (position: keyof typeof toasts) => {
    setToasts(prev => ({ ...prev, [position]: false }));
  };

  return (
    <div className='space-y-4'>
      <div className='grid grid-cols-2 gap-2'>
        <button
          className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
          onClick={() => showToast("top-left")}
        >
          Top Left
        </button>
        <button
          className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
          onClick={() => showToast("top-center")}
        >
          Top Center
        </button>
        <button
          className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
          onClick={() => showToast("top-right")}
        >
          Top Right
        </button>
        <button
          className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
          onClick={() => showToast("bottom-left")}
        >
          Bottom Left
        </button>
        <button
          className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
          onClick={() => showToast("bottom-center")}
        >
          Bottom Center
        </button>
        <button
          className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
          onClick={() => showToast("bottom-right")}
        >
          Bottom Right
        </button>
      </div>
      <Toast
        open={toasts["top-left"]}
        variant='success'
        title='Top Left'
        position='top-left'
        duration={0}
        onClose={() => closeToast("top-left")}
      />
      <Toast
        open={toasts["top-center"]}
        variant='info'
        title='Top Center'
        position='top-center'
        duration={0}
        onClose={() => closeToast("top-center")}
      />
      <Toast
        open={toasts["top-right"]}
        variant='warning'
        title='Top Right'
        position='top-right'
        duration={0}
        onClose={() => closeToast("top-right")}
      />
      <Toast
        open={toasts["bottom-left"]}
        variant='error'
        title='Bottom Left'
        position='bottom-left'
        duration={0}
        onClose={() => closeToast("bottom-left")}
      />
      <Toast
        open={toasts["bottom-center"]}
        variant='success'
        title='Bottom Center'
        position='bottom-center'
        duration={0}
        onClose={() => closeToast("bottom-center")}
      />
      <Toast
        open={toasts["bottom-right"]}
        variant='info'
        title='Bottom Right'
        position='bottom-right'
        duration={0}
        onClose={() => closeToast("bottom-right")}
      />
    </div>
  );
};

export const Positions: Story = {
  render: () => <PositionsComponent />,
};

const SizesComponent = () => {
  const [toasts, setToasts] = React.useState({
    sm: false,
    md: false,
    lg: false,
  });

  const showToast = (size: keyof typeof toasts) => {
    setToasts(prev => ({ ...prev, [size]: true }));
  };

  const closeToast = (size: keyof typeof toasts) => {
    setToasts(prev => ({ ...prev, [size]: false }));
  };

  return (
    <div className='space-y-4'>
      <div className='flex gap-2'>
        <button
          className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
          onClick={() => showToast("sm")}
        >
          Small
        </button>
        <button
          className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
          onClick={() => showToast("md")}
        >
          Medium
        </button>
        <button
          className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
          onClick={() => showToast("lg")}
        >
          Large
        </button>
      </div>
      <Toast
        open={toasts.sm}
        variant='info'
        title='Small Toast'
        description='This is a small toast notification.'
        size='sm'
        position='top-right'
        duration={0}
        onClose={() => closeToast("sm")}
      />
      <Toast
        open={toasts.md}
        variant='success'
        title='Medium Toast'
        description='This is a medium toast notification with more content.'
        size='md'
        position='top-right'
        duration={0}
        onClose={() => closeToast("md")}
      />
      <Toast
        open={toasts.lg}
        variant='warning'
        title='Large Toast'
        description='This is a large toast notification with even more detailed information and content.'
        size='lg'
        position='top-right'
        duration={0}
        onClose={() => closeToast("lg")}
      />
    </div>
  );
};

export const Sizes: Story = {
  render: () => <SizesComponent />,
};

const WithCustomIconComponent = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className='space-y-4'>
      <button
        className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
        onClick={() => setOpen(true)}
      >
        Show Custom Icon Toast
      </button>
      <Toast
        open={open}
        variant='info'
        title='Custom Icon'
        description='This toast has a custom icon.'
        icon={
          <svg className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M13 10V3L4 14h7v7l9-11h-7z'
            />
          </svg>
        }
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export const WithCustomIcon: Story = {
  render: () => <WithCustomIconComponent />,
};

const WithTitleOnlyComponent = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className='space-y-4'>
      <button
        className='rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600'
        onClick={() => setOpen(true)}
      >
        Show Title Only Toast
      </button>
      <Toast open={open} variant='success' title='Title Only' onClose={() => setOpen(false)} />
    </div>
  );
};

export const WithTitleOnly: Story = {
  render: () => <WithTitleOnlyComponent />,
};

const WithDescriptionOnlyComponent = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className='space-y-4'>
      <button
        className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
        onClick={() => setOpen(true)}
      >
        Show Description Only Toast
      </button>
      <Toast
        open={open}
        variant='info'
        description='This toast has only a description without a title.'
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export const WithDescriptionOnly: Story = {
  render: () => <WithDescriptionOnlyComponent />,
};

const WithChildrenComponent = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className='space-y-4'>
      <button
        className='rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600'
        onClick={() => setOpen(true)}
      >
        Show Custom Content Toast
      </button>
      <Toast open={open} variant='warning' onClose={() => setOpen(false)}>
        <div>
          <strong>Custom Content</strong>
          <p>This toast uses children prop for custom content layout.</p>
          <button className='mt-2 text-sm underline'>Action</button>
        </div>
      </Toast>
    </div>
  );
};

export const WithChildren: Story = {
  render: () => <WithChildrenComponent />,
};

const AutoDismissComponent = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className='space-y-4'>
      <button
        className='rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600'
        onClick={() => setOpen(true)}
      >
        Show Auto-dismiss Toast
      </button>
      <Toast
        open={open}
        variant='success'
        title='Auto-dismiss'
        description='This toast will auto-dismiss in 3 seconds.'
        duration={3000}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export const AutoDismiss: Story = {
  render: () => <AutoDismissComponent />,
};

const NoAutoDismissComponent = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className='space-y-4'>
      <button
        className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
        onClick={() => setOpen(true)}
      >
        Show Persistent Toast
      </button>
      <Toast
        open={open}
        variant='info'
        title='Persistent Toast'
        description="This toast won't auto-dismiss. Click the close button to dismiss it."
        duration={0}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export const NoAutoDismiss: Story = {
  render: () => <NoAutoDismissComponent />,
};

const NoCloseButtonComponent = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className='space-y-4'>
      <button
        className='rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600'
        onClick={() => setOpen(true)}
      >
        Show No Close Button Toast
      </button>
      <Toast
        open={open}
        variant='warning'
        title='No Close Button'
        description='This toast has no close button and will auto-dismiss.'
        showCloseButton={false}
        duration={4000}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export const NoCloseButton: Story = {
  render: () => <NoCloseButtonComponent />,
};

const NoAnimationComponent = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className='space-y-4'>
      <button
        className='rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600'
        onClick={() => setOpen(true)}
      >
        Show No Animation Toast
      </button>
      <Toast
        open={open}
        variant='error'
        title='No Animation'
        description='This toast appears without animation.'
        animation={false}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export const NoAnimation: Story = {
  render: () => <NoAnimationComponent />,
};

// ToastProvider stories
export const WithToastProvider: Story = {
  render: () => {
    const ToastDemo = () => {
      const { addToast, success, error, warning, info } = useToast();

      return (
        <div className='space-y-4'>
          <div className='flex flex-wrap gap-2'>
            <button
              className='rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600'
              onClick={() => success("Success!", "Operation completed successfully")}
            >
              Show Success
            </button>
            <button
              className='rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600'
              onClick={() => error("Error!", "Something went wrong")}
            >
              Show Error
            </button>
            <button
              className='rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600'
              onClick={() => warning("Warning!", "Please check your input")}
            >
              Show Warning
            </button>
            <button
              className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
              onClick={() => info("Info", "Here's some information")}
            >
              Show Info
            </button>
            <button
              className='rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600'
              onClick={() =>
                addToast({
                  variant: "info",
                  title: "Custom Toast",
                  description: "This is a custom toast with all options",
                  position: "bottom-center",
                  size: "lg",
                  duration: 0,
                })
              }
            >
              Custom Toast
            </button>
          </div>
          <p className='text-sm text-gray-600'>
            Click the buttons above to show different types of toasts using the ToastProvider.
          </p>
        </div>
      );
    };

    return (
      <ToastProvider>
        <ToastDemo />
      </ToastProvider>
    );
  },
};

export const PromiseToast: Story = {
  render: () => {
    const PromiseDemo = () => {
      const { promise } = useToast();

      const handlePromise = async () => {
        await promise(new Promise(resolve => setTimeout(resolve, 2000)), {
          loading: "Loading...",
          success: "Data loaded successfully!",
          error: "Failed to load data",
        });
      };

      const handlePromiseWithData = async () => {
        const data = await promise(
          fetch("https://jsonplaceholder.typicode.com/posts/1").then(res => res.json()),
          {
            loading: "Fetching post...",
            success: data => `Post "${data.title}" loaded!`,
            error: "Failed to fetch post",
          }
        );
        console.log(data);
      };

      return (
        <div className='space-y-4'>
          <div className='flex flex-wrap gap-2'>
            <button
              className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
              onClick={handlePromise}
            >
              Simple Promise
            </button>
            <button
              className='rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600'
              onClick={handlePromiseWithData}
            >
              Promise with Data
            </button>
          </div>
          <p className='text-sm text-gray-600'>
            Click to see promise-based toasts that show loading, success, and error states.
          </p>
        </div>
      );
    };

    return (
      <ToastProvider>
        <PromiseDemo />
      </ToastProvider>
    );
  },
};

export const ToastQueue: Story = {
  render: () => {
    const QueueDemo = () => {
      const { addToast } = useToast();

      const showMultipleToasts = () => {
        addToast({
          variant: "info",
          title: "First Toast",
          description: "This is the first toast",
          position: "top-right",
        });

        setTimeout(() => {
          addToast({
            variant: "success",
            title: "Second Toast",
            description: "This is the second toast",
            position: "top-right",
          });
        }, 500);

        setTimeout(() => {
          addToast({
            variant: "warning",
            title: "Third Toast",
            description: "This is the third toast",
            position: "top-right",
          });
        }, 1000);
      };

      return (
        <div className='space-y-4'>
          <button
            className='rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600'
            onClick={showMultipleToasts}
          >
            Show Toast Queue
          </button>
          <p className='text-sm text-gray-600'>
            Click to show multiple toasts that stack and auto-dismiss in sequence.
          </p>
        </div>
      );
    };

    return (
      <ToastProvider>
        <QueueDemo />
      </ToastProvider>
    );
  },
};
