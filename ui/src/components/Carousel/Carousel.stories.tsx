import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { tw } from "../../lib/utils";
import { Carousel } from "./Carousel";

const meta: Meta<typeof Carousel> = {
  title: "Components/Carousel",
  component: Carousel,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A modern, accessible carousel component with drag/swipe support, autoplay, and customizable navigation.",
      },
    },
  },
  argTypes: {
    items: {
      control: false,
      description: "Array of carousel items to display",
    },
    activeIndex: {
      control: { type: "number", min: 0 },
      description: "Currently active slide index (controlled)",
    },
    defaultActiveIndex: {
      control: { type: "number", min: 0 },
      description: "Default active slide index (uncontrolled)",
      defaultValue: 0,
    },
    draggable: {
      control: "boolean",
      description: "Whether the carousel is draggable/swipeable",
      defaultValue: true,
    },
    autoplay: {
      control: "boolean",
      description: "Enable autoplay functionality",
      defaultValue: false,
    },
    autoplayInterval: {
      control: { type: "number", min: 500 },
      description: "Autoplay interval in milliseconds",
      defaultValue: 3000,
    },
    pauseOnHover: {
      control: "boolean",
      description: "Pause autoplay on hover",
      defaultValue: true,
    },
    showArrows: {
      control: "boolean",
      description: "Show navigation arrows",
      defaultValue: true,
    },
    showDots: {
      control: "boolean",
      description: "Show dot indicators",
      defaultValue: true,
    },
    showCounter: {
      control: "boolean",
      description: "Show slide counter",
      defaultValue: false,
    },
    infinite: {
      control: "boolean",
      description: "Infinite loop navigation",
      defaultValue: true,
    },
    animationDuration: {
      control: { type: "number", min: 0 },
      description: "Animation duration in milliseconds",
      defaultValue: 300,
    },
    onChange: { action: "slideChanged" },
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

// Sample carousel items
const sampleItems = [
  <div
    key="1"
    className="flex h-full items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 text-white"
  >
    <div className="text-center">
      <h3 className="mb-2 text-2xl font-bold">Slide 1</h3>
      <p className="text-blue-100">Beautiful carousel component</p>
    </div>
  </div>,
  <div
    key="2"
    className="flex h-full items-center justify-center bg-gradient-to-br from-green-500 to-green-600 text-white"
  >
    <div className="text-center">
      <h3 className="mb-2 text-2xl font-bold">Slide 2</h3>
      <p className="text-green-100">With drag and swipe support</p>
    </div>
  </div>,
  <div
    key="3"
    className="flex h-full items-center justify-center bg-gradient-to-br from-purple-500 to-purple-600 text-white"
  >
    <div className="text-center">
      <h3 className="mb-2 text-2xl font-bold">Slide 3</h3>
      <p className="text-purple-100">Fully accessible and customizable</p>
    </div>
  </div>,
  <div
    key="4"
    className="flex h-full items-center justify-center bg-gradient-to-br from-red-500 to-red-600 text-white"
  >
    <div className="text-center">
      <h3 className="mb-2 text-2xl font-bold">Slide 4</h3>
      <p className="text-red-100">Modern design system integration</p>
    </div>
  </div>,
];

export const Default: Story = {
  args: {
    items: sampleItems,
  },
  parameters: {
    layout: "padded",
  },
};

export const WithAutoplay: Story = {
  args: {
    items: sampleItems,
    autoplay: true,
    autoplayInterval: 2000,
  },
  parameters: {
    layout: "padded",
  },
};

export const WithoutControls: Story = {
  args: {
    items: sampleItems,
    showArrows: false,
    showDots: false,
  },
  parameters: {
    layout: "padded",
  },
};

export const WithCounter: Story = {
  args: {
    items: sampleItems,
    showCounter: true,
  },
  parameters: {
    layout: "padded",
  },
};

export const NonInfinite: Story = {
  args: {
    items: sampleItems,
    infinite: false,
  },
  parameters: {
    layout: "padded",
  },
};

export const NonDraggable: Story = {
  args: {
    items: sampleItems,
    draggable: false,
  },
  parameters: {
    layout: "padded",
  },
};

export const CustomStyling: Story = {
  args: {
    items: sampleItems.map(item =>
      React.cloneElement(item, {
        className: tw`${item.props.className} rounded-xl shadow-2xl`,
      })
    ),
    className: tw`rounded-xl border-4 border-white shadow-2xl`,
    arrowClassName: tw`border-black bg-black/80 text-white hover:bg-black`,
    dotClassName: tw`bg-black/60 hover:bg-black`,
  },
  parameters: {
    layout: "padded",
  },
};

export const SingleItem: Story = {
  args: {
    items: [sampleItems[0]],
  },
  parameters: {
    layout: "padded",
  },
};

export const Controlled: Story = {
  args: {
    items: sampleItems,
    activeIndex: 0,
  },
  parameters: {
    layout: "padded",
  },
};

export const FastAnimation: Story = {
  args: {
    items: sampleItems,
    animationDuration: 150,
  },
  parameters: {
    layout: "padded",
  },
};

export const SlowAnimation: Story = {
  args: {
    items: sampleItems,
    animationDuration: 1000,
  },
  parameters: {
    layout: "padded",
  },
};
