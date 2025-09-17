import type { Meta, StoryObj } from "@storybook/react-vite";
import { SortableList, SortableItem } from "./SortableList";
import { FaGripVertical, FaFile, FaFolder } from "react-icons/fa";
import { useState } from "react";

interface SampleItem {
    id: number;
    name: string;
    type: string;
    completed: boolean;
}

const meta: Meta<typeof SortableList> = {
    title: "Components/SortableList",
    component: SortableList,
    subcomponents: { SortableItem },
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    "A flexible, accessible component that enables drag-and-drop reordering of list items.",
            },
        },
    },
    argTypes: {
        direction: {
            control: { type: "select" },
            options: ["vertical", "horizontal"],
        },
        disabled: {
            control: "boolean",
        },
        showDragPreview: {
            control: "boolean",
        },
        animationDuration: {
            control: { type: "number", min: 0, max: 1000 },
        },
    },
};

export default meta;
type Story = StoryObj<typeof SortableList>;

const sampleItems = [
    { id: 1, name: "First Item", type: "file", completed: false },
    { id: 2, name: "Second Item", type: "folder", completed: true },
    { id: 3, name: "Third Item", type: "file", completed: false },
    { id: 4, name: "Fourth Item", type: "folder", completed: true },
    { id: 5, name: "Fifth Item", type: "file", completed: false },
];

export const Basic = {
    args: {
        items: sampleItems,
        renderItem: (item) => <div className="text-sm">{(item as SampleItem).name}</div>,
        onReorder: (items, fromIndex, toIndex) => {
            console.log(`Moved item from ${fromIndex} to ${toIndex}`);
        },
    },
} satisfies Story;

export const Vertical = {
    args: {
        ...Basic.args,
        direction: "vertical",
    },
} satisfies Story;

export const Horizontal = {
    args: {
        ...Basic.args,
        direction: "horizontal",
        items: sampleItems.slice(0, 3), // Fewer items for horizontal layout
    },
    parameters: {
        layout: "padded",
    },
} satisfies Story;

export const CustomRendering = {
    args: {
        items: sampleItems,
        renderItem: (item) => {
            const typedItem = item as SampleItem;
            return (
                <div className="flex items-center gap-3 text-sm text-gray-900">
                    <input
                        type="checkbox"
                        checked={typedItem.completed}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        readOnly
                    />
                    {typedItem.type === "folder" ? (
                        <FaFolder className="text-amber-500" />
                    ) : (
                        <FaFile className="text-gray-500" />
                    )}
                    <span className="flex-1 font-medium">{typedItem.name}</span>
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-500">
                        {typedItem.type}
                    </span>
                </div>
            );
        },
    },
} satisfies Story;

export const CustomDragHandle = {
    args: {
        items: sampleItems,
        renderDragHandle: () => (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "24px",
                    height: "24px",
                    borderRadius: "4px",
                    backgroundColor: "#f3f4f6",
                    cursor: "grab",
                }}
            >
                <FaGripVertical style={{ color: "#6b7280", fontSize: "14px" }} />
            </div>
        ),
        renderItem: (item) => {
            const typedItem = item as SampleItem;
            return (
                <div className="flex items-center gap-3 text-sm">
                    <span className="flex-1">{typedItem.name}</span>
                    <span className="text-xs text-gray-500">{typedItem.type}</span>
                </div>
            );
        },
    },
} satisfies Story;

export const EventHandling = {
    render: (args) => {
        const [items, setItems] = useState(sampleItems);
        const [events, setEvents] = useState<string[]>([]);

        const handleReorder = (
            newItems: typeof sampleItems,
            fromIndex: number,
            toIndex: number,
        ) => {
            setEvents((prev) => [
                `Reordered: ${(newItems[toIndex] as SampleItem).name} moved from ${fromIndex} to ${toIndex}`,
                ...prev.slice(0, 4),
            ]);
        };

        const handleChange = (newItems: typeof sampleItems) => {
            setItems(newItems);
            setEvents((prev) => [
                `Items updated: ${(newItems as SampleItem[]).map((item) => item.name).join(", ")}`,
                ...prev.slice(0, 4),
            ]);
        };

        return (
            <div className="flex items-start gap-6">
                <div className="flex-1">
                    <SortableList
                        {...args}
                        items={items}
                        onReorder={
                            handleReorder as (
                                items: unknown[],
                                fromIndex: number,
                                toIndex: number,
                            ) => void
                        }
                        onChange={handleChange as (items: unknown[]) => void}
                    />
                </div>
                <div className="max-w-xs flex-1">
                    <h4 className="mb-3 text-sm font-semibold text-gray-900">Event Log</h4>
                    <div className="max-h-48 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-3 font-mono text-xs">
                        {events.length === 0 ? (
                            <div className="text-gray-500">No events yet...</div>
                        ) : (
                            events.map((event, index) => (
                                <div key={index} className="mb-1">
                                    {event}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        );
    },
    args: {
        renderItem: (item) => <div className="text-sm">{(item as SampleItem).name}</div>,
    },
} satisfies Story;

export const WithDragPreview = {
    args: {
        ...Basic.args,
        showDragPreview: true,
    },
} satisfies Story;

export const Disabled = {
    args: {
        ...Basic.args,
        disabled: true,
    },
} satisfies Story;

export const WithStateManagement = {
    render: (args) => {
        const [items, setItems] = useState(sampleItems);

        return (
            <div className="w-96">
                <div className="mb-4">
                    <button
                        onClick={() => {
                            const newItem = {
                                id: Date.now(),
                                name: `New Item ${items.length + 1}`,
                                type: "file",
                                completed: false,
                            };
                            setItems([...items, newItem]);
                        }}
                        className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Add Item
                    </button>
                </div>
                <SortableList
                    {...args}
                    items={items}
                    onChange={setItems as (items: unknown[]) => void}
                    getItemKey={(item) => (item as SampleItem).id.toString()}
                />
            </div>
        );
    },
    args: {
        renderItem: (item) => {
            const typedItem = item as SampleItem;
            return (
                <div className="flex items-center gap-3 text-sm">
                    <input
                        type="checkbox"
                        checked={typedItem.completed}
                        className="rounded border-gray-300"
                        onChange={() => {
                            // This would normally update the item in state
                            console.log(`Toggle ${typedItem.name}`);
                        }}
                    />
                    <span className="flex-1">{typedItem.name}</span>
                    <span className="text-xs text-gray-500">{typedItem.type}</span>
                </div>
            );
        },
    },
} satisfies Story;
