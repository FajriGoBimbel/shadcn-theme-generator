/**
 * Registry build script.
 * 
 * Step 1: Sync source files from src/components/datatable/ to registry/default/datatable/
 *         (adjusts relative imports to absolute @/ imports)
 * Step 2: Build public/r/registry.json and public/r/datatable.json
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUTPUT_DIR = path.join(ROOT, "public", "r");
const LOG_FILE = path.join(ROOT, "build-log.txt");

// Each block syncs from src/components/<dir> to registry/default/<dir>/components.
// Relative "./x" imports are rewritten to "@/components/<dir>/x".
const BLOCKS = [
  {
    dir: "datatable",
    files: [
      "data-table.tsx",
      "data-table-pagination.tsx",
      "basic-pagination.tsx",
      "skeleton-table.tsx",
    ],
  },
  {
    dir: "multiselect",
    files: ["multi-select.tsx"],
  },
  {
    dir: "markdown-editor",
    files: ["markdown-editor.tsx", "markdown-renderer.tsx"],
  },
  {
    dir: "html-editor",
    files: ["html-editor.tsx", "html-preview.tsx", "symbol-picker.tsx"],
  },
];

let log = "";

try {
  // ─── Step 1: Sync src → registry ─────────────────────────────────────────
  log += "=== STEP 1: Sync src -> registry ===\n";

  for (var b = 0; b < BLOCKS.length; b++) {
    var block = BLOCKS[b];
    var srcDir = path.join(ROOT, "src", "components", block.dir);
    var registryDir = path.join(ROOT, "registry", "default", block.dir, "components");

    fs.mkdirSync(registryDir, { recursive: true });
    log += "-- Block: " + block.dir + "\n";

    for (var i = 0; i < block.files.length; i++) {
      var fileName = block.files[i];
      var srcFile = path.join(srcDir, fileName);

      if (!fs.existsSync(srcFile)) {
        log += "  SKIP (not found): " + fileName + "\n";
        continue;
      }

      var content = fs.readFileSync(srcFile, "utf8");

      // Replace relative imports with absolute @/ imports.
      // e.g. "./data-table-pagination" -> "@/components/datatable/data-table-pagination"
      content = content.replace(
        /from\s+["']\.\/([^"']+)["']/g,
        'from "@/components/' + block.dir + '/$1"'
      );

      var destFile = path.join(registryDir, fileName);
      fs.writeFileSync(destFile, content, "utf8");
      log += "  Synced: " + fileName + "\n";
    }
  }

  // ─── Step 2: Build registry JSON ─────────────────────────────────────────
  log += "\n=== STEP 2: Build registry JSON ===\n";

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // Read registry.json
  var registryPath = path.join(ROOT, "registry.json");
  var registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
  log += "Registry: " + registry.name + " (" + registry.items.length + " items)\n";

  // Build catalog
  var catalog = {
    name: registry.name,
    homepage: registry.homepage,
    items: registry.items.map(function(item) {
      return {
        name: item.name,
        type: item.type,
        title: item.title,
        description: item.description,
        dependencies: item.dependencies,
        registryDependencies: item.registryDependencies
      };
    })
  };

  fs.writeFileSync(path.join(OUTPUT_DIR, "registry.json"), JSON.stringify(catalog, null, 2), "utf8");
  log += "Wrote: public/r/registry.json\n";

  // Build each item
  for (var i = 0; i < registry.items.length; i++) {
    var item = registry.items[i];
    var files = [];

    for (var j = 0; j < item.files.length; j++) {
      var file = item.files[j];
      var filePath = path.join(ROOT, file.path);
      var fileContent = fs.readFileSync(filePath, "utf8");
      files.push({
        path: file.target || file.path,
        type: file.type,
        content: fileContent
      });
    }

    var itemJson = {
      name: item.name,
      type: item.type,
      title: item.title,
      description: item.description,
      dependencies: item.dependencies || [],
      registryDependencies: item.registryDependencies || [],
      files: files
    };

    var outputFile = path.join(OUTPUT_DIR, item.name + ".json");
    fs.writeFileSync(outputFile, JSON.stringify(itemJson, null, 2), "utf8");
    log += "Wrote: public/r/" + item.name + ".json\n";
  }

  log += "\nDONE - SUCCESS\n";
} catch (e) {
  log += "\nERROR: " + e.message + "\n" + e.stack + "\n";
}

fs.writeFileSync(LOG_FILE, log, "utf8");
