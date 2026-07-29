"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { COMPONENTS_DATA } from "../../../../data/componentsData";
import { ComponentPreview } from "../../../../components/ComponentPreview";
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Alert,
  Switch,
  Avatar,
  Progress,
  Skeleton,
} from "@ruma-ui/ui";

function renderLivePreview(slug: string) {
  switch (slug) {
    case "button":
      return (
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      );

    case "badge":
      return (
        <div className="flex items-center justify-center gap-3">
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
        </div>
      );

    case "card":
      return (
        <Card className="w-[350px] border-zinc-800 bg-zinc-950">
          <CardHeader>
            <h4 className="text-sm font-semibold text-white">Create Project</h4>
            <p className="text-xs text-zinc-400">Deploy your new project in one click.</p>
          </CardHeader>
          <CardBody>
            <p className="text-xs text-zinc-400">
              Configure your deployment settings and environment variables.
            </p>
          </CardBody>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              Cancel
            </Button>
            <Button size="sm" variant="primary">
              Deploy
            </Button>
          </CardFooter>
        </Card>
      );

    case "tabs":
      return (
        <Tabs defaultValue="account" className="w-[360px]">
          <TabList>
            <Tab value="account">Account</Tab>
            <Tab value="password">Password</Tab>
          </TabList>
          <TabPanel
            value="account"
            className="mt-2 rounded-md border border-zinc-800 bg-zinc-900 p-4"
          >
            <h4 className="text-sm font-semibold text-white">Account Details</h4>
            <p className="mt-1 text-xs text-zinc-400">Manage your profile and account settings.</p>
          </TabPanel>
          <TabPanel
            value="password"
            className="mt-2 rounded-md border border-zinc-800 bg-zinc-900 p-4"
          >
            <h4 className="text-sm font-semibold text-white">Password Settings</h4>
            <p className="mt-1 text-xs text-zinc-400">Update your security credentials here.</p>
          </TabPanel>
        </Tabs>
      );

    case "alert":
      return (
        <div className="w-full max-w-md space-y-3">
          <Alert variant="info" title="Heads up!">
            You can add components to your app using the ruma-ui CLI.
          </Alert>
          <Alert variant="error" title="Error">
            Your session has expired. Please log in again.
          </Alert>
        </div>
      );

    case "switch":
      return (
        <div className="flex items-center gap-3">
          <Switch id="demo-switch" defaultChecked />
          <label htmlFor="demo-switch" className="text-sm text-zinc-300">
            Airplane Mode
          </label>
        </div>
      );

    case "avatar":
      return (
        <div className="flex items-center gap-4">
          <Avatar
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
            alt="Avatar"
            size="md"
          />
          <Avatar initials="RM" size="md" showStatus status="online" />
        </div>
      );

    case "progress":
      return <Progress value={65} className="w-[80%] max-w-md" />;

    case "skeleton":
      return (
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[220px]" />
            <Skeleton className="h-4 w-[160px]" />
          </div>
        </div>
      );

    default:
      return (
        <div className="p-8 text-center">
          <Button variant="primary">{slug.toUpperCase()}</Button>
        </div>
      );
  }
}

export default function ComponentDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const componentData = COMPONENTS_DATA.find(c => c.slug === slug);

  if (!componentData) {
    return (
      <div className="space-y-4 py-12">
        <h1 className="text-2xl font-bold text-white">Component Not Found</h1>
        <p className="text-sm text-zinc-400">
          The component &quot;{slug}&quot; is not found in the registry.
        </p>
        <Link href="/docs/components" className="text-sm text-cyan-400 hover:underline">
          &larr; Back to all components
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8 pb-12">
      {/* Header */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <Link href="/docs/components" className="text-xs text-zinc-400 hover:text-white">
            Components
          </Link>
          <span className="text-xs text-zinc-600">/</span>
          <span className="text-xs font-semibold text-cyan-400">{componentData.name}</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">{componentData.name}</h1>
        <p className="mt-2 text-base text-zinc-400">{componentData.description}</p>
      </div>

      {/* Component Interactive Preview */}
      <ComponentPreview
        slug={componentData.slug}
        name={componentData.name}
        code={componentData.usage}
      >
        {renderLivePreview(componentData.slug)}
      </ComponentPreview>

      {/* Installation CLI Command */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-white">Installation</h2>
        <div className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950 p-3.5 font-mono text-xs text-zinc-200">
          <span>npx @ruma-ui/cli add {componentData.slug}</span>
        </div>
      </div>

      {/* Manual Usage Code */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-white">Usage</h2>
        <div className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs text-zinc-300">
          <pre>{componentData.usage}</pre>
        </div>
      </div>

      {/* Props Reference Table */}
      {componentData.props && componentData.props.length > 0 && (
        <div className="space-y-4 border-t border-zinc-800 pt-4">
          <h2 className="text-lg font-bold text-white">API Reference</h2>
          <div className="overflow-x-auto rounded-lg border border-zinc-800">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead className="border-b border-zinc-800 bg-zinc-900 font-mono text-[11px] text-zinc-400 uppercase">
                <tr>
                  <th className="px-4 py-3">Prop</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Default</th>
                  <th className="px-4 py-3">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 bg-zinc-950">
                {componentData.props.map(prop => (
                  <tr key={prop.name}>
                    <td className="px-4 py-3 font-mono font-semibold text-cyan-400">{prop.name}</td>
                    <td className="px-4 py-3 font-mono text-zinc-400">{prop.type}</td>
                    <td className="px-4 py-3 font-mono text-zinc-500">{prop.default || "-"}</td>
                    <td className="px-4 py-3 text-zinc-300">{prop.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
