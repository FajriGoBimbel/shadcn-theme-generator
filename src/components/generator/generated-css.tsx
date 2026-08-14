import { useState } from "react";
import { Check, Copy, Download } from "lucide-react";
import { useTheme } from "@/lib/theme-context";
import { generateCSS } from "@/lib/css-generator";
import { Button } from "@/components/ui/button";

export function GeneratedCSS() {
  const { config } = useTheme();
  const [copied, setCopied] = useState(false);

  const css = generateCSS(config);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(css);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = css;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([css], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "global.css";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-3">
      <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
        Generated CSS
      </h4>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="h-7 gap-1.5 text-xs flex-1"
          onClick={handleCopy}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy CSS
            </>
          )}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-7 gap-1.5 text-xs flex-1"
          onClick={handleDownload}
        >
          <Download className="h-3.5 w-3.5" />
          Download
        </Button>
      </div>
      <div className="max-h-[300px] overflow-auto rounded-lg border bg-muted/30 p-3">
        <pre className="text-[10px] font-mono whitespace-pre-wrap text-muted-foreground leading-relaxed">
          {css}
        </pre>
      </div>
    </div>
  );
}
