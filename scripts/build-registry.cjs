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
const SRC_DIR = path.join(ROOT, "src", "components", "datatable");
const REGISTRY_DIR = path.join(ROOT, "registry", "default", "datatable", "components");
const OUTPUT_DIR = path.join(ROOT, "public", "r");
const LOG_FILE = path.join(ROOT, "build-log.txt");

let log = "";

try {
  // ─── Step 1: Sync src → registry ─────────────────────────────────────────
  log += "=== STEP 1: Sync src -> registry ===\n";

  fs.mkdirSync(REGISTRY_DIR, { recursive: true });

  const filesToSync = [
    "data-table.tsx",
    "data-table-pagination.tsx",
    "basic-pagination.tsx",
    "skeleton-table.tsx",
  ];

  for (var i = 0; i < filesToSync.length; i++) {
    var fileName = filesToSync[i];
    var srcFile = path.join(SRC_DIR, fileName);

    if (!fs.existsSync(srcFile)) {
      log += "  SKIP (not found): " + fileName + "\n";
      continue;
    }

    var content = fs.readFileSync(srcFile, "utf8");

    // Replace relative imports with absolute @/ imports
    // "./data-table-pagination" -> "@/components/datatable/data-table-pagination"
    // "./basic-pagination" -> "@/components/datatable/basic-pagination"
    // "./skeleton-table" -> "@/components/datatable/skeleton-table"
    content = content.replace(
      /from\s+["']\.\/([^"']+)["']/g,
      'from "@/components/datatable/$1"'
    );

    var destFile = path.join(REGISTRY_DIR, fileName);
    fs.writeFileSync(destFile, content, "utf8");
    log += "  Synced: " + fileName + "\n";
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
