import { Button } from "@/components/ui/button";

export function ButtonPreview() {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-foreground">Buttons</h3>
      <div className="flex flex-wrap gap-3">
        <Button variant="default">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
      </div>
    </div>
  );
}
