import type { Meta, StoryObj } from "@storybook/react-vite";
import { Table, type Column } from "./Table";
import mdx from "./Table.mdx";

interface UserRow {
  id: number;
  name: string;
  email: string;
  role: string;
  usage: number;
}

interface AlignmentRow {
  name: string;
  count: number;
  status: string;
}

interface EmptyRow {
  name: string;
  email: string;
  role: string;
}

const sampleData: UserRow[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Admin",
    usage: 76,
  },
  {
    id: 2,
    name: "Bob Carter",
    email: "bob@example.com",
    role: "Editor",
    usage: 34,
  },
  {
    id: 3,
    name: "Chen Li",
    email: "chen@example.com",
    role: "Viewer",
    usage: 12,
  },
  {
    id: 4,
    name: "Diego Santos",
    email: "diego@example.com",
    role: "Editor",
    usage: 58,
  },
  {
    id: 5,
    name: "Emma Brown",
    email: "emma@example.com",
    role: "Admin",
    usage: 91,
  },
];

const columns: Column<UserRow>[] = [
  {
    key: "name",
    header: "Name",
    sticky: true,
    width: "16rem",
    resizable: true,
    minWidth: 120,
  },
  { key: "email", header: "Email", width: "20rem", resizable: true },
  { key: "role", header: "Role", width: "10rem", resizable: true },
  {
    key: "usage",
    header: "Usage",
    align: "right",
    width: "8rem",
    resizable: true,
    accessor: row => <span className='tabular-nums'>{row.usage}%</span>,
  },
];

const meta: Meta<typeof Table<UserRow>> = {
  title: "Components/Table",
  component: Table as any,
  parameters: {
    layout: "padded",
    docs: { page: mdx },
  },
  argTypes: {
    density: {
      control: { type: "radio" },
      options: ["compact", "normal", "comfortable"],
      description: "Visual density for row and cell padding",
      defaultValue: "normal",
    },
    variant: {
      control: { type: "radio" },
      options: ["plain", "zebra", "outlined"],
      description: "Visual variant",
      defaultValue: "plain",
    },
    highlightOnHover: {
      control: "boolean",
      description: "Add hover highlight to rows",
      defaultValue: true,
    },
    stickyHeader: {
      control: "boolean",
      description: "Keep the header visible while scrolling",
      defaultValue: true,
    },
    virtualization: {
      control: "boolean",
      description: "Enable virtualization for large datasets",
      defaultValue: false,
    },
    maxHeight: {
      control: { type: "number" },
      description: "Sets max height (px) for scrollable table body",
    },
    rowHeight: {
      control: { type: "number" },
      description: "Row height for virtualization (defaults to density-based height)",
    },
    overscan: {
      control: { type: "number" },
      description: "Number of items to render outside visible area",
      defaultValue: 5,
    },
    emptyState: { control: false },
    columns: { control: false },
    data: { control: false },
    onRowClick: { action: "row-click" },
    onColumnResize: { action: "column-resize" },
  },
};

export default meta;

type Story = StoryObj<typeof Table<UserRow>>;

export const Basic: Story = {
  args: {
    columns,
    data: sampleData,
    caption: "User list",
  },
};

export const SimpleTest: Story = {
  args: {
    columns: [
      { key: "name", header: "Name" },
      { key: "email", header: "Email" },
    ],
    data: [
      {
        id: 1,
        name: "Test User",
        email: "test@example.com",
        role: "Admin",
        usage: 50,
      },
      {
        id: 2,
        name: "Another User",
        email: "another@example.com",
        role: "Editor",
        usage: 75,
      },
    ],
    highlightOnHover: true,
  },
};

export const Zebra: Story = {
  args: {
    columns,
    data: sampleData,
    variant: "zebra",
  },
};

export const Outlined: Story = {
  args: {
    columns,
    data: sampleData,
    variant: "outlined",
  },
};

