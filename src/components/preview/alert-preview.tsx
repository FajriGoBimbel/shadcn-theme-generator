import { AlertCircle, CheckCircle2, Info } from "lucide-react";

export function AlertPreview() {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-foreground">Alerts</h3>
      <div className="space-y-3">
        <div className="flex items-start gap-3 rounded-lg border p-4">
          <Info className="mt-0.5 h-4 w-4 text-foreground" />
          <div>
            <p className="text-sm font-medium text-foreground">Information</p>
            <p className="text-sm text-muted-foreground">
              Your changes have been saved successfully.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950">
          <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-600 dark:text-green-400" />
          <div>
            <p className="text-sm font-medium text-green-800 dark:text-green-200">
              Success
            </p>
            <p className="text-sm text-green-700 dark:text-green-300">
              Your account has been created.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
          <AlertCircle className="mt-0.5 h-4 w-4 text-destructive" />
          <div>
            <p className="text-sm font-medium text-destructive">Error</p>
            <p className="text-sm text-muted-foreground">
              Something went wrong. Please try again.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
