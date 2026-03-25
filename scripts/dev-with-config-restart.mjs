import { watch } from "node:fs";
import { resolve } from "node:path";
import { spawn } from "node:child_process";

const root = process.cwd();
const valaxyBin = resolve(root, "node_modules/valaxy/bin/valaxy.mjs");
const configFiles = [
  resolve(root, "site.config.ts"),
  resolve(root, "valaxy.config.ts"),
];

let child = null;
let restartTimer = null;
let restarting = false;
let shuttingDown = false;

function startDevServer() {
  child = spawn(process.execPath, [valaxyBin], {
    cwd: root,
    stdio: "inherit",
  });

  child.on("exit", (code, signal) => {
    const expectedExit = shuttingDown || restarting;
    child = null;

    if (shuttingDown) {
      process.exit(code ?? (signal ? 1 : 0));
    }

    if (restarting) {
      restarting = false;
      startDevServer();
      return;
    }

    if (!expectedExit) {
      process.exit(code ?? (signal ? 1 : 0));
    }
  });
}

function requestRestart(reason) {
  if (shuttingDown)
    return;

  clearTimeout(restartTimer);
  restartTimer = setTimeout(() => {
    if (!child)
      return;

    restarting = true;
    console.log(`\n[dev-wrapper] 检测到 ${reason} 变化，正在完整重启 Valaxy...\n`);
    child.kill("SIGTERM");
  }, 120);
}

function shutdown() {
  shuttingDown = true;
  clearTimeout(restartTimer);

  if (child) {
    child.kill("SIGTERM");
  }
  else {
    process.exit(0);
  }
}

for (const file of configFiles) {
  watch(file, () => {
    requestRestart(file.endsWith("site.config.ts") ? "site.config.ts" : "valaxy.config.ts");
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

startDevServer();
