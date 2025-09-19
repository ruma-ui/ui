import type { Meta, StoryObj } from "@storybook/react-vite";
import { Image } from "./Image";
import mdx from "./Image.mdx";

const meta: Meta<typeof Image> = {
  title: "Components/Image",
  component: Image,
  parameters: {
    layout: "centered",
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    src: {
      control: "text",
      description: "The source URL of the image",
      defaultValue: "https://picsum.photos/400/300",
    },
    alt: {
      control: "text",
      description: "Alternative text for the image",
      defaultValue: "Sample image",
    },
    width: {
      control: "number",
      description: "The width of the image",
    },
    height: {
      control: "number",
      description: "The height of the image",
    },
    fit: {
      control: { type: "radio" },
      options: ["contain", "cover", "fill", "none", "scale-down"],
      description: "How the image should be resized to fit its container",
      defaultValue: "cover",
      type: {
        name: "enum",
        value: ["contain", "cover", "fill", "none", "scale-down"],
      },
    },
    aspectRatio: {
      control: { type: "radio" },
      options: ["auto", "square", "video", "wide", "portrait"],
      description: "Aspect ratio preset",
      defaultValue: "auto",
      type: {
        name: "enum",
        value: ["auto", "square", "video", "wide", "portrait"],
      },
    },
    rounded: {
      control: { type: "radio" },
      options: ["none", "sm", "md", "lg", "xl", "full"],
      description: "Control the border radius of the image",
      defaultValue: "none",
      type: {
        name: "enum",
        value: ["none", "sm", "md", "lg", "xl", "full"],
      },
    },
    fill: {
      control: "boolean",
      description: "Whether the image should fill its parent container",
      defaultValue: false,
      type: { name: "boolean" },
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
    showSkeleton: {
      control: "boolean",
      description: "Show skeleton loader while image is loading",
      defaultValue: false,
      type: { name: "boolean" },
    },
    skeletonAnimation: {
      control: { type: "radio" },
      options: ["shimmer", "wave", "fade", "pulse", "none"],
      description: "Skeleton animation type",
      defaultValue: "shimmer",
      type: {
        name: "enum",
        value: ["shimmer", "wave", "fade", "pulse", "none"],
      },
    },
    skeletonVariant: {
      control: { type: "radio" },
      options: ["rectangle", "circle"],
      description: "Skeleton variant",
      defaultValue: "rectangle",
      type: {
        name: "enum",
        value: ["rectangle", "circle"],
      },
    },
    fallback: {
      control: false,
      description: "Fallback content to show when image fails to load",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Image>;

export const Default: Story = {
  args: {
    src: "https://picsum.photos/400/300",
    alt: "Sample landscape image",
    width: 400,
    height: 300,
  },
};

export const Square: Story = {
  args: {
    src: "https://picsum.photos/300/300",
    alt: "Square image",
    width: 300,
    height: 300,
    aspectRatio: "square",
  },
};

export const Portrait: Story = {
  args: {
    src: "https://picsum.photos/300/400",
    alt: "Portrait image",
    width: 300,
    height: 400,
    aspectRatio: "portrait",
  },
};

export const WideAspect: Story = {
  args: {
    src: "https://picsum.photos/800/300",
    alt: "Wide aspect ratio image",
    width: 800,
    height: 300,
    aspectRatio: "wide",
  },
};

export const FitContain: Story = {
  args: {
    src: "https://picsum.photos/400/300",
    alt: "Image with contain fit",
    width: 300,
    height: 300,
    fit: "contain",
    aspectRatio: "square",
  },
};

export const FitCover: Story = {
  args: {
    src: "https://picsum.photos/400/300",
    alt: "Image with cover fit",
    width: 300,
    height: 300,
    fit: "cover",
    aspectRatio: "square",
  },
};

export const FillFit: Story = {
  args: {
    src: "https://picsum.photos/400/300",
    alt: "Image with fill fit",
    width: 300,
    height: 300,
    fit: "fill",
    aspectRatio: "square",
  },
};

export const Rounded: Story = {
  args: {
    src: "https://picsum.photos/300/300",
    alt: "Rounded image",
    width: 300,
    height: 300,
    rounded: "full",
  },
};

export const FillContainer: Story = {
  args: {
    src: "https://picsum.photos/500/400",
    alt: "Image filling container",
    fill: true,
  },
  parameters: {
    layout: "centered",
  },
  render: args => (
    <div
      style={{
        width: "400px",
        height: "300px",
        borderRadius: "20px",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(200,200,255,0.10) 100%)",
        boxShadow:
          "0 8px 32px 0 rgba(31, 38, 135, 0.18), 0 0 0 4px rgba(255,255,255,0.25), 0 16px 48px 0 rgba(31, 38, 135, 0.25)",
        border: "1.5px solid rgba(255,255,255,0.25)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image {...args} alt={args.alt || "Image filling container"} />
    </div>
  ),
};

export const CustomAspectRatio: Story = {
  args: {
    src: "https://picsum.photos/400/300",
    alt: "Image with custom aspect ratio",
    width: 400,
    height: 300,
    aspectRatio: 16 / 9,
  },
};

export const WithSkeleton: Story = {
  args: {
    src: "https://picsum.photos/3000/3000",
    alt: "Image with skeleton loading",
    width: 300,
    height: 300,
    showSkeleton: true,
    skeletonAnimation: "shimmer",
  },
};

export const WithSkeletonCircle: Story = {
  args: {
    src: "https://picsum.photos/3000/3000",
    alt: "Image with circular skeleton",
    width: 300,
    height: 300,
    showSkeleton: true,
    skeletonVariant: "circle",
    rounded: "full",
  },
};

export const WithFallback: Story = {
  args: {
    src: "https://invalid-image-url.com/image.jpg", // This will fail to load
    alt: "Image with fallback",
    width: 300,
    height: 300,
    fallback: (
      <div className='flex h-full w-full items-center justify-center bg-gray-100 text-sm text-gray-500'>
        Image not available
      </div>
    ),
  },
};

export const WithSkeletonAndFallback: Story = {
  args: {
    src: "https://invalid-image-url.com/image.jpg", // This will fail to load
    alt: "Image with skeleton and fallback",
    width: 300,
    height: 300,
    showSkeleton: true,
    skeletonAnimation: "wave",
    fallback: (
      <div className='flex h-full w-full flex-col items-center justify-center bg-red-50 p-4 text-center text-red-500'>
        <div className='mb-2 text-2xl'>
          <span role='img' aria-label='Warning'>
            ⚠️
          </span>
        </div>
        <div className='text-sm font-medium'>Failed to load image</div>
        <div className='mt-1 text-xs'>Please try again later</div>
      </div>
    ),
  },
};
