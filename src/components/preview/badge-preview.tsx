import { Badge } from "@/components/ui/badge";

export function BadgePreview() {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-foreground">Badges</h3>
      <div className="flex flex-wrap gap-3">
        <Badge variant="default">Active</Badge>
        <Badge variant="secondary">Pending</Badge>
        <Badge variant="destructive">Failed</Badge>
        <Badge variant="outline">Draft</Badge>
      </div>
    </div>
  );
}
