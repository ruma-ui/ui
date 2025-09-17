import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TopLoader } from "./TopLoader";
import { Button } from "@/components";
import { useState } from "react";

const meta: Meta<typeof TopLoader> = {
    title: "Components/TopLoader",
    component: TopLoader,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component:
                    "A top-loading progress bar component that provides visual feedback for loading states, page transitions, and async operations.",
            },
        },
    },
    argTypes: {
        progress: {
            control: { type: "range", min: 0, max: 100 },
            description: "Current progress value (0-100) or null for indeterminate",
        },
        show: {
            control: { type: "boolean" },
            description: "Whether the loader is visible",
            defaultValue: true,
        },
        size: {
            control: { type: "select" },
            options: ["xs", "sm", "md", "lg", "xl"],
            description: "Height of the loader bar",
            defaultValue: "md",
        },
        variant: {
            control: { type: "select" },
            options: ["primary", "secondary", "success", "warning", "error"],
            description: "Color variant of the loader",
            defaultValue: "primary",
        },
        color: {
            control: "color",
            description: "Custom color (overrides variant)",
        },
        speed: {
            control: { type: "select" },
            options: ["slow", "normal", "fast"],
            description: "Animation speed",
            defaultValue: "normal",
        },
        glow: {
            control: { type: "boolean" },
            description: "Whether to show glow effect",
            defaultValue: false,
        },
        zIndex: {
            control: { type: "number" },
            description: "Z-index for the loader",
            defaultValue: 50,
        },
    },
} satisfies Meta<typeof TopLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default indeterminate loader
export const Default: Story = {
    args: {
        progress: null,
        show: true,
        size: "md",
        variant: "primary",
        speed: "normal",
        glow: false,
    },
    render: (args) => (
        <div className="relative min-h-screen bg-gray-50 p-8">
            <TopLoader {...args} />
            <div className="space-y-4">
                <h1 className="text-2xl font-bold text-gray-900">Page Content</h1>
                <p className="text-gray-600">
                    This is an example of a top loader in indeterminate mode. The loader appears at
                    the top of the page and shows continuous animation to indicate loading activity.
                </p>
                <div className="flex h-64 items-center justify-center rounded-lg border border-gray-200 bg-white">
                    <p className="text-gray-500">Content Area</p>
                </div>
            </div>
        </div>
    ),
};

// Determinate progress loader
export const Determinate: Story = {
    args: {
        progress: 65,
        show: true,
        size: "md",
        variant: "primary",
        speed: "normal",
    },
    render: (args) => (
        <div className="relative min-h-screen bg-gray-50 p-8">
            <TopLoader {...args} />
            <div className="space-y-4">
                <h1 className="text-2xl font-bold text-gray-900">File Upload Progress</h1>
                <p className="text-gray-600">Upload progress: {args.progress}%</p>
                <div className="flex h-32 items-center justify-center rounded-lg border border-gray-200 bg-white">
                    <p className="text-gray-500">Upload Area</p>
                </div>
            </div>
        </div>
    ),
};

// Interactive progress example
export const Interactive: Story = {
    render: () => {
        const [loadingState, setLoadingState] = useState<{
            isLoading: boolean;
            progress: number;
        }>({ isLoading: false, progress: 0 });

        const startLoading = () => {
            // Reset state first
            setLoadingState({ isLoading: true, progress: 0 });

            const interval = setInterval(() => {
                setLoadingState((prev) => {
                    const newProgress = prev.progress + Math.random() * 15;
                    if (newProgress >= 100) {
                        clearInterval(interval);
                        // Complete the progress
                        setLoadingState({ isLoading: true, progress: 100 });
                        // Hide loader after a delay
                        setTimeout(() => {
                            setLoadingState({ isLoading: false, progress: 0 });
                        }, 500);
                        return { isLoading: true, progress: 100 };
                    }
                    return { isLoading: true, progress: newProgress };
                });
            }, 200);
        };

        return (
            <div className="relative min-h-screen bg-gray-50 p-8">
                <TopLoader
                    progress={loadingState.isLoading ? loadingState.progress : null}
                    show={loadingState.isLoading}
                    variant="primary"
                    size="md"
                />
                <div className="space-y-6">
                    <div>
                        <h1 className="mb-2 text-2xl font-bold text-gray-900">
                            Interactive TopLoader
                        </h1>
                        <p className="text-gray-600">
                            Click the button below to simulate a loading process with progress
                            indication.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button
                            onClick={startLoading}
                            disabled={loadingState.isLoading}
                            variant={loadingState.isLoading ? "secondary" : "primary"}
                        >
                            {loadingState.isLoading ? "Loading..." : "Start Loading"}
                        </Button>
                        {loadingState.isLoading && (
                            <span className="text-sm text-gray-600">
                                Progress: {Math.round(loadingState.progress)}%
                            </span>
                        )}
                    </div>

                    <div className="flex h-64 items-center justify-center rounded-lg border border-gray-200 bg-white">
                        <p className="text-gray-500">
                            {loadingState.isLoading ? "Processing..." : "Ready to load"}
                        </p>
                    </div>
                </div>
            </div>
        );
    },
};

