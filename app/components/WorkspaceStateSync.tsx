"use client";

import { useEffect } from "react";
import { migrateLegacyWorkspaceState } from "../lib/workspaceState";

export default function WorkspaceStateSync() {
  useEffect(() => {
    migrateLegacyWorkspaceState()
      .catch((error) => console.error("Workspace cloud sync failed", error));
  }, []);

  return null;
}