export const Density: Story = {
  args: {
    columns: [
      { key: "name", header: "Name" },
      { key: "email", header: "Email" },
    ],
    data: [
      {
        id: 1,
        name: "Test User",
        email: "test@example.com",
        role: "Admin",
        usage: 50,
      },
      {
        id: 2,
        name: "Another User",
        email: "another@example.com",
        role: "Editor",
        usage: 75,
      },
    ],
    highlightOnHover: true,
    density: "compact",
  },
};

export const Compact: Story = {
  args: {
    columns,
    data: sampleData,
    density: "compact",
  },
};

export const ScrollWithStickyHeader: Story = {
  args: {
    columns,
    data: Array.from({ length: 40 }).map((_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: i % 3 === 0 ? "Admin" : i % 3 === 1 ? "Editor" : "Viewer",
      usage: Math.floor(Math.random() * 100),
    })),
    maxHeight: 320,
    stickyHeader: true,
  },
};

export const WithResizableColumns: Story = {
  args: {
    columns: columns.map(col => ({ ...col, resizable: true })),
    data: sampleData,
    variant: "outlined",
    onColumnResize: (columnKey, width) =>
      console.log(`Column ${String(columnKey)} resized to ${width}px`),
  },
};

export const WithCustomClassNames: Story = {
  args: {
    columns,
    data: sampleData,
    variant: "zebra",
    rowClassName: (row, index) =>
      row.role === "Admin"
        ? "bg-red-50 hover:bg-red-100"
        : row.usage > 70
          ? "bg-green-50 hover:bg-green-100"
          : "",
    cellClassName: (row, column, rowIndex, colIndex) =>
      column.key === "usage" && row.usage > 80 ? "font-bold text-green-700" : "",
  },
};

export const WithVirtualization: Story = {
  args: {
    columns,
    data: Array.from({ length: 10000 }).map((_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: i % 3 === 0 ? "Admin" : i % 3 === 1 ? "Editor" : "Viewer",
      usage: Math.floor(Math.random() * 100),
    })),
    maxHeight: 400,
    virtualization: true,
    stickyHeader: true,
    variant: "outlined",
    rowHeight: 48, // Explicit row height for better virtualization
  },
};

export const ZebraWithStickyAndVirtualization: Story = {
  args: {
    columns,
    data: Array.from({ length: 1000 }).map((_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: i % 3 === 0 ? "Admin" : i % 3 === 1 ? "Editor" : "Viewer",
      usage: Math.floor(Math.random() * 100),
    })),
    maxHeight: 400,
    virtualization: true,
    stickyHeader: true,
    variant: "zebra",
    highlightOnHover: true,
    rowHeight: 48,
  },
};

export const AlignmentExample: StoryObj<typeof Table<AlignmentRow>> = {
  args: {
    columns: [
      {
        key: "name",
        header: "Product Name",
        align: "left",
        width: "200px",
      },
      {
        key: "count",
        header: "Quantity",
        align: "right",
        width: "120px",
      },
      {
        key: "status",
        header: "Status",
        align: "center",
        width: "120px",
      },
    ] as Column<AlignmentRow>[],
    data: [
      { name: "MacBook Pro", count: 12, status: "In Stock" },
      { name: "iPhone 15", count: 345, status: "Low Stock" },
      { name: "AirPods Pro", count: 7, status: "Out of Stock" },
      { name: "iPad Mini", count: 89, status: "In Stock" },
      { name: "Apple Watch", count: 156, status: "In Stock" },
    ],
    variant: "outlined",
    caption: "Product inventory with different column alignments",
  },
};

export const EmptyStateExample: StoryObj<typeof Table<EmptyRow>> = {
  args: {
    columns: [
      { key: "name", header: "Name" },
      { key: "email", header: "Email" },
      { key: "role", header: "Role" },
    ] as Column<EmptyRow>[],
    data: [],
    emptyState: <div className='p-6 text-center text-sm text-gray-500'>No results found</div>,
  },
};
