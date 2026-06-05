import { execSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function killPort(port) {
  if (process.platform !== "win32") {
    return;
  }

  try {
    const output = execSync(`netstat -ano | findstr :${port} | findstr LISTENING`, {
      encoding: "utf8",
    });

    for (const line of output.trim().split(/\r?\n/)) {
      const pid = line.trim().split(/\s+/).at(-1);
      if (!pid || pid === "0") continue;
      try {
        execSync(`taskkill /PID ${pid} /F`, { stdio: "ignore" });
        console.log(`Stopped process ${pid} on port ${port}`);
      } catch {
        // Process may have already exited.
      }
    }
  } catch {
    // No listener on this port.
  }
}

function killNextDevProcesses() {
  if (process.platform !== "win32") {
    return;
  }

  const root = projectRoot.replace(/\\/g, "\\\\");
  try {
    const output = execSync(
      `powershell -NoProfile -Command "Get-CimInstance Win32_Process -Filter \\"Name='node.exe'\\" | Where-Object { $_.CommandLine -like '*next*dev*' -and $_.CommandLine -like '*${root}*' } | ForEach-Object { $_.ProcessId }"`,
      { encoding: "utf8" },
    );

    for (const pid of output.trim().split(/\r?\n/)) {
      if (!pid) continue;
      try {
        execSync(`taskkill /PID ${pid} /F`, { stdio: "ignore" });
        console.log(`Stopped Next.js dev process ${pid}`);
      } catch {
        // Already exited.
      }
    }
  } catch {
    // No matching processes.
  }
}

function clearDevCache() {
  const devDir = path.join(projectRoot, ".next", "dev");
  if (!existsSync(devDir)) {
    return;
  }

  rmSync(devDir, { recursive: true, force: true });
  console.log("Cleared .next/dev cache");
}

for (const port of [3000, 3001]) {
  killPort(port);
}

killNextDevProcesses();
clearDevCache();