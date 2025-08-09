import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Loader } from "./Loader";

describe("Loader", () => {
    it("renders with default props", () => {
        render(<Loader />);
        const loader = screen.getByRole("status");
        expect(loader).toBeInTheDocument();
        expect(loader).toHaveAttribute("aria-label", "Loading");
    });

    it("applies primary styles by default", () => {
        render(<Loader />);
        const loader = screen.getByRole("status");
        expect(loader).toHaveClass("text-blue-600");
    });

    it("applies secondary styles", () => {
        render(<Loader variant="secondary" />);
        const loader = screen.getByRole("status");
        expect(loader).toHaveClass("text-gray-600");
    });

    it("applies custom color when provided", () => {
        render(<Loader color="#ff0000" />);
        const loader = screen.getByRole("status");
        expect(loader).toHaveStyle({ color: "#ff0000" });
        expect(loader).not.toHaveClass("text-blue-600");
    });

    it("custom color overrides variant", () => {
        render(<Loader variant="secondary" color="#00ff00" />);
        const loader = screen.getByRole("status");
        expect(loader).toHaveStyle({ color: "#00ff00" });
        expect(loader).not.toHaveClass("text-gray-600");
    });

    it("renders different sizes", () => {
        const { rerender } = render(<Loader size="xs" />);
        let loader = screen.getByRole("status");
        expect(loader.querySelector("svg")).toHaveClass("h-4", "w-4");

        rerender(<Loader size="sm" />);
        loader = screen.getByRole("status");
        expect(loader.querySelector("svg")).toHaveClass("h-6", "w-6");

        rerender(<Loader size="md" />);
        loader = screen.getByRole("status");
        expect(loader.querySelector("svg")).toHaveClass("h-8", "w-8");

        rerender(<Loader size="lg" />);
        loader = screen.getByRole("status");
        expect(loader.querySelector("svg")).toHaveClass("h-12", "w-12");

        rerender(<Loader size="xl" />);
        loader = screen.getByRole("status");
        expect(loader.querySelector("svg")).toHaveClass("h-16", "w-16");
    });

    it("renders different types", () => {
        const { rerender } = render(<Loader type="spinner" />);
        let loader = screen.getByRole("status");
        expect(loader.querySelector("svg")).toBeInTheDocument();

        rerender(<Loader type="dots" />);
        loader = screen.getByRole("status");
        expect(loader.querySelector(".flex.space-x-1")).toBeInTheDocument();

        rerender(<Loader type="pulse" />);
        loader = screen.getByRole("status");
        expect(loader.querySelector(".rounded-full.bg-current")).toBeInTheDocument();

        rerender(<Loader type="ring" />);
        loader = screen.getByRole("status");
        expect(loader.querySelector(".border-t-transparent")).toBeInTheDocument();
    });

    it("renders label when provided", () => {
        render(<Loader label="Loading content..." />);
        expect(screen.getByText("Loading content...")).toBeInTheDocument();

        const loader = screen.getByRole("status");
        expect(loader).toHaveClass("flex-col", "gap-2");
        expect(loader).toHaveAttribute("aria-label", "Loading content...");
    });

    it("applies fullSize when specified", () => {
        render(<Loader fullSize />);
        const loader = screen.getByRole("status");
        expect(loader).toHaveClass("h-full", "w-full");
    });

    it("applies custom className", () => {
        render(<Loader className="custom-class" />);
        const loader = screen.getByRole("status");
        expect(loader).toHaveClass("custom-class");
    });

    it("applies different speeds", () => {
        const { rerender } = render(<Loader speed="fast" type="spinner" />);
        let loader = screen.getByRole("status");
        expect(loader.querySelector("svg")).toHaveClass("animate-[spin_0.5s_linear_infinite]");

        rerender(<Loader speed="normal" type="spinner" />);
        loader = screen.getByRole("status");
        expect(loader.querySelector("svg")).toHaveClass("animate-spin");

        rerender(<Loader speed="slow" type="spinner" />);
        loader = screen.getByRole("status");
        expect(loader.querySelector("svg")).toHaveClass("animate-[spin_2s_linear_infinite]");
    });

    it("applies different stroke widths for spinner type", () => {
        const { rerender } = render(<Loader type="spinner" strokeWidth="thin" size="md" />);
        let loader = screen.getByRole("status");
        let svg = loader.querySelector("svg");
        let circle = svg?.querySelector("circle");
        let path = svg?.querySelector("path");
        expect(circle).toHaveAttribute("stroke-width", "2");
        expect(path).toHaveAttribute("stroke-width", "2");

        rerender(<Loader type="spinner" strokeWidth="normal" size="md" />);
        loader = screen.getByRole("status");
        svg = loader.querySelector("svg");
        circle = svg?.querySelector("circle");
        path = svg?.querySelector("path");
        expect(circle).toHaveAttribute("stroke-width", "2.5");
        expect(path).toHaveAttribute("stroke-width", "2.5");

        rerender(<Loader type="spinner" strokeWidth="thick" size="md" />);
        loader = screen.getByRole("status");
        svg = loader.querySelector("svg");
        circle = svg?.querySelector("circle");
        path = svg?.querySelector("path");
        expect(circle).toHaveAttribute("stroke-width", "3.5");
        expect(path).toHaveAttribute("stroke-width", "3.5");
    });

    it("applies different stroke widths for ring type", () => {
        const { rerender } = render(<Loader type="ring" strokeWidth="thin" size="md" />);
        let loader = screen.getByRole("status");
        let ringElement = loader.querySelector("div:not([role])");
        expect(ringElement).toHaveClass("border-2");

        rerender(<Loader type="ring" strokeWidth="normal" size="md" />);
        loader = screen.getByRole("status");
        ringElement = loader.querySelector("div:not([role])");
        expect(ringElement).toHaveClass("border-[2.5px]");

        rerender(<Loader type="ring" strokeWidth="thick" size="md" />);
        loader = screen.getByRole("status");
        ringElement = loader.querySelector("div:not([role])");
        expect(ringElement).toHaveClass("border-[3.5px]");
    });

    it("stroke width defaults to normal when not specified", () => {
        render(<Loader type="spinner" size="md" />);
        const loader = screen.getByRole("status");
        const svg = loader.querySelector("svg");
        const circle = svg?.querySelector("circle");
        const path = svg?.querySelector("path");
        expect(circle).toHaveAttribute("stroke-width", "2.5");
        expect(path).toHaveAttribute("stroke-width", "2.5");
    });

    it("stroke width varies by size for same stroke width setting", () => {
        const { rerender } = render(<Loader type="spinner" strokeWidth="normal" size="xs" />);
        let loader = screen.getByRole("status");
        let svg = loader.querySelector("svg");
        let circle = svg?.querySelector("circle");
        expect(circle).toHaveAttribute("stroke-width", "2");

        rerender(<Loader type="spinner" strokeWidth="normal" size="xl" />);
        loader = screen.getByRole("status");
        svg = loader.querySelector("svg");
        circle = svg?.querySelector("circle");
        expect(circle).toHaveAttribute("stroke-width", "3.5");
    });

    it("forwards ref correctly", () => {
        const ref = { current: null };
        render(<Loader ref={ref} />);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("passes through additional props", () => {
        render(<Loader data-testid="custom-loader" />);
        const loader = screen.getByTestId("custom-loader");
        expect(loader).toBeInTheDocument();
    });
});