// Different sizes
export const Sizes: Story = {
    render: () => {
        const [currentSize, setCurrentSize] = useState<"xs" | "sm" | "md" | "lg" | "xl">("md");

        const sizes = [
            { key: "xs" as const, label: "Extra Small", description: "Height: 2px (0.125rem)" },
            { key: "sm" as const, label: "Small", description: "Height: 4px (0.25rem)" },
            { key: "md" as const, label: "Medium", description: "Height: 6px (0.375rem)" },
            { key: "lg" as const, label: "Large", description: "Height: 8px (0.5rem)" },
            { key: "xl" as const, label: "Extra Large", description: "Height: 12px (0.75rem)" },
        ];

        return (
            <div className="relative min-h-screen space-y-8 bg-gray-50 p-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">TopLoader Sizes</h1>
                    <p className="mt-2 text-gray-600">
                        Click the buttons below to see different size variants. Each size shows a
                        75% progress bar.
                    </p>
                </div>

                {/* Size Selection Buttons */}
                <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                        <Button
                            key={size.key}
                            variant={currentSize === size.key ? "primary" : "outline"}
                            size="sm"
                            onClick={() => setCurrentSize(size.key)}
                        >
                            {size.label}
                        </Button>
                    ))}
                </div>

                {/* Current Size Display */}
                <div className="space-y-4">
                    <div className="rounded-lg border border-gray-200 bg-white p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium text-gray-900">
                                    {sizes.find((s) => s.key === currentSize)?.label} ({currentSize}
                                    )
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {sizes.find((s) => s.key === currentSize)?.description}
                                </p>
                            </div>
                            <div className="text-sm text-gray-500">Progress: 75%</div>
                        </div>
                    </div>

                    {/* TopLoader with current size */}
                    <TopLoader progress={75} show size={currentSize} variant="primary" />
                </div>

                <div className="flex h-32 items-center justify-center rounded-lg border border-gray-200 bg-white">
                    <p className="text-gray-500">
                        Content Area - Resize the loader above using the buttons
                    </p>
                </div>
            </div>
        );
    },
};

// Different variants
export const Variants: Story = {
    render: () => {
        const [currentVariant, setCurrentVariant] = useState<
            "primary" | "secondary" | "success" | "warning" | "error"
        >("primary");

        const variants = [
            {
                key: "primary" as const,
                label: "Primary",
                color: "Blue",
                description: "Default primary color",
            },
            {
                key: "secondary" as const,
                label: "Secondary",
                color: "Gray",
                description: "Muted secondary color",
            },
            {
                key: "success" as const,
                label: "Success",
                color: "Green",
                description: "Indicates success/completion",
            },
            {
                key: "warning" as const,
                label: "Warning",
                color: "Yellow",
                description: "Indicates warning/caution",
            },
            {
                key: "error" as const,
                label: "Error",
                color: "Red",
                description: "Indicates error/danger",
            },
        ];

        return (
            <div className="relative min-h-screen space-y-8 bg-gray-50 p-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">TopLoader Variants</h1>
                    <p className="mt-2 text-gray-600">
                        Click the buttons below to see different color variants. Each variant shows
                        an 80% progress bar.
                    </p>
                </div>

                {/* Variant Selection Buttons */}
                <div className="flex flex-wrap gap-2">
                    {variants.map((variant) => (
                        <Button
                            key={variant.key}
                            variant={currentVariant === variant.key ? "primary" : "outline"}
                            size="sm"
                            onClick={() => setCurrentVariant(variant.key)}
                        >
                            {variant.label}
                        </Button>
                    ))}
                </div>

                {/* Current Variant Display */}
                <div className="space-y-4">
                    <div className="rounded-lg border border-gray-200 bg-white p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium text-gray-900">
                                    {variants.find((v) => v.key === currentVariant)?.label} (
                                    {currentVariant})
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {variants.find((v) => v.key === currentVariant)?.description}
                                </p>
                            </div>
                            <div className="text-sm text-gray-500">Progress: 80%</div>
                        </div>
                    </div>

                    {/* TopLoader with current variant */}
                    <TopLoader progress={80} show variant={currentVariant} />
                </div>

                <div className="flex h-32 items-center justify-center rounded-lg border border-gray-200 bg-white">
                    <p className="text-gray-500">
                        Content Area - Change the variant above using the buttons
                    </p>
                </div>
            </div>
        );
    },
};

// With glow effect
export const WithGlow: Story = {
    render: () => (
        <div className="relative min-h-screen bg-gray-50 p-8">
            <TopLoader progress={null} show variant="primary" glow size="lg" />
            <div className="space-y-4">
                <h1 className="text-2xl font-bold text-gray-900">TopLoader with Glow Effect</h1>
                <p className="text-gray-600">
                    The glow effect adds a subtle shadow that enhances the visual prominence of the
                    loader.
                </p>
                <div className="flex h-64 items-center justify-center rounded-lg border border-gray-200 bg-white">
                    <p className="text-gray-500">Content Area</p>
                </div>
            </div>
        </div>
    ),
};

