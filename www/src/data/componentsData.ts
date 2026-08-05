export interface ComponentDoc {
  slug: string;
  name: string;
  category: "Form" | "Data Display" | "Feedback" | "Navigation" | "Layout" | "Media";
  description: string;
  dependencies?: string[];
  usage: string;
  props?: { name: string; type: string; default?: string; description: string }[];
}

export const COMPONENTS_DATA: ComponentDoc[] = [
  {
    slug: "button",
    name: "Button",
    category: "Form",
    description:
      "Displays a button or a component that looks like a button with multiple visual variants and loading states.",
    dependencies: ["clsx", "tailwind-merge"],
    usage: `import { Button } from "@/components/ui/button";

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  );
}`,
    props: [
      {
        name: "variant",
        type: '"default" | "secondary" | "outline" | "ghost" | "destructive"',
        default: '"default"',
        description: "The visual variant of the button.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg" | "icon"',
        default: '"md"',
        description: "The size of the button.",
      },
      {
        name: "isLoading",
        type: "boolean",
        default: "false",
        description: "Displays a loading spinner inside the button.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Disables button interactions.",
      },
    ],
  },
  {
    slug: "badge",
    name: "Badge",
    category: "Data Display",
    description: "Displays a badge or a component that looks like a badge.",
    dependencies: ["clsx", "tailwind-merge"],
    usage: `import { Badge } from "@/components/ui/badge";

export default function BadgeDemo() {
  return (
    <div className="flex gap-3">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  );
}`,
    props: [
      {
        name: "variant",
        type: '"default" | "secondary" | "outline" | "destructive"',
        default: '"default"',
        description: "The visual style of the badge.",
      },
    ],
  },
  {
    slug: "card",
    name: "Card",
    category: "Data Display",
    description: "Displays a card with header, content, and footer sections.",
    dependencies: ["clsx", "tailwind-merge"],
    usage: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CardDemo() {
  return (
    <Card className="w-87.5">
      <CardHeader>
        <CardTitle>Create Project</CardTitle>
        <CardDescription>Deploy your new project in one click.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-zinc-400">Configure your deployment settings and environment variables.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
}`,
    props: [
      {
        name: "className",
        type: "string",
        default: "undefined",
        description: "Custom classes for card layout.",
      },
    ],
  },
  {
    slug: "tabs",
    name: "Tabs",
    category: "Navigation",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    dependencies: ["clsx", "tailwind-merge"],
    usage: `import { Tabs, TabList, Tab, TabPanel } from "@/components/ui/tabs";

export default function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="w-100">
      <TabList>
        <Tab value="account">Account</Tab>
        <Tab value="password">Password</Tab>
      </TabList>
      <TabPanel value="account" className="p-4 bg-zinc-900 border border-zinc-800 rounded-md mt-2">
        <h3 className="font-semibold text-white">Account Details</h3>
        <p className="text-sm text-zinc-400">Manage your profile and account settings.</p>
      </TabPanel>
      <TabPanel value="password" className="p-4 bg-zinc-900 border border-zinc-800 rounded-md mt-2">
        <h3 className="font-semibold text-white">Password Settings</h3>
        <p className="text-sm text-zinc-400">Update your security credentials here.</p>
      </TabPanel>
    </Tabs>
  );
}`,
    props: [
      {
        name: "defaultValue",
        type: "string",
        default: "undefined",
        description: "Initial active tab.",
      },
      {
        name: "value",
        type: "string",
        default: "undefined",
        description: "Controlled active tab value.",
      },
      {
        name: "onValueChange",
        type: "(value: string) => void",
        default: "undefined",
        description: "Event listener when active tab changes.",
      },
    ],
  },
  {
    slug: "alert",
    name: "Alert",
    category: "Feedback",
    description: "Displays a callout for user attention.",
    dependencies: ["clsx", "tailwind-merge"],
    usage: `import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function AlertDemo() {
  return (
    <div className="space-y-4 w-full max-w-lg">
      <Alert variant="default">
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>You can add components to your app using the ruma-ui CLI.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
      </Alert>
    </div>
  );
}`,
    props: [
      {
        name: "variant",
        type: '"default" | "destructive" | "success" | "warning"',
        default: '"default"',
        description: "Alert severity style.",
      },
    ],
  },
  {
    slug: "switch",
    name: "Switch",
    category: "Form",
    description: "A control that allows the user to toggle between checked and unchecked states.",
    dependencies: ["clsx", "tailwind-merge"],
    usage: `import { Switch } from "@/components/ui/switch";

export default function SwitchDemo() {
  return (
    <div className="flex items-center gap-3">
      <Switch id="airplane-mode" />
      <label htmlFor="airplane-mode" className="text-sm text-zinc-300">Airplane Mode</label>
    </div>
  );
}`,
    props: [
      {
        name: "checked",
        type: "boolean",
        default: "false",
        description: "Controlled state of the switch.",
      },
      {
        name: "onCheckedChange",
        type: "(checked: boolean) => void",
        default: "undefined",
        description: "Event handler when toggle state changes.",
      },
    ],
  },
  {
    slug: "avatar",
    name: "Avatar",
    category: "Data Display",
    description: "An image element with a fallback for representing the user.",
    dependencies: ["clsx", "tailwind-merge"],
    usage: `import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function AvatarDemo() {
  return (
    <div className="flex gap-4 items-center">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>RM</AvatarFallback>
      </Avatar>
    </div>
  );
}`,
    props: [
      { name: "src", type: "string", default: "undefined", description: "Image source URL." },
      { name: "alt", type: "string", default: "undefined", description: "Alternative text." },
    ],
  },
  {
    slug: "dialog",
    name: "Modal / Dialog",
    category: "Feedback",
    description:
      "A window overlaid on primary content, rendering information and requiring user interaction.",
    dependencies: ["clsx", "tailwind-merge"],
    usage: `import { Modal, ModalHeader, ModalTitle, ModalDescription, ModalContent, ModalFooter } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ModalDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <ModalHeader>
          <ModalTitle>Edit Profile</ModalTitle>
          <ModalDescription>Make changes to your profile here.</ModalDescription>
        </ModalHeader>
        <ModalContent>
          <p className="text-sm text-zinc-300">Form fields go here...</p>
        </ModalContent>
        <ModalFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Save changes</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}`,
    props: [
      {
        name: "isOpen",
        type: "boolean",
        default: "false",
        description: "Whether the modal is visible.",
      },
      {
        name: "onClose",
        type: "() => void",
        default: "undefined",
        description: "Callback when modal requests to close.",
      },
    ],
  },
  {
    slug: "progress",
    name: "Progress",
    category: "Feedback",
    description: "Displays an indicator showing the completion progress of a task.",
    dependencies: ["clsx", "tailwind-merge"],
    usage: `import { Progress } from "@/components/ui/progress";

export default function ProgressDemo() {
  return <Progress value={60} className="w-[60%]" />;
}`,
    props: [
      {
        name: "value",
        type: "number",
        default: "0",
        description: "Progress value percentage (0 - 100).",
      },
    ],
  },
  {
    slug: "skeleton",
    name: "Skeleton",
    category: "Feedback",
    description: "Used to show a placeholder while content is loading.",
    dependencies: ["clsx", "tailwind-merge"],
    usage: `import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonDemo() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-62.5" />
        <Skeleton className="h-4 w-50" />
      </div>
    </div>
  );
}`,
    props: [
      {
        name: "className",
        type: "string",
        default: "undefined",
        description: "Custom classes for width, height, and shape.",
      },
    ],
  },
];
