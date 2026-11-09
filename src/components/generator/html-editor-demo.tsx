import { useState } from "react";
import { HtmlEditor } from "@/components/html-editor/html-editor";

const DEFAULT_VALUE = `<h3>Newsletter</h3>
<p>This is a <strong>sandboxed</strong> preview.</p>
<ul>
  <li>No scripts ever run</li>
  <li>Switch to <em>Preview</em> to see it rendered</li>
</ul>`;

export function HtmlEditorDemo() {
  const [value, setValue] = useState(DEFAULT_VALUE);

  return <HtmlEditor value={value} onChange={setValue} minHeight={180} />;
}
