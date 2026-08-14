import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function CardPreview() {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-foreground">Cards</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Manage your account settings and preferences.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Your account is currently active. All features are enabled.
            </p>
          </CardContent>
          <CardFooter>
            <Button size="sm">Save Changes</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
            <CardDescription>Monthly overview</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$45,231</p>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
