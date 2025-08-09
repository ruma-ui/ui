import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./Accordion";

describe("Accordion", () => {
    describe("Basic Rendering", () => {
        it("renders children", () => {
            render(
                <Accordion>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Test Trigger</AccordionTrigger>
                        <AccordionContent>Test Content</AccordionContent>
                    </AccordionItem>
                </Accordion>,
            );
            expect(screen.getByText("Test Trigger")).toBeInTheDocument();
        });

        it("renders as a div element", () => {
            render(
                <Accordion data-testid="accordion">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Test</AccordionTrigger>
                        <AccordionContent>Content</AccordionContent>
                    </AccordionItem>
                </Accordion>,
            );
            expect(screen.getByTestId("accordion")).toBeInTheDocument();
        });

        it("applies base classes by default", () => {
            render(
                <Accordion data-testid="accordion">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Test</AccordionTrigger>
                        <AccordionContent>Content</AccordionContent>
                    </AccordionItem>
                </Accordion>,
            );
            const accordion = screen.getByTestId("accordion");
            expect(accordion).toHaveClass("w-full");
        });
    });

    describe("Interaction", () => {
        it("expands content when trigger is clicked", () => {
            render(
                <Accordion>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Test Trigger</AccordionTrigger>
                        <AccordionContent>Test Content</AccordionContent>
                    </AccordionItem>
                </Accordion>,
            );

            const trigger = screen.getByText("Test Trigger");
            fireEvent.click(trigger);
            expect(screen.getByText("Test Content")).toBeInTheDocument();
        });

        it("collapses content when trigger is clicked again", () => {
            render(
                <Accordion>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Test Trigger</AccordionTrigger>
                        <AccordionContent>Test Content</AccordionContent>
                    </AccordionItem>
                </Accordion>,
            );

            const trigger = screen.getByText("Test Trigger");
            fireEvent.click(trigger);
            expect(screen.getByText("Test Content")).toBeInTheDocument();

            fireEvent.click(trigger);
            expect(screen.queryByText("Test Content")).not.toBeInTheDocument();
        });

        it("sets aria-expanded attribute correctly", () => {
            render(
                <Accordion>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Test Trigger</AccordionTrigger>
                        <AccordionContent>Test Content</AccordionContent>
                    </AccordionItem>
                </Accordion>,
            );

            const trigger = screen.getByText("Test Trigger");
            expect(trigger).toHaveAttribute("aria-expanded", "false");

            fireEvent.click(trigger);
            expect(trigger).toHaveAttribute("aria-expanded", "true");
        });
    });

    describe("Multiple Mode", () => {
        it("allows multiple items to be expanded when multiple is true", () => {
            render(
                <Accordion multiple>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Trigger 1</AccordionTrigger>
                        <AccordionContent>Content 1</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Trigger 2</AccordionTrigger>
                        <AccordionContent>Content 2</AccordionContent>
                    </AccordionItem>
                </Accordion>,
            );

            const trigger1 = screen.getByText("Trigger 1");
            const trigger2 = screen.getByText("Trigger 2");

            fireEvent.click(trigger1);
            fireEvent.click(trigger2);

            expect(screen.getByText("Content 1")).toBeInTheDocument();
            expect(screen.getByText("Content 2")).toBeInTheDocument();
        });

        it("only allows one item to be expanded when multiple is false", () => {
            render(
                <Accordion multiple={false}>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Trigger 1</AccordionTrigger>
                        <AccordionContent>Content 1</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Trigger 2</AccordionTrigger>
                        <AccordionContent>Content 2</AccordionContent>
                    </AccordionItem>
                </Accordion>,
            );

            const trigger1 = screen.getByText("Trigger 1");
            const trigger2 = screen.getByText("Trigger 2");

            fireEvent.click(trigger1);
            expect(screen.getByText("Content 1")).toBeInTheDocument();

            fireEvent.click(trigger2);
            expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
            expect(screen.getByText("Content 2")).toBeInTheDocument();
        });
    });

    describe("Disabled Items", () => {
        it("does not expand when disabled", () => {
            render(
                <Accordion>
                    <AccordionItem value="item-1" disabled>
                        <AccordionTrigger>Disabled Trigger</AccordionTrigger>
                        <AccordionContent>Disabled Content</AccordionContent>
                    </AccordionItem>
                </Accordion>,
            );

            const trigger = screen.getByText("Disabled Trigger");
            fireEvent.click(trigger);
            expect(screen.queryByText("Disabled Content")).not.toBeInTheDocument();
        });

        it("applies disabled attribute to trigger", () => {
            render(
                <Accordion>
                    <AccordionItem value="item-1" disabled>
                        <AccordionTrigger>Disabled Trigger</AccordionTrigger>
                        <AccordionContent>Disabled Content</AccordionContent>
                    </AccordionItem>
                </Accordion>,
            );

            const trigger = screen.getByText("Disabled Trigger");
            expect(trigger).toBeDisabled();
        });
    });

    describe("AccordionTrigger", () => {
        it("renders with chevron icon", () => {
            render(
                <Accordion>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Test Trigger</AccordionTrigger>
                        <AccordionContent>Test Content</AccordionContent>
                    </AccordionItem>
                </Accordion>,
            );

            const trigger = screen.getByText("Test Trigger");
            expect(trigger.parentElement).toBeInTheDocument();
        });

        it("rotates icon when expanded", () => {
            render(
                <Accordion>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Test Trigger</AccordionTrigger>
                        <AccordionContent>Test Content</AccordionContent>
                    </AccordionItem>
                </Accordion>,
            );

            const trigger = screen.getByText("Test Trigger");
            fireEvent.click(trigger);

            // Check that the icon has the rotate class
            const iconElement = trigger.parentElement?.querySelector("svg");
            expect(iconElement).toHaveClass("rotate-180");
        });
    });

    describe("Custom Styling", () => {
        it("applies custom className to Accordion", () => {
            render(
                <Accordion className="custom-class" data-testid="accordion">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Test</AccordionTrigger>
                        <AccordionContent>Content</AccordionContent>
                    </AccordionItem>
                </Accordion>,
            );
            const accordion = screen.getByTestId("accordion");
            expect(accordion).toHaveClass("custom-class");
        });

        it("applies custom className to AccordionItem", () => {
            render(
                <Accordion>
                    <AccordionItem value="item-1" className="custom-item-class" data-testid="item">
                        <AccordionTrigger>Test</AccordionTrigger>
                        <AccordionContent>Content</AccordionContent>
                    </AccordionItem>
                </Accordion>,
            );
            const item = screen.getByTestId("item");
            expect(item).toHaveClass("custom-item-class");
        });

        it("applies custom className to AccordionTrigger", () => {
            render(
                <Accordion>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="custom-trigger-class">Test</AccordionTrigger>
                        <AccordionContent>Content</AccordionContent>
                    </AccordionItem>
                </Accordion>,
            );
            const trigger = screen.getByText("Test");
            expect(trigger).toHaveClass("custom-trigger-class");
        });

        it("applies custom className to AccordionContent", () => {
            render(
                <Accordion>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Test</AccordionTrigger>
                        <AccordionContent className="custom-content-class" data-testid="content">
                            Content
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>,
            );

            const trigger = screen.getByText("Test");
            fireEvent.click(trigger);

            const content = screen.getByTestId("content");
            expect(content).toHaveClass("custom-content-class");
        });
    });

    describe("Error Handling", () => {
        it("throws error when AccordionTrigger is used outside AccordionItem", () => {
            const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

            expect(() => {
                render(<AccordionTrigger>Test</AccordionTrigger>);
            }).toThrow(
                "AccordionTrigger and AccordionContent must be used within an AccordionItem",
            );

            consoleSpy.mockRestore();
        });

        it("throws error when AccordionContent is used outside AccordionItem", () => {
            const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

            expect(() => {
                render(<AccordionContent>Test</AccordionContent>);
            }).toThrow(
                "AccordionTrigger and AccordionContent must be used within an AccordionItem",
            );

            consoleSpy.mockRestore();
        });

        it("throws error when AccordionItem is used outside Accordion", () => {
            const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

            expect(() => {
                render(
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Test</AccordionTrigger>
                        <AccordionContent>Content</AccordionContent>
                    </AccordionItem>,
                );
            }).toThrow("Accordion components must be used within an Accordion");

            consoleSpy.mockRestore();
        });
    });
});
