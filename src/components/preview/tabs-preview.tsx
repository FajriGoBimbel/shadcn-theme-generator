import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabsPreview() {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-foreground">Tabs</h3>
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">
            Overview content goes here. This is where you would display summary
            information.
          </p>
        </TabsContent>
        <TabsContent value="analytics" className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">
            Analytics content with charts and data visualizations.
          </p>
        </TabsContent>
        <TabsContent value="settings" className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">
            Settings and configuration options.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
