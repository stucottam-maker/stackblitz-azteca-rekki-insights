"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  listAvailableWorkspaces,
  persistActiveWorkspace,
  resolveActiveWorkspace,
  type ActiveWorkspace,
  type WorkspaceAccess,
} from "../lib/clientWorkspace";

type WorkspaceContextValue = {
  activeWorkspace: ActiveWorkspace | null;
  availableWorkspaces: WorkspaceAccess[];
  loading: boolean;
  switching: boolean;
  switchWorkspace: (organisationId: string, siteId: string) => Promise<void>;
};

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export default function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [activeWorkspace, setActiveWorkspace] = useState<ActiveWorkspace | null>(null);
  const [availableWorkspaces, setAvailableWorkspaces] = useState<WorkspaceAccess[]>([]);
  const [loading, setLoading] = useState(true);
  const [switching, setSwitching] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const available = await listAvailableWorkspaces();
        const active = await resolveActiveWorkspace();
        if (cancelled) return;
        setAvailableWorkspaces(available);
        setActiveWorkspace(active);
      } catch (error) {
        console.error("Workspace load failed", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo<WorkspaceContextValue>(
    () => ({
      activeWorkspace,
      availableWorkspaces,
      loading,
      switching,
      async switchWorkspace(organisationId: string, siteId: string) {
        if (switching) return;

        const organisation = availableWorkspaces.find(
          (item) => item.organisationId === organisationId
        );
        const site = organisation?.sites.find((item) => item.id === siteId);
        if (!organisation || !site) return;

        setSwitching(true);
        try {
          await persistActiveWorkspace(organisationId, siteId);
          window.location.reload();
        } catch (error) {
          console.error("Workspace switch failed", error);
          setSwitching(false);
        }
      },
    }),
    [activeWorkspace, availableWorkspaces, loading, switching]
  );

  if (loading) {
    return (
      <div className="workspace-loading-screen" role="status" aria-live="polite">
        <div className="brand-mark">KI</div>
        <strong>Kitchen Insights</strong>
        <span>Loading your restaurant workspace…</span>
      </div>
    );
  }

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used inside WorkspaceProvider");
  }
  return context;
}
