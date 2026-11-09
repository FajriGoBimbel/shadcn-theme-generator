import { useState } from "react";
import { MarkdownEditor } from "@/components/markdown-editor/markdown-editor";

const DEFAULT_VALUE = `### Release notes

- **New:** dark mode toggle
- **Fixed:** sidebar flicker on \`resize\`
- [ ] Ship the changelog

> Switch to **Preview** to see it rendered.`;

export function MarkdownEditorDemo() {
  const [value, setValue] = useState(DEFAULT_VALUE);

  return <MarkdownEditor value={value} onChange={setValue} minHeight={180} />;
}
