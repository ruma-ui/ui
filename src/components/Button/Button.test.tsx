import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "./Button";

describe("Button", () => {
    describe("Basic Rendering", () => {
        it("renders children", () => {
            render(<Button>Done</Button>);
            expect(screen.getByText("Done")).toBeInTheDocument();
        });

        it("renders as a button element", () => {
            render(<Button>Test</Button>);
            expect(screen.getByRole("button")).toBeInTheDocument();
        });

        it("applies base classes by default", () => {
            render(<Button>Test</Button>);
            const btn = screen.getByRole("button");
            expect(btn).toHaveClass(
                "inline-flex",
                "cursor-pointer",
                "items-center",
                "justify-center",
            );
        });
    });

    describe("Variants", () => {
        it("applies primary styles by default", () => {
            render(<Button>Sign Up</Button>);
            const btn = screen.getByRole("button");
            expect(btn).toHaveClass("bg-blue-600", "text-white");
        });

        it("applies secondary styles", () => {
            render(<Button variant="secondary">Cancel</Button>);
            const btn = screen.getByRole("button");
            expect(btn).toHaveClass("bg-gray-100", "text-black");
        });

        it("applies outline styles", () => {
            render(<Button variant="outline">Copy</Button>);
            const btn = screen.getByRole("button");
            expect(btn).toHaveClass("border", "border-blue-600", "bg-transparent", "text-blue-600");
        });

        it("applies ghost styles", () => {
            render(<Button variant="ghost">Login</Button>);
            const btn = screen.getByRole("button");
            expect(btn).toHaveClass("border", "border-gray-300", "bg-transparent", "text-gray-900");
        });

        it("applies destructive styles", () => {
            render(<Button variant="destructive">Delete</Button>);
            const btn = screen.getByRole("button");
            expect(btn).toHaveClass("bg-red-600", "text-white");
        });

        it("applies none variant with no additional styles", () => {
            render(<Button variant="none">None</Button>);
            const btn = screen.getByRole("button");
            expect(btn).not.toHaveClass("bg-blue-600", "bg-gray-100", "bg-red-600");
        });
    });

    describe("Sizes", () => {
        it("applies xs size styles", () => {
            render(<Button size="xs">Extra Small</Button>);
            const btn = screen.getByRole("button");
            expect(btn).toHaveClass("h-6", "text-xs", "px-2", "py-1");
        });

        it("applies sm size styles", () => {
            render(<Button size="sm">Small</Button>);
            const btn = screen.getByRole("button");
            expect(btn).toHaveClass("h-8", "text-sm", "px-3");
        });

        it("applies md size styles by default", () => {
            render(<Button>Medium</Button>);
            const btn = screen.getByRole("button");
            expect(btn).toHaveClass("h-10", "text-base", "px-4", "py-2");
        });

        it("applies lg size styles", () => {
            render(<Button size="lg">Large</Button>);
            const btn = screen.getByRole("button");
            expect(btn).toHaveClass("h-12", "text-lg", "px-6", "py-3");
        });

        it("applies xl size styles", () => {
            render(<Button size="xl">Extra Large</Button>);
            const btn = screen.getByRole("button");
            expect(btn).toHaveClass("h-14", "text-xl", "px-8", "py-4");
        });
    });

    describe("Rounded", () => {
        it("applies xl rounded by default", () => {
            render(<Button>Default</Button>);
            expect(screen.getByRole("button")).toHaveClass("rounded-xl");
        });

        it("applies none rounded", () => {
            render(<Button rounded="none">None</Button>);
            expect(screen.getByRole("button")).toHaveClass("rounded-none");
        });

        it("applies sm rounded", () => {
            render(<Button rounded="sm">Small</Button>);
            expect(screen.getByRole("button")).toHaveClass("rounded-sm");
        });

        it("applies md rounded", () => {
            render(<Button rounded="md">Medium</Button>);
            expect(screen.getByRole("button")).toHaveClass("rounded-md");
        });

        it("applies lg rounded", () => {
            render(<Button rounded="lg">Large</Button>);
            expect(screen.getByRole("button")).toHaveClass("rounded-lg");
        });

        it("applies full rounded", () => {
            render(<Button rounded="full">Full</Button>);
            expect(screen.getByRole("button")).toHaveClass("rounded-full");
        });
    });

    describe("Animations", () => {
        it("applies no animation by default", () => {
            render(<Button>Default</Button>);
            const btn = screen.getByRole("button");
            expect(btn).not.toHaveClass("hover:scale-105", "hover:opacity-90");
        });

        it("applies scale animation", () => {
            render(<Button animation="scale">Scale</Button>);
            const btn = screen.getByRole("button");
            expect(btn).toHaveClass("hover:scale-105", "active:scale-95");
        });

        it("applies fade animation", () => {
            render(<Button animation="fade">Fade</Button>);
            const btn = screen.getByRole("button");
            expect(btn).toHaveClass("hover:opacity-90");
        });

        it("applies slide animation", () => {
            render(<Button animation="slide">Slide</Button>);
            const btn = screen.getByRole("button");
            expect(btn).toHaveClass("hover:translate-y-[-2px]");
        });

        it("applies glow animation", () => {
            render(<Button animation="glow">Glow</Button>);
            const btn = screen.getByRole("button");
            expect(btn).toHaveClass("hover:shadow-lg");
        });

        it("applies lift animation", () => {
            render(<Button animation="lift">Lift</Button>);
            const btn = screen.getByRole("button");
            expect(btn).toHaveClass("hover:translate-y-[-2px]", "hover:shadow-lg");
        });

        it("applies ripple animation", () => {
            render(<Button animation="ripple">Ripple</Button>);
            const btn = screen.getByRole("button");
            expect(btn).toHaveClass("relative", "overflow-hidden");
        });

        it("applies press animation", () => {
            render(<Button animation="press">Press</Button>);
            const btn = screen.getByRole("button");
            expect(btn).toHaveClass("active:scale-95");
        });
    });

    describe("Icons", () => {
        it("renders start icon when provided", () => {
            render(
                <Button startIcon={<span data-testid="start-icon">📎</span>}>
                    With Start Icon
                </Button>,
            );
            expect(screen.getByTestId("start-icon")).toBeInTheDocument();
        });

        it("renders end icon when provided", () => {
            render(<Button endIcon={<span data-testid="end-icon">→</span>}>With End Icon</Button>);
            expect(screen.getByTestId("end-icon")).toBeInTheDocument();
        });

        it("renders both start and end icons", () => {
            render(
                <Button
                    startIcon={<span data-testid="start">🔗</span>}
                    endIcon={<span data-testid="end">→</span>}
                >
                    With Both Icons
                </Button>,
            );
            expect(screen.getByTestId("start")).toBeInTheDocument();
            expect(screen.getByTestId("end")).toBeInTheDocument();
        });

        it("hides icons when loading", () => {
            render(
                <Button
                    loading
                    startIcon={<span data-testid="start">🔗</span>}
                    endIcon={<span data-testid="end">→</span>}
                >
                    Loading
                </Button>,
            );
            expect(screen.queryByTestId("start")).not.toBeInTheDocument();
            expect(screen.queryByTestId("end")).not.toBeInTheDocument();
        });
    });

    describe("Loading State", () => {
        it("shows loading spinner when loading", () => {
            render(<Button loading>Loading</Button>);
            const btn = screen.getByRole("button");
            expect(btn.querySelector("svg")).toBeInTheDocument();
            expect(btn.querySelector("svg")).toHaveClass("animate-spin");
        });

        it("disables button when loading", () => {
            render(<Button loading>Loading</Button>);
            const btn = screen.getByRole("button");
            expect(btn).toBeDisabled();
            expect(btn).toHaveAttribute("aria-disabled", "true");
        });

        it("sets aria-busy when loading", () => {
            render(<Button loading>Loading</Button>);
            const btn = screen.getByRole("button");
            expect(btn).toHaveAttribute("aria-busy", "true");
        });

        it("adjusts spinner size based on button size", () => {
            const { rerender } = render(
                <Button loading size="xs">
                    Loading
                </Button>,
            );
            let btn = screen.getByRole("button");
            expect(btn.querySelector("svg")).toHaveClass("h-3", "w-3");

            rerender(
                <Button loading size="sm">
                    Loading
                </Button>,
            );
            btn = screen.getByRole("button");
            expect(btn.querySelector("svg")).toHaveClass("h-3.5", "w-3.5");

            rerender(
                <Button loading size="md">
                    Loading
                </Button>,
            );
            btn = screen.getByRole("button");
            expect(btn.querySelector("svg")).toHaveClass("h-4", "w-4");

            rerender(
                <Button loading size="lg">
                    Loading
                </Button>,
            );
            btn = screen.getByRole("button");
            expect(btn.querySelector("svg")).toHaveClass("h-5", "w-5");

            rerender(
                <Button loading size="xl">
                    Loading
                </Button>,
            );
            btn = screen.getByRole("button");
            expect(btn.querySelector("svg")).toHaveClass("h-6", "w-6");
        });
    });

    describe("Disabled State", () => {
        it("is disabled when disabled prop is set", () => {
            render(<Button disabled>Disabled</Button>);
            const btn = screen.getByRole("button");
            expect(btn).toBeDisabled();
            expect(btn).toHaveAttribute("aria-disabled", "true");
        });

        it("applies disabled styles", () => {
            render(<Button disabled>Disabled</Button>);
            const btn = screen.getByRole("button");
            expect(btn).toHaveClass("disabled:pointer-events-none", "disabled:opacity-50");
        });

        it("is disabled when loading", () => {
            render(<Button loading>Loading</Button>);
            const btn = screen.getByRole("button");
            expect(btn).toBeDisabled();
        });
    });

    describe("Full Width", () => {
        it("applies fullWidth correctly", () => {
            render(<Button fullWidth>Full Width</Button>);
            expect(screen.getByRole("button")).toHaveClass("w-full");
        });

        it("does not apply full width by default", () => {
            render(<Button>Normal Width</Button>);
            expect(screen.getByRole("button")).not.toHaveClass("w-full");
        });
    });

    describe("Custom Styling", () => {
        it("handles custom className", () => {
            render(<Button className="custom-class">Custom</Button>);
            expect(screen.getByRole("button")).toHaveClass("custom-class");
        });

        it("merges custom className with default classes", () => {
            render(<Button className="custom-class">Custom</Button>);
            const btn = screen.getByRole("button");
            expect(btn).toHaveClass("custom-class", "inline-flex", "bg-blue-600");
        });
    });

    describe("Event Handling", () => {
        it("handles onClick", () => {
            const onClick = jest.fn();
            render(<Button onClick={onClick}>Click</Button>);
            fireEvent.click(screen.getByText("Click"));
            expect(onClick).toHaveBeenCalledTimes(1);
        });

        it("does not call onClick when disabled", () => {
            const onClick = jest.fn();
            render(
                <Button onClick={onClick} disabled>
                    Disabled
                </Button>,
            );
            fireEvent.click(screen.getByText("Disabled"));
            expect(onClick).not.toHaveBeenCalled();
        });

        it("does not call onClick when loading", () => {
            const onClick = jest.fn();
            render(
                <Button onClick={onClick} loading>
                    Loading
                </Button>,
            );
            fireEvent.click(screen.getByText("Loading"));
            expect(onClick).not.toHaveBeenCalled();
        });
    });

    describe("Ref Forwarding", () => {
        it("forwards ref correctly", () => {
            const ref = React.createRef<HTMLButtonElement>();
            render(<Button ref={ref}>Test</Button>);
            expect(ref.current).toBeInstanceOf(HTMLButtonElement);
        });
    });

    describe("Additional Props", () => {
        it("passes through additional HTML button props", () => {
            render(
                <Button data-testid="custom-button" title="Custom Title">
                    Test
                </Button>,
            );
            const btn = screen.getByTestId("custom-button");
            expect(btn).toHaveAttribute("title", "Custom Title");
        });

        it("supports form attributes", () => {
            render(
                <Button type="submit" form="test-form">
                    Submit
                </Button>,
            );
            const btn = screen.getByRole("button");
            expect(btn).toHaveAttribute("type", "submit");
            expect(btn).toHaveAttribute("form", "test-form");
        });
    });

    describe("Display Name", () => {
        it("has correct display name", () => {
            expect(Button.displayName).toBe("Button");
        });
    });
});