// Custom color
export const CustomColor: Story = {
    args: {
        progress: 60,
        show: true,
        color: "#8b5cf6",
        size: "md",
        glow: true,
    },
    render: (args) => (
        <div className="relative min-h-screen bg-gray-50 p-8">
            <TopLoader {...args} />
            <div className="space-y-4">
                <h1 className="text-2xl font-bold text-gray-900">Custom Color TopLoader</h1>
                <p className="text-gray-600">
                    Use the color prop to apply custom colors that override the variant colors.
                </p>
                <div className="flex h-64 items-center justify-center rounded-lg border border-gray-200 bg-white">
                    <p className="text-gray-500">Content Area</p>
                </div>
            </div>
        </div>
    ),
};

// Different speeds
export const Speeds: Story = {
    render: () => {
        const [currentSpeed, setCurrentSpeed] = useState<"slow" | "normal" | "fast">("normal");

        const speeds = [
            {
                key: "slow" as const,
                label: "Slow",
                duration: "500ms",
                description: "Relaxed, deliberate animation",
            },
            {
                key: "normal" as const,
                label: "Normal",
                duration: "300ms",
                description: "Balanced user experience",
            },
            {
                key: "fast" as const,
                label: "Fast",
                duration: "200ms",
                description: "Quick, responsive feel",
            },
        ];

        return (
            <div className="relative min-h-screen space-y-8 bg-gray-50 p-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">TopLoader Animation Speeds</h1>
                    <p className="mt-2 text-gray-600">
                        Click the buttons below to see different animation speeds. Each shows
                        indeterminate loading.
                    </p>
                </div>

                {/* Speed Selection Buttons */}
                <div className="flex flex-wrap gap-2">
                    {speeds.map((speed) => (
                        <Button
                            key={speed.key}
                            variant={currentSpeed === speed.key ? "primary" : "outline"}
                            size="sm"
                            onClick={() => setCurrentSpeed(speed.key)}
                        >
                            {speed.label}
                        </Button>
                    ))}
                </div>

                {/* Current Speed Display */}
                <div className="space-y-4">
                    <div className="rounded-lg border border-gray-200 bg-white p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium text-gray-900">
                                    {speeds.find((s) => s.key === currentSpeed)?.label} (
                                    {currentSpeed})
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {speeds.find((s) => s.key === currentSpeed)?.description}
                                </p>
                            </div>
                            <div className="text-sm text-gray-500">
                                Duration: {speeds.find((s) => s.key === currentSpeed)?.duration}
                            </div>
                        </div>
                    </div>

                    {/* TopLoader with current speed */}
                    <TopLoader progress={null} show speed={currentSpeed} variant="primary" />
                </div>

                <div className="flex h-32 items-center justify-center rounded-lg border border-gray-200 bg-white">
                    <p className="text-gray-500">
                        Content Area - Change the animation speed above using the buttons
                    </p>
                </div>
            </div>
        );
    },
};

// Page transition example
export const PageTransition: Story = {
    render: () => {
        const [currentPage, setCurrentPage] = useState(1);
        const [isTransitioning, setIsTransitioning] = useState(false);

        const pages = [
            { id: 1, title: "Dashboard", content: "Welcome to your dashboard" },
            { id: 2, title: "Settings", content: "Configure your preferences" },
            { id: 3, title: "Profile", content: "Manage your profile information" },
        ];

        const navigateToPage = (pageId: number) => {
            if (pageId === currentPage) return;

            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentPage(pageId);
                setIsTransitioning(false);
            }, 1500);
        };

        const currentPageData = pages.find((p) => p.id === currentPage);

        return (
            <div className="relative min-h-screen bg-gray-50">
                <TopLoader
                    progress={isTransitioning ? null : 100}
                    show={isTransitioning}
                    variant="primary"
                />

                <div className="p-8">
                    <div className="mx-auto max-w-4xl">
                        <nav className="mb-8">
                            <div className="flex space-x-4">
                                {pages.map((page) => (
                                    <Button
                                        key={page.id}
                                        variant={currentPage === page.id ? "primary" : "outline"}
                                        onClick={() => navigateToPage(page.id)}
                                        disabled={isTransitioning}
                                    >
                                        {page.title}
                                    </Button>
                                ))}
                            </div>
                        </nav>

                        <div className="min-h-64 rounded-lg border border-gray-200 bg-white p-8">
                            <h1 className="mb-4 text-3xl font-bold text-gray-900">
                                {currentPageData?.title}
                            </h1>
                            <p className="text-lg text-gray-600">
                                {isTransitioning ? "Loading..." : currentPageData?.content}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
};
