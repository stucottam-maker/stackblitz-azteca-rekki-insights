"use client";

import type { ReactNode } from "react";
import Link from "next/link";

import { useWorkspace } from "../../components/WorkspaceProvider";
import { usesAztecaLegacyCatalogue } from "../../lib/workspaceCatalogues";

export default function RecipeDetailLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { activeWorkspace } = useWorkspace();

  if (usesAztecaLegacyCatalogue(activeWorkspace?.organisationId)) {
    return <>{children}</>;
  }

  return (
    <div className="page">
      <Link href="/recipes" className="back-link">
        ← Recipes
      </Link>

      <section className="panel">
        <p className="panel-kicker">Restaurant workspace</p>
        <h1>Recipe not found</h1>
        <p className="page-description">
          This recipe does not exist in {activeWorkspace?.organisationName ?? "the selected restaurant"}.
        </p>
      </section>
    </div>
  );
}
