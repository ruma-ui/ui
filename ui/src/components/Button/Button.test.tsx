import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "./Button";

describe("Button Component", () => {
  it("renders children text correctly", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeDefined();
  });

  it("renders primary variant button element", () => {
    const { container } = render(<Button variant="primary">Submit</Button>);
    const button = container.querySelector("button");
    expect(button).not.toBeNull();
  });
});
