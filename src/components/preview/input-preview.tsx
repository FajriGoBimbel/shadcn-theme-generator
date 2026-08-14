import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function InputPreview() {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-foreground">Inputs</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Enter your name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="name@example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="disabled">Disabled</Label>
          <Input id="disabled" disabled placeholder="Disabled input" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="********" />
        </div>
      </div>
    </div>
  );
}
