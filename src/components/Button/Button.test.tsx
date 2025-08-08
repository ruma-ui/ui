import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "./Button";

describe("Button", () => {
    it("renders children", () => {
        render(<Button>Done</Button>);
        expect(screen.getByText("Done")).toBeInTheDocument();
    });

    it("applies primary styles by default", () => {
        render(<Button>Sign Up</Button>);
        const btn = screen.getByRole("button");
        expect(btn).toHaveClass("bg-blue-600");
    });

    it("applies secondary styles", () => {
        render(<Button variant="secondary">Cancel</Button>);
        const btn = screen.getByRole("button");
        expect(btn).toHaveClass("bg-white");
    });

    it("applies outline styles", () => {
        render(<Button variant="outline">Copy</Button>);
        const btn = screen.getByRole("button");
        expect(btn).toHaveClass("border-blue-600");
    });

    it("applies ghost styles", () => {
        render(<Button variant="ghost">Login</Button>);
        const btn = screen.getByRole("button");
        expect(btn).toHaveClass("bg-transparent");
    });

    it("applies destructive styles", () => {
        render(<Button variant="destructive">Delete</Button>);
        const btn = screen.getByRole("button");
        expect(btn).toHaveClass("bg-red-600");
    });

    it("applies different sizes", () => {
        const { rerender } = render(<Button size="xs">Extra Small</Button>);
        expect(screen.getByRole("button")).toHaveClass("text-xs");

        rerender(<Button size="xl">Extra Large</Button>);
        expect(screen.getByRole("button")).toHaveClass("text-xl");
    });

    it("applies rounded prop", () => {
        render(<Button rounded="full">Rounded</Button>);
        expect(screen.getByRole("button")).toHaveClass("rounded-full");
    });

    it("applies animation prop", () => {
        render(<Button animation="pulse">Animated</Button>);
        expect(screen.getByRole("button")).toHaveClass("hover:animate-pulse");
    });

    it("handles onClick", () => {
        const onClick = jest.fn();
        render(<Button onClick={onClick}>Click</Button>);
        fireEvent.click(screen.getByText("Click"));
        expect(onClick).toHaveBeenCalled();
    });

    it("is disabled when disabled prop is set", () => {
        render(<Button disabled>Disabled</Button>);
        expect(screen.getByRole("button")).toBeDisabled();
    });

    it("shows loading state", () => {
        render(<Button loading>Loading</Button>);
        const btn = screen.getByRole("button");
        expect(btn).toBeDisabled();
        expect(btn).toHaveAttribute("aria-busy", "true");
        expect(screen.getByRole("button")).toContainHTML("svg");
    });

    it("renders start and end icons", () => {
        render(
            <Button
                startIcon={<span data-testid="start">🔗</span>}
                endIcon={<span data-testid="end">→</span>}
            >
                With Icons
            </Button>,
        );
        expect(screen.getByTestId("start")).toBeInTheDocument();
        expect(screen.getByTestId("end")).toBeInTheDocument();
    });

    it("applies fullWidth correctly", () => {
        render(<Button fullWidth>Full Width</Button>);
        expect(screen.getByRole("button")).toHaveClass("w-full");
    });

    it("handles custom className", () => {
        render(<Button className="custom-class">Custom</Button>);
        expect(screen.getByRole("button")).toHaveClass("custom-class");
    });
});
