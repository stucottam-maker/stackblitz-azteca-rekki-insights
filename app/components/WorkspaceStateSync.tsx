"use client";

import { useEffect } from "react";
import { synchroniseWorkspaceState } from "../lib/workspaceState";

const RELOAD_GUARD = "workspace-state-cloud-hydrated";

export default function WorkspaceStateSync() {
  useEffect(() => {
    synchroniseWorkspaceState()
      .then((hydrated) => {
        if (hydrated && !sessionStorage.getItem(RELOAD_GUARD)) {
          sessionStorage.setItem(RELOAD_GUARD, "true");
          window.location.reload();
        }
      })
      .catch((error) => console.error("Workspace cloud sync failed", error));
  }, []);

  return null;
}
