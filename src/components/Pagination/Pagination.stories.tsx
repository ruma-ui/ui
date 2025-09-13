import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Pagination } from "./Pagination";
import mdx from "./Pagination.mdx";

const meta: Meta<typeof Pagination> = {
    title: "Components/Pagination",
    component: Pagination,
    parameters: {
        layout: "centered",
        docs: {
            page: mdx,
        },
    },
    argTypes: {
        currentPage: {
            control: { type: "number", min: 1, max: 20 },
            description: "The current active page (1-indexed)",
        },
        totalPages: {
            control: { type: "number", min: 1, max: 20 },
            description: "Total number of pages",
        },
        maxVisiblePages: {
            control: { type: "number", min: 3, max: 10 },
            description: "Maximum number of page buttons to show",
            defaultValue: 5,
        },
        size: {
            control: { type: "radio" },
            options: ["sm", "md", "lg"],
            description: "Size of the pagination buttons",
            defaultValue: "md",
        },
        showFirstLast: {
            control: "boolean",
            description: "Whether to show first/last navigation buttons",
            defaultValue: false,
        },
        showPrevNext: {
            control: "boolean",
            description: "Whether to show previous/next navigation buttons",
            defaultValue: true,
        },
        disabled: {
            control: "boolean",
            description: "Whether the pagination is disabled",
            defaultValue: false,
        },
        onPageChange: { action: "pageChanged" },
    },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Primary: Story = {
    args: {
        currentPage: 1,
        totalPages: 10,
        onPageChange: () => {},
    },
};

export const Basic: Story = {
    render: () => {
        const [currentPage, setCurrentPage] = useState(1);

        return (
            <div className="space-y-4">
                <Pagination
                    currentPage={currentPage}
                    totalPages={10}
                    onPageChange={setCurrentPage}
                />
                <p className="text-sm text-gray-600">Current page: {currentPage}</p>
            </div>
        );
    },
};

export const Sizes: Story = {
    render: () => {
        const [currentPage, setCurrentPage] = useState(3);

        return (
            <div className="space-y-6">
                <div>
                    <h4 className="mb-2 text-sm font-medium">Small Size</h4>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={10}
                        onPageChange={setCurrentPage}
                        size="sm"
                    />
                </div>
                <div>
                    <h4 className="mb-2 text-sm font-medium">Medium Size</h4>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={10}
                        onPageChange={setCurrentPage}
                        size="md"
                    />
                </div>
                <div>
                    <h4 className="mb-2 text-sm font-medium">Large Size</h4>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={10}
                        onPageChange={setCurrentPage}
                        size="lg"
                    />
                </div>
            </div>
        );
    },
};

export const WithFirstLast: Story = {
    render: () => {
        const [currentPage, setCurrentPage] = useState(5);

        return (
            <div className="space-y-4">
                <Pagination
                    currentPage={currentPage}
                    totalPages={20}
                    onPageChange={setCurrentPage}
                    showFirstLast
                />
                <p className="text-sm text-gray-600">Current page: {currentPage}</p>
            </div>
        );
    },
};

export const ManyPages: Story = {
    render: () => {
        const [currentPage, setCurrentPage] = useState(8);

        return (
            <div className="space-y-4">
                <Pagination
                    currentPage={currentPage}
                    totalPages={50}
                    onPageChange={setCurrentPage}
                    maxVisiblePages={7}
                />
                <p className="text-sm text-gray-600">Current page: {currentPage} of 50</p>
            </div>
        );
    },
};

export const FewPages: Story = {
    render: () => {
        const [currentPage, setCurrentPage] = useState(2);

        return (
            <div className="space-y-4">
                <Pagination
                    currentPage={currentPage}
                    totalPages={5}
                    onPageChange={setCurrentPage}
                />
                <p className="text-sm text-gray-600">Current page: {currentPage}</p>
            </div>
        );
    },
};

export const MiddlePages: Story = {
    render: () => {
        const [currentPage, setCurrentPage] = useState(15);

        return (
            <div className="space-y-4">
                <Pagination
                    currentPage={currentPage}
                    totalPages={25}
                    onPageChange={setCurrentPage}
                    showFirstLast
                />
                <p className="text-sm text-gray-600">Current page: {currentPage} of 25</p>
            </div>
        );
    },
};

export const EndPages: Story = {
    render: () => {
        const [currentPage, setCurrentPage] = useState(23);

        return (
            <div className="space-y-4">
                <Pagination
                    currentPage={currentPage}
                    totalPages={25}
                    onPageChange={setCurrentPage}
                    showFirstLast
                />
                <p className="text-sm text-gray-600">Current page: {currentPage} of 25</p>
            </div>
        );
    },
};

export const Disabled: Story = {
    args: {
        currentPage: 3,
        totalPages: 10,
        disabled: true,
        onPageChange: () => {},
    },
};

export const Compact: Story = {
    render: () => {
        const [currentPage, setCurrentPage] = useState(1);

        return (
            <div className="space-y-4">
                <Pagination
                    currentPage={currentPage}
                    totalPages={10}
                    onPageChange={setCurrentPage}
                    showPrevNext={false}
                    maxVisiblePages={3}
                />
                <p className="text-sm text-gray-600">Current page: {currentPage}</p>
            </div>
        );
    },
};

export const DataTable: Story = {
    render: () => {
        const [currentPage, setCurrentPage] = useState(1);
        const itemsPerPage = 10;
        const totalItems = 247;

        return (
            <div className="space-y-4">
                <div className="rounded-lg border border-gray-200 bg-white p-4">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} to{" "}
                            {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
                            results
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={Math.ceil(totalItems / itemsPerPage)}
                            onPageChange={setCurrentPage}
                            size="sm"
                        />
                    </div>
                    <div className="space-y-2">
                        {Array.from({ length: itemsPerPage }, (_, i) => (
                            <div key={i} className="flex items-center space-x-4 rounded border p-3">
                                <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                                <div className="flex-1">
                                    <div className="h-4 w-32 rounded bg-gray-200"></div>
                                    <div className="mt-1 h-3 w-24 rounded bg-gray-100"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    },
};

export const CustomStyling: Story = {
    render: () => {
        const [currentPage, setCurrentPage] = useState(3);

        return (
            <div className="space-y-4">
                <Pagination
                    currentPage={currentPage}
                    totalPages={10}
                    onPageChange={setCurrentPage}
                    className="rounded-lg bg-gray-50 p-4"
                />
                <p className="text-sm text-gray-600">Current page: {currentPage}</p>
            </div>
        );
    },
};
