import type { Meta, StoryObj } from "@storybook/react-vite";
import { TreeView, TreeItem, TreeItemContent, TreeItemTrigger, TreeItemChildren } from "./TreeView";
import { FaFile, FaFolder } from "react-icons/fa";
import mdx from "./TreeView.mdx";

const meta: Meta<typeof TreeView> = {
  title: "Components/TreeView",
  component: TreeView,
  subcomponents: {
    TreeItem,
    TreeItemContent,
    TreeItemTrigger,
    TreeItemChildren,
  },
  parameters: {
    layout: "centered",
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    multiple: {
      control: "boolean",
      description: "Allow multiple items to be selected at once",
      defaultValue: false,
      type: { name: "boolean" },
    },
    multipleExpanded: {
      control: "boolean",
      description: "Allow multiple items to be expanded at once",
      defaultValue: true,
      type: { name: "boolean" },
    },
    indentGuide: {
      control: "boolean",
      description: "Show indentation guides for tree hierarchy",
      defaultValue: false,
      type: { name: "boolean" },
    },
    defaultSelected: {
      control: false,
      description: "Initially selected item values",
    },
    defaultExpanded: {
      control: false,
      description: "Initially expanded item values",
    },
    onSelectionChange: { action: "selectionChanged" },
    onExpansionChange: { action: "expansionChanged" },
    children: {
      description: "Tree content (TreeItem components)",
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof TreeView>;

interface TreeNode {
  id: string;
  label: string;
  icon: React.ReactNode;
  children?: TreeNode[];
}

const sampleTreeData: TreeNode[] = [
  {
    id: "1",
    label: "Documents",
    icon: <FaFolder className='h-4 w-4 text-blue-500' />,
    children: [
      {
        id: "1-1",
        label: "Work",
        icon: <FaFolder className='h-4 w-4 text-blue-500' />,
        children: [
          {
            id: "1-1-1",
            label: "Report.pdf",
            icon: <FaFile className='h-4 w-4 text-gray-500' />,
          },
          {
            id: "1-1-2",
            label: "Presentation.pptx",
            icon: <FaFile className='h-4 w-4 text-gray-500' />,
          },
        ],
      },
      {
        id: "1-2",
        label: "Personal",
        icon: <FaFolder className='h-4 w-4 text-blue-500' />,
        children: [
          {
            id: "1-2-1",
            label: "Resume.docx",
            icon: <FaFile className='h-4 w-4 text-gray-500' />,
          },
          {
            id: "1-2-2",
            label: "Photos",
            icon: <FaFolder className='h-4 w-4 text-green-500' />,
          },
        ],
      },
    ],
  },
  {
    id: "2",
    label: "Downloads",
    icon: <FaFolder className='h-4 w-4 text-blue-500' />,
    children: [
      {
        id: "2-1",
        label: "Software.zip",
        icon: <FaFile className='h-4 w-4 text-gray-500' />,
      },
      {
        id: "2-2",
        label: "Images",
        icon: <FaFolder className='h-4 w-4 text-green-500' />,
      },
    ],
  },
  {
    id: "3",
    label: "README.md",
    icon: <FaFile className='h-4 w-4 text-gray-500' />,
  },
];

const renderTreeItem = (item: TreeNode): React.ReactNode => (
  <TreeItem key={item.id} value={item.id}>
    <TreeItemContent>
      <TreeItemTrigger hasChildren={!!item.children}>
        {item.icon}
        <span className='ml-1'>{item.label}</span>
      </TreeItemTrigger>
    </TreeItemContent>
    {item.children && <TreeItemChildren>{item.children.map(renderTreeItem)}</TreeItemChildren>}
  </TreeItem>
);

export const Basic: Story = {
  args: {
    children: sampleTreeData.map(renderTreeItem),
  },
};

export const SingleSelection: Story = {
  args: {
    multiple: false,
    children: sampleTreeData.map(renderTreeItem),
  },
};

export const MultipleSelection: Story = {
  args: {
    multiple: true,
    children: sampleTreeData.map(renderTreeItem),
  },
};

export const SingleExpansion: Story = {
  args: {
    multipleExpanded: false,
    children: sampleTreeData.map(renderTreeItem),
  },
};

export const PreSelected: Story = {
  args: {
    defaultSelected: ["1-1-1", "2-1"],
    defaultExpanded: ["1", "1-1"],
    children: sampleTreeData.map(renderTreeItem),
  },
};

export const SimpleList: Story = {
  args: {
    children: (
      <>
        <TreeItem value='item1'>
          <TreeItemContent>
            <span>Item 1</span>
          </TreeItemContent>
        </TreeItem>
        <TreeItem value='item2'>
          <TreeItemContent>
            <span>Item 2</span>
          </TreeItemContent>
        </TreeItem>
        <TreeItem value='item3'>
          <TreeItemContent>
            <span>Item 3</span>
          </TreeItemContent>
        </TreeItem>
      </>
    ),
  },
};

export const WithIndentGuides: Story = {
  args: {
    indentGuide: true,
    children: sampleTreeData.map(renderTreeItem),
  },
};
