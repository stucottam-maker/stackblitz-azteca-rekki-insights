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
  switchWorkspace: (organisationId: string, siteId: string) => void;
};

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export default function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [activeWorkspace, setActiveWorkspace] = useState<ActiveWorkspace | null>(null);
  const [availableWorkspaces, setAvailableWorkspaces] = useState<WorkspaceAccess[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [available, active] = await Promise.all([
          listAvailableWorkspaces(),
          resolveActiveWorkspace(),
        ]);
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
      switchWorkspace(organisationId: string, siteId: string) {
        const organisation = availableWorkspaces.find(
          (item) => item.organisationId === organisationId
        );
        const site = organisation?.sites.find((item) => item.id === siteId);
        if (!organisation || !site) return;

        persistActiveWorkspace(organisationId, siteId);
        window.location.reload();
      },
    }),
    [activeWorkspace, availableWorkspaces, loading]
  );

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used inside WorkspaceProvider");
  }
  return context;
}
